# Set alignments

This example demonstrates how to set alignments when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void SetAlignments()
    {
      using( var workbook = Workbook.Create( "SetAlignments.xlsx" ) )
      {
        // Get first worksheet and change its name.
        var cellWorksheet = workbook.Worksheets[ 0 ];
        cellWorksheet.Name = "Cells";

        // Add a title.
        cellWorksheet.Cells[ "B1" ].Value = "Set Alignments";
        cellWorksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        AlignCellsHorizontally( cellWorksheet );
        AlignCellsVertically( cellWorksheet );
        WrapTextInCell( cellWorksheet );

        // Set the width of columns.        
        cellWorksheet.Columns[ 1 ].Width = 20d;
        cellWorksheet.Columns[ 2 ].Width = 25d;
        cellWorksheet.Columns[ 3 ].Width = 25d;
        cellWorksheet.Columns[ 4 ].Width = 25d;
        cellWorksheet.Columns[ 5 ].Width = 25d;
        cellWorksheet.Columns[ 6 ].Width = 25d;
        cellWorksheet.Columns[ 7 ].Width = 13.3d;
        cellWorksheet.Columns[ 8 ].Width = 13.3d;


        // Add a second worksheet for rows.
        var rowWorksheet = workbook.Worksheets.Add( "Rows" );

        // Set the height of 6th row.        
        rowWorksheet.Rows[ 5 ].Height = 50d;

        // Set row content and alignment.
        rowWorksheet.Cells[ 5, 3 ].Value = "Setting row vertical alignment to center";
        rowWorksheet.Cells[ 5, 11 ].Value = "Another content";
        rowWorksheet.Rows[ 5 ].Style.Alignment.Vertical = VerticalAlignment.Center;


        // Add a third worksheet for column.
        var columnWorksheet = workbook.Worksheets.Add( "Columns" );

        // Set the width of 6th column.        
        columnWorksheet.Columns[ 5 ].Width = 60d;

        // Set column content and alignment.
        columnWorksheet.Cells[ 5, 5 ].Value = "Setting column horizontal alignment to center";
        columnWorksheet.Cells[ 11, 5 ].Value = "Another content";
        columnWorksheet.Columns[ 5 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: SetAlignments.xlsx\n" );
      }
    }

    private static void AlignCellsHorizontally( Worksheet worksheet )
    {
      // Set cells content.
      worksheet.Cells[ 2, 0 ].Value = "Horizontal Alignments:";
      worksheet.Cells[ 2, 0 ].Style.Font = new Font() { Bold = true };
      worksheet.Cells[ 3, 1 ].Value = "General";
      worksheet.Cells[ 3, 2 ].Value = "Left";
      worksheet.Cells[ 3, 3 ].Value = "Center";
      worksheet.Cells[ 3, 4 ].Value = "Right";
      worksheet.Cells[ 3, 5 ].Value = "Fill";
      worksheet.Cells[ 3, 6 ].Value = "Center Across Selection";
      worksheet.Cells[ 3, 7 ].Value = "Justify";
      worksheet.Cells[ 3, 8 ].Value = "Distributed";

      // Set values for different types in cells. Indexing starts at 0 for rows and columns.
      worksheet.Cells[ 3, 0 ].Value = "Types";
      worksheet.Cells[ 4, 0 ].Value = "for number:";
      worksheet.Cells[ 5, 0 ].Value = "for date:";
      worksheet.Cells[ 6, 0 ].Value = "for time:";
      worksheet.Cells[ 7, 0 ].Value = "for boolean:";
      worksheet.Cells[ 8, 0 ].Value = "for text:";
      for( int i = 1; i <= 8; ++i )
      {
        worksheet.Cells[ 4, i ].Value = 225;
        worksheet.Cells[ 5, i ].Value = new DateTime( 2021, 8, 31 );
        worksheet.Cells[ 6, i ].Value = new TimeSpan( 10, 25, 0 );
        worksheet.Cells[ 7, i ].Value = true;
        worksheet.Cells[ 8, i ].Value = ( i <= 6 ) ? "A text" : "A long text showing how justification and distribution is used in a single cell.";
      }

      // Align the texts horizontally in the cells.
      for( int i = 4; i <= 8; ++i )
      {
        worksheet.Cells[ i, 1 ].Style.Alignment.Horizontal = HorizontalAlignment.General;
        worksheet.Cells[ i, 2 ].Style.Alignment.Horizontal = HorizontalAlignment.Left;
        worksheet.Cells[ i, 3 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;
        worksheet.Cells[ i, 4 ].Style.Alignment.Horizontal = HorizontalAlignment.Right;
        worksheet.Cells[ i, 5 ].Style.Alignment.Horizontal = HorizontalAlignment.Fill;
        worksheet.Cells[ i, 6 ].Style.Alignment.Horizontal = HorizontalAlignment.CenterAcrossSelection;
        worksheet.Cells[ i, 7 ].Style.Alignment.Horizontal = HorizontalAlignment.Justify;
        worksheet.Cells[ i, 8 ].Style.Alignment.Horizontal = HorizontalAlignment.Distributed;
      }

      // Align center all cells from 4th row.
      worksheet.Rows[ 3 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

      // AutoFit the first column, from 4th row to 9th row, and make sure the column's width are between 0 and 255.
      worksheet.Columns[ 0 ].AutoFit( 0, 255, 3, 8 );

      // Create a table with the preceding cells.
      CreateFormattedTable( worksheet, 3, 0, 8, 8 );
    }

    private static void AlignCellsVertically( Worksheet worksheet )
    {
      // Set cells content.
      worksheet.Cells[ 11, 0 ].Value = "Vertical Alignments:";
      worksheet.Cells[ 11, 0 ].Style.Font = new Font() { Bold = true };
      worksheet.Cells[ 12, 1 ].Value = "Bottom";
      worksheet.Cells[ 12, 2 ].Value = "Center";
      worksheet.Cells[ 12, 3 ].Value = "Top";
      worksheet.Cells[ 12, 4 ].Value = "Justify";
      worksheet.Cells[ 12, 5 ].Value = "Distributed";

      // Set values for cells. Indexing starts at 0 for rows and columns.
      worksheet.Cells[ 12, 0 ].Value = "Types";
      worksheet.Cells[ 13, 0 ].Value = "for all types:";
      for( int i = 1; i <= 5; ++i )
      {
        worksheet.Cells[ 13, i ].Value = ( i <= 3 ) ? "A text" : "A long text showing how justification and distribution is used in a single cell.";
      }

      // Sets the height of row 14.
      worksheet.Rows[ 13 ].Height = 100;

      // Align the texts vertically in the cells.
      worksheet.Cells[ 13, 1 ].Style.Alignment.Vertical = VerticalAlignment.Bottom;
      worksheet.Cells[ 13, 2 ].Style.Alignment.Vertical = VerticalAlignment.Center;
      worksheet.Cells[ 13, 3 ].Style.Alignment.Vertical = VerticalAlignment.Top;
      worksheet.Cells[ 13, 4 ].Style.Alignment.Vertical = VerticalAlignment.Justify;
      worksheet.Cells[ 13, 5 ].Style.Alignment.Vertical = VerticalAlignment.Distributed;

      // Align center all cells from row 13.
      worksheet.Rows[ 12 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;

      // Create a table with the preceding cells.
      CreateFormattedTable( worksheet, 12, 0, 13, 5 );
    }

    private static void WrapTextInCell( Worksheet worksheet )
    {
      // Set cells content.
      worksheet.Cells[ 16, 0 ].Value = "Wrap Text in Cell:";
      worksheet.Cells[ 16, 0 ].Style.Font = new Font() { Bold = true };
      worksheet.Cells[ 17, 1 ].Value = "This is a long text wrapping in cell B18.";
      worksheet.Cells[ 17, 3 ].Value = "This is a long text NOT wrapping in cell D18.";

      // Set Text Wrapping for the cell (17,1). Indexing starts at (0,0).
      worksheet.Cells[ 17, 1 ].Style.Alignment.IsTextWrapped = true;

      // Create a border and Background color around the preceding cells : (17, 0) to (17, 4).
      worksheet.Cells[ 17, 0, 17, 4 ].Style.Borders.SetOutline( LineStyle.Medium, Color.Black );
      worksheet.Cells[ 17, 0, 17, 4 ].Style.Fill.BackgroundColor = Color.LightBlue;
    }

    private static void CreateFormattedTable( Worksheet worksheet, int startRowId, int startColumnId, int endRowId, int endColumnId )
    {
      var table = worksheet.Tables.Add( startRowId, startColumnId, endRowId, endColumnId, TableStyle.TableStyleMedium9 );
      table.ShowFirstColumnFormatting = true;
      table.AutoFilter.ShowFilterButton = false;
    }

```