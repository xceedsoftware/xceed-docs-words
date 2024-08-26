# Customize columns

This example demonstrates how to customize columns when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void CustomizeColumns()
    {
      using( var workbook = Workbook.Create( "CustomizeColumns.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Customize Columns";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill Cells and width of columns.  
        worksheet.Cells[ "C5" ].Value = "This column has a width of 45";
        worksheet.Columns[ 2 ].Width = 45d;

        worksheet.Cells[ "D6" ].Value = "This column has an autoFit.";
        worksheet.Columns[ "D" ].AutoFit();

        worksheet.Columns[ 5 ].Cells[ 8 ].Value = "This column has a width of 30";
        worksheet.Columns[ 5 ].Width = 30d;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: CustomizeColumns.xlsx\n" );
      }
    }
```