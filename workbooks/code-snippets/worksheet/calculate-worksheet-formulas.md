# Calculate Worksheet formulas

This example demonstrates how to calculate Worksheet formulas when using the API from the Xceed Workbooks for .NET.

```csharp 
        public static void CalculateWorksheetFormulas()
    {
      using( var workbook = Workbook.Create( "CalculateWorksheetFormulas.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Calculate Worksheet Formulas";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells values in WorksheetA.
        worksheet.Cells[ "A5" ].Value = "Employees";
        worksheet.Cells[ "B5" ].Value = "Salary";
        worksheet.Cells[ "A6" ].Value = "Mike Jones";
        worksheet.Cells[ "B6" ].Value = 52000;
        worksheet.Cells[ "A7" ].Value = "Cathy Smith";
        worksheet.Cells[ "B7" ].Value = 46000;
        worksheet.Cells[ "A8" ].Value = "Kevin Malcolm";
        worksheet.Cells[ "B8" ].Value = 77000;
        worksheet.Cells[ "A9" ].Value = "Jenny McIntyre";
        worksheet.Cells[ "B9" ].Value = 61000;
        worksheet.Cells[ "A10" ].Value = "AVERAGE:";

        // AutoFit first column in WorksheetA.
        worksheet.Columns[ "A" ].AutoFit();

        // Set second column's format in WorksheetA.
        worksheet.Columns[ "B" ].Style.CustomFormat = "$#,###";

        // Set rows styles for 5th and 10th rows.
        worksheet.Rows[ 4 ].Style.Font.Bold = true;
        worksheet.Rows[ 9 ].Style.Font.Bold = true;

        // Set average employees salary formula in Worksheet.
        worksheet.Cells[ "B10" ].Formula = "=AVERAGE(B6:B9)";

        // Cells with formula do not set their Value property until opened with MS Excel or CalculateFormulas() is called.
        var worksheet_averageValue = worksheet.Cells[ "B10" ].Value;
        Debug.Assert( worksheet_averageValue == null );

        // Calculate formulas for this worksheet.
        worksheet.CalculateFormulas();

        // Cells with formula now have a calculated value.
        worksheet_averageValue = worksheet.Cells[ "B10" ].Value;
        Debug.Assert( worksheet_averageValue != null );

        // Display calculation results in other cells.
        worksheet.Cells[ "C15" ].Value = "Result of formula calculation for Sheet1 in B10 is:  " + worksheet_averageValue;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: CalculateWorksheetFormulas.xlsx\n" );
      }
    }

```