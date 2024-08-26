# Adding Comment

This example demonstrates how to add Comments when using the API from the Xceed Workbooks for .NET.

```csharp
    public static void AddComment()
    {
      using( var workbook = Workbook.Create( "AddComment.xlsx" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        var annotations = workbook.Worksheets[ 0 ].Annotations;

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add Comment";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Add a comment to the to title.
        var comment = annotations.AddComment( "This is the title of the document." , "B3" );

        //If a comment is already in a cell, it will be replied if another add is made.
        var comment2 = annotations.AddComment( "I added another comment by mistake.", "B3" );

        //Comment can also be replied by a method.
        comment2.Reply( "Wait I can also be in the thread of the conversation ?" );

        //Any comment in a thread can be used to reply in it.
        comment.Reply( "I made another mistake but looks like I will be at the end of the thread." );

        workbook.Save();
        Console.WriteLine( "\tCreated: AddComment.xlsx\n" );
      }
    }
```