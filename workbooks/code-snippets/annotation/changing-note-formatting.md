# Changing Note formatting

This example demonstrates how to change note formatting when using the API from the Xceed Workbooks for .NET.

```csharp
    public static void ChangeNoteFormatting()
    {
      using( var workbook = Workbook.Create( "ChangeNoteFormatting.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        var annotations = workbook.Worksheets[ 0 ].Annotations;

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Change Note Formatting";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Adding a note will return the note.
        var note = annotations.AddNote( new FormattedText( "This is a note" ) , "B5" , false );

        //Changing the size of the note.
        note.Height = 2;
        note.Width = 3;
        note.Protection.Locked = false;
        note.Protection.LockText = false;
        note.MeasureUnit = Units.Inch;

        //Changing the text alignement.
        note.TextAlignment.Horizontal = HorizontalAlignment.Right;

        //Adding text on a new line to an existing note.
        var newFormattedText = new FormattedText( "\n Added a new independant formatted text to the existing note." );
        newFormattedText.Font.Size = 14;
        newFormattedText.Font.Italic = true;

        note.AddText( newFormattedText ); 

        workbook.Save();
        Console.WriteLine( "\tCreated: ChangeNoteFormatting.xlsx\n" );
      }
    }
```