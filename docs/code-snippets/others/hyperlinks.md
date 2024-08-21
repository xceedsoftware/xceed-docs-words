# Hyperlinks

The following example demonstrates how to add a Hyperlink in a Document.

```csharp
private void AddHyperlink(string file)
{
  using(var document = DocX.Load(file))
  {
    // Add a hyperlink to the document's Hyperlink collection
    Hyperlink link = document.AddHyperlink("website", new Uri("https://xceed.com"));

    // Add a paragraph that uses the hyperlink
    document.InsertParagraph("Visit our ").AppendHyperlink(link).Append(" for more information.");

    // Save the changes to the document
    document.Save();
  }
}
```