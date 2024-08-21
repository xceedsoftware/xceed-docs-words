# Inserting a Table of Contents at the End of a Document

The following example demonstrates how to add a Table of Contents at the end of a Document.

```csharp
private void AddTableOfContents(string file)
{
  using(var document = DocX.Load(file))
  {
    // Add a page break to place the Table of Content on a new page
    document.InsertSectionPageBreak();

    // Add the Table of Contents
    document.InsertTableOfContents("Table of Contents", TableOfContentsSwitches.None);

    // Save the changes to the document
    document.Save();
  }
}
```