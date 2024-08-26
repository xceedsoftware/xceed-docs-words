# Load Workbook with filename

This example demonstrates how to load workbook with filename when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void LoadWorkbookWithFilename()
    {
      using( var workbook = Workbook.Load( "AutoValue.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Load Workbook with filname";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Insert cell values into this workbook.
        worksheet.Cells[ "C27" ].Value = "Manager:";
        worksheet.Cells[ "D27" ].Value = "Mike Thompson";
        // Set 27th row font.
        worksheet.Rows[ 26 ].Style.Font.Bold = true;

        // Save workbook to disk.
        workbook.SaveAs( "LoadWorkbookWithFilename.xlsx" );
        Console.WriteLine( "\tCreated: LoadWorkbookWithFilename.xlsx\n" );
      }
    }
```