# Adding Rows and Columns to an Existing Table

The following example demonstrates how to add rows and columns to an existing Table.

```csharp
private void TablesAndCells(string file, int tableIndex)
{
  using (var document = DocX.Load(file))
  {
    // Get the table to modify
    var table = document.Tables[tableIndex];

    // Add a new column at the end
    table.InsertColumn();

    // Add a new row at the end
    table.InsertRow();

    // Save the changes to the document
    document.Save();
  }
}
```