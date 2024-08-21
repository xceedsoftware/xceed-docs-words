# Updating a Table of Contents

The following example demonstrates how to load a document containing a Table of Contents, add a new Paragraph with a specific Heading, and update the Table of Contents.

When opening the resulting saved document, MS Word will ask if you want to update the Table of Contents, say yes.  
If this document is converted to PDF (without opening it with MS Word), the Table of Contents will be automatically updated in the PDF document.

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Creates a document
        using (var document = DocX.Load("TOCDocument.docx"))
        {
            // Try to find a specific paragraph.
            var p = document.Paragraphs.LastOrDefault(x => x.Text.Contains("Heading Three"));
            if (p != null)
            {
                // Add a paragraph before it and use the "Heading1" style.
                var newParagraph = p.InsertParagraphBeforeSelf("A new Header")
                                    .Color(System.Drawing.Color.Red)
                                    .SpacingAfter(25d);
                newParagraph.StyleName = "Heading1";
                
                // Add another paragraph with a Page break.
                newParagraph.InsertParagraphAfterSelf("New set of data.")
                            .InsertPageBreakAfterSelf();
                
                // Force an update of the Table of Content.
                document.UpdateFields();
            }
            document.SaveAs("UpdateTableOfContent.docx");
        }
    }
}
```