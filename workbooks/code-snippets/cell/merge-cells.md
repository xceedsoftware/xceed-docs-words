# Merge cells

This example demonstrates how to merge cells when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void MergeCells()
    {
      using( var workbook = Workbook.Create( "MergeCells.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells["B1"].Value = "Merge and unmerge cells";
        worksheet.Cells["B1"].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Merging only keep starting element informations.
        worksheet.Cells["B3"].Value = "Centered merge using cells addresses";
        worksheet.Cells["B3"].Style.Font = new Font() { Underline = true, Size = 12.5d };
        worksheet.Cells["B4"].Value = "Some centered text.";
        worksheet.MergedCells.Add("B4", "C5");

        worksheet.Cells[6, 1].Value = "Centered merge using IDs";
        worksheet.Cells[6, 1].Style.Font = new Font() { Underline = true, Size = 12.5d };
        worksheet.Cells[7, 1].Value = "Some other text.";
        worksheet.MergedCells.Add(7, 1, 8, 2);

        //Centered using a cell range
        worksheet.Cells[10, 1].Value = "Centered merge using a cell range.";
        worksheet.Cells[10, 1].Style.Font = new Font() { Underline = true, Size = 12.5d };
        worksheet.Cells[11, 1].Value = "Another text.";
        worksheet.Cells[11, 1, 12, 2].MergeCells();

        //Uncentered across using cell range
        worksheet.Cells[14, 1].Value = "Uncentered across merge using a cell range.";
        worksheet.Cells[14, 1].Style.Font = new Font() { Underline = true, Size = 12.5d };
        worksheet.Cells[15, 1].Value = "Here is a text in across merge.";
        worksheet.Cells[16, 1].Value = "Here is another text in across merge.";
        worksheet.Cells[15, 1, 16, 4].MergeCells( false, true ) ;

        //Remove using cell range
        var cellRange = worksheet.Cells[17, 1, 18, 2];
        cellRange.MergeCells();
        cellRange.UnmergeCells();

        //Remove using the MergedCellCollection
        cellRange.MergeCells();
        worksheet.MergedCells.RemoveAt(5);

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: MergeCells.xlsx\n" );
      }
    }
```