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

        public PictureEntity(ObjectId id, string name, int height, int width, List<ObjectId> gridFsIds)
        {
            Id = id;
            Filename = name;
            Height = height;
            Width = width;
            GridFsIds = gridFsIds;
        }

        private PictureEntity()
        {
        }

        public static PictureEntity WithNoId(string name, int height, int width, List<ObjectId> gridFsIds)
        {
            return new PictureEntity
            {
                Filename = name,
                Height = height,
                Width = width,
                GridFsIds = gridFsIds
            };
        }
    }
}