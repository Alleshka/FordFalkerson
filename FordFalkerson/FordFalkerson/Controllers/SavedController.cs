using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace FordFalkerson.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedController : ControllerBase
    {
        // GET: api/Saved
        [HttpGet]
        public string Get()
        {
            using (var reader = new StreamReader(new FileStream("matrix.json", FileMode.OpenOrCreate)))
            {
                return reader.ReadToEnd();
            }
        }

        [HttpPost]
        public void Set([FromBody]object matrix)
        {
            using (var writer = new StreamWriter(new FileStream("matrix.json", FileMode.Create)))
            {
                writer.Write(matrix.ToString());
            }
        }
    }
}
