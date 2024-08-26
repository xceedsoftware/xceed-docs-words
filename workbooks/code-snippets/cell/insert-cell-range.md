# Insert cell range

This example demonstrates how to insert cell range when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void InsertCellRange()
    {
      using( var workbook = Workbook.Create( "InsertCellRange.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Insert cell Range";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill Cells for initial display
        worksheet.Cells[ "C5" ].Value = "Before Insert cellRange";
        worksheet.Cells[ "C5" ].Style.Font = new Font() { Bold = true };
        worksheet.Cells[ "C6" ].Value = 1;
        worksheet.Cells[ "D6" ].Value = 2;
        worksheet.Cells[ "E6" ].Value = 3;
        worksheet.Cells[ "C7" ].Value = 4;
        worksheet.Cells[ "D7" ].Value = 5;
        worksheet.Cells[ "E7" ].Value = 6;
        worksheet.Cells[ "C8" ].Value = 7;
        worksheet.Cells[ "D8" ].Value = 8;
        worksheet.Cells[ "E8" ].Value = 9;
        worksheet.Cells[ "C9" ].Value = 10;
        worksheet.Cells[ "D9" ].Value = 11;
        worksheet.Cells[ "E9" ].Value = 12;

        // Fill Cells for resulting display
        worksheet.Cells[ "H5" ].Value = "After Insert cellRange (I7 to I8)";
        worksheet.Cells[ "H5" ].Style.Font = new Font() { Bold = true };
        worksheet.Cells[ "H6" ].Value = 1;
        worksheet.Cells[ "I6" ].Value = 2;
        worksheet.Cells[ "J6" ].Value = 3;
        worksheet.Cells[ "H7" ].Value = 4;
        worksheet.Cells[ "I7" ].Value = 5;
        worksheet.Cells[ "J7" ].Value = 6;
        worksheet.Cells[ "H8" ].Value = 7;
        worksheet.Cells[ "I8" ].Value = 8;
        worksheet.Cells[ "J8" ].Value = 9;
        worksheet.Cells[ "H9" ].Value = 10;
        worksheet.Cells[ "I9" ].Value = 11;
        worksheet.Cells[ "J9" ].Value = 12;

        // Insert CellRange from I7 to I8 and shift the following cells down.
        worksheet.InsertRange( "I7", "I8", InsertRangeShiftType.ShiftCellsDown );

        //Save the workbook
        workbook.Save();
        Console.WriteLine( "\tCreated: InsertCellRange.xlsx\n" );
      }
    }
```