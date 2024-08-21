# Appending to a Document

The following example demonstrates how to append a Document to another one.

```csharp
// Load the first document.
using (var document1 = DocX.Load("First.docx"))
{
    // Load the second document.
    using (var document2 = DocX.Load("Second.docx"))
    {
        // Insert a document at the end of another document.
        // When true, the document is added at the end. When false, the document is added at the beginning.
        document1.InsertDocument(document2, true);

        // Save this document to disk.
        document1.SaveAs("AppendDocument.docx");
    }
}
```