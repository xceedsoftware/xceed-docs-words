# Offset Picture

This example demonstrates how to set offset pictures when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void OffsetPicture()
    {
      using( var workbook = Workbook.Create( "OffsetPicture.xlsx") )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Offset pictures"; 
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Add a picture using a stream.
        worksheet.Cells[ "A3" ].Value = "Original position";
        worksheet.Cells[ "A3" ].Style.Font = new Font() { Bold = true };

        var stream = new FileStream( PictureSampleResourcesDirectory + @"balloon.jpg", FileMode.Open, FileAccess.Read );
        var filenamePicture = worksheet.Pictures.Add( stream, "A4" );
        
        // Add Picture with a offset
        worksheet.Cells[ 16, 5 ].Value = "Offset position";
        worksheet.Cells[ 16, 5 ].Style.Font = new Font() { Bold = true };

        var filenamePictureOffset = worksheet.Pictures.Add( stream, "A4" );
        filenamePictureOffset.TopLeftOffsets = new Position( 3, 3, Units.Inch );

        workbook.Save();
        Console.WriteLine( "\tCreated: OffsetPicture.xlsx\n" );
      }
    }
```