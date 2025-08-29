using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using TaskManager.Data; 
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetTasks([FromQuery] string? search)
        {
            var tasks = _context.Tasks.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                tasks = tasks.Where(t => t.Title.Contains(search));
            }

            return await tasks.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<UserTask>> GetTask(int id) 
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            return task;
        }

        [HttpGet("search/{query}")]
        public async Task<ActionResult<IEnumerable<UserTask>>> SearchTasks(string query)
        {
            var tasks = await _context.Tasks
                .Where(t => t.Title.Contains(query))
                .ToListAsync();

            if (tasks == null || tasks.Count == 0) return NotFound();
            return tasks;
        }


        [HttpPost]
        public async Task<ActionResult<UserTask>> PostTask(UserTask task) 
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, UserTask task)
        {
            if (id != task.Id) return BadRequest();
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

