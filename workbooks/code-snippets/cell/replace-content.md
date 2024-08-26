# Replace content

This example demonstrates how to replace content when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void ReplaceContent()
    {
      using( var workbook = Workbook.Load( "CellData.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Replace cell's content";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d }; 

        // Replace all occurences of string "Jane" with "Michael".
        worksheet.ReplaceContent( "Jane", "Michael" );

        // Add formatted texts in cell "I6".
        var formattedTexts = new FormattedTextList()
        {
          new FormattedText( "* Name ", new Font() { Size = 13 } ),
          new FormattedText( "Jane", new Font() { Color = System.Drawing.Color.Red, Bold = true, Size = 13 } ),
          new FormattedText( " has been replaced with ", new Font() { Size = 13 } ),
          new FormattedText( "Michael", new Font() { Color = System.Drawing.Color.Green, Bold = true, Size = 13 } )
        };
        worksheet.Cells[ "I6" ].Value = formattedTexts;

        //Save the workbook
        workbook.SaveAs( "ReplaceContent.xlsx" );
        Console.WriteLine( "\tCreated: ReplaceContent.xlsx\n" );
      }
    }
```