# Column cell access

This example demonstrates how to set collumn cell access when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void ColumnCellAccess()
    {
      using( var workbook = Workbook.Create( "ColumnCellAccess.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Get 4th column. Indexing starts at 0 for columns.
        var columnD = worksheet.Columns[ 3 ];
        // Get column "F". Indexing starts at "A" for columns.
        var columnF = worksheet.Columns[ "F" ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Cell Access";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set a value in cells located at 4th column. Indexing starts at 0 for columns's cells.
        columnD.Cells[ 1 ].Value = "Cell value for 2nd cell of ColumnId 3";
        columnD.Cells[ 3 ].Value = "Cell value for 4th cell of ColumnId 3";
        columnF.Cells[ 8 ].Value = "Cell value for 9th cell of Column F";

        // Set AutoFit for columns with values.
        worksheet.Columns[ 1 ].AutoFit();
        worksheet.Columns[ 3 ].AutoFit();
        worksheet.Columns[ "F" ].AutoFit();

        // Making sure only 2 cells in the 4th column exists and 1 in column "F" (the modified cells).
        Debug.Assert( columnD.Cells.Count == 2 );
        Debug.Assert( columnF.Cells.Count == 1 );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ColumnCellAccess.xlsx\n" );
      }
    }
```