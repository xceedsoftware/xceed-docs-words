# Adding a Table with Text Wrapping

The following example demonstrates how to add a table and wrap text around it in a Document.

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Create a document.
        using (var document = DocX.Create("AddTableWithTextWrapping.docx"))
        {
            // Add a title
            document.InsertParagraph("Add Table with Text Wrapping")
                    .FontSize(15d)
                    .SpacingAfter(50d)
                    .Alignment = Alignment.center;

            // Add a Table into the document and set its values.
            var t = document.AddTable(3, 2);
            t.Rows[0].Cells[0].Paragraphs[0].Append("Mike");
            t.Rows[0].Cells[1].Paragraphs[0].Append("65");
            t.Rows[1].Cells[0].Paragraphs[0].Append("Kevin");
            t.Rows[1].Cells[1].Paragraphs[0].Append("62");
            t.Rows[2].Cells[0].Paragraphs[0].Append("Carl");
            t.Rows[2].Cells[1].Paragraphs[0].Append("60");

            // Set the table wrapping as WrapAround.
            t.WrappingStyle = TableWrappingStyle.WrapAround;

            // Set horizontal alignment with a right Alignment from margin.
            t.HorizontalAlignment = WrappingHorizontalAlignment.RightRelativeToMargin;

            // Set vertical alignment with an offset from the top of the page.
            t.VerticalOffsetAlignmentFrom = WrappingVerticalOffsetAlignmentFrom.Page;
            t.VerticalOffset = 175d;

            // Set a buffer on the left and right of the table where no text will be drawn.
            t.DistanceFromTextLeft = 5d;
            t.DistanceFromTextRight = 5d;

            var p = document.InsertParagraph("With its easy to use API, Xceed Words for .NET lets your application create new Microsoft Word .docx or PDF documents, or modify existing .docx documents. It gives you complete control over all content in a Word document, and lets you add or remove all commonly used element types, such as paragraphs, bulleted or numbered lists, images, tables, charts, headers and footers, sections, bookmarks, and more. Create PDF documents using the same API for creating Word documents.");
            p.Alignment = Alignment.both;
            p.InsertTableAfterSelf(t);
            p.SpacingAfter(30);

            document.Save();
        }
    }
}
```