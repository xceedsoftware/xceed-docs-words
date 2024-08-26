# Set formulas

This example demonstrates how to set formulas when using the API from the Xceed Workbooks for .NET.

```csharp
    private static void CreateFormattedTable( Worksheet worksheet, string startAddress, string endAddress )
    {
      var table = worksheet.Tables.Add( startAddress, endAddress, TableStyle.TableStyleMedium9 );
      table.ShowFirstColumnFormatting = true;
      table.AutoFilter.ShowFilterButton = false;
      table.Columns[ 1 ].Name = "Values";
    }
    
    public static void SetFormulas()
    {
      using( var workbook = Workbook.Load( "CellData.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Set Formulas";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "I4" ].Value = "Stats displayed with Tables:";
        worksheet.Cells[ "I4" ].Style.Font = new Font() { Bold = true };

        // Set stats and formulas for Jane.
        // Formulas will be calculated when opening saved bookmark with MS Excel or by calling worksheet.CalculateFormulas().
        worksheet.Cells[ "I6" ].Value = "Stats for Jane:";
        worksheet.Cells[ "I7" ].Value = "Total(2011):";
        worksheet.Cells[ "J7" ].Formula = "=SUM( G6, G12, G18, G24 )";
        worksheet.Cells[ "I8" ].Value = "Total(2012):";
        worksheet.Cells[ "J8" ].Formula = "=SUM( G19, G22 )";
        worksheet.Cells[ "I9" ].Value = "Total(2013):";
        worksheet.Cells[ "J9" ].Formula = "=SUM( G8, G17, G20, G23, G26 )";
        worksheet.Cells[ "I10" ].Value = "Total:";
        worksheet.Cells[ "J10" ].Formula = "=SUM( J7:J9 )";
        worksheet.Cells[ "I11" ].Value = "Avg:";
        worksheet.Cells[ "J11" ].Formula = "=AVERAGE( J7:J9 )";
        worksheet.Cells[ "I13" ].Value = "Bonus:";
        worksheet.Cells[ "J13" ].Formula = "=AVERAGE( J11 * 15% )";

        // Create a table with the Jane stat cells.
        CellSample.CreateFormattedTable( worksheet, "I6", "J13" );

        // Set stats and formulas for Ashish.
        // Formulas will be calculated when opening saved bookmark with MS Excel or by calling worksheet.CalculateFormulas().
        worksheet.Cells[ "L6" ].Value = "Stats for Ashish:";
        worksheet.Cells[ "L7" ].Value = "Total(2011):";
        worksheet.Cells[ "M7" ].Formula = "=SUM( G15 )";
        worksheet.Cells[ "L8" ].Value = "Total(2012):";
        worksheet.Cells[ "M8" ].Formula = "=SUM( G7, G10, G13, G16 )";
        worksheet.Cells[ "L9" ].Value = "Total(2013):";
        worksheet.Cells[ "M9" ].Formula = "=SUM( 0 )";
        worksheet.Cells[ "L10" ].Value = "Total:";
        worksheet.Cells[ "M10" ].Formula = "=SUM( M7:M9 )";
        worksheet.Cells[ "L11" ].Value = "Avg:";
        worksheet.Cells[ "M11" ].Formula = "=AVERAGE( M7:M9 )";
        worksheet.Cells[ "L13" ].Value = "Bonus:";
        worksheet.Cells[ "M13" ].Formula = "=AVERAGE( M11 * 15% )";

        // Create a table with the Ashish stat cells.
        CellSample.CreateFormattedTable( worksheet, "L6", "M13" );

        // Set stats and formulas for John.
        // Formulas will be calculated when opening saved bookmark with MS Excel or by calling worksheet.CalculateFormulas().
        worksheet.Cells[ "O6" ].Value = "Stats for John:";
        worksheet.Cells[ "O7" ].Value = "Total(2011):";
        worksheet.Cells[ "P7" ].Formula = "=SUM( G9, G21 )";
        worksheet.Cells[ "O8" ].Value = "Total(2012):";
        worksheet.Cells[ "P8" ].Formula = "=SUM( G25 )";
        worksheet.Cells[ "O9" ].Value = "Total(2013):";
        worksheet.Cells[ "P9" ].Formula = "=SUM( G11, G14 )";
        worksheet.Cells[ "O10" ].Value = "Total:";
        worksheet.Cells[ "P10" ].Formula = "=SUM( P7:P9 )";
        worksheet.Cells[ "O11" ].Value = "Avg:";
        worksheet.Cells[ "P11" ].Formula = "=AVERAGE( P7:P9 )";
        worksheet.Cells[ "O13" ].Value = "Bonus:";
        worksheet.Cells[ "P13" ].Formula = "=AVERAGE( P11 * 15% )";

        // Create a table with the John stat cells.
        CellSample.CreateFormattedTable( worksheet, "O6", "P13" );

        // Set Formatting for columns.
        worksheet.Columns[ "J" ].Style.CustomFormat = "$#,##0";
        worksheet.Columns[ "M" ].Style.CustomFormat = "$#,##0";
        worksheet.Columns[ "P" ].Style.CustomFormat = "$#,##0";

        // This call will calculate all the formulas of the current worksheet and set the corresponding Cell.Value.
        // It should only be called if the result of calculation is needed before saving the workbook.
        // All formulas will be automatically calculated when opening a workbook with MS Excel.
        // Here we use it because we need the cell.Value's width to autoFit the columns.
        worksheet.CalculateFormulas();

        // AutoFit the columns "I" to "P", from 6th and going down, and make sure the column's widths are between 0 and 255.
        worksheet.Columns[ "I","P" ].AutoFit( 0, 255, 5);

        // Save workbook to disk.
        workbook.SaveAs( CellSample.CellSampleOutputDirectory + @"SetFormulas.xlsx" );
        Console.WriteLine( "\tCreated: SetFormulas.xlsx\n" );
      }
    }
```