---
title: Compressing a stream
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Compressing stream data

This topic demonstrates how to compress data that is read from a `FileStream` to a `MemoryStream` using the `XceedCompressedStream` class.

Although we are using a FileStream as our source and a MemoryStream as our destination, we could have also used any other type of stream. For example, we could have compressed data read from a MemoryStream to another MemoryStream or to a FileStream.

## Basic steps

To copy items to a zip file, the following steps must be performed:

1- Create the source stream from which the data will be read. For the purposes of this example, our source stream will be a FileStream. But it can be any Stream object from any source as long as data can be read from it. No 'seek' or 'write' capabilities are needed.

2- Create the destination stream to which the compressed data will be written. For the purposes of this example, our destination stream will be a MemoryStream. It can be any Stream object for any destination as long as data can be written to it. No 'seek' or 'read' capabilities are needed.

3- Create a compressed stream object around the destination stream. For the purposes of this example we used the XceedCompressedStream class. However, we could have also used the GZipCompressedStream or the ZLibCompressedStream classes interchangibly. All the classes work the same. Only the parameters to the constructors change.

4- Read the uncompressed data from the source stream.

5- Write the data to the compressed stream object. Writing to the object compresses the data and, in turn, writes the compressed data to the destination stream.

## Example

The following example demonstrates how to read data from a FileStream and compress it to a MemoryStream using the XceedCompressedStream class.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using System.IO;

      using Xceed.Compression;
      using Xceed.Compression.Formats;

      namespace FileSystemDocumentationExamples.CompressionComponent
      {
        public class CompressXceedCompressedStreamExample
        {
          public void MyMainMethod()
          {
            /* Because Xceed.Compression.Formats is an optional assembly not automatically
              unlocked by Xceed Zip for .NET, we must explicitly set our license key to it
              before use or else an exception will be thrown. */
            Xceed.Compression.Formats.Licenser.LicenseKey = "<your Xceed Zip for .NET license key>";
          }

          public void Example()
          {
            /* Setup a destination data stream. This can be any Stream object for any destination as
              long as data can be written to it. No 'seek' or 'read' capabilities are needed. */
            MemoryStream destinationStream = new MemoryStream();

            /* Setup a source data stream. This can be any Stream object from any source as
              long as data can be read from it. No 'seek' or 'write' capabilities are needed. */
            using( FileStream sourceStream = new FileStream( @"D:\data.txt", FileMode.Open, FileAccess.Read, FileShare.Read ) )
            {
              /* Optional: the compression method and level can be specified. */
              CompressionMethod compressionMethod = CompressionMethod.Deflated;
              CompressionLevel compressionLevel = CompressionLevel.Normal;
              string password = String.Empty;

              // Optional: the data will be encrypted if a non-empty password is specified
              //password = "password";

              // Create a XceedCompressedStream that wraps around our destination stream
              using( XceedCompressedStream xceedCompressedStream = new XceedCompressedStream( destinationStream, compressionMethod, compressionLevel, false, password ) )
              {
                /* The XceedCompressedStream automatically closes the destination
                  memory stream. So there is no need to declare the memory stream within a using
                  statement or to call Close() once we are done with the stream.
                  
                  If you do not want the inner stream to be closed by the XceedCompressedStream,
                  set its Transient property to true. */

                // Optional: Prevent XceedCompressedStream from closing 'destinationStream' automatically
                //xceedCompressedStream.Transient = true;

                int bytesRead;

                // Setup a 32K buffer
                byte[] buffer = new byte[ 32 * 1024 ];

                // Read from the source stream until there is no more data
                while( ( bytesRead = sourceStream.Read( buffer, 0, buffer.Length ) ) > 0 )
                {
                  // Compress the data by writing into the compressed stream
                  // Compressed data will be written into its InnerStream, in our case, 'destinationStream'
                  xceedCompressedStream.Write( buffer, 0, bytesRead );
                }
              }
            }

            /* Optional: The MemoryStream's compressed data can be copied to a byte array, you can use
              MemoryStream.ToArray(). The method works even when the memory stream has been closed. */
            //byte[] compressedData = destinationStream.ToArray();
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports System.IO

    Imports Xceed.Compression
    Imports Xceed.Compression.Formats

    Namespace FileSystemDocumentationExamples.CompressionComponent
      Public Class CompressXceedCompressedStreamExample
        Public Sub MyMainMethod()
    '       Because Xceed.Compression.Formats is an optional assembly not automatically
    '         unlocked by Xceed Zip for .NET, we must explicitly set our license key to it
    '         before use or else an exception will be thrown. 
          Xceed.Compression.Formats.Licenser.LicenseKey = "<your Xceed Zip for .NET license key>"
        End Sub

        Public Sub Example()
    '       Setup a destination data stream. This can be any Stream object for any destination as
    '         long as data can be written to it. No 'seek' or 'read' capabilities are needed. 
          Dim destinationStream As New MemoryStream()

    '       Setup a source data stream. This can be any Stream object from any source as
    '         long as data can be read from it. No 'seek' or 'write' capabilities are needed. 
          Using sourceStream As New FileStream("D:\data.txt", FileMode.Open, FileAccess.Read, FileShare.Read)
            ' Optional: the compression method and level can be specified. 
            Dim compressionMethod As CompressionMethod = CompressionMethod.Deflated
            Dim compressionLevel As CompressionLevel = CompressionLevel.Normal
            Dim password As String = String.Empty

            ' Optional: the data will be encrypted if a non-empty password is specified
            'password = "password";

            ' Create a XceedCompressedStream that wraps around our destination stream
            Using xceedCompressedStream As New XceedCompressedStream(destinationStream, compressionMethod, compressionLevel, False, password)
    '           The XceedCompressedStream automatically closes the destination
    '             memory stream. So there is no need to declare the memory stream within a using
    '             statement or to call Close() once we are done with the stream.
    '            
    '             If you do not want the inner stream to be closed by the XceedCompressedStream,
    '             set its Transient property to true. 

              ' Optional: Prevent XceedCompressedStream from closing 'destinationStream' automatically
              'xceedCompressedStream.Transient = true;

              Dim bytesRead As Integer

              ' Setup a 32K buffer
              Dim buffer(32 * 1024 - 1) As Byte

              ' Read from the source stream until there is no more data
              bytesRead = sourceStream.Read(buffer, 0, buffer.Length)
              Do While bytesRead > 0
                ' Compress the data by writing into the compressed stream
                ' Compressed data will be written into its InnerStream, in our case, 'destinationStream'
                xceedCompressedStream.Write(buffer, 0, bytesRead)
                bytesRead = sourceStream.Read(buffer, 0, buffer.Length)
              Loop
            End Using
          End Using

    '       Optional: The MemoryStream's compressed data can be copied to a byte array, you can use
    '         MemoryStream.ToArray(). The method works even when the memory stream has been closed. 
          'byte[] compressedData = destinationStream.ToArray();
        End Sub
      End Class
    End Namespace
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to copy a file rather than a folder or its contents? Create a DiskFile class rather than a `DiskFolder` class. 

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you want to add items into a specific folder within the zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's `DefaultExtraHeaders` property.

**All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.**