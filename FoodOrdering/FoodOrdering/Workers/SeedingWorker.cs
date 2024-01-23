using FoodOrdering.Contexts;
using FoodOrdering.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Workers;

public class SeedingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    
    public SeedingWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await SeedDataAsync();
    }

    private async Task SeedDataAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        await using var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        await context.Database.EnsureDeletedAsync();
        await context.Database.MigrateAsync();
        var foodItems = new List<FoodItem>
        {
            new FoodItem
            {
                Name = "Pizza",
                Description =
                    "A savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven.",
                ImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            new FoodItem
            {
                Name = "Sushi",
                Description =
                    "A Japanese dish of prepared vinegared rice (sushi-meshi), usually with some sugar and salt, accompanied by a variety of ingredients (neta), such as seafood, often raw, and vegetables.",
                ImageUrl = "https://plus.unsplash.com/premium_photo-1670333291474-cb722ca783a5?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            new FoodItem
            {
                Name = "Hamburger",
                Description =
                    "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, or flame broiled. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or ketchup, mayonnaise, mustard, and other condiments.",
                ImageUrl = "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=1"
            },
            new FoodItem()
            {
                Name = "Salad",
                Description = "The most amazing salad that has ever passed your lips.",
                ImageUrl = "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=1"
            }
            // Add more food items as needed
        };

        await context.FoodItems.AddRangeAsync(foodItems);
        await context.SaveChangesAsync();
        Console.WriteLine("Seeding complete!");
    }
}