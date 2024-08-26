# Import collections

This example demonstrates how to import collections when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ImportCollections()
    {
      using( var workbook = Workbook.Create( "ImportCollections.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Import Collections";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "B4" ].Value = "Import a vertical list of strings:";
        worksheet.Cells[ "B4" ].Style.Font.Color = Color.Blue;

        // Define a list of strings, the import options(vertical by default) and call the ImportData function.
        var stringData = new List<string>() { "First", "Second", "Third", "Fourth" };
        var stringImportOptions = new ImportOptions() { DestinationTopLeftAddress = "B5" };
        worksheet.ImportData( stringData, stringImportOptions );


        worksheet.Cells[ "H4" ].Value = "Import a vertical List of Players:";
        worksheet.Cells[ "H4" ].Style.Font.Color = Color.Blue;

        // Define a list of user objects, the import options(vertical by default, specify PropertyNames and show propertyNames) and call the ImportData function.
        var userObjectData = new List<Player>()
        {
          new Player() { Name = "Tom Sawyer", Team = Team.Miami_Ducks, Number = 9 },
          new Player() { Name = "Mike Smith", Team = Team.Chicago_Hornets, Number = 18 },
          new Player() { Name = "Kelly Tomson", Team = Team.LosAngelese_Raiders, Number = 33 },
          new Player() { Name = "John Graham", Team = Team.NewYork_Bucs, Number = 7 },
        };
        var userObjectImportOptions = new UserObjectImportOptions() { DestinationTopLeftAddress = "H5", PropertyNames = new string[] { "Name", "Team" }, IsPropertyNamesShown = true };
        worksheet.ImportData( userObjectData, userObjectImportOptions );


        worksheet.Cells[ 13, 1 ].Value = "Import an horizontal ObservableCollection of int:";
        worksheet.Cells[ 13, 1 ].Style.Font.Color = Color.Blue;

        // Define a list of ints, the import options and call the ImportData function.
        var intData = new List<int>() { 1, 2, 3, 4, 5 };
        var intImportOptions = new ImportOptions() { DestinationRowId = 14, DestinationColumnId = 1, IsLinearDataVertical = false };
        worksheet.ImportData( intData, intImportOptions );


        worksheet.Cells[ "M4" ].Value = "Import a vertical Dictionary of Players:";
        worksheet.Cells[ "M4" ].Style.Font.Color = Color.Blue;

        // Define a Dictionary of Players, the import options and call the ImportData function.
        var dictionaryData = new Dictionary<int, Player>()
        {
          { 1, new Player() { Name = "Tom Sawyer", Team = Team.Miami_Ducks, Number = 9 } },
          { 2, new Player() { Name = "Mike Smith", Team = Team.Chicago_Hornets, Number = 18 } },
          { 3, new Player() { Name = "Kelly Tomson", Team = Team.LosAngelese_Raiders, Number = 33 } },
          { 4, new Player() { Name = "John Graham", Team = Team.NewYork_Bucs, Number = 7 } },
        };
        var dictionaryImportOptions = new UserObjectImportOptions() { DestinationTopLeftAddress = "M5" };
        worksheet.ImportData( dictionaryData, dictionaryImportOptions );

        // AutoFit all columns, starting at row 4 up to row 10 (rowId starts at 0), with column sizes from 0 to 255.
        worksheet.Columns.AutoFit( 0, 255, 4, 10 );

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ImportCollections.xslx\n" );
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