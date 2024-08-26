# Insert or Delete columns

This example demonstrates how to insert/ delete columns when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void InsertDeleteColumns()
    {
      using( var workbook = Workbook.Create( "InsertDeleteColumns.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Insert and delete Columns";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells for first table.
        worksheet.Cells[ "C4" ].Value = "Insert Columns:";
        worksheet.Cells[ "C4" ].Style.Font.Bold = true;
        worksheet.Cells[ "C5" ].Value = "2021 English class - Students Test Results:";
        worksheet.Cells[ "C5" ].Style.Font.Bold = true;

        worksheet.Cells[ "C6" ].Value = "Name";
        worksheet.Cells[ "D6" ].Value = "Midterm(40%)";
        worksheet.Cells[ "E6" ].Value = "Final(40%)";
        worksheet.Cells[ "C7" ].Value = "Mike Jones";
        worksheet.Cells[ "D7" ].Value = 84;
        worksheet.Cells[ "E7" ].Value = 78;
        worksheet.Cells[ "C8" ].Value = "Kelly Smith";
        worksheet.Cells[ "D8" ].Value = 85;
        worksheet.Cells[ "E8" ].Value = 82;
        worksheet.Cells[ "C9" ].Value = "Cindy Newman";
        worksheet.Cells[ "D9" ].Value = 71;
        worksheet.Cells[ "E9" ].Value = 81;
        worksheet.Cells[ "C10" ].Value = "Michael Sawyer";
        worksheet.Cells[ "D10" ].Value = 61;
        worksheet.Cells[ "E10" ].Value = 66;

        // Create a 4-rows table from previous cells, along with the header row.
        var testTable = worksheet.Tables.Add( "C6", "E10", TableStyle.TableStyleDark11 );
        testTable.AutoFilter.ShowFilterButton = false;

        // Center content for Columns "D" and "E".
        worksheet.Columns[ "D", "E" ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

        // Insert 2 columns in the middle of the testTable (at columnId "E").
        worksheet.InsertColumns( "E", 2 );

        // testTable has 2 more columns, extending from cells C6 to G10.
        Debug.Assert( testTable.CellRange.StartingElement.Address == "C6" );
        Debug.Assert( testTable.CellRange.EndingElement.Address == "G10" );


        // Fill cells for 2nd table.
        worksheet.Cells[ "I4" ].Value = "Delete Columns:";
        worksheet.Cells[ "I4" ].Style.Font.Bold = true;
        worksheet.Cells[ "I5" ].Value = "Matt's owned cars (initially 3 columns)";
        worksheet.Cells[ "I5" ].Style.Font.Bold = true;

        worksheet.Cells[ "I6" ].Value = "Type";
        worksheet.Cells[ "J6" ].Value = "Bought in";
        worksheet.Cells[ "K6" ].Value = "Sold in";
        worksheet.Cells[ "I7" ].Value = "Chevrolet Cavalier";
        worksheet.Cells[ "J7" ].Value = "June 1999";
        worksheet.Cells[ "K7" ].Value = "September 2004";
        worksheet.Cells[ "I8" ].Value = "Honda Civic";
        worksheet.Cells[ "J8" ].Value = "October 2004";
        worksheet.Cells[ "K8" ].Value = "April 2010";
        worksheet.Cells[ "I9" ].Value = "Toyota Echo";
        worksheet.Cells[ "J9" ].Value = "April 2010";
        worksheet.Cells[ "K9" ].Value = "June 2010";
        worksheet.Cells[ "I10" ].Value = "Dodge Caravan";
        worksheet.Cells[ "J10" ].Value = "July 2010";
        worksheet.Cells[ "K10" ].Value = "March 2018";
        worksheet.Cells[ "I11" ].Value = "Audi A4";
        worksheet.Cells[ "J11" ].Value = "March 2018";
        worksheet.Cells[ "K11" ].Value = "May 2021";

        // Create a 5-rows table from previous cells, along with the header row.
        var carTable = worksheet.Tables.Add( "I6", "K11", TableStyle.TableStyleDark3 );
        carTable.AutoFilter.ShowFilterButton = false;

        // Delete 1 column in the middle of the carTable (at column 9). RowId starts at 0.
        worksheet.DeleteColumns( 9 );

        // carTable has 1 less column, extending from cells I6 to J11.
        Debug.Assert( carTable.CellRange.StartingElement.Address == "I6" );
        Debug.Assert( carTable.CellRange.EndingElement.Address == "J11" );

        // AutoFits all Columns.
        worksheet.Columns.AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: InsertDeleteColumns.xslx\n" );
      }
    }
```