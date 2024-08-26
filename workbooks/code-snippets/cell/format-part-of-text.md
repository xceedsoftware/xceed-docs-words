# Format part of text

This example demonstrates how to set format to part of text when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void FormatPartOfText()
    {
      using( var workbook = Workbook.Create( "FormatPartOfText.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        FormattedText formattedText = new FormattedText( "Reformat a part of an existing text", new Font() { Bold = true, Size = 15.5d } );
        worksheet.Cells[ "B1" ].Value = formattedText ;

        // Create multiple text with different font
        FormattedText formattedText1 = new FormattedText( "This is the first part of the cell ", new Font() { Italic = true, Size = 14, Color = System.Drawing.Color.Aquamarine } );
        FormattedText formattedText2 = new FormattedText( "Here is a normal string " );
        FormattedText formattedText3 = new FormattedText( "Here is another independant text",
          new Font() { Bold = true, Underline = true, UnderlineType = UnderlineType.Double, Color = System.Drawing.Color.Coral} );

        //Put all the text in a list
        FormattedTextList formattedTextsList = new FormattedTextList { formattedText1, formattedText2, formattedText3 };
        
        //Assign value to the desired cell
        worksheet.Cells[ "B3" ].Value = formattedTextsList;

        worksheet.Cells[ "B3" ].FormatText( new Font(){Color = System.Drawing.Color.Blue}, 5, 10 );

        //Save the workbook
        workbook.SaveAs( "FormatPartOfText.xlsx" );
        Console.WriteLine( "\tCreated: FormatPartOfText.xlsx\n" );
      }
    }
```