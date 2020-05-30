using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class PictureDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string FileName { get; set; }
        [BsonElement("expireAt")]
        public DateTime expireAt { get; set; }
    }
}