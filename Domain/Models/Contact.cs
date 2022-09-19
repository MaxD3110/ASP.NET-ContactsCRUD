namespace Domain.Models
{
    public class Contact
    {
        public int Id { get; set; }

        public string? Name { get; set; } = string.Empty;

        public string? MobilePhone { get; set; } = string.Empty;

        public string? JobTitle { get; set; } = string.Empty;

        public string? BirthDate { get; set; } = string.Empty;
    }
}
