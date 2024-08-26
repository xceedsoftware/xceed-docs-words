# Insert or Delete rows

This example demonstrates how to insert/ delete rows when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void InsertDeleteRows()
    {
      using( var workbook = Workbook.Create( "InsertDeleteRows.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Insert and delete Rows";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells for first table.
        worksheet.Cells[ "D4" ].Value = "Insert Rows:";
        worksheet.Cells[ "D4" ].Style.Font.Bold = true;
        worksheet.Cells[ "D5" ].Value = "2022 Math class - Students Test Results:";
        worksheet.Cells[ "D5" ].Style.Font.Bold = true;

        worksheet.Cells[ "D6" ].Value = "Name";
        worksheet.Cells[ "E6" ].Value = "Midterm(40%)";
        worksheet.Cells[ "F6" ].Value = "Final(60%)";
        worksheet.Cells[ "D7" ].Value = "Mike Jones";
        worksheet.Cells[ "E7" ].Value = 84;
        worksheet.Cells[ "F7" ].Value = 78;
        worksheet.Cells[ "D8" ].Value = "Kelly Smith";
        worksheet.Cells[ "E8" ].Value = 85;
        worksheet.Cells[ "F8" ].Value = 82;
        worksheet.Cells[ "D9" ].Value = "Cindy Newman";
        worksheet.Cells[ "E9" ].Value = 71;
        worksheet.Cells[ "F9" ].Value = 81;
        worksheet.Cells[ "D10" ].Value = "Michael Sawyer";
        worksheet.Cells[ "E10" ].Value = 61;
        worksheet.Cells[ "F10" ].Value = 66;

        // Create a 4-rows table from previous cells, along with the header row.
        var testTable = worksheet.Tables.Add( "D6", "F10", TableStyle.TableStyleDark1 );
        testTable.AutoFilter.ShowFilterButton = false;

        // Insert 2 rows in the middle of the testTable (at rowId 8). RowId starts at 0.
        worksheet.InsertRows( 8, 2 );

        // testTable has2 more rows, extending from cells D6 to F12.
        Debug.Assert( testTable.CellRange.StartingElement.Address == "D6" );
        Debug.Assert( testTable.CellRange.EndingElement.Address == "F12" );


        // Fill cells for 2nd table.
        worksheet.Cells[ "D14" ].Value = "Delete Rows:";
        worksheet.Cells[ "D14" ].Style.Font.Bold = true;
        worksheet.Cells[ "D15" ].Value = "Matt's owned cars (initially 5 blue rows)";
        worksheet.Cells[ "D15" ].Style.Font.Bold = true;

        worksheet.Cells[ "D16" ].Value = "Type";
        worksheet.Cells[ "E16" ].Value = "Bought in";
        worksheet.Cells[ "F16" ].Value = "Sold in";
        worksheet.Cells[ "D17" ].Value = "Chevrolet Cavalier";
        worksheet.Cells[ "E17" ].Value = "June 1999";
        worksheet.Cells[ "F17" ].Value = "September 2004";
        worksheet.Cells[ "D18" ].Value = "Honda Civic";
        worksheet.Cells[ "E18" ].Value = "October 2004";
        worksheet.Cells[ "F18" ].Value = "April 2010";
        worksheet.Cells[ "D19" ].Value = "Toyota Echo";
        worksheet.Cells[ "E19" ].Value = "April 2010";
        worksheet.Cells[ "F19" ].Value = "June 2010";
        worksheet.Cells[ "D20" ].Value = "Dodge Caravan";
        worksheet.Cells[ "E20" ].Value = "July 2010";
        worksheet.Cells[ "F20" ].Value = "March 2018";
        worksheet.Cells[ "D21" ].Value = "Audi A4";
        worksheet.Cells[ "E21" ].Value = "March 2018";
        worksheet.Cells[ "F21" ].Value = "May 2021";

        // Create a 5-rows table from previous cells, along with the header row.
        var carTable = worksheet.Tables.Add( "D16", "F21", TableStyle.TableStyleDark2 );
        carTable.AutoFilter.ShowFilterButton = false;

        // Delete 1 row in the middle of the carTable (at rowId 19). RowId starts at 0.
        worksheet.DeleteRows( 19 );

        // carTable has 1 less row, extending from cells D16 to F20.
        Debug.Assert( carTable.CellRange.StartingElement.Address == "D16" );
        Debug.Assert( carTable.CellRange.EndingElement.Address == "F20" );

        // AutoFits all Columns.
        worksheet.Columns.AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: InsertDeleteRows.xslx\n" );
      }
    }

```