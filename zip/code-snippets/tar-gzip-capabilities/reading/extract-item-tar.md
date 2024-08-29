import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting items from a tar archive

This topic demonstrates how to extract files and folders from a GZipped Tar archive to a destination folder. With Xceed’s FileSystem-based products, a folder is a folder: it does not matter if it is located within a Tar archive, on disk or in memory.

:::note
Tar and FileSystem-based GZip are not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To extract items from a Tar archive, the following steps must be performed:

- Retrieve a reference to an `AbstractFile`-derived class representing the actual Tar archive file; in this example, DiskFile will be used. If the Tar archive is GZipped, retrieve a reference to a `GZippedFile` class and pass the `DiskFile` object you have just retrieved to its constructor. 

- Retrieve a reference to a new or existing Tar archive using the TarArchive class, using either the `GZippedFile` object you have just retrieved for a GZipped Tar archive or a `DiskFile` object for a non-GZipped Tar archive. 

- Retrieve a reference to a folder where the files will be extracted to using an AbstractFolder-derived class such as `DiskFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder`. 

- Call the `CopyFilesTo` method to copy the entire contents of the Tar archive to the destination folder.

:::note
When performing many operations on an archive, you may wish to consider optimizing your code by using [batch updates](/zip/basic-concepts/optimizing-batch-updates-to-folder). 
:::

## Demonstration

This example demonstrates how to extract items from a Tar archive to a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.GZip;
      using Xceed.FileSystem;

      TarArchive tar = new TarArchive( new GZippedFile( new DiskFile( "c:\\test.tar.gz" ),
                                                        "test.tar" ) );

      DiskFolder folder = new DiskFolder( "c:\\temp" );

      tar.CopyFilesTo( folder, true, true ); 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Tar
    Imports Xceed.GZip
    Imports Xceed.FileSystem

    Dim tar As New TarArchive( New GZippedFile( NewDiskFile( "c:\test.tar.gz" ), _
                                                "test.tar" ) )

    Dim folder As New DiskFolder( "c:\temp" )

    tar.CopyFilesTo( folder, True, True )
    ```
  </TabItem>
</Tabs>

This example demonstrates how to extract items from a non-GZipped Tar archive to a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Tar;
      using Xceed.FileSystem;

      TarArchive tar = new TarArchive( new DiskFile( "c:\\test.tar" ) );
      DiskFolder folder = new DiskFolder( "c:\\temp" );

      tar.CopyFilesTo( folder, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Tar
    Imports Xceed.FileSystem

    Dim tar As New TarArchive( New DiskFile( "c:\test.tar" ) )
    Dim folder As New DiskFolder( "c:\temp" )

    tar.CopyFilesTo( folder, True, True )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when extracting items from a Tar archive are:

- Do you want to filter (specify specific files and folders) the items that are to be extracted? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods.