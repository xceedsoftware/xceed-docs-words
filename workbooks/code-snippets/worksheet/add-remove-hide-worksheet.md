# Add, Remove, Hide Worksheets

This example demonstrates how to add, remove or hide worksheets when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void AddWorksheets()
    {
      using( var workbook = Workbook.Create( "AddWorksheets.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add Worksheets";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells in 1st worksheet.
        worksheet.Cells[ "D5" ].Value = "This is the first Worksheet.";

        // Add a worksheet with default "SheetX" name.
        workbook.Worksheets.Add();

        // Fill cells in 2nd worksheet.
        workbook.Worksheets[ 1 ].Cells[ "D5" ].Value = "This is the second Worksheet.";

        // Add a worksheet with name "Third Sheet".
        workbook.Worksheets.Add( "Third Sheet" );

        // Fill cells in 3rd worksheet.
        workbook.Worksheets[ "Third Sheet" ].Cells[ "D5" ].Value = "This is the third Worksheet.";

        // We now have 3 Worksheets in the Workbook.
        Debug.Assert( workbook.Worksheets.Count == 3 );
        Debug.Assert( workbook.Worksheets.Contains( "Third Sheet" ) );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: AddWorksheets.xlsx\n" );
      }
    }

    public static void RemoveWorksheets()
    {
      using( var workbook = Workbook.Create( "RemoveWorksheets.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Remove Worksheets";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells in 1st worksheet.
        worksheet.Cells[ "D5" ].Value = "This is the first Worksheet.";

        // Add a worksheet with default "Sheet2" name.
        workbook.Worksheets.Add();

        // Fill cells in 2nd worksheet.
        workbook.Worksheets[ 1 ].Cells[ "D5" ].Value = "This is the second Worksheet.";

        // Add a worksheet with name "Third Sheet".
        workbook.Worksheets.Add( "Third Sheet" );

        // Fill cells in 3rd worksheet.
        workbook.Worksheets[ "Third Sheet" ].Cells[ "D5" ].Value = "This is the third Worksheet.";

        // Add a worksheet with default "Sheet4" name.
        workbook.Worksheets.Add();

        // Fill cells in 4th worksheet.
        workbook.Worksheets[ 3 ].Cells[ "D5" ].Value = "This is the fourth Worksheet.";

        // We now have 4 Worksheets in the Workbook.
        Debug.Assert( workbook.Worksheets.Count == 4 );

        // Remove all worksheets from worksheet id = 1 to worksheet id = 2.
        workbook.Worksheets.Remove( workbook.Worksheets[ 1, 2 ] );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: RemoveWorksheets.xlsx\n" );
      }
    }

    public static void HideWorksheets()
    {
      using( var workbook = Workbook.Create( "HideWorksheets.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Hide Worksheets";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Fill cells in 1st worksheet.
        worksheet.Cells[ "D5" ].Value = "This is the First Worksheet.";

        // Add 3 worksheets and fill them.
        workbook.Worksheets.Add();
        workbook.Worksheets[ 1 ].Cells[ "D5" ].Value = "This is the Second Worksheet.";
        workbook.Worksheets.Add();
        workbook.Worksheets[ 2 ].Cells[ "D5" ].Value = "This is the Third Worksheet.";
        workbook.Worksheets.Add();
        workbook.Worksheets[ 3 ].Cells[ "D5" ].Value = "This is the Fourth Worksheet.";
        workbook.Worksheets.Add();
        workbook.Worksheets[ 4 ].Cells[ "D5" ].Value = "This is the Fifth Worksheet.";

        // We now have 4 Worksheets in the Workbook.
        Debug.Assert( workbook.Worksheets.Count == 5 );

        // Hide the 2nd worksheet. It can be unhided through MS Excel UI.
        workbook.Worksheets[ 1 ].Visibility = WorksheetVisibility.Hidden;

        // Hide the 3rd and 4th worksheets. They can NOT be unhided through MS Excel UI.
        workbook.Worksheets[ 2, 3 ].Visibility = WorksheetVisibility.Collapsed;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: HideWorksheets.xlsx\n" );
      }
    }
```