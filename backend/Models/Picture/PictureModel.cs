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

        public ObjectId GridFsId { get; set; }

        public ObjectId MadeFrom { get; set; }
    }
}