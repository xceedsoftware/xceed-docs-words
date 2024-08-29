import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying items to a tar archive

This topic demonstrates how to copy files and folders to a GZipped Tar archive using a disk folder as the source where the files to process are located.

:::note
Tar and FileSystem-based GZip are not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To copy items to a Tar archive, the following steps must be performed:

- Retrieve a reference to a folder whose files will be added to the Tar archive, using a `DiskFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` class. With Xceed's FileSystem-based products, a folder is a folder: it does not matter if it is located within a Tar archive, on disk or in memory. 

- Retrieve a reference to an `AbstractFile`-derived class (such as `DiskFile`), using the name of the Tar archive. 

- Retrieve a reference to a GZip file using the `GZippedFile` class, passing the AbstractFile-based object retrieved in the previous step to its constructor. 
  :::note
  To create a non-GZipped Tar archive, omit this step. 
  :::

- Retrieve a reference to a new or existing Tar archive using the `TarArchive` class, passing the GZippedFile retrieved in the previous step to its constructor (or the DiskFile object from the first step for a non-GZipped Tar archive). 

- Call the `CopyFilesTo` method to copy the entire contents of the folder to the Tar archive.

:::note
When performing many operations on an archive, you may wish to consider optimizing your code by using [batch updates](/zip/basic-concepts/optimizing-batch-updates-to-folder).
:::

Using a non-GZipped Tar archive may be preferable in some situations, for example, when read/write speed is essential but storage space is not, when you need to access individual files in the Tar archive without uncompressing the entire archive, or when the files inside the Tar archive are already compressed. 

:::note
Setting the LicenseKey property with Tar also unlocks the GZip capabilities.
:::

## Demonstration

This example demonstrates how to copy files from a disk folder to a GZipped Tar archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.GZip;
      using Xceed.FileSystem;

      DiskFolder source = new DiskFolder(@"c:\temp");
      DiskFile dest = new DiskFile(@"c:\test.tar.gz");
      TarArchive tar = new TarArchive(new GZippedFile(dest, "test.tar")); 

      source.CopyFilesTo(tar, true, true);
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Tar
      Imports Xceed.GZip
      Imports Xceed.FileSystem

      Dim source As New DiskFolder("c:\temp")
      Dim dest As New DiskFile("c:\test.tar.gz")
      Dim gzip As New GZippedFile(dest, "test.tar)
      Dim tar As New TarArchive(gzip) 

      source.CopyFilesTo(tar, True, True)
    ```
  </TabItem>
</Tabs>

This example demonstrates how to copy files from a disk folder to a non-GZipped Tar archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.FileSystem;

      DiskFolder source = new DiskFolder(@"c:\temp");
      DiskFile dest = new DiskFile(@"c:\test.tar");
      TarArchive tar = new TarArchive(dest); 

      source.CopyFilesTo(tar, true, true);
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Tar
      Imports Xceed.FileSystem

      Dim source As New DiskFolder("c:\temp")
      Dim dest As New DiskFile("c:\test.tar")
      Dim tar As New TarArchive(dest) 

      source.CopyFilesTo(tar, True, True)
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a Tar archive are:

- Do you want to copy a file rather than a folder or its contents? Create a `DiskFile` class rather than a `DiskFolder` class. 

- Do you want to filter (specify specific files and folders) the items that are to be added to the Tar archive? Use `filters`. 

- Do you want to add items into a specific folder within the Tar archive file? Create an instance of a `TarredFolder` object rather than a `TarArchive` object. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder? Set the `TarArchive`'s `TempFolder` property.