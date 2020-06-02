using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Data.Entities
{
    public class PictureEntity
    {
        [BsonId] public ObjectId Id { get; set; }

        [BsonElement] public List<ObjectId> GridFsIds { get; set; }
        [BsonElement] public string Filename { get; set; }

        [BsonElement] public int Width { get; set; }

        [BsonElement] public int Height { get; set; }

        [BsonConstructor]
        public PictureEntity(ObjectId id, string name = "", int height = 300, int width = 400)
        {
            Id = id;
            Filename = name;
            Height = height;
            Width = width;
        }
    }
}