# Adding a Picture with Text Wrapping

The following example demonstrates how to add a picture with Text Wrapping in a Document.

```csharp
// Create a document.
using (var document = DocX.Create("AddPictureWithTextWrapping.docx"))
{
    // Add a simple image from disk and set its wrapping as Square.
    var image = document.AddImage("WordsIcon.png");

    // Set Picture Height and Width.
    var picture = image.CreatePicture(60, 60);
    picture.WrappingStyle = PictureWrappingStyle.WrapSquare;
    picture.WrapText = PictureWrapText.bothSides;

    // Set horizontal alignment with Alignment centered on the page.
    picture.HorizontalAlignment = PictureHorizontalAlignment.CenteredRelativeToPage;

    // Set vertical alignment with an offset from the top of the paragraph.
    picture.VerticalOffsetAlignmentFrom = PictureVerticalOffsetAlignmentFrom.Paragraph;
    picture.VerticalOffset = 25d;

    // Set a buffer on the left and right of the picture where no text will be drawn.
    picture.DistanceFromTextLeft = 5d;
    picture.DistanceFromTextRight = 5d;

    // Add a paragraph and insert the picture in it.
    var p = document.InsertParagraph("With its easy to use API, Xceed Words for .NET lets your application create new Microsoft Word .docx or PDF documents, or modify existing .docx documents. It gives you complete control over all content in a Word document, and lets you add or remove all commonly used element types, such as paragraphs, bulleted or numbered lists, images, tables, charts, headers and footers, sections, bookmarks, and more. Create PDF documents using the same API for creating Word documents.");
    p.Alignment = Alignment.both;
    p.InsertPicture(picture);

    document.Save();
}
```