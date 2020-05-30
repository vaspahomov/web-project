using System;
using MongoDB.Bson;

namespace backend.Services
{
    public class Picture
    {
        public Picture(byte[] bytes, string filename, ObjectId id)
        {
            AsBytes = bytes;
            Filename = filename;
            Id = id;
        }

        public byte[] AsBytes { get; }
        public string Filename { get; }
        public ObjectId Id { get; }
    }
}