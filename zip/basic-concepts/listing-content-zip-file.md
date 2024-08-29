import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the Contents of a Zip File

## Xceed .NET Libraries Documentation

### Listing the Contents of a Zip File

This topic demonstrates how to get a listing of all the files contained in a zip file.

### Basic Steps

To list the contents of a zip file, follow these steps:

1. Retrieve a reference to a zip file using the `ZipArchive` class.
2. Call the `GetFiles` method to retrieve a listing of the files contained within the zip file.
3. Loop through the files and extract the desired information.

### Demonstration

This example demonstrates how to list the contents of a zip file. 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      ZipArchive zip = new ZipArchive(new DiskFile(@"c:\test.zip"));

      foreach (AbstractFile f in zip.GetFiles(true))
      {
          Console.WriteLine(f.FullName);
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      Dim zip As New ZipArchive(New DiskFile("c:\test.zip"))
      Dim f As AbstractFile

      For Each f In zip.GetFiles(True)
          ListBox1.Items.Add(f.FullName)
      Next
    ```
  </TabItem>
</Tabs>

