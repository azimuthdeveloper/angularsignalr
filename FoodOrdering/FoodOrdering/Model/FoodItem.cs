namespace FoodOrdering.Model;

public class FoodItem
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}

public class FoodList
{
    public List<FoodItem> Items { get; set; }
}
