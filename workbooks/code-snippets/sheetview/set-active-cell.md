# Set Active cell

This example demonstrates how to set active cell when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void SetActiveCell()
    {
      using( var workbook = Workbook.Load( "Sheet.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Set Active and TopLeft Cells";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "B4" ].Value = "Using a TopLeftCell at B1 and an ActiveCell at E20:";
        worksheet.Cells[ "B4" ].Style.Font = new Font() { Bold = true };

        // Set the active cell and top left cell of the 1st worksheet.
        worksheet.SheetView.ActiveCellAddress = "E20";
        worksheet.SheetView.TopLeftCellAddress = "B1";

        // Save workbook to disk.
        workbook.SaveAs( "SetActiveCell.xlsx" );
        Console.WriteLine( "\tCreated: SetActiveCell.xlsx\n" );
      }
    }
```