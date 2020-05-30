using System.ComponentModel.DataAnnotations;

namespace backend.Models.User
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public override string ToString()
        {
            return $"{nameof(Username)}: {Username}, {nameof(Password)}: *****";
        }
    }
}