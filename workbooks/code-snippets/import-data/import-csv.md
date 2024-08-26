# Import CSV

This example demonstrates how to import csv when using the API from the Xceed Workbooks for .NET.

```csharp 
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

    public static void ImportCSV()
    {
      using( var workbook = Workbook.Create( "ImportCSV.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Import CSV";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "B4" ].Value = "Import a CSV from a string:";
        worksheet.Cells[ "B4" ].Style.Font.Color = Color.Blue;

        // Define a path to a csv document, the import options(which separator to use) and call the ImportData function.
        var stringSCVData = ImportDataSample.ImportDataSampleResourcesDirectory + @"Book1.csv";
        var stringCSVImportOptions = new CSVImportOptions() { DestinationTopLeftAddress = "C5", Separator = "," };
        worksheet.ImportData( stringSCVData, stringCSVImportOptions );


        worksheet.Cells[ "B11" ].Value = "Import a CSV from a stream:";
        worksheet.Cells[ "B11" ].Style.Font.Color = Color.Blue;

        // Define a stream from a csv document, the import options(which separator to use) and call the ImportData function.
        var streamCSVData = new MemoryStream();
        var file = new FileStream( ImportDataSample.ImportDataSampleResourcesDirectory + @"Book1.csv", FileMode.Open, FileAccess.Read );
        var bytes = new byte[ file.Length ];
        file.Read( bytes, 0, ( int )file.Length );
        streamCSVData.Write( bytes, 0, ( int )file.Length );

        var streamCSVImportOptions = new CSVImportOptions() { DestinationTopLeftAddress = "C12", Separator = "," };
        worksheet.ImportData( stringSCVData, streamCSVImportOptions );

        // Center data in columns 2 to 10 (columnId starts at 0).
        worksheet.Columns[ 2, 10 ].Style.Alignment.Horizontal = HorizontalAlignment.Center;
      
        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ImportCSV.xslx\n" );
      }
    }
```