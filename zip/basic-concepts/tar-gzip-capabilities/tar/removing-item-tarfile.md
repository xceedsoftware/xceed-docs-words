import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a tar archive

This topic demonstrates how to remove items from a GZipped Tar archive by retrieving a reference to a file contained within.

:::note
Tar and FileSystem-based GZip are not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To remove an item from a GZipped Tar archive, the following steps must be performed:

- Retrieve a reference to a file contained within the Tar archive. 

- Once you have a reference to a file, verify the `Exists` property to make sure that the file actually exists. 

- Call the `Delete` method to delete the file.

:::note
When performing many operations on an archive, you may wish to consider optimizing your code by using [batch updates](/zip/basic-concepts/optimizing-batch-updates-to-folder).
:::

Using a non-GZipped Tar archive may be preferable in some situations, for example, when read/write speed is essential but storage space is not, when you need to access individual files in the Tar archive without uncompressing the entire archive, or when the files inside the Tar archive are already compressed. 

:::note
Setting the LicenseKey property with Tar also unlocks the GZip capabilities.
:::

## Demonstration

This example demonstrates how to remove a file from within a GZipped Tar archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.GZip;
      using Xceed.FileSystem;

      DiskFile diskFile = new DiskFile("c:\\test.tar.gz");
      GZippedFile gzip = new GZippedFile(diskFile);
      TarArchive tar = new TarArchive(gzip);

      AbstractFile file;

      file = tar.GetFile("\\temp\\test1.txt") ;

      if file.Exists
        file.Delete();
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Tar
      Imports Xceed.GZip
      Imports Xceed.FileSystem

      Dim diskFile As New DiskFile("c:\test.tar.gz")
      Dim gzip As New GZippedFile(diskFile)
      Dim tar As New TarArchive(gzip)

      Dim file As AbstractFile

      file = tar.GetFile("\temp\test1.txt")

      If file.Exists Then
        file.Delete()
      End If
    ```
  </TabItem>
</Tabs>

This example demonstrates how to remove a file from within a non-GZipped Tar archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.FileSystem;

      DiskFile diskFile = new DiskFile(@"c:\test\test.tar");
      TarArchive tar = new TarArchive(diskFile);

      AbstractFile file = tar.GetFile(@"\temp\test1.txt");

      if( file.Exists )
        file.Delete();
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Tar
      Imports Xceed.FileSystem

      Dim diskFile As New DiskFile("c:\test.tar")
      Dim tar As New TarArchive(diskFile)

      Dim file As AbstractFilefile = tar.GetFile("\temp\test1.txt")

      If file.Exists Then
        file.Delete()
      End If
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when removing items from a Tar archive are:

- Do you want to filter (specify specific files and folders) the items that are to be deleted? Use `filters`. 

- Do you want to remove a specific folder? Create an instance of a `TarredFolder` rather than a `TarredFile` object 

- Do you already have a reference on a folder? Use the `GetFile` or `GetFolder` methods method to retrieve a reference on the file or folder to remove.