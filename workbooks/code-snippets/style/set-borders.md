# Set borders

This example demonstrates how to set borders when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void SetBorders()
    {
      using( var workbook = Workbook.Create( "SetBorders.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var cellWorksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        cellWorksheet.Cells[ "B1" ].Value = "Set Borders";
        cellWorksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Set cell content and Border styles.
        cellWorksheet.Cells[ "C5" ].Value = "Bottom";
        cellWorksheet.Cells[ "C5" ].Style.Borders[ BorderType.Bottom ].Style = LineStyle.Double;
        cellWorksheet.Cells[ "C5" ].Style.Borders[ BorderType.Bottom ].Color = Color.Red;

        cellWorksheet.Cells[ "C8" ].Value = "Top";
        cellWorksheet.Cells[ "C8" ].Style.Borders[ BorderType.Top ].Style = LineStyle.DashDot;

        cellWorksheet.Cells[ "C11" ].Value = "Right";
        cellWorksheet.Cells[ "C11" ].Style.Borders[ BorderType.Right ] = new Border() { Style = LineStyle.MediumDashed, Color = Color.Green };

        cellWorksheet.Cells[ "C14" ].Value = "Left";
        cellWorksheet.Cells[ "C14" ].Style.Borders[ BorderType.Left ] = new Border() { Style = LineStyle.DashDotDot, Color = Color.DarkSlateBlue };

        cellWorksheet.Cells[ "C17" ].Value = "Theme Bottom";
        cellWorksheet.Cells[ "C17" ].Style.Borders[ BorderType.Bottom ] = new Border() { Style = LineStyle.MediumDashDot, ThemeColor = new ThemeColor( ThemeColorType.Accent6 ) };

        cellWorksheet.Cells[ "F5" ].Value = "Diagonal Down";
        cellWorksheet.Cells[ "F5" ].Style.Borders[ BorderType.DiagonalDown ] = new Border() { Style = LineStyle.Dotted, Color = Color.DarkGoldenrod };

        cellWorksheet.Cells[ "F8" ].Value = "Diagonal Up";
        cellWorksheet.Cells[ "F8" ].Style.Borders[ BorderType.DiagonalUp ].Style = LineStyle.SlantDashDot;
        cellWorksheet.Cells[ "F8" ].Style.Borders[ BorderType.DiagonalUp ].Color = Color.DarkCyan;

        cellWorksheet.Cells[ "F11" ].Value = "Outside";
        cellWorksheet.Cells[ "F11" ].Style.Borders.SetOutline( LineStyle.Thick, Color.Blue );

        cellWorksheet.Cells[ "F14" ].Value = "Diagonals";
        cellWorksheet.Cells[ "F14" ].Style.Borders.SetDiagonals( LineStyle.Hair, Color.DeepPink );

        cellWorksheet.Cells[ "F17" ].Value = "Theme Outside";
        cellWorksheet.Cells[ "F17" ].Style.Borders.SetThemeOutline( LineStyle.Medium, new ThemeColor( ThemeColorType.Accent2 ) );

        // AutoFit column "C" and "F".
        cellWorksheet.Columns[ "C" ].AutoFit();
        cellWorksheet.Columns[ "F" ].AutoFit();


        // Add a second worksheet for rows.
        var rowWorksheet = workbook.Worksheets.Add( "Rows" );

        // Set row content and borders.
        rowWorksheet.Cells[ 5, 3 ].Value = "Setting row border";
        rowWorksheet.Cells[ 5, 11 ].Value = "Another content";
        rowWorksheet.Rows[ 5 ].Style.Borders.SetOutline( LineStyle.Thick, Color.Green );

        rowWorksheet.Cells[ 8, 4 ].Value = "Setting another row border";
        rowWorksheet.Cells[ 8, 12 ].Value = "Another content";
        rowWorksheet.Rows[ 8 ].Style.Borders[ BorderType.Bottom ].Style = LineStyle.Double;


        // Add a third worksheet for column.
        var columnWorksheet = workbook.Worksheets.Add( "Columns" );

        // Set column content and borders.
        columnWorksheet.Cells[ 5, 5 ].Value = "Setting column border";
        columnWorksheet.Cells[ 11, 5 ].Value = "Another content";
        columnWorksheet.Columns[ 5 ].Style.Borders.SetOutline( LineStyle.MediumDashDot, Color.DarkOrange );

        columnWorksheet.Cells[ 8, 8 ].Value = "Setting another column border";
        columnWorksheet.Cells[ 11, 8 ].Value = "Another content";
        columnWorksheet.Columns[ 8 ].Style.Borders[ BorderType.DiagonalDown ].Style = LineStyle.Medium;
        columnWorksheet.Columns[ 8 ].Style.Borders[ BorderType.DiagonalDown ].Color = Color.Red;

        // AutoFit all columns with content.
        columnWorksheet.Columns.AutoFit();

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: SetBorders.xlsx\n" );
      }
    }
```