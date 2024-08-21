# Modifying a Chart

The following example demonstrates how to modify a Chart's Categories (in X) and Values (in Y).

:::caution
 This is only available in v1.5 and up.
:::

```csharp
using(var document = DocX.Load("Report.docx"))
{
    foreach(var p in document.Paragraphs)
    {
        // Gets the paragraph's charts.
        var charts = p.Charts;
        if(charts.Count > 0)
        {
            // Gets the first chart's first serie's values (in Y).
            var numbers = charts[0].Series[0].Values;
            // Modify the third value from 2 to 6.
            numbers[2] = "6";
            // Add a new value.
            numbers.Add("3");
            // Update the first chart's first serie's values with the new one.
            charts[0].Series[0].Values = numbers;

            // Gets the first chart's first serie's categories (in X).
            var categories = charts[0].Series[0].Categories;
            // Modify the second category from Canada to Russia.
            categories[1] = "Russia";
            // Add a new category.
            categories.Add("Italia");
            // Update the first chart's first serie's categories with the new one.
            charts[0].Series[0].Categories = categories;

            // Modify first chart's first serie's color from Blue to Gold.
            charts[0].Series[0].Color = Color.Gold;
            // Remove the legend.
            charts[0].RemoveLegend();

            // Save the changes in the first chart.
            charts[0].Save();
        }
    }

    // Save the document.
    document.SaveAs("ModifyChartData.docx");
}
```