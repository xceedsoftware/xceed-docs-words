---
title: Decompressing a stream
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Decompressing stream data

This topic demonstrates how to decompress data that is read from a Stream to a `MemoryStream` using the `XceedCompressedStream` class.

Although we are using a `MemoryStream` as our source and a `FileStream` as our destination, we could have also used any other type of stream. For example, we could have decompressed data read from a `FileStream` to another `FileStream`.

## Basic steps

To decompress data that is read from a stream, the following steps must be taken:

1- Obtain the source stream from data will be read. This can be any Stream object from any source (file, memory, network, whatever) as long as data can be read from it. No 'seek' or 'write' capabilities are needed. It is assumed that the stream will contain compressed data produced by XceedCompressedStream.

2- Create a XceedCompressedStream around the source stream. For the purposes of this example we used the XceedCompressedStream class. However, we could have also used the `GZipCompressedStream` or the `ZLibCompressedStream` classes.

3- Create the destination stream to which the decompressed data will be written. For the purposes of this example, our destination stream will be a MemoryStream.

4- Read the data from the XceedCompressedStream. Reading from a compressed stream means that the data is automatically decompressed as it is read from its inner stream.

5- Write the decompressed data to the destination stream.

## Example

The following example demonstrates how to read compressed data from a MemoryStream and decompress it to a FileStream using the XceedCompressedStream class.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Compression;
      using Xceed.Compression.Formats;

      namespace FileSystemDocumentationExamples.CompressionComponent
      {
        public class DecompressXceedCompressedStreamExample
        {
          public void MyMainMethod()
          {
            /* Because Xceed.Compression.Formats is an optional assembly not automatically
              unlocked by Xceed Zip for .NET, we must explicitly set our license key to it
              before use or else an exception will be thrown. */
            Xceed.Compression.Formats.Licenser.LicenseKey = "<your Xceed Zip for .NET license key>";
          }

          public void Example( Stream compressedData )
          {
            /* 'compressedData' is assumed to contain the compressed data produced by XceedCompressedStream
              This can be any Stream object from any source (file, memory, network, whatever) as
              long as data can be read from it. No 'seek' or 'write' capabilities are needed.
            
              In the special case where 'compressedData' is the same Stream object that has been
              used as the destination stream for compression, the stream's position will need to be
              changed to the start of the compressed data. Otherwise, no compressed data will be
              found since the stream will be positioned at the end of the compressed data. */


            /* With XceedCompressedStream, the compression method of the compressed data is
              contained as part of the compressed stream. This is convenient as we don't need
              to remember the value. */

            // Optional: If the data was encrypted, supply the password
            string password = String.Empty;
            password = "password";

            // Create a XceedCompressedStream that wraps around our compressed source data
            using( XceedCompressedStream xceedCompressedStream = new XceedCompressedStream( compressedData, password ) )
            {
              /* The XceedCompressedStream automatically closes the destination
                stream. So there is no need to declare the stream within a using
                statement or to call Close() once we are done with the stream.
                  
                If you do not want the inner stream to be closed by the XceedCompressedStream,
                set its Transient property to true. */

              // Optional: Prevent XceedCompressedStream from closing 'destinationStream' automatically
              //xceedCompressedStream.Transient = true;

              byte[] uncompressedData = null;

              /* Setup a destination stream. This can be any Stream object for any destination as
                long as data can be written to it. No 'seek' or 'read' capabilities are needed. */
              using( MemoryStream destinationStream = new MemoryStream() )
              {
                int bytesRead;

                // Setup a 32K buffer
                byte[] buffer = new byte[ 32 * 1024 ];

                // Read from the source stream until there is no more data, this will decompress the data
                while( ( bytesRead = xceedCompressedStream.Read( buffer, 0, buffer.Length ) ) > 0 )
                {
                  // Compress the data by writing into the compressed stream
                  // Compressed data will be written into its InnerStream, in our case, 'destinationStream'
                  destinationStream.Write( buffer, 0, bytesRead );
                }

                /* Optional: The MemoryStream's compressed data can be copied to a byte array, you can use
                  MemoryStream.ToArray(). The method works even when the memory stream has been closed. */
                uncompressedData = destinationStream.ToArray();
              }
            }
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Compression
    Imports Xceed.Compression.Formats

    Namespace FileSystemDocumentationExamples.CompressionComponent
      Public Class DecompressXceedCompressedStreamExample
        Public Sub MyMainMethod()
    '       Because Xceed.Compression.Formats is an optional assembly not automatically
    '         unlocked by Xceed Zip for .NET, we must explicitly set our license key to it
    '         before use or else an exception will be thrown. 
          Xceed.Compression.Formats.Licenser.LicenseKey = "<your Xceed Zip for .NET license key>"
        End Sub

        Public Sub Example(ByVal compressedData As Stream)
    '       'compressedData' is assumed to contain the compressed data produced by XceedCompressedStream
    '         This can be any Stream object from any source (file, memory, network, whatever) as
    '         long as data can be read from it. No 'seek' or 'write' capabilities are needed.
    '       
    '         In the special case where 'compressedData' is the same Stream object that has been
    '         used as the destination stream for compression, the stream's position will need to be
    '         changed to the start of the compressed data. Otherwise, no compressed data will be
    '         found since the stream will be positioned at the end of the compressed data. 


    '       With XceedCompressedStream, the compression method of the compressed data is
    '         contained as part of the compressed stream. This is convenient as we don't need
    '         to remember the value. 

          ' Optional: If the data was encrypted, supply the password
          Dim password As String = String.Empty
          password = "password"

          ' Create a XceedCompressedStream that wraps around our compressed source data
          Using xceedCompressedStream As New XceedCompressedStream(compressedData, password)
    '         The XceedCompressedStream automatically closes the destination
    '           stream. So there is no need to declare the stream within a using
    '           statement or to call Close() once we are done with the stream.
    '            
    '           If you do not want the inner stream to be closed by the XceedCompressedStream,
    '           set its Transient property to true. 

            ' Optional: Prevent XceedCompressedStream from closing 'destinationStream' automatically
            'xceedCompressedStream.Transient = true;

            Dim uncompressedData() As Byte = Nothing

    '         Setup a destination stream. This can be any Stream object for any destination as
    '           long as data can be written to it. No 'seek' or 'read' capabilities are needed. 
            Using destinationStream As New MemoryStream()
              Dim bytesRead As Integer

              ' Setup a 32K buffer
              Dim buffer(32 * 1024 - 1) As Byte

              ' Read from the source stream until there is no more data, this will decompress the data
              bytesRead = xceedCompressedStream.Read(buffer, 0, buffer.Length)
              Do While bytesRead > 0
                ' Compress the data by writing into the compressed stream
                ' Compressed data will be written into its InnerStream, in our case, 'destinationStream'
                destinationStream.Write(buffer, 0, bytesRead)
                bytesRead = xceedCompressedStream.Read(buffer, 0, buffer.Length)
              Loop

    '           Optional: The MemoryStream's compressed data can be copied to a byte array, you can use
    '             MemoryStream.ToArray(). The method works even when the memory stream has been closed. 
              uncompressedData = destinationStream.ToArray()
            End Using
          End Using
        End Sub
      End Class
    End Namespace
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when decompressing data read from a stream are:

- Do you want to prevent the inner stream from being closed when the `XceedCompressedStream` is closed? Set the Transient property of the `XceedCompressedStream` class to true.

- Do you want to decompress data compressed using the GZip or ZLib compression formats? Use the `GZipCompressedStream` or the `ZLibCompressedStream` classes instead of the `XceedCompressedStream`.

- Do you want to decompress data that was compressed without a compression format (raw data)? Use the `CompressedStream` class.

- Do you only want a quick and easy way to decompress a compressed byte array? Use the static `Decompress` method of the desired compression format class.