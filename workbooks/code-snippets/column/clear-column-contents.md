# Clear column contents

This example demonstrates how to clear column contents when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void ClearColumnContents()
    {
      using( var workbook = Workbook.Create( "ClearColumnContents.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Clear Column Contents";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ 4, 6 ].Value = "Column I's content has been cleared, but it's styling remains.";

        // Fill Cells.
        worksheet.Cells[ 8, 6 ].Value = "First Name";
        worksheet.Cells[ 8, 7 ].Value = "Last Name";
        worksheet.Cells[ 8, 8 ].Value = "Age";
        worksheet.Cells[ 8, 9 ].Value = "Is Working";        

        worksheet.Cells[ 9, 6 ].Value = "Tom";
        worksheet.Cells[ 9, 7 ].Value = "Jones";
        worksheet.Cells[ 9, 8 ].Value = 29;
        worksheet.Cells[ 9, 9 ].Value = true;

        worksheet.Cells[ 10, 6 ].Value = "Stella";
        worksheet.Cells[ 10, 7 ].Value = "Smith";
        worksheet.Cells[ 10, 8 ].Value = 38;
        worksheet.Cells[ 10, 9 ].Value = true;

        worksheet.Cells[ 11, 6 ].Value = "Carl";
        worksheet.Cells[ 11, 7 ].Value = "Oconnor";
        worksheet.Cells[ 11, 8 ].Value = 66;
        worksheet.Cells[ 11, 9 ].Value = false;

        worksheet.Cells[ 12, 6 ].Value = "Brianna";
        worksheet.Cells[ 12, 7 ].Value = "Thompson";
        worksheet.Cells[ 12, 8 ].Value = 47;
        worksheet.Cells[ 12, 9 ].Value = false;

        // Style some cells on row 8, from (8, 6) to (8, 9).
        worksheet.Cells[ 8, 6, 8, 9 ].Style.Fill.BackgroundColor = System.Drawing.Color.LightGreen;
        worksheet.Cells[ 8, 6, 8, 9 ].Style.Font = new Font() { Bold = true, Size = 13 };

        // AutoFit all columns in the worksheet, starting at row 8, with width extending from 0 to 255.
        worksheet.Columns.AutoFit( 0, 255, 8 );

        // Clear only the content of column 8.
        worksheet.Columns[ 8 ].Clear( ClearOptions.Contents );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ClearColumnContents.xlsx\n" );
      }
    }
```