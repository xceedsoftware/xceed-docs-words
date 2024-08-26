# Remove Worksheet protection

This example demonstrates how to remove Worksheet protection when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void RemoveWorksheetProtection()
    {
      using( var workbook = Workbook.Load( "RemoveWorksheetProtection.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Remove the protection on the 1st worksheet with a password.
        worksheet.Unprotect( "xceed" );

        workbook.SaveAs( "RemoveWorksheetProtection.xlsx" );
        Console.WriteLine( "\tCreated: RemoveWorksheetProtection.xlsx\n" );
      }
    }
```