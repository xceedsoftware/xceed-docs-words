# Replacing Text with HTML

The following example demonstrates how to replace text with HTML in a Document.

:::info
The document contains tags that look like **\<html_content\>**  
These tags will be replaced by the HTML code that is read from an HTML document.
:::

```csharp
static void Main(string[] args)
{
    // Load a document.
    using(var document = DocX.Load("Template-2.docx"))
    {
        // Read HTML content.
        string html = File.ReadAllText("HtmlSample.html");

        // Create HtmlReplaceTextOptions Object in order to replace "<html_content>" tags with the HTML content that is read.
        var htmlReplaceTextOptions = new HtmlReplaceTextOptions()
        {
            SearchValue = "<html_content>",
            NewValue = html
        };

        // Replace all occurrences of "<html_content>" in the document.
        document.ReplaceTextWithHTML(htmlReplaceTextOptions);

        // Save this document to disk.
        document.SaveAs("ReplaceTextWithHtml.docx");
    }
}
```