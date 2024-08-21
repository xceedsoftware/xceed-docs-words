# Creating a table, inserting rows in it, and filling it with data

The following example demonstrates how to create a table in a Document, insert rows in it, and fill the table with data.

```csharp
// Create a document.
using (var document = DocX.Create("InsertRowAndDataTable.docx"))
{
    // Add a Table of 5 rows and 2 columns into the document and set its values.
    var t = document.AddTable(5, 2);
    t.Design = TableDesign.ColorfulListAccent1;
    t.Alignment = Alignment.center;
    t.Rows[0].Cells[0].Paragraphs[0].Append("Mike");
    t.Rows[0].Cells[1].Paragraphs[0].Append("65");
    t.Rows[1].Cells[0].Paragraphs[0].Append("Kevin");
    t.Rows[1].Cells[1].Paragraphs[0].Append("62");
    t.Rows[2].Cells[0].Paragraphs[0].Append("Carl");
    t.Rows[2].Cells[1].Paragraphs[0].Append("60");
    t.Rows[3].Cells[0].Paragraphs[0].Append("Michael");
    t.Rows[3].Cells[1].Paragraphs[0].Append("59");
    t.Rows[4].Cells[0].Paragraphs[0].Append("Shawn");
    t.Rows[4].Cells[1].Paragraphs[0].Append("57");

    // Add a row at the end of the table and set its values.
    var r = t.InsertRow();
    r.Cells[0].Paragraphs[0].Append("Mario");
    r.Cells[1].Paragraphs[0].Append("54");

    // Insert a new Paragraph into the document.
    var p = document.InsertParagraph("Xceed Top Players Points:");
    p.SpacingAfter(40d);

    // Insert the Table after the Paragraph.
    p.InsertTableAfterSelf(t);

    document.Save();
}
```