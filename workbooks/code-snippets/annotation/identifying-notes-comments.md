# Identifying notes comments

This example demonstrates how to identify a note comment when using the API from the Xceed Workbooks for .NET.

```csharp
    public static void IdentifyNotesOrComments()
    {
      using( var workbook = Workbook.Create( "IdentifyNotesFromComments.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        var annotations = workbook.Worksheets[ 0 ].Annotations;

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Identify Notes Or Comments";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Add a Comment.
        annotations.AddComment( "This is the title of the document." , "B3" );

        //Add a Note.
        annotations.AddNote( new FormattedText( "This is a note" ) , "B5" , false );

        worksheet.Cells[ "C3" ].Value = annotations[ "B3" ].AnnotationType;
        worksheet.Cells[ "C5" ].Value = annotations[ "B5" ].AnnotationType;

        workbook.Save();
        Console.WriteLine( "\tCreated: IdentifyNotesOrComments.xlsx\n" );
      }
    }

```