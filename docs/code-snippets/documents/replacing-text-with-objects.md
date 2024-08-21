# Replacing Text with Objects

The following example demonstrates how to replace text in a Document with pictures, hyperlinks, and tables.

:::info
The document contains tags that look like **\<YEAR_IMAGE\>**  
These tags will be replaced by the corresponding objects.
:::

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Load a document.
        using(var document = DocX.Load("ReplaceTextWithObjects.docx"))
        {
            // Create the image from disk and set its size.
            var image = document.AddImage(@"2018.jpg");
            var picture = image.CreatePicture(175, 325);
            
            // Replace all found tags with the specified image and ignore the case when searching for the tags.
            document.ReplaceTextWithObject("<yEaR_IMAGE>", picture, false, RegexOptions.IgnoreCase);

            // Create the hyperlink.
            var hyperlink = document.AddHyperlink("(ref)", new Uri("https://en.wikipedia.org/wiki/New_Year"));

            // Replace all found tags with the specified hyperlink.
            document.ReplaceTextWithObject("<year_link>", hyperlink);

            // Add a Table into the document and set its values.
            var t = document.AddTable(1, 2);
            t.Design = TableDesign.DarkListAccent4;
            t.AutoFit = AutoFit.Window;
            t.Rows[0].Cells[0].Paragraphs[0].Append("xceed.com");
            t.Rows[0].Cells[1].Paragraphs[0].Append("@copyright 2018");

            document.ReplaceTextWithObject("<year_table>", t);

            // Save this document to disk.
            document.SaveAs(@"ReplacedTextWithObjects.docx");
        }
    }
}
