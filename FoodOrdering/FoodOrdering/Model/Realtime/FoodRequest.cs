using System.Text.Json.Serialization;

namespace FoodOrdering.Model.Realtime;

public class FoodRequest
{
    [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
    public int table { get; set; }
    [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
    public int foodId { get; set; }
}