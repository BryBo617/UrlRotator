using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UrlRotator.WebApi.Models;
using System.Linq;

namespace UrlRotator_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/slides")]
    public class SlideController : ControllerBase
    {
        private readonly SlideContext _context;

        public SlideController(SlideContext context)
        {
            _context = context;
        }

        // GET: api/v1/slides
        [HttpGet]
        public IEnumerable<Slide> GetAll()
        {
            return _context.Slides.ToList();
        }

        [HttpGet("{machineName}", Name="getByMachineName")]
        public IEnumerable<Slide> GetByMachineName(string machineName)
        {
            return _context.Slides
                .Where(s => s.DMSName == machineName && s.Enabled)
                .ToList();
        }
    }
}
