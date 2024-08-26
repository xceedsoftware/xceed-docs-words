# Adding Note

This example demonstrates how to add Notes Note when using the API from the Xceed Workbooks for .NET.

```csharp
    public static void AddNote()
    {
      using( var workbook = Workbook.Create( "AddNote.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        var annotations = worksheet.Annotations;
        var formattedText = new FormattedText( "This is the title of the document" );

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add Note";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Add a note without the name of the person who wrote it.
        annotations.AddNote( formattedText, "B1", false );

        formattedText.Text = " This is a new text with color";
        formattedText.Font.Color = Color.Green;

        //Add a note with the name of the person who wrote it and adding style to the text.
        annotations.AddNote( formattedText, "B3" );

        //Add a note with the name of the person and modify the text of the author name.
        annotations.AddNote( formattedText, "B5" );

        //Cast the annotation to have the notes functionalities
        Note note = (Note) worksheet.Annotations[ "B5" ];
        note[ 0 ].Font.Color = Color.Red;
        note.BackgroundColor = ColorHelper.FromIndexedColor( 11 );

        workbook.Save();
        Console.WriteLine( "\tCreated: AddNote.xlsx\n" );
      }
    }

```