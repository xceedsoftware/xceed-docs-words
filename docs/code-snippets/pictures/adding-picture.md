# Adding a Picture

The following example demonstrates how to add a picture in a Document.

```csharp
// Create a document.
using (var document = DocX.Create("AddPicture.docx"))
{
    // Add a simple image from disk.
    var image = document.AddImage("balloon.jpg");

    // Set Picture Height and Width.
    var picture = image.CreatePicture(150, 150);

    // Insert Picture in paragraph.
    var p = document.InsertParagraph("Here is a simple picture added from disk:");
    p.AppendPicture(picture);

    document.Save();
}
```