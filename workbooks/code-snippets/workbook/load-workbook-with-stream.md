# Load Workbook with stream

This example demonstrates how to load workbook with stream when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void LoadWorkbookWithStream()
    {
      using( var fs = new FileStream( "AutoValue.xlsx", FileMode.Open, FileAccess.Read, FileShare.Read ) )
      {
        using( var workbook = Workbook.Load( fs ) )
        {
          // Get the first worksheet. A workbook contains at least 1 worksheet.
          var worksheet = workbook.Worksheets[ 0 ];

          // Add a title.
          worksheet.Cells[ "B1" ].Value = "Load Workbook with stream";
          worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

          // Insert cell values into this workbook.
          worksheet.Cells[ "C27" ].Value = "Manager:";
          worksheet.Cells[ "D27" ].Value = "Mike Thompson";
          // Set 27th row font.
          worksheet.Rows[ 26 ].Style.Font.Bold = true;

          // Save workbook to disk.
          workbook.SaveAs( "LoadWorkbookWithStream.xlsx" );
          Console.WriteLine( "\tCreated: LoadWorkbookWithStream.xlsx\n" );
        }
      }
    }
```