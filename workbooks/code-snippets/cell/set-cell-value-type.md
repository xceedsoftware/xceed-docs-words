# Set Cell value types

This example demonstrates how to set vell value types when using the API from the Xceed Workbooks for .NET.

```csharp
    private static void CreateFormattedTable( Worksheet worksheet, int startRowId, int startColumnId, int endRowId, int endColumnId )
    {
      var table = worksheet.Tables.Add( startRowId, startColumnId, endRowId, endColumnId, TableStyle.TableStyleMedium9 );
      table.ShowFirstColumnFormatting = true;
      table.AutoFilter.ShowFilterButton = false;
      table.Columns[ 1 ].Name = "Values";
    }
    
    public static void SetCellValueTypes()
    {
      using( var workbook = Workbook.Create( "SetCellValueTypes.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Set Cell Value Types";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set a value of type number in cells from 2nd column. Indexing starts at 0 for rows and columns.
        worksheet.Cells[ 3, 0 ].Value = "Numeric types";
        worksheet.Cells[ 4, 0 ].Value = "int:";
        worksheet.Cells[ 4, 1 ].Value = ( int )25;
        worksheet.Cells[ 5, 0 ].Value = "double:";
        worksheet.Cells[ 5, 1 ].Value = ( double )33.54;
        worksheet.Cells[ 6, 0 ].Value = "float:";
        worksheet.Cells[ 6, 1 ].Value = ( float )4.5;
        worksheet.Cells[ 7, 0 ].Value = "decimal:";
        worksheet.Cells[ 7, 1 ].Value = ( decimal )22.586;
        worksheet.Cells[ 8, 0 ].Value = "short:";
        worksheet.Cells[ 8, 1 ].Value = ( short )55;
        worksheet.Cells[ 9, 0 ].Value = "long:";
        worksheet.Cells[ 9, 1 ].Value = ( long )8465;
        worksheet.Cells[ 10, 0 ].Value = "byte:";
        worksheet.Cells[ 10, 1 ].Value = ( byte )255;
        worksheet.Cells[ 11, 0 ].Value = "uint:";
        worksheet.Cells[ 11, 1 ].Value = ( uint )152;
        worksheet.Cells[ 12, 0 ].Value = "ulong:";
        worksheet.Cells[ 12, 1 ].Value = ( ulong )101234;
        worksheet.Cells[ 13, 0 ].Value = "ushort:";
        worksheet.Cells[ 13, 1 ].Value = ( ushort )128;
        worksheet.Cells[ 14, 0 ].Value = "sbyte:";
        worksheet.Cells[ 14, 1 ].Value = ( sbyte )-128;

        // Create a table with the numeric typed cells.
        CellSample.CreateFormattedTable( worksheet, 3, 0, 14, 1 );

        // Set a value of type Date in cells from 5th column. Indexing starts at 0 for rows and columns.
        worksheet.Cells[ 3, 3 ].Value = "Date/Time types";
        worksheet.Cells[ 4, 3 ].Value = "DateTime:";
        worksheet.Cells[ 4, 4 ].Value = DateTime.Now;
        worksheet.Cells[ 5, 3 ].Value = "TimeSpan:";
        worksheet.Cells[ 5, 4 ].Value = new TimeSpan( 2, 1, 25, 32 );

        // Create a table with the dateTime typed cells.
        CellSample.CreateFormattedTable( worksheet, 3, 3, 5, 4 );

        // Set a value of type Text in cells from 8th column. Indexing starts at 0 for rows and columns.
        worksheet.Cells[ 3, 6 ].Value = "Text types";
        worksheet.Cells[ 4, 6 ].Value = "string:";
        worksheet.Cells[ 4, 7 ].Value = "This is a string";
        worksheet.Cells[ 5, 6 ].Value = "enum:";
        worksheet.Cells[ 5, 7 ].Value = EnumValues.Enum_1;
        worksheet.Cells[ 6, 6 ].Value = "char:";
        worksheet.Cells[ 6, 7 ].Value = 'c';
        worksheet.Cells[ 7, 6 ].Value = "guid:";
        worksheet.Cells[ 7, 7 ].Value = Guid.NewGuid();

        // Create a table with the text typed cells.
        CellSample.CreateFormattedTable( worksheet, 3, 6, 7, 7 );

        // Set a value of type boolean in cells from 11th column. Indexing starts at 0 for rows and columns.
        worksheet.Cells[ 3, 9 ].Value = "Boolean types";
        worksheet.Cells[ 4, 9 ].Value = "bool:";
        worksheet.Cells[ 4, 10 ].Value = true;
        worksheet.Cells[ 5, 9 ].Value = "bool:";
        worksheet.Cells[ 5, 10 ].Value = false;

        // Center align all the cells of the 4th row.
        worksheet.Rows[ 3 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

        // Create a table with the boolean typed cells.
        CellSample.CreateFormattedTable( worksheet, 3, 9, 5, 10 );

        // AutoFit all the columns with content starting at the 4th row, and make sure the column's widths are between 0 and 255.
        worksheet.Columns.AutoFit( 0, 255, 3 );        

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: SetCellValueTypes.xlsx\n" );
      }
    }


```