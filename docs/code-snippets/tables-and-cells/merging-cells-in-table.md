# Merging Cells in a Table

The following example demonstrates how to merge cells in a table.

```csharp
private void TablesAndCells(string file, int tableIndex)
{
    using (var document = DocX.Load(file))
    {
        // Get the table to modify
        var table = document.Tables[tableIndex];

        // Merge the first 3 cells of the first row
        table.Rows[0].MergeCells(0, 3);

        // Merge the last 2 cells in the third row
        var columnCount = table.Rows[1].ColumnCount;
        table.Rows[2].MergeCells(columnCount - 2, columnCount - 1);

        // Merge the first cell of rows 2 and 3
        table.MergeCellsInColumn(0, 1, 2);

        // Save the changes to the document
        document.Save();
    }
}
```