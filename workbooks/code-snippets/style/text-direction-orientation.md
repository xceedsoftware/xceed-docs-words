# Text direction & orientation

This example demonstrates how to set text direction and orientation when using the API from the Xceed Workbooks for .NET.

```csharp 
    public static void ChangeTextDirection()
    {
      //Some language needs to be force to right to left in order to be legible.
      using( var workbook = Workbook.Create( "ChangeTextDirection" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        // Add a title 
        worksheet.Cells[ "B1" ].Value = "Change The Text Direction";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Some arabic text with latin chars.
        var cell = worksheet.Cells[ "B2" ];
        cell.Style.Alignment.TextDirection = TextDirectionAlignment.RightToLeft;
        cell.Value = "this ثصخقهع ففext";
        workbook.Save();
        Console.WriteLine( "\tCreated: ChangeTextDirection.xlsx\n" );
      }
    }

    public static void ChangeTextOrientation()
    {
      using( var workbook = Workbook.Create( "ChangeTextOrientation" ) )
      {
        var worksheet = workbook.Worksheets[ 0 ];
        // Add a title 
        worksheet.Cells[ "B1" ].Value = "Change The Text Orientation";
        worksheet.Cells[ "B1" ].Style.Font = new Font() { Bold = true, Size = 15.5d };

        //Some text with a down rotation of 45 degrees ( angle is between 90 and -90 ).
        var cell = worksheet.Cells[ "B2" ];
        cell.Style.Alignment.RotationAngle = -45;
        cell.Value = "This is a rotated text.";
        workbook.Save();
        Console.WriteLine( "\tCreated: ChangeTextOrientation.xlsx\n" );
      }
    }
```