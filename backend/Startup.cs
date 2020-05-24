using System;
using System.Text;
using backend.Data;
using AutoMapper;
using backend.Data.Repositories;
using backend.Helpers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace backend
{
    public class Startup
    {
        public readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(Policies.CorsPolicy, builder =>
                    builder
                        .WithOrigins(Urls.Front, Urls.DevServer)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo{Title = "Backend", Version = "v1"});
            });
            
            services.AddSingleton<IPictureModificator, PictureModificator>();
            
            services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
            services.AddSingleton(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);
            services.AddSingleton(sp =>
            {
                var settings = sp.GetRequiredService<DatabaseSettings>();
                var builder = new MongoDatabaseBuilder(settings);
                return builder.Build();
            });
            
            services.AddSingleton<IPictureRepository, MongoPictureRepository>();
            services.AddSingleton<IUserRepository, MongoUserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = true;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(Policies.CorsPolicy);
            
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Strict,
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend API-Picture");
            });
            app.UseRouting();

            app.Use(async (context, next) =>
            {
                var token = context.Request.Cookies["user_token"];
                if (!string.IsNullOrEmpty(token))
                    context.Request.Headers.Add("Authorization", "Bearer " + token);
            
                await next();
            });
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public static class Policies
    {
        public const string CorsPolicy = "CorsPolicy";
    }
}