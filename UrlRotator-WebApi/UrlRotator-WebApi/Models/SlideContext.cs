using Microsoft.EntityFrameworkCore;

namespace UrlRotator.WebApi.Models
{
    public class SlideContext : DbContext
    {
        public SlideContext(DbContextOptions<SlideContext> options) : base(options) { }

        public DbSet<Slide> Slides { get; set; }
    }
}
