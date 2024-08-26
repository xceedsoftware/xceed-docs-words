# Add Worksheet protection

This example demonstrates how to add Worksheet protection when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void AddWorksheetProtection()
    {
      using( var workbook = Workbook.Create( "AddWorksheetProtection.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add Worksheet Protection"; 
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set content.
        worksheet.Cells[ "C6" ].Value = "This worksheet is protected, no action can be done.";
        worksheet.Cells[ "C8" ].Value = "The worksheet can be unprotected through the 'Review-Unprotect sheet' option.";

        // Protect the 1st worksheet.
        worksheet.Protect();

        // Add a 2nd worksheet.
        var worksheet2 = workbook.Worksheets.Add();

        // Set content in 2nd worksheet.
        worksheet2.Cells[ "B5" ].Value = "This worksheet is NOT protected.";

        workbook.Save();
        Console.WriteLine( "\tCreated: AddWorksheetProtection.xlsx\n" );
      }
    }
```