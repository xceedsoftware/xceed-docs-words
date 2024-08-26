# Modify Theme

This example demonstrates how to modify theme when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ModifyTheme()
    {
      using( var workbook = Workbook.Create( "ModifyTheme.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var cellWorksheet = workbook.Worksheets[ 0 ];

        // Modify Workbook theme name and colors.
        workbook.Theme.Name = "My Theme";
        workbook.Theme.Colors[ ThemeColorType.Accent1 ].Color = Color.Red;
        workbook.Theme.Colors[ ThemeColorType.Text1 ].Color = Color.Green;

        // Add a title using the new Theme default Text1 color.
        cellWorksheet.Cells[ "B1" ].Value = "Modify theme";
        cellWorksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        cellWorksheet.Cells[ "C5" ].Value = "Using new Accent1 color";
        cellWorksheet.Cells[ "C5" ].Style.Font = new Font() { ThemeColor = new ThemeColor( ThemeColorType.Accent1 ) };

        cellWorksheet.Cells[ "C7" ].Value = "Using darker Accent1 color";
        cellWorksheet.Cells[ "C7" ].Style.Font = new Font() { ThemeColor = new ThemeColor( ThemeColorType.Accent1, -0.75d ) };

        cellWorksheet.Cells[ "C9" ].Value = "Using lighter Accent1 color";
        cellWorksheet.Cells[ "C9" ].Style.Font = new Font() { ThemeColor = new ThemeColor( ThemeColorType.Accent1, 0.5d ) };

        // AutoFit column "C".
        cellWorksheet.Columns[ "C" ].AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ModifyTheme.xlsx\n" );
      }
    }
```