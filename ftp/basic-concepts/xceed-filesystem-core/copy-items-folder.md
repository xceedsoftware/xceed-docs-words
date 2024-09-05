import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying items to a folder

This topic demonstrates how to copy items to a folder. With Xceed's FileSystem-based products, a folder is a folder: it does not matter if it is located within a zip file, on disk or in memory.

## Basic steps
To copy items to a folder, the following steps must be performed:

- Retrieve a reference to a folder using an `AbstractFolder`-derived class appropriate for the folder you need to work with, such as `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder`, `IsolatedFolder`, `FtpFolder`, etc. 

- Call the `CopyFilesTo` method to copy the files from the source folder (including subfolders that contain files) to the destination folder.

## Demonstration
This example demonstrates how to copy files from one disk folder to another.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;

      DiskFolder diskFolder = new DiskFolder( @"c:\temp" );
      diskFolder.CopyFilesTo( new DiskFolder( @"c:\destination" ), true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.FileSystem 

      Dim diskFolder As New DiskFolder( "c:\temp" )
      diskFolder.CopyFilesTo( New DiskFolder( "c:\destination" ), True, True )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying the contents of a folder are:

- Do you want to filter (specify specific files and folders) the items that are to be copied? Use [filters](/ftp/basic-concepts/filters/overview). 

- Do you also want to copy the folder? Use the `CopyTo` method instead of the `CopyFilesTo` method. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods.  