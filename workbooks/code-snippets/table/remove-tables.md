# Remove tables

This example demonstrates how to remove tables when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void RemoveTables()
    {
      using( var workbook = Workbook.Load( "Tables.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Modify the title.
        worksheet.Cells[ "B1" ].Value = "Remove Tables";

        // Remove Table at index 1.
        worksheet.Tables.RemoveAt( 1 );
        worksheet.Cells[ "L4" ].Value = "The table has been removed.";

        // Remove Table named "Table4".
        worksheet.Tables.Remove( "Table4" );
        worksheet.Cells[ "L32" ].Value = "The table has been removed.";

        // Set horizontal alignment of column "L" to Left.
        worksheet.Columns[ "L" ].Style.Alignment.Horizontal = HorizontalAlignment.Left;

        // Save workbook to disk.
        workbook.SaveAs( "RemoveTables.xlsx" );
        Console.WriteLine( "\tCreated: RemoveTables.xlsx\n" );
      }
    }
```