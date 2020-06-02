using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Data.Entities
{
    public class PictureEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; private set; }
        public string Name { get; private set; }
        public int Height { get; private set; }
        public int Width { get; private set; }

        [BsonConstructor]
        public PictureEntity(ObjectId id, string name = "", int height = 300, int width = 400)
        {
            Id = id;
            Name = name;
            Height = height;
            Width = width;
        }
    }
}