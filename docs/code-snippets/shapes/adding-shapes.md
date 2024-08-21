# Adding Shapes

The following example demonstrates how to add rectangles in a Document.

```csharp
class Program
{
    static void Main(string[] args)
    {
        using (var document = DocX.Create("AddShape.docx"))
        {
            // Add a title
            document.InsertParagraph("Inserting shapes").FontSize(15d).SpacingAfter(50d).Alignment = Alignment.center;

            // Adding first shape.
            var shape = document.AddShape(50, 50);

            // Create a paragraph and insert the shape at its 16th character.
            var p = document.InsertParagraph("Here is a simple default rectangle positioned on the 16th character of this paragraph.");
            p.InsertShape(shape, 16);
            p.SpacingAfter(30);

            // Adding second shape.
            var shape2 = document.AddShape(100, 0);
            shape2.FillColor = Color.Orange;
            shape2.Height = 175;
            shape2.OutlineColor = Color.Black;
            shape2.OutlineWidth = 4f;
            shape2.OutlineDash = DashStyle.Dot;

            // Create a paragraph and append the shape to it.
            var p2 = document.InsertParagraph("Here is another rectangle appended to this paragraph: ");
            p2.AppendShape(shape2);

            // Modify OutlineColor from shape in second paragraph.
            p2.Shapes.First().OutlineColor = Color.Red;

            document.Save();
        }
    }
}
```