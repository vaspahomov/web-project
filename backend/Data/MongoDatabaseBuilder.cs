using System;
using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public class MongoDatabaseBuilder
    {
        private const string DefaultConnectionString = "mongodb://localhost:27017";

        private readonly DatabaseSettings _settings;

        public MongoDatabaseBuilder(DatabaseSettings settings)
        {
            _settings = settings;
        }
        public IMongoDatabase Build()
        {
            Environment.SetEnvironmentVariable("MONGODB_USER", "api_picture");
            Environment.SetEnvironmentVariable("MONGODB_PASSWORD", "ab12b4a9-47cd-4bbf-86a0-f933a39d4472");
            var username = Environment.GetEnvironmentVariable("MONGODB_USER");
            var password = Environment.GetEnvironmentVariable("MONGODB_PASSWORD");
            var connectionString = username is null || password is null
                ? DefaultConnectionString
                : $"mongodb://{username}:{password}@ds033267.mlab.com:33267/{_settings.DatabaseName}?retryWrites=false&w=majority";

            var client = new MongoClient(connectionString);
            return client.GetDatabase(_settings.DatabaseName);
        }
    }
}