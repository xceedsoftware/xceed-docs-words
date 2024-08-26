# Add Worksheet protection and allow actions

This example demonstrates how to add Worksheet protection and allow actions when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void AddWorksheetProtectionAndAllowActions()
    {
      using( var workbook = Workbook.Create( "AddWorksheetProtectionAndAllowActions.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add Worksheet Protection and allow actions";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set content.
        worksheet.Cells[ "C6" ].Value = "This worksheet is protected with a password. Only formatting cell and inserting rows/columns is allowed.";
        worksheet.Cells[ "C8" ].Value = "The worksheet can be unprotected through the 'Review-Unprotect sheet' option by typing 'xceed'.";

        // Set the worksheet protection : only formatting cells and inserting rows/columns will be allowed.
        var protection = new WorksheetProtection() { AllowFormatCells = true, AllowInsertRows = true, AllowInsertColumns = true };
        // Protect the 1st worksheet with a password.
        worksheet.Protect( protection, "xceed" );

        // Add a 2nd worksheet.
        var worksheet2 = workbook.Worksheets.Add();

        // Set content in 2nd worksheet.
        worksheet2.Cells[ "B5" ].Value = "This worksheet is NOT protected.";

        workbook.Save();
        Console.WriteLine( "\tCreated: AddWorksheetProtectionAndAllowActions.xlsx\n" );
      }
    }
```