using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace backend.Models
{
    public class PhotoModel
    {
        public List<IFormFile> Files { get; set; } = new List<IFormFile>();

        [Required]
        [MaxLength(150)]
        public string Title { get; set; }
        
        [Required]
        public Guid Id { get; set; }
    }
}