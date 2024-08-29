import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting items from a zip file (unzipping)

This topic demonstrates how to extract files and folders from a zip file to a destination folder. With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

When unzipping the contents of a spanned zip file, the **last** disk must be in the drive before the operation begins (when the instance of the ZipArchive class has been created).

## Basic steps

To extract items from a zip file, the following steps must be performed:

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. 

- Retrieve a reference to a folder where the files will be extracted to using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes. 

- Call the `CopyFilesTo` method to copy the entire contents of the zip to the destination folder.

## Demonstration

This example demonstrates how to unzip files from a zip file to a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      ZipArchive zip = new ZipArchive( new DiskFile( @"c:\test.zip" ) );
      DiskFolder folder = new DiskFolder( @"c:\temp" ); 

      zip.CopyFilesTo( folder, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem   

      Dim zip As New ZipArchive( New DiskFile( "c:\test.zip" ) )
      Dim folder As New DiskFolder( "c:\temp" ) 

      zip.CopyFilesTo( folder, true, true )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when extracting items from a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be unzipped? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class.