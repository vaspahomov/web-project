using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Data.Entities
{
    public class PictureEntity
    {
        public ObjectId Id { get; set; }

        public List<ObjectId> GridFsIds { get; set; }
        public string Filename { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }


        public PictureEntity(ObjectId id, string filename, int height, int width, List<ObjectId> gridFsIds)
        {
            Id = id;
            Filename = filename;
            Height = height;
            Width = width;
            GridFsIds = gridFsIds;
        }

        public PictureEntity()
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