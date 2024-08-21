# Headers and Footers

The following example demonstrates how to add Headers and Footers to a Document.

```csharp
private void HeadersAndFooters(string file)
{
    using (var document = DocX.Load(file))
    {
        // Generate the Headers/Footers for this document
        document.AddHeaders();
        document.AddFooters();

        // Indicate that the first page will have independent Headers/Footers
        document.DifferentFirstPage = true;

        // Indicate that even and odd page will have separate Headers/Footers
        document.DifferentOddAndEvenPages = true;

        // Insert a Paragraph in the Headers/Footers for the first page
        document.Headers.First.InsertParagraph("This is the ").Append("first").Bold().Append(" page header");
        document.Footers.First.InsertParagraph("This is the ").Append("first").Bold().Append(" page footer");

        // Insert a Paragraph in the Headers/Footers for the even pages
        document.Headers.Even.InsertParagraph("This is an ").Append("even").Bold().Append(" page header");
        document.Footers.Even.InsertParagraph("This is an ").Append("even").Bold().Append(" page footer");

        // Insert a Paragraph in the Headers/Footers for the odd pages
        document.Headers.Odd.InsertParagraph("This is an ").Append("odd").Bold().Append(" page header");
        document.Footers.Odd.InsertParagraph("This is an ").Append("odd").Bold().Append(" page footer");

        // Save the changes to the document
        document.Save();
    }
}
```
:::note 
When DifferentOddAndEvenPages is false, the content found in the Odd Headers/Footers is used for both even and odd pages.
:::