using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class RegisterModel
    {
        // public string FirstName { get; set; }

        // public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}