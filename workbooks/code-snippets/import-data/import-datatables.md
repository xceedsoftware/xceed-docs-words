# Import datatables

This example demonstrates how to import datatables when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ImportDataTables()
    {
      using( var workbook = Workbook.Create( "ImportDataTables.xlsx" ) )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Import DataTables";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        worksheet.Cells[ "B4" ].Value = "Import a DataTable and style it:";
        worksheet.Cells[ "B4" ].Style.Font.Color = Color.Blue;

        // Define a dataTable, the import options(show specific ColumnNames) and call the ImportData function.
        var dataTable = new DataTable( "Employees" );
        dataTable.Columns.Add( "Name", typeof( string ) );
        dataTable.Columns.Add( "Position", typeof( string ) );
        dataTable.Columns.Add( "Experience", typeof( double ) );
        dataTable.Columns.Add( "Salary", typeof( int ) );
        dataTable.Rows.Add( "Jenny Melchuck", "Project Manager", 11.5d, 77000 );
        dataTable.Rows.Add( "Cindy Gartner", "Medical Assistant", 1.3d, 56000 );
        dataTable.Rows.Add( "Carl Jones", "Web Designer", 4d, 66000 );
        dataTable.Rows.Add( "Anna Karlweiss", "Account Executive", 7.8d, 51000 );
        dataTable.Rows.Add( "Julia Robertson", "Marketing Coordinator", 17.6d, 65000 );
        var dataTableImportOptions = new DataTableImportOptions() { DestinationTopLeftAddress = "B5", ColumnNames = new string[] { "Name", "Experience", "Position" }, IsColumnNamesShown = true };
        worksheet.ImportData( dataTable, dataTableImportOptions );

        // AutoFit all columns, starting at row 4 up to row 10 (rowId starts at 0), with column sizes from 0 to 255.
        worksheet.Columns.AutoFit( 0, 255, 4, 10 );

        // Center data in column C.
        worksheet.Columns[ "C" ].Style.Alignment.Horizontal = HorizontalAlignment.Center;
        // Bold DataTable's ColumnNames.
        worksheet.Rows[ 4 ].Style.Font.Bold = true;
        // Create a Table with the DataTable.
        var table = worksheet.Tables.Add( "B5", "D10" );
        table.AutoFilter.ShowFilterButton = false;

        // Save workbook to disk.
        workbook.Save();
        Console.WriteLine( "\tCreated: ImportDataTables.xslx\n" );
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