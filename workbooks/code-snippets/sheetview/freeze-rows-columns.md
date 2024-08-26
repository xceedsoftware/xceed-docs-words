# Freeze rows & columns

This example demonstrates how to freeze rows and columns when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void FreezeRowsColumns()
    {
      using( var workbook = Workbook.Create( "FreezeRowsColumns.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Freeze Rows and Columns";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells content.
        FillCellContent( worksheet );

        // Freeze horizontally after first 5 rows and add a Fill Background on them.
        worksheet.SheetView.FrozenRows = 5;
        worksheet.Rows[ 0, 4 ].Style.Fill.BackgroundColor = System.Drawing.Color.Turquoise;

        // Freeze vertically after first Column and add a Fill Background on it.
        worksheet.SheetView.FrozenColumns = 1;
        worksheet.Columns[ 0 ].Style.Fill.BackgroundColor = System.Drawing.Color.Tan;

        // Save workbook to disk.
        workbook.SaveAs( "FreezeRowsColumns.xlsx" );
        Console.WriteLine( "\tCreated: FreezeRowsColumns.xlsx\n" );
      }
    }

    private static void FillCellContent( Worksheet worksheet )
    {
      var random = new Random();

      Debug.Assert( worksheet != null, "Worksheet whouldn't be null.");

      for( var columnId = 1; columnId <= 50; ++columnId )
      {
        // First Rows of data cells.
        worksheet.Cells[ 4, columnId ].Value = new DateTime( 2022, 6, 1 ).AddDays( columnId - 1 );
      }
      for( var rowId = 5; rowId < 53; ++rowId )
      {
        // First Columns of data cells.
        worksheet.Cells[ rowId, 0 ].Value = new DateTime( 2022, 6, 1 ).AddMinutes( ( rowId - 5 ) * 30 );
      }
      for( var columnId = 1; columnId <= 50; ++columnId )
      {
        for( var rowId = 5; rowId < 53; ++rowId )
        {
          // Inner cells.
          worksheet.Cells[ rowId, columnId ].Value = random.Next( 0, 2 ) == 1 ? "YES" : "NO";
        }
      }

      // Format DateTimes.
      worksheet.Rows[ 4 ].Style.CustomFormat = "yyyy/MM/dd";
      worksheet.Columns[ 0 ].Style.CustomFormat = "HH:mm";

      // Center cell content rowId, columnId from (4, 0) to (52, 50)
      worksheet.Cells[ 4, 0, 52, 50 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

      // AutoFit Columns, with a width from 0 to 255, starting at rowId 4.
      worksheet.Columns.AutoFit( 0, 255, 4 );
    }
```