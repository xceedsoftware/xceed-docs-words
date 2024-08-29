---
title: Performing multi-file GZip operations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multi-file operations

This topic demonstrates how to handle multiple files in a GZip archive: listing its contents and adding an item. 

Although Xceed’s implementation of GZip allows you to read and create multi-file GZip archives, it is not recommended to store multiple files in a GZip archive, for two reasons. First, most popular archiving applications do not fully support multi-file GZip archives. Second, GZip archives possess no central header to indicate where each compressed file is stored, so when you extract a specific file from a GZip archive, each GZipped file preceding that file must first be decompressed. As a result, multi-file GZip archives can be very inefficient. It is strongly recommended that you combine the compression capabilities of GZip with the archiving capabilities of Tar instead. See the topics in the **Xceed Tar** book for details. 

To handle multi-file GZip archives, set the static boolean property `AllowMultipleFiles` of the `GZipArchive` class to true. By default, this property is set to false. If you attempt to create a multi-file GZip archive when this property is set to false, an exception will be thrown. If you attempt to read a multi-file GZip archive when this property is false, only the first file will be read

:::note
FileSystem-based GZip is not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To list the contents of a multi-file GZip archive, the following steps must be performed:

- Set the static `AllowMultipleFiles` property to true. If you do not do this, only the first file will be read. Note also that you must do this before retrieving the `GZipArchive` reference. 

- Retrieve a reference to a GZip archive using the `GZipArchive` class. 

- Call the GetFiles method to retrieve a listing of the files contained within the GZip archive. 

- You can now loop through the files and extract the desired information.

To create a multi-file GZip archive, the following steps must be performed:

- Set the static `AllowMultipleFiles` property to true. 

- Retrieve a reference to a GZip archive using the `GZipArchive` class. 

- Retrieve a reference to a source using an ` `-derived class. 

- Call the `CopyFilesTo` method on the source, passing the destination GZip archive.

:::note
You should **always** pass *false* (C#) or *False* (VB.NET) to the *recursive* parameter of the `CopyFilesTo` method when copying to a `GZipArchive` (the same applies to using the `MoveFilesTo` method with a GZipArchive), because the GZip format does not allow subfolders. If you set the *recursive* parameter to *true/True*, and if there are subfolders present in the folder you are attempting to copy or move, an exception will be thrown.
:::

## Demonstration

This example demonstrates how to list the contents of a multi-file GZip archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;
      using Xceed.FileSystem; 

      //This property must be set before the GZipArchive is created.
      GZipArchive.AllowMultipleFiles = true; 

      GZipArchive gzip = new GZipArchive( new DiskFile( @"c:\test.gz" ) ); 

      foreach( AbstractFile f in gzip.GetFiles( true ) )
      {
          Console.WriteLine( f.FullName );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.GZip
    Imports Xceed.FileSystem

    ' This property must be set before the GZipArchive is created.
    GZipArchive.AllowMultipleFiles = True

    Dim gzip As New GZipArchive(New DiskFile("c:\test.gz"))
    Dim f As AbstractFile

    For Each f In gzip.GetFiles( True )
      ListBox1.Items.Add( f.FullName )
    Next
    ```
  </TabItem>
</Tabs>

This example demonstrates how to create a multi-file GZip archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;
      using Xceed.FileSystem; 

      // This property must be set before the GZipArchive is created.
      GZipArchive.AllowMultipleFiles = true; 

      AbstractFolder source = new DiskFolder(@"c:\temp");
      AbstractFolder gzip = new GZipArchive(new DiskFile(@"c:\test.gz")); 

      //The second parameter must false when using the CopyFilesTo method
      //with a GZip archive; otherwise, an exception will be thrown if
      //subfolders are present in the source.
      source.CopyFilesTo(gzip, false, true);
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.GZip
    Imports Xceed.FileSystem

    'This property must be set before the GZipArchive is created.
    GZipArchive.AllowMultipleFiles = True 

    Dim source As New DiskFolder(@"c:\temp")
    Dim gzip As New GZipArchive(new DiskFile(@"c:\test.gz")) 

    'The second parameter must False when using the CopyFilesTo
    'method with a GZip archive; otherwise, an exception will be
    'thrown if subfolders are present in the source.

    source.CopyFilesTo(gzip, False, True)
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when performing these operations with a GZip archive are:

- Do you want to filter (specify specific files and folders) the items that are to be listed? Use `filters`. 

- Do you want to retrieve a reference to a single GZipped file? Use the `GetFile` method. 