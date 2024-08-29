import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a folder

This topic demonstrates how to list the contents of a folder. With Xceed's FileSystem-based products, a folder is a folder: it does not matter if it is located within a zip file, on disk or in memory.

## Basic steps

To list the contents of a folder, the following steps must be performed:

- Retrieve a reference to a folder using an AbstractFolder-derived class appropriate for the folder you need to work with, such as `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder`, `IsolatedFolder`, `FtpFolder`, etc. 

- Call the `GetFiles` method to retrieve a listing of the files contained within the folder. 

- You can now loop through the files and extract the desired information. 

## Demonstration

This example demonstrates how to list the contents of a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;   

      DiskFolder folder = new DiskFolder( @"c:\temp" );

      foreach( AbstractFile f in folder.GetFiles( true ) )
      {
        Console.WriteLine( f.FullName );
      }   
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.FileSystem

    Dim folder As New DiskFolder( "c:\temp" )
    Dim f As AbstractFile 

    For Each f In folder.GetFiles( True )
      ListBox1.Items.Add( f.FullName )
    Next
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be listed? Use `filters`. 

- Do you also want to retrieve a listing of the folders? Use the `GetFolders` method. 

- Do you want to retrieve a listing of both files and folders? Use the `GetItems` method. 

- Do you want to retrieve a reference to a single file or folder? Use the `GetFile` or `GetFolder` methods. 