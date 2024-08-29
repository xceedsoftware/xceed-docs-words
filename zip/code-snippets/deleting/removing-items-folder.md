import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a folder

This topic demonstrates how to remove items from a folder by retrieving a reference to a file. With Xceed's FileSystem-based products, a file is a file: it does not matter if it is located within a zip file, on disk or in memory.

## Basic steps

To remove items from a folder, the following steps must be performed:

- Retrieve a reference to a file using an AbstractFile-derived class appropriate for the file you need to work with, such as `DiskFile`, `ZippedFile`, `MemoryFile`, `IsolatedFile`, `TarredFile`, `FtpFile`, etc. 

- Once we have a reference to a file, we verify the Exists property to make sure that the file actually exists. 

- Call the `Delete` method to delete the file.

## Demonstration

This example demonstrates how to remove a file from within a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;

      DiskFile f = new DiskFile( @"c:\test.txt" ); 

      if ( f.Exists )
      {
        f.Delete();
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.FileSystem

    Dim f As New DiskFile( "c:\test.txt" ) 

    If f.Exists Then
      f.Delete()
    End If
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be deleted? Use `filters`. 

- Do you want to remove a specific folder? Retrieve a reference to a folder using an `AbstractFolder`-derived class such as `DiskFolder`, `ZippedFolder`, `ZipArchive`, MemoryFolder, `IsolatedFolder`, `FtpFolder`, etc. 

- Do you already have a reference to a folder? Use the `GetFolder` or `GetFile` method to retrieve a reference on the file or folder to remove.