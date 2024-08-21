# Adding Shapes with Text Wrapping

The following example demonstrates how to add a rectangle and wrap text around it in a Document.

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Create a document.
        using (var document = DocX.Create("AddShapeWithTextWrapping.docx"))
        {
            // Add a title
            document.InsertParagraph("Add a shape with Text Wrapping").FontSize(15d).SpacingAfter(50d).Alignment = Alignment.center;

            // Add a shape and set its wrapping as Square.
            var shape = document.AddShape(45, 45, Color.LightGray);
            shape.WrappingStyle = PictureWrappingStyle.WrapSquare;
            shape.WrapText = PictureWrapText.bothSides;

            // Set horizontal alignment with Alignment centered on the page.
            shape.HorizontalAlignment = WrappingHorizontalAlignment.CenteredRelativeToPage;

            // Set vertical alignment with an offset from the top of the paragraph.
            shape.VerticalOffsetAlignmentFrom = WrappingVerticalOffsetAlignmentFrom.Paragraph;
            shape.VerticalOffset = 20d;

            // Set a buffer on left and right of the shape where no text will be drawn.
            shape.DistanceFromTextLeft = 5d;
            shape.DistanceFromTextRight = 5d;

            // Create a paragraph and append the shape to it.
            var p = document.InsertParagraph("With its easy to use API, Xceed Words for .NET lets your application create new Microsoft Word .docx or PDF documents, or modify existing .docx documents. It gives you complete control over all content in a Word document, and lets you add or remove all commonly used element types, such as paragraphs, bulleted or numbered lists, images, tables, charts, headers and footers, sections, bookmarks, and more. Create PDF documents using the same API for creating Word documents.");
            p.Alignment = Alignment.both;
            p.AppendShape(shape);
            p.SpacingAfter(50);

            // Save the document
            document.Save();
        }
    }
}
```