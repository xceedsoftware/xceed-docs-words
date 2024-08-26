# Cell with multiple fonts

This example demonstrates how to set multiple fonts to cells when using the API from the Xceed Workbooks for .NET.

```csharp    
    public static void CellWithMultipleFont()
    {
      using( var workbook = Workbook.Create( "CellWithMultipleFont.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        FormattedText formattedText = new FormattedText( "Text with multiple font", new Font() { Bold = true, Size = 15.5d } );
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

        //Save the workbook
        workbook.SaveAs( "CellWithMultipleFont.xlsx" );
        Console.WriteLine( "\tCreated: CellWithMultipleFont.xlsx\n" );
      }
    }

```