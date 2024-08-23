# Converting to PDF

The following example demonstrates how to convert a docx Document to PDF.

:::warning
Most of the docx features will be converted to PDF.  
You need the `Xceed.Pdf.dll` reference in order to convert to PDF.  
To convert a Document with a specific font to PDF, the font (a `.ttf` file) must be installed in `Control Panel\All Control Panel Items\Fonts`, otherwise the default Arial font will be used to generate the PDF Document.
:::

```csharp
// Load a document
using (var document = DocX.Load("DocumentToConvert.docx"))
{
  // Convert the Document to PDF.
  DocX.ConvertToPdf(document, "ConvertedDocument.pdf");
}
```