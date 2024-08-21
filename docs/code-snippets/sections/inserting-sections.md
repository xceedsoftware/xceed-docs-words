# Inserting Sections

The following example demonstrates how to insert sections in a Document. A Document can be customized per section.

:::caution
This is only available in v1.5 and up.
:::

```csharp
// Create a document.
using(var document = DocX.Create("InsertSections.docx"))
{
    // Different odd and even pages headers/footers.
    document.DifferentOddAndEvenPages = true;

    // Section 1
    // Set Page parameters for section 1
    // Set footers for section 1.
    document.Sections[0].AddFooters();
    document.Sections[0].DifferentFirstPage = true;
    var footers = document.Sections[0].Footers;
    footers.First.InsertParagraph("This is the First page footer.");
    footers.Even.InsertParagraph("This is the Even page footer.");
    footers.Odd.InsertParagraph("This is the Odd page footer.");

    // Add paragraphs and page breaks in section 1.
    document.InsertParagraph("FIRST").InsertPageBreakAfterSelf();
    document.InsertParagraph("SECOND").InsertPageBreakAfterSelf();
    document.InsertParagraph("THIRD");

    // Add a section break as a page break to end section 1.
    // The new section properties will be based on last section properties.
    document.InsertSectionPageBreak();

    // Section 2
    // Set Page parameters for section 2
    document.Sections[1].PageWidth = 200f;
    document.Sections[1].PageHeight = 300f;

    // Set footers for section 2.
    document.Sections[1].AddFooters();
    document.Sections[1].DifferentFirstPage = true;
    var footers2 = document.Sections[1].Footers;
    footers2.First.InsertParagraph("This is the First page footer of Section 2.");
    footers2.Odd.InsertParagraph("This is the Odd page footer of Section 2.");
    footers2.Even.InsertParagraph("This is the Even page footer of Section 2.");

    // Add paragraphs and page breaks in section 2.
    document.InsertParagraph("FOURTH").InsertPageBreakAfterSelf();
    document.InsertParagraph("FIFTH").InsertPageBreakAfterSelf();
    document.InsertParagraph("SIXTH");

    // Add a section break as a page break to end section 2.
    // The new section properties will be based on last section properties.
    document.InsertSectionPageBreak();

    // Section 3
    // Set Page parameters for section 3
    document.Sections[2].PageWidth = 595f;
    document.Sections[2].PageHeight = 841f;
    document.Sections[2].MarginTop = 300f;
    document.Sections[2].MarginFooter = 120f;

    // Set footers for section 3.
    document.Sections[2].AddFooters();
    document.Sections[2].DifferentFirstPage = true;
    var footers3 = document.Sections[2].Footers;
    footers3.First.InsertParagraph("This is the First page footer of Section 3.");
    footers3.Odd.InsertParagraph("This is the Odd page footer of Section 3.");
    footers3.Even.InsertParagraph("This is the Even page footer of Section 3.");

    // Add paragraphs and page breaks in section 3.
    document.InsertParagraph("SEVENTH").InsertPageBreakAfterSelf();
    document.InsertParagraph("EIGHTH").InsertPageBreakAfterSelf();
    document.InsertParagraph("NINTH");

    // Get the different sections.
    var sections = document.GetSections();
    document.Save();
}
```