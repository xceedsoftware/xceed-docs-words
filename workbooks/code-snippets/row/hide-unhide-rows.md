# Hide & Unhide rows

This example demonstrates how to hide/unhide rows when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void HideUnhideRows()
    {
      using( var workbook = Workbook.Create( "HideUnhideRows.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Hide/Unhide Rows";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill Cells and style some cells and rows.
        worksheet.Rows[ 4 ].Cells[ 2 ].Value = "Row 9 through 11 are hidden, while row 15 through 17 are visible.";
        worksheet.Rows[ 4 ].Cells[ 2 ].Style.Font.Bold = true;

        // Indexes starts at 0, but at 1 in MS Excel.
        for( int i = 8; i < 11; ++i )
        {
          worksheet.Rows[ i ].Cells[ 3 ].Value = "This row is hidden";
          worksheet.Rows[ i ].Style.Fill.BackgroundColor = System.Drawing.Color.LightPink;
        }
        for( int i = 14; i < 17; ++i )
        {
          worksheet.Rows[ i ].Cells[ 3 ].Value = "This row is visible";
          worksheet.Rows[ i ].Style.Fill.BackgroundColor = System.Drawing.Color.LightGreen;
        }

        // Hide Rows 8-10 and 14-16. Indexes starts at 0.
        worksheet.Rows[ 8, 10 ].IsHidden = true;
        worksheet.Rows[ 14, 16 ].IsHidden = true;

        // Unhide Rows 14-16. Indexes starts at 0.
        worksheet.Rows[ 14, 16 ].IsHidden = false;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: HideUnhideRows.xlsx\n" );
      }
    }
```