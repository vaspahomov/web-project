using AutoMapper;
using backend.Data.Entities;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserEntity, UserModel>();
            CreateMap<RegisterModel, UserEntity>();
        }
    }
}