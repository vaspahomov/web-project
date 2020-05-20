using System;
using System.IO;

namespace backend.Services
{
    public class Picture
    {
        public Picture(MemoryStream stream, string filename)
        {
            AsStream = stream;
            Filename = filename;
        }

        public MemoryStream AsStream { get; }
        public string Filename { get; }


        public Picture StreamMap(Action<MemoryStream, MemoryStream> f)
        {
            using (var inputStream = AsStream)
            using (var outputStream = new MemoryStream())
            {
                f(inputStream, outputStream);
                return new Picture(outputStream, Filename);
            }
        }
    }
}