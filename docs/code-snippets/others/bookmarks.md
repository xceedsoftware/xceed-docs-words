# Bookmarks

The following example demonstrates how to add a bookmark to a Document.

```csharp
// Create a document.
using (var document = DocX.Create("InsertBookmarks.docx"))
{
  // Insert a bookmark in the document.
  document.InsertBookmark("Bookmark1");

  // Add a paragraph.
  var p = document.InsertParagraph("This document contains a bookmark named \"");
  p.Append(document.Bookmarks.First().Name);
  p.Append("\" just before this line.");

  // Save the document.
  document.Save();
}
```