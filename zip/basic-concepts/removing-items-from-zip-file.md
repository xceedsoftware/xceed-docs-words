import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing Items from a Zip File

## Xceed .NET Libraries Documentation

### Removing Items from a Zip File

This topic demonstrates how to remove items from a folder by retrieving a reference to a file within a zip file.

### Basic Steps

To remove an item from a zip file, follow these steps:

1. Retrieve a reference to a file contained within the zip file using the `ZippedFile` class.
2. Verify the `Exists` property to make sure that the file actually exists.
3. Call the `Delete` method to delete the file.

### Demonstration

This example demonstrates how to remove a file from within a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      ZippedFile f = new ZippedFile( new DiskFile( @"c:\test.zip" ), "file.txt" ); 

      if( f.Exists )
      {
        f.Delete();
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      Dim f As New ZippedFile( New DiskFile( "c:\test.zip" ), "file.txt" ) 

      If f.Exists Then
        f.Delete()
      End If
    ```
  </TabItem>
</Tabs>