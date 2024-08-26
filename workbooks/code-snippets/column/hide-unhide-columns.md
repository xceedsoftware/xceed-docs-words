# Hide & unhide columns

This example demonstrates how to Hide/unhide columns when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void HideUnhideColumns()
    {
      using( var workbook = Workbook.Create( "HideUnhideColumns.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Hide/Unhide Columns";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill Cells and style some cells and columns.
        worksheet.Rows[ 4 ].Cells[ 2 ].Value = "Column D through F are hidden, while Column I through K are visible.";
        worksheet.Rows[ 4 ].Cells[ 2 ].Style.Font.Bold = true;

        // Indexes starts at 0, but at 1 in MS Excel.
        for( int i = 3; i < 6; ++i )
        {
          worksheet.Columns[ i ].Cells[ 10 ].Value = "Hidden";
          worksheet.Columns[ i ].Style.Fill.BackgroundColor = System.Drawing.Color.LightPink;
        }
        for( int i = 8; i < 11; ++i )
        {
          worksheet.Columns[ i ].Cells[ 10 ].Value = "Visible";
          worksheet.Columns[ i ].Style.Fill.BackgroundColor = System.Drawing.Color.LightGreen;
        }

        // Hide Columns 3-5 and 8-10. Indexes starts at 0.
        worksheet.Columns[ 3, 5 ].IsHidden = true;
        worksheet.Columns[ 8, 10 ].IsHidden = true;

        // Unhide Columns 8-10. Indexes starts at 0.
        worksheet.Columns[ 8, 10 ].IsHidden = false;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: HideUnhideColumns.xlsx\n" );
      }
    }
```