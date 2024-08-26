# Lock specific cells

This example demonstrates how to lock specific cells when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void LockSpecificCells()
    {
      using( var workbook = Workbook.Create( "LockSpecificCells.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Lock Specific Cells";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set content.
        worksheet.Cells[ "B4" ].Value = "Only Light Pink cells are locked.";
        worksheet.Cells[ "B4" ].Style.Font.Bold = true;

        worksheet.Cells[ "C6" ].Value = "Date";
        worksheet.Cells[ "D6" ].Value = "Employee";
        worksheet.Cells[ "E6" ].Value = "In Time";
        worksheet.Cells[ "F6" ].Value = "Out Time";

        worksheet.Cells[ "C7" ].Value = new DateTime( 2022, 5, 1 );
        worksheet.Cells[ "D7" ].Value = "Micheal Smith";
        worksheet.Cells[ "E7" ].Value = new TimeSpan( 8, 0, 0 );
        worksheet.Cells[ "F7" ].Value = new TimeSpan( 15, 30, 0 );
        worksheet.Cells[ "D8" ].Value = "Stella Corleone";
        worksheet.Cells[ "E8" ].Value = new TimeSpan( 9, 15, 0 );
        worksheet.Cells[ "F8" ].Value = new TimeSpan( 16, 30, 0 );

        worksheet.Cells[ "C10" ].Value = new DateTime( 2022, 5, 2 );
        worksheet.Cells[ "D10" ].Value = "Carl Debrusk";
        worksheet.Cells[ "E10" ].Value = new TimeSpan( 8, 15, 0 );
        worksheet.Cells[ "F10" ].Value = new TimeSpan( 13, 45, 0 );
        worksheet.Cells[ "D11" ].Value = "Stella Corleone";
        worksheet.Cells[ "E11" ].Value = new TimeSpan( 8, 45, 0 );
        worksheet.Cells[ "F11" ].Value = new TimeSpan( 12, 30, 0 );
        worksheet.Cells[ "D12" ].Value = "Michael Smith";

        // AutoFit columns from rowId 6 until the end for width between 0 and 255. RowId starts at 0.
        worksheet.Columns.AutoFit( 0, 255, 6 );
        // Format cells in column "E" and "F" to display times.
        worksheet.Columns[ "E", "F" ].Style.CustomFormat = "hh:mm";
        // Horitonaly align content in columns "C" through "F".
        worksheet.Columns[ "C", "F" ].Style.Alignment.Horizontal = HorizontalAlignment.Center;
        // Put the data in a formatted table.
        var table = worksheet.Tables.Add( "C6", "F12", TableStyle.TableStyleLight14 );
        table.AutoFilter.ShowFilterButton = false;

        // All cells have their "locked" property set to true by default and will be activated when the worksheet will be protected.
        // So, we unlock the first 100 worksheet's columns cells, so they can be edited.
        worksheet.Columns[ 0, 100 ].Style.Protection.Locked = false;

        // Lock cells from "C7" to "F8", hide them for the formula bar and set a LightPink background.
        worksheet.Cells[ "C7", "F8" ].Style.Protection.Locked = true;
        worksheet.Cells[ "C7", "F8" ].Style.Protection.HiddenFormula = true;
        worksheet.Cells[ "C7", "F8" ].Style.Fill.BackgroundColor = System.Drawing.Color.LightPink;

        // Protect the worksheet and only allow inserting new rows. Unlocked cells can also be edited.
        var protection = new WorksheetProtection() { AllowInsertRows = true };
        worksheet.Protect( protection );

        workbook.Save();
        Console.WriteLine( "\tCreated: LockSpecificCells.xlsx\n" );
      }
    }
```