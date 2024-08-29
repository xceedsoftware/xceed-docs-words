import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying an item to a gzip file

This topic demonstrates how to create a GZip archive.

:::note
FileSystem-based GZip is not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To create a GZipped file, the following steps must be performed:

- Retrieve a reference to the file that will be added to the GZip archive, using an `AbstractFile`-derived class such as the `DiskFile`, `MemoryFile` or `IsolatedFile` classes. With Xceed’s FileSystem-based products, a file is a file: it does not matter if it is located in a GZip archive, on disk or in memory. 

- Retrieve a reference to a new GZip archive using the `GZipArchive` class. 

- Call the `CopyTo` method to copy the file to the GZip file.

:::note
When performing many operations on an archive, you may wish to consider optimizing your code by using [batch updates](/zip/basic-concepts/optimizing-batch-updates-to-folder). 
:::

## Demonstration

This example demonstrates how to copy a file to a GZip archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;
      using Xceed.FileSystem;

      DiskFile sourceFile = new DiskFile(@"C:\test.txt");

      sourceFile.CopyTo(new GZipArchive(new DiskFile(@"C:\test.gz")), true);
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.GZip
    Imports Xceed.FileSystem

    Dim sourceFile as New DiskFile(@"C:\test.txt")

    sourceFile.CopyTo(New GZipArchive(New DiskFile(@"C:\test.gz")), True)
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a GZip file are:

- Do you want to copy the contents of a folder rather than a single file? Although not a typical use of GZip, the format and Xceed's implementation allows for this. See Multi-file operations for details. 

- Do you want to move items rather than copy them? Use the `MoveTo` method.