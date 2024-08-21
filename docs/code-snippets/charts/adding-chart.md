# Adding a Chart

The following example demonstrates how to add a Line Chart to a Document.

```csharp
static void Main(string[] args)
{
    // Creates a document
    using (var document = DocX.Create("LineChart.docx"))
    {
        // Create a line chart.
        var c = new LineChart();
        c.AddLegend(ChartLegendPosition.Left, false);

        // Create the data.
        var canada = new List<ChartData>()
        {
            new ChartData() { Category = "Food", Expenses = 100 },
            new ChartData() { Category = "Housing", Expenses = 120 },
            new ChartData() { Category = "Transportation", Expenses = 140 },
            new ChartData() { Category = "Health Care", Expenses = 150 }
        };

        var usa = new List<ChartData>()
        {
            new ChartData() { Category = "Food", Expenses = 200 },
            new ChartData() { Category = "Housing", Expenses = 150 },
            new ChartData() { Category = "Transportation", Expenses = 110 },
            new ChartData() { Category = "Health Care", Expenses = 100 }
        };

        var brazil = new List<ChartData>()
        {
            new ChartData() { Category = "Food", Expenses = 125 },
            new ChartData() { Category = "Housing", Expenses = 80 },
            new ChartData() { Category = "Transportation", Expenses = 110 },
            new ChartData() { Category = "Health Care", Expenses = 60 }
        };

        // Create and add series by binding X and Y.
        var s1 = new Series("Brazil");
        s1.Bind(brazil, "Category", "Expenses");
        c.AddSeries(s1);

        var s2 = new Series("USA");
        s2.Bind(usa, "Category", "Expenses");
        c.AddSeries(s2);

        var s3 = new Series("Canada");
        s3.Bind(canada, "Category", "Expenses");
        c.AddSeries(s3);

        // Insert chart into document
        document.InsertParagraph("Expenses(M$) for selected categories per country")
                .FontSize(15).SpacingAfter(10d);
        document.InsertChart(c);
        document.Save();
    }
}

public class ChartData
{
    public string Category { get; set; }
    public double Expenses { get; set; }
}
```