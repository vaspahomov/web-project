using System;
using System.IO;

namespace backend.Services
{
    public class Picture
    {
        public Picture(MemoryStream stream)
        {
            AsStream = stream;
        }

        public MemoryStream AsStream { get; }


        public Picture StreamMap(Action<MemoryStream, MemoryStream> f)
        {
            using (var inputStream = AsStream)
            using (var outputStream = new MemoryStream())
            {
                f(inputStream, outputStream);
                return new Picture(outputStream);
            }
        }
    }
}