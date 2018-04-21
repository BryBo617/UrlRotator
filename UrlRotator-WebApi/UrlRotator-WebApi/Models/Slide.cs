
namespace UrlRotator.WebApi.Models
{
    public class Slide
    {
        public long ID { get; set; }
        public string DMSName { get; set; }
        public string HTTPLink { get; set; }
        public int Timeout { get; set; }
        public bool Enabled { get; set; }
    }
}
