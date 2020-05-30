using System;
using MongoDB.Bson;

namespace backend.Services
{
    public class Picture
    {
        public Picture(byte[] bytes, string filename, ObjectId id, int width, int height)
        {
            AsBytes = bytes;
            Filename = filename;
            Id = id;
            Width = width;
            Height = height;
        }

        public byte[] AsBytes { get; }
        public string Filename { get; }
        public ObjectId Id { get; }

        public int Width { get;  }

        public int Height { get; }
    }
}