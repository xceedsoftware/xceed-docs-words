# Import arrays

This example demonstrates how to import arrays when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ImportArrays()
    {
      using( var workbook = Workbook.Create( "ImportArrays.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Import Arrays";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "B4" ].Value = "Import a vertical array of strings:";
        worksheet.Cells[ "B4" ].Style.Font.Color = Color.Blue;

        // Define a string array, the import options(vertical by default) and call the ImportData function.
        var stringData = new string[] { "First", "Second", "Third", "Fourth" };
        var stringImportOptions = new ImportOptions() { DestinationTopLeftAddress = "B5" };
        worksheet.ImportData( stringData, stringImportOptions );


        worksheet.Cells[ "G4" ].Value = "Import an horizontal array of DateTimes:";
        worksheet.Cells[ "G4" ].Style.Font.Color = Color.Blue;

        // Define a DateTime array, the import options and call the ImportData function.
        var dateTimeData = new DateTime[] { new DateTime( 2022, 10, 10 ), new DateTime( 2020, 1, 15 ), new DateTime( 2021, 10, 11 ) };
        var dateTimeImportOptions = new ImportOptions() { DestinationRowId = 4, DestinationColumnId = 6, IsLinearDataVertical = false };
        worksheet.ImportData( dateTimeData, dateTimeImportOptions );


        worksheet.Cells[ "B14" ].Value = "Import a vertical array of Players:";
        worksheet.Cells[ "B14" ].Style.Font.Color = Color.Blue;

        // Define a user object array, the import options(vertical by default, show propertyNames) and call the ImportData function.
        var userObjectData = new Player[] 
        { 
          new Player() { Name = "Tom Sawyer", Team = Team.Miami_Ducks, Number = 9 },
          new Player() { Name = "Mike Smith", Team = Team.Chicago_Hornets, Number = 18 },
          new Player() { Name = "Kelly Tomson", Team = Team.LosAngelese_Raiders, Number = 33 },
          new Player() { Name = "John Graham", Team = Team.NewYork_Bucs, Number = 7 },
        };
        var userObjectImportOptions = new UserObjectImportOptions() { DestinationTopLeftAddress = "B15", IsPropertyNamesShown = true };
        worksheet.ImportData( userObjectData, userObjectImportOptions );


        worksheet.Cells[ "G14" ].Value = "Import a 2D array of doubles:";
        worksheet.Cells[ "G14" ].Style.Font.Color = Color.Blue;

        // Define a 2D array of doubles, the import options(vertical by default, show propertyNames) and call the ImportData function.
        var twoDData = new double[,] { { 11d, 22d, 33d, 44d }, { 55d, 66d, 77d, 88d }, { 99d, 100d, 101d, 102d } };
        var twoDImportOptions = new ImportOptions() { DestinationTopLeftAddress = "G15"};
        worksheet.ImportData( twoDData, twoDImportOptions );

        // AutoFit columns 1 to 3(columnId starts at 0), starting at row 14 up to row 19 (rowId starts at 0), with column sizes from 0 to 255.
        worksheet.Columns[ 1, 3 ].AutoFit( 0, 255, 14, 19 );

        // AutoFit columns G to I, starting at row 4 up to row 5 (rowId starts at 0), with column sizes from 0 to 255.
        worksheet.Columns[ "G", "I" ].AutoFit( 0, 255, 4, 5 );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ImportArrays.xslx\n" );
      }
    }

    private enum Team
    {
      Chicago_Hornets,
      Miami_Ducks,
      NewYork_Bucs,
      LosAngelese_Raiders
    }   

    private class Player
    {
      public string Name { get; set; }

      public int Number { get; set; }

      public Team Team { get; set; }
    }
```