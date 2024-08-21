# Lists

The following example demonstrates how to add a numbered list and a bulleted list in a Document.

```csharp
// Create a document.
using(var document = DocX.Create("AddList.docx"))
{
    // Add a numbered list where the first ListItem is starting with number 1.
    var numberedList = document.AddList("Berries", 0, ListItemType.Numbered, 1);
    
    // Add Sub-items(level 1) to the preceding ListItem.
    document.AddListItem(numberedList, "Strawberries", 1);
    document.AddListItem(numberedList, "Blueberries", 1);
    document.AddListItem(numberedList, "Raspberries", 1);
    
    // Add an item (level 0)
    document.AddListItem(numberedList, "Banana");
    
    // Add an item (level 0)
    document.AddListItem(numberedList, "Apple");
    
    // Add Sub-items(level 1) to the preceding ListItem.
    document.AddListItem(numberedList, "Red", 1);
    document.AddListItem(numberedList, "Green", 1);
    document.AddListItem(numberedList, "Yellow", 1);
    
    // Add a bulleted list with its first item.
    var bulletedList = document.AddList("Canada", 0, ListItemType.Bulleted);
    
    // Add Sub-items(level 1) to the preceding ListItem.
    document.AddListItem(bulletedList, "Toronto", 1);
    document.AddListItem(bulletedList, "Montreal", 1);
    
    // Add an item (level 0)
    document.AddListItem(bulletedList, "Brazil");
    
    // Add an item (level 0)
    document.AddListItem(bulletedList, "USA");
    
    // Add Sub-items(level 1) to the preceding ListItem.
    document.AddListItem(bulletedList, "New York", 1);
    
    // Add Sub-items(level 2) to the preceding ListItem.
    document.AddListItem(bulletedList, "Brooklyn", 2);
    document.AddListItem(bulletedList, "Manhattan", 2);
    
    document.AddListItem(bulletedList, "Los Angeles", 1);
    document.AddListItem(bulletedList, "Miami", 1);
    
    // Add an item (level 0)
    document.AddListItem(bulletedList, "France");
    
    // Add Sub-items(level 1) to the preceding ListItem.
    document.AddListItem(bulletedList, "Paris", 1);
    
    // Insert the lists into the document.
    document.InsertParagraph("This is a Numbered List:\n");
    document.InsertList(numberedList);
    document.InsertParagraph().SpacingAfter(40d);
    document.InsertParagraph("This is a Bulleted List:\n");
    document.InsertList(bulletedList, new Xceed.Document.NET.Font("Cooper Black"), 15);
    
    document.Save();
}
```