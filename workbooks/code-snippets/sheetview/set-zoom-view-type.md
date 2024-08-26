# Set Zoom and view type

This example demonstrates how to set zoom and view type when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void SetZoomAndViewType()
    {
      using( var workbook = Workbook.Load( "Sheet.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Set Zoom and ViewType";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Modify the Normal View scale zoom to 82%.
        worksheet.SheetView.ZoomScale = 82;

        // Modify the PageLayout View scale zoom to 166% and set the SheetView type to PageLayout.
        worksheet.SheetView.ZoomScalePageLayout = 166;
        worksheet.SheetView.ViewType = WorksheetViewType.PageLayout;

        // Save workbook to disk.
        workbook.SaveAs( "SetZoomAndViewType.xlsx" );
        Console.WriteLine( "\tCreated: SetZoomAndViewType.xlsx\n" );
      }
    }
```