import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a tar archive

This topic demonstrates how to get a listing of all of the files contained in a GZipped Tar archive, that is, a Tar archive that has been compressed using GZip.

:::note
Tar and FileSystem-based GZip are not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To list the contents of a gzipped Tar archive, the following steps must be performed:

- Retrieve a reference to an `AbstractFile`-derived class, such as the `DiskFile`, `MemoryFile` or `IsolatedFile` class, using the name of the GZipped Tar archive. 

- Retrieve a reference to a GZip archive using the `GZippedFile` class, passing the AbstractFile-based object retrieved in the previous step to its constructor.
:::note
To create a non-GZipped Tar archive, omit this step. 
:::

- Retrieve a reference to a Tar archive using the `TarArchive` class, passing the GZippedFile retrieved in the previous step to its constructor (or the DiskFile object from the first step for a non-GZipped Tar archive). 

- You can now loop through the files and extract the desired information.

:::note
When performing many operations on an archive, you may wish to consider optimizing your code by using [batch updates](/zip/basic-concepts/optimizing-batch-updates-to-folder). 
:::

Using a non-GZipped Tar archive may be preferable in some situations: for example, when read/write speed is essential but storage space is unlimited, when you need to access individual files in the Tar archive without uncompressing the entire archive, or when the files inside the Tar archive are already compressed. 

:::note
Setting the LicenseKey property with Tar also unlocks the GZip capabilities.
:::

## Demonstration

This example demonstrates how to list the contents of a GZipped Tar archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp 
      using Xceed.Tar;
      using Xceed.GZip;
      using Xceed.FileSystem; 

      DiskFile diskFile = new DiskFile(@"E:\test.tar.gz");
      GZippedFile gzip = new GZippedFile(diskFile);
      TarArchive tar = new TarArchive(gzip);

      foreach (AbstractFile file in tar.GetFiles(true))
      {
        Console.WriteLine("File {0} is {1} bytes", file.FullName, file.Size);
      }
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

      Dim f As AbstractFile 

      For Each f In tar.GetFiles( True )
        ListBox1.Items.Add( f.FullName )
      Next
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when listing the contents of a Tar file are:

- Do you want to filter (specify specific files and folders) the items that are to be listed? Use `filters`. 

- Do you also want to retrieve a listing of the Tarred folders? Use the `GetFolders` method. 

- Do you want to retrieve a reference to a single Tarred file or folder? Use the `GetFile` or `GetFolder` methods. 

- Do you want to list the contents of a specific folder within the Tar archive? Create an instance of a `TarredFolder` object rather than a TarArchive object.  