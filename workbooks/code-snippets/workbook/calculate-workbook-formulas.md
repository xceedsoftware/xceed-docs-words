# Calculate Workbook formulas

This example demonstrates how to calculate Workbook formulas when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void CalculateWorkbookFormulas()
    {
      using( var workbook = Workbook.Create( "CalculateWorkbookFormulas.xlsx" ) )
      {
        // Add a second worksheet in workbook.
        workbook.Worksheets.Add();

        var worksheetA = workbook.Worksheets[ 0 ];
        var worksheetB = workbook.Worksheets[ 1 ];

        // Add a title.
        worksheetA.Cells[ "B1" ].Value = "Calculate Workbook Formulas";
        worksheetA.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells values in WorksheetA.
        worksheetA.Cells[ "A5" ].Value = "Employees";
        worksheetA.Cells[ "B5" ].Value = "Salary";
        worksheetA.Cells[ "A6" ].Value = "Mike Jones";
        worksheetA.Cells[ "B6" ].Value = 52000;
        worksheetA.Cells[ "A7" ].Value = "Cathy Smith";
        worksheetA.Cells[ "B7" ].Value = 46000;
        worksheetA.Cells[ "A8" ].Value = "Kevin Malcolm";
        worksheetA.Cells[ "B8" ].Value = 77000;
        worksheetA.Cells[ "A9" ].Value = "Jenny McIntyre";
        worksheetA.Cells[ "B9" ].Value = 61000;
        worksheetA.Cells[ "A10" ].Value = "AVERAGE:";

        // AutoFit first column in WorksheetA.
        worksheetA.Columns["A"].AutoFit();

        // Set Font for 5th and 10th row.
        worksheetA.Rows[ 4 ].Style.Font.Bold = true;
        worksheetA.Rows[ 9 ].Style.Font.Bold = true;

        // Set second column's format in WorksheetA and width.
        worksheetA.Columns[ "B" ].Style.CustomFormat = "$#,###";
        worksheetA.Columns[ "B" ].Width = 12d;

        // Set average employees salary formula in WorksheetA.
        worksheetA.Cells[ "B10" ].Formula = "=AVERAGE(B6:B9)";

        // Fill cells values in WorksheetB.
        worksheetB.Cells[ "A1" ].Value = "Item number";
        worksheetB.Cells[ "B1" ].Value = "Screws required";
        worksheetB.Cells[ "A2" ].Value = "G017";
        worksheetB.Cells[ "B2" ].Value = 22;
        worksheetB.Cells[ "A3" ].Value = "K147";
        worksheetB.Cells[ "B3" ].Value = 32;
        worksheetB.Cells[ "A4" ].Value = "A689";
        worksheetB.Cells[ "B4" ].Value = 12;
        worksheetB.Cells[ "A5" ].Value = "B127";
        worksheetB.Cells[ "B5" ].Value = 16;
        worksheetB.Cells[ "A6" ].Value = "TOTAL:";

        // AutoFit all columns in WorksheetB.
        worksheetB.Columns.AutoFit();

        // Set Font for 1st and 6th row.
        worksheetB.Rows[ 0 ].Style.Font.Bold = true;
        worksheetB.Rows[ 5 ].Style.Font.Bold = true;

        // Set total screws required formula in WorksheetB.
        worksheetB.Cells[ "B6" ].Formula = "=SUM(B2:B5)";

        // Cells with formula do not set their Value property until opened with MS Excel or CalculateFormulas() is called.
        var worksheetA_averageValue = worksheetA.Cells[ "B10" ].Value;
        var worksheetB_sumValue = worksheetB.Cells[ "B6" ].Value;
        Debug.Assert( worksheetA_averageValue == null );
        Debug.Assert( worksheetB_sumValue == null );

        // Calculate formulas for all worksheets.
        workbook.CalculateFormulas();

        // Cells with formula now have their Value property calculated .
        worksheetA_averageValue = worksheetA.Cells[ "B10" ].Value;
        worksheetB_sumValue = worksheetB.Cells[ "B6" ].Value;
        Debug.Assert( worksheetA_averageValue != null );
        Debug.Assert( worksheetB_sumValue != null );

        // Display calculation results in other cells.
        worksheetA.Cells[ "C15" ].Value = "Result of formula calculation for Sheet1 is:  " + worksheetA_averageValue;
        worksheetA.Cells[ "C16" ].Value = "Result of formula calculation for Sheet2 is:  " + worksheetB_sumValue;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: CalculateWorkbookFormulas.xlsx\n" );
      }
    }
```