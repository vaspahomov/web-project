using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Data.Entities
{
    public class PictureEntity
    {
        public ObjectId Id { get; private set; }
        
        [BsonConstructor]
        public PictureEntity(ObjectId id)
        {
            Id = id;
        }
    }
}