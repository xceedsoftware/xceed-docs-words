# Inserting a Table of Contents at the Beginning of a Document

The following example demonstrates how to add a Table of Contents at the beginning of a Document.

```csharp
public static void InsertTableOfContent()
{
  Console.WriteLine("\tInsertTableOfContent()");
  
  // Creates a document
  using(var document = DocX.Create(@"InsertTableOfContent.docx"))
  {
    // Add a title
    document.InsertParagraph("Insert Table of Content").FontSize(15d).SpacingAfter(50d).Alignment = Alignment.center;
    
    // Insert a table of content and a page break.
    var tocSwitches = new Dictionary<TableOfContentsSwitches, string>()
    {
      { TableOfContentsSwitches.O, "1-3"},
      { TableOfContentsSwitches.U, ""},
      { TableOfContentsSwitches.Z, ""},
      { TableOfContentsSwitches.H, ""},
    };
    
    document.InsertTableOfContents("Teams", tocSwitches);
    document.InsertParagraph().InsertPageBreakAfterSelf();
    
    // Create a paragraph and add teams.
    var p = document.InsertParagraph();
    TableOfContentSample.AddTeams(p);
    
    document.Save();
    Console.WriteLine("\tCreated: InsertTableOfContent.docx\n");
  }
}
```