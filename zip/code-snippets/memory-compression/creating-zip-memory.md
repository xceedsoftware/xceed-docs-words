---
title: Creating a zip file in memory
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a zip file in memory

This topic demonstrates how to create a zip file in memory.

## Basic steps

To create a zip file in memory, the following steps must be performed:

- Retrieve a reference to a folder whose files will be added to the zip file using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes. With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. Because we want the zip file to reside in memory, we will use a `MemoryFile` in the constructor of the `ZipArchive` class. 

- Call the `CopyFilesTo` method to copy the entire contents of the folder to the zip file.

## Demonstration

This example demonstrates how to copy the contents of a folder located on disk to a zip file located in memory.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void ZipIntoMemory()
      {
        // Select a file that will be our zip file
        AbstractFile zipFile = new MemoryFile( "RAM_Disk", "CopyItemsToZip2.zip" );

        /* The component doesn't have distinct add and update operations.
          If you want any existing zip file to be overwritten, you need to delete the
          zip file before starting to perform any operation. */

        // If the zip file already exists
        if( zipFile.Exists )
          // Delete it
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        ZipArchive zip = new ZipArchive( zipFile );

        // Wrap the operations that modify the zip archive in a batch update
        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          // Select a source folder
          AbstractFile sourceFile = new DiskFile( @"D:\Data\File1.dat" );

          // Zip the files in the source folder into the zip archive
          sourceFile.CopyTo( zip, true );
        }

        /* To access the zipped data in memory, the application will open the
          zipped item for reading. Reading unzips data.
          Data will be read using a Stream object. Streaming allows data to be
          processed little by little, without having to create a large array to
          contain the entire data. */

        // Get the zipped item from the archive
        AbstractFile zippedFileInMemory = zip.GetFile( "File1.dat" );

        // Open the zipped item for reading
        using( Stream stream = zippedFileInMemory.OpenRead() )
        {
          // Create a read buffer
          int bufferLength = 8 * 1024;
          byte[] buffer = new byte[ bufferLength ];
          int read;

          // Attempt to unzip data
          read = stream.Read( buffer, 0, bufferLength );

          // While there is data to read
          while( read > 0 )
          {
            // TODO: Perform desired operation with the data read from the stream

            // Attempt to unzip more data
            read = stream.Read( buffer, 0, bufferLength );
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Public Shared Sub ZipIntoMemory()
      ' Select a file that will be our zip file
      Dim zipFile As AbstractFile = New MemoryFile("RAM_Disk", "CopyItemsToZip2.zip")

'       The component doesn't have distinct add and update operations.
'         If you want any existing zip file to be overwritten, you need to delete the
'         zip file before starting to perform any operation. 

      ' If the zip file already exists
      If zipFile.Exists Then
        ' Delete it
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Wrap the operations that modify the zip archive in a batch update
      Using batch As New AutoBatchUpdate(zip)
        ' Select a source folder
        Dim sourceFile As AbstractFile = New DiskFile("D:\Data\File1.dat")

        ' Zip the files in the source folder into the zip archive
        sourceFile.CopyTo(zip, True)
      End Using

'       To access the zipped data in memory, the application will open the
'         zipped item for reading. Reading unzips data.
'         Data will be read using a Stream object. Streaming allows data to be
'         processed little by little, without having to create a large array to
'         contain the entire data. 

      ' Get the zipped item from the archive
      Dim zippedFileInMemory As AbstractFile = zip.GetFile("File1.dat")

      ' Open the zipped item for reading
      Using stream As Stream = zippedFileInMemory.OpenRead()
        ' Create a read buffer
        Dim bufferLength As Integer = 8 * 1024
        Dim buffer(bufferLength - 1) As Byte
        Dim read As Integer

        ' Attempt to unzip data
        read = stream.Read(buffer, 0, bufferLength)

        ' While there is data to read
        Do While read > 0
          ' TODO: Perform desired operation with the data read from the stream

          ' Attempt to unzip more data
          read = stream.Read(buffer, 0, bufferLength)
        Loop
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you want to add items into a specific folder within the zip file? Create an instance of a ZippedFolder object rather than a `ZipArchive` object. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

-Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's `DefaultExtraHeaders` property.

**All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.**