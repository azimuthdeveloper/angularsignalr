using FoodOrdering.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Contexts;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options): base(options)
    {
        
    }
    public DbSet<FoodItem> FoodItems { get; set; }
    public DbSet<Order> Orders { get; set; }
}