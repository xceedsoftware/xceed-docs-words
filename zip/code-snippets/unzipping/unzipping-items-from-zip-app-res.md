---
title: Unzipping items from zip file in an application's resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting items from a generic stream

The following example demonstrates how to extract the contents of a zip file which is located in the resources of an application using the StreamFile class. The StreamFile class implements access to any type of stream as though it were a file.

## Basic steps

To extract the contents of a zip file located in an application's resources, the following steps must be performed:

- Create a stream that accesses a zip file contained within the resources of an application This is done using the .NET Framework's GetManifestResourceStream method. 

- Initialize a new instance of the StreamFile class around the stream that accesses the zip file in the resources of the application specifying the name by which to access the zip file. 

- Retrieve a reference to the zip file in the resources using the `ZipArchive` class. 

- Retrieve a reference to a folder where the files will be extracted to using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes.   With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

- Copy the files from the zip file to a destination folder using the `CopyFilesTo` method.  With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory.

## Demonstration

The following example demonstrates how to extract files from a zip file located in an application's resources.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;
      using Xceed.Zip;

      Stream resources = this.GetType().Assembly.GetManifestResourceStream( "Resources.zip" );
      StreamFile file = new StreamFile( resources, "Resources.zip" );
      ZipArchive zip = new ZipArchive( file );
      DiskFolder destinationFolder = new DiskFolder( @"d:\Destination" ); 

      zip.CopyFilesTo( destinationFolder, false, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.FileSystem
    Imports Xceed.Zip

    Dim resources As Stream = Me.GetType().Assembly.GetManifestResourceStream( "Resources.zip" )
    Dim file As New StreamFile( resources, "Resources.zip" )
    Dim zip As New ZipArchive( file )
    Dim destinationFolder As New DiskFolder( "d:\Destination" )            

    ' Copy files from the zip file contained within the resources to a local folder.
    zip.CopyFilesTo( destinationFolder, false, true )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be unzipped? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method.          

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods.   