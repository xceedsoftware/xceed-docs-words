# Shrink picture with offset

This example demonstrates how to shrink picture with offset when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ShrinkPictureWithOffset()
    {
      using( var workbook = Workbook.Create( "ShrinkPicture.xlsx") )
      {
        // Get the first worksheet. A workbook contains at least 1 worksheet.
        var worksheet = workbook.Worksheets[ 0 ];

        // Add a title.
        worksheet.Cells[ "B1" ].Value = "Shrink picture with offset"; 
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        // Add a picture using a stream.
        worksheet.Cells[ "A3" ].Value = "Original Picture";
        worksheet.Cells[ "A3" ].Style.Font = new Font() { Bold = true };
        
        var stream = new FileStream( PictureSampleResourcesDirectory + @"balloon.jpg", FileMode.Open, FileAccess.Read );
        worksheet.Pictures.Add( stream, "A4", "E12"  );
        
        // Add two anchor picture.
        worksheet.Cells[ "F3" ].Value = "Shrank Picture";
        worksheet.Cells[ "F3" ].Style.Font = new Font() { Bold = true };
        var filenamePicture = worksheet.Pictures.Add( stream, "F4", "J12" );

        //Set a negative offset to shrink the picture.
        //Warning if the offset is superior the width or the height of the picture, it will disapper.
        filenamePicture.BottomRightOffsets = new Position(-1, -1, Units.Inch);

        workbook.Save();
        Console.WriteLine( "\tCreated: ShrinkPicture.xlsx\n" );
      }
    }
```