# Add picture

This example demonstrates how to add pictures when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void AddPicture()
    {
      using( var workbook = Workbook.Create( "AddPicture.xlsx") )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Add pictures"; 
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Add a picture using a stream.
        worksheet.Cells[ "A3" ].Value = "Using a stream and 2 anchors:";
        worksheet.Cells[ "A3" ].Style.Font = new Font() { Bold = true };

        var stream = new FileStream( "balloon.jpg", FileMode.Open, FileAccess.Read );
        // Add the stream picture in A4 and it should extend to E12.
        var filenamePicture = worksheet.Pictures.Add( stream, "A4", "E12" );


        // Add Picture with file name.
        worksheet.Cells[ 13, 0 ].Value = "Using a filename and 1 anchor:";
        worksheet.Cells[ 13, 0 ].Style.Font = new Font() { Bold = true };

        // Add the filename picture with its top left corner in 15th row and 1st column.
        var streamPicture = worksheet.Pictures.Add( "balloon.jpg", 14, 0 );

        workbook.Save();
        Console.WriteLine( "\tCreated: AddPicture.xlsx\n" );
      }
    }
```