# Customize Rows

This example demonstrates how to customize rows when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void CustomizeRows()
    {
      using( var workbook = Workbook.Create( "CustomizeRows.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];    

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Customize Rows";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill Cells and row Heights.
        worksheet.Rows[ 5 ].Cells[ 3 ].Value = "This row has a height of 30";
        worksheet.Rows[ 5 ].Height = 30d;

        worksheet.Cells[ "B11" ].Value = "This row has a height of 45";
        worksheet.Rows[ 10 ].Height = 45d;

        worksheet.Cells[ "C15" ].Value = "This row has an auto height";
        worksheet.Cells[ "C15" ].Style.Font.Size = 48d;
        worksheet.Rows[ 14 ].AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: CustomizeRows.xlsx\n" );
      }
    }
```