# Cell, Row, Column access

This example demonstrates how to access to cell/row/column when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void CellAccess()
    {
      using( var workbook = Workbook.Create( "CellAccess.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Cell Access";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set a value in cell located at 4th row and 2nd column. Indexing starts at 0 for rows and columns.
        // Accessing with indexes could be faster with many cell access.
        worksheet.Cells[ 3, 1 ].Value = "Cell value at row 3 and column 2";

        // Set a value in cell located at address "D8". Indexing starts at "A" for columns and "1" for rows.
        // Accessing with addresses could be slower with many cell access.
        worksheet.Cells[ "D8" ].Value = "Cell value at address D8";

        // AutoFit all columns with values.
        worksheet.Columns.AutoFit();

        // Making sure only 3 cells in the worksheet exists (the modified cells).
        Debug.Assert( worksheet.Cells.Count == 3 );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: CellAccess.xlsx\n" );
      }
    }

    public static void ColumnAccess()
    {
      using( var workbook = Workbook.Create( "ColumnAccess.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Column Access";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set the width of the 3rd column. Indexing with numbers starts at 0 for columns.
        worksheet.Columns[ 2 ].Width = 60d;

        // Set the format of the 5th column. Indexing with letters starts at "A" for columns.
        worksheet.Columns[ "E" ].Style.CustomFormat = "$0.000";

        // Making sure only 3 columns exist in the worksheet (the modified columns or columns with cell values).
        Debug.Assert( worksheet.Columns.Count == 3 );

        // Set values in cells.
        worksheet.Columns[ 2 ].Cells[ 5 ].Value = "This column has a width of 60.";
        worksheet.Columns[ "E" ].Cells[ 8 ].Value = "A formatted column";
        worksheet.Columns[ "E" ].Cells[ 10 ].Value = 58.364215;

        // AutoFit column "E".
        worksheet.Columns[ "E" ].AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ColumnAccess.xlsx\n" );
      }
    }

    public static void RowAccess()
    {
      using( var workbook = Workbook.Create( "RowAccess.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Row Access";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set the Height of the 5th row. Indexing with numbers starts at 0 for rows.
        worksheet.Rows[ 4 ].Height = 30d;

        // Making sure only 2 rows exist in the worksheet (the modified rows or rows with cell values).
        Debug.Assert( worksheet.Rows.Count == 2 );

        // Set values in cells.
        worksheet.Rows[ 4 ].Cells[ 5 ].Value = "This row has a height of 30.";

        // AutoFit for 6th column.
        worksheet.Columns[ 5 ].AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: RowAccess.xlsx\n" );
      }
    }
```