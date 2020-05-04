using System;
using System.IO;

namespace backend.Services
{
    public class Image
    {
        public Image(MemoryStream stream)
        {
            AsStream = stream;
        }

        public MemoryStream AsStream { get; }


        public Image StreamMap(Action<MemoryStream, MemoryStream> f)
        {
            using (var inputStream = AsStream)
            using (var outputStream = new MemoryStream())
            {
                f(inputStream, outputStream);
                return new Image(outputStream);
            }
        }
    }
}