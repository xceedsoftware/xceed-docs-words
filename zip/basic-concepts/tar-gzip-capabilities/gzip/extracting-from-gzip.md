import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting from a gzip file

This topic demonstrates how to extract a file from a GZip archive to a destination folder. With Xceed’s FileSystem-based products, a file is a file: it does not matter if it is located on disk or in memory, etc.

:::note
FileSystem-based GZip is not currently available in Xceed's .NET Compact Framework products.
:::

## Basic steps

To extract items from a GZip archive, the following steps must be performed:

- Retrieve a reference to a GZip archive using the `GZipArchive` class. 

- Retrieve a reference to a folder where the files will be extracted to using an AbstractFolder-derived class such as `DiskFolder`, `MemoryFolder`, `IsolatedFolder`, `ZipArchive`, `FtpFolder`, etc. 

- Call the `CopyFilesTo` method to copy the GZipped files to the destination folder.

## Demonstration

This example demonstrates how to extract a GZipped file from a GZip archive to a folder located on disk.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;
      using Xceed.FileSystem;

      GZipArchive gzip = new GZipArchive( new DiskFile( @"c:\test.gz" ) );
      DiskFolder folder = new DiskFolder( @"c:\temp" );

      gzip.CopyFilesTo( folder, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.GZip
      Imports Xceed.FileSystem   

      Dim gzip As New GZipArchive( New DiskFile( "c:\test.gz" ) )
      Dim folder As New DiskFolder( "c:\temp" )

      gzip.CopyFilesTo( folder, true, true )
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when extracting items from a GZip archive are:

- Do you want to move items rather than copy them? Use the MoveTo method.