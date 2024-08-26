# Row Cell access

This example demonstrates how to access to cell using a row when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void RowCellAccess()
    {
      using( var workbook = Workbook.Create( "RowCellAccess.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Get 4th row. Indexing starts at 0 for rows.
        var row = worksheet.Rows[ 3 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Cell Access";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set a value in cell located at 4th row. Indexing starts at 0 for row's cells.
        row.Cells[ 1 ].Value = "Cell value for 2nd cell of RowId 3";
        row.Cells[ "D" ].Value = "Cell value for cell in column 'D' of RowId 3";

        // Set AutoFit for columns with values.
        worksheet.Columns[ 1 ].AutoFit();
        worksheet.Columns[ "D" ].AutoFit();

        // Making sure only 2 cells in the 4th row exists (the modified cells).
        Debug.Assert( row.Cells.Count == 2 );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: RowCellAccess.xlsx\n" );
      }
    }

```