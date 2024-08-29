---
title: Unzipping to memory
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting items to memory (unzipping)

This topic demonstrates how to extract files and folders from a zip file to a folder located in memory. With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

When unzipping the contents of a spanned zip file, the **last** disk must be in the drive before the operation begins (when the instance of the ZipArchive class has been created).

## Basic steps

To extract items from a zip file to memory, the following steps must be performed:

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. 

- Retrieve a reference to a new or existing folder using the `MemoryFolder` class. This is the location to which the files contained within the zip file will be extracted to. 

- Call the `CopyFilesTo` method to copy the entire contents of the zip to the destination folder.

## Demonstration

This example demonstrates how to unzip files from a zip file to a folder located in memory.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      ZipArchive zip = new ZipArchive( new DiskFile( @"d:\test.zip" ) ); 

      MemoryFolder folder = new MemoryFolder( "RAM_Drive", "folder" ); 

      zip.CopyFilesTo( folder, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Zip
    Imports Xceed.FileSystem 

    Dim zip As New ZipArchive( new DiskFile( "d:\test.zip" ) ) 

    Dim folder As New MemoryFolder( "RAM_Drive", "folder" ) 

    zip.CopyFilesTo( folder, true, true )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when compressing data read from a stream are:

- Do you want to filter (specify specific files and folders) the items that are to be unzipped? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods.