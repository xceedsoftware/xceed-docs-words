# Creating a new table and adding it to a document

The following example demonstrates how to create a new Table and add it to a Document.

```csharp
private void TablesAndCells(string file)
{
    using (var document = DocX.Load(file))
    {
        // Create a table (initial size of 3 rows and 2 columns).
        var t = document.AddTable(3, 2);
        t.Design = TableDesign.TableGrid;

        // Add the table to the document
        document.InsertTable(t);

        // Save the changes to the document
        document.Save();
    }
}
```