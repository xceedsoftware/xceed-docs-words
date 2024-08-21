# Modifying Sections

The following example demonstrates how to modify the page orientation per section in a Document.

:::caution
This is only available in v1.5 and up.
:::

```csharp
// Create a document.
using(var document = DocX.Create("SetPageOrientations.docx"))
{
    // Section 1
    // Set Page Orientation to Landscape.
    document.Sections[0].PageLayout.Orientation = Orientation.Landscape;
    // Add paragraphs in section 1.
    document.InsertParagraph("This is the first page in Landscape format.");
    // Add a section break as a page break to end section 1.
    // The new section properties will be based on last section properties.
    document.InsertSectionPageBreak();

    // Section 2
    // Set Page Orientation to Portrait.
    document.Sections[1].PageLayout.Orientation = Orientation.Portrait;
    // Add paragraphs in section 2.
    document.InsertParagraph("This is the second page in Portrait format.");
    // Add a section break as a page break to end section 2.
    // The new section properties will be based on last section properties.
    document.InsertSectionPageBreak();

    // Section 3
    // Set Page Orientation to Landscape.
    document.Sections[2].PageLayout.Orientation = Orientation.Landscape;
    // Add paragraphs in section 3.
    document.InsertParagraph("This is the third page in Landscape format.");
    document.Save();
}
