using FoodOrdering.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[Authorize]
public class FoodItemsController : ControllerBase
{
    private readonly DataContext _context;

    public FoodItemsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFoodItems()
    {
        var foodItems = await _context.FoodItems.ToListAsync();
        return Ok(foodItems);
    }
}