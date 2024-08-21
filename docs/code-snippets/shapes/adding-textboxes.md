# Adding TextBoxes

The following example demonstrates how to add textBoxes in a Document.

```csharp
class Program
{
    static void Main(string[] args)
    {
        using (var document = DocX.Create("AddTextBox.docx"))
        {
            // Add a title
            document.InsertParagraph("Add TextBox")
                    .FontSize(15d)
                    .SpacingAfter(50d)
                    .Alignment = Alignment.center;

            // Create a TextBox with text formatting.
            var textBox = document.AddTextBox(100, 100, "My TextBox", 
                        new Formatting() { FontColor = Color.Green });
            textBox.TextVerticalAlignment = VerticalAlignment.Bottom;
            textBox.TextMarginBottom = 5d;
            textBox.TextMarginTop = 5d;
            textBox.TextMarginLeft = 5d;
            textBox.TextMarginRight = 5d;

            // Create a paragraph and insert the textBox at its 16th character.
            var p = document.InsertParagraph("Here is a simple TextBox positioned on the 16th character of this paragraph.");
            p.InsertShape(textBox, 16);
            p.SpacingAfter(30);

            // Add a bold paragraph to the TextBox.
            document.TextBoxes[0].InsertParagraph("My New Paragraph").Bold();
            document.Save();
        }
    }
}
```