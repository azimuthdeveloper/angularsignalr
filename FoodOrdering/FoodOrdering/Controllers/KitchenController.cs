using FoodOrdering.Contexts;
using FoodOrdering.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[AllowAnonymous]
public class KitchenController
{
    private readonly DataContext _context;

    public KitchenController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public List<Order> GetExistingOrders()
    {
        var orders = _context.Orders.Include(x => x.FoodItem).Where(x => x.OrderState != OrderState.Completed);
        return orders.ToList();
    }
}