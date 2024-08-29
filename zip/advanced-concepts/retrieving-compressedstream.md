import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Retrieving a CompressedStream's remaining data

By default, the `CompressedStream` class closes the inner stream around which it is created once the compressed data has been decompressed. It is however possible to continue reading the inner stream's data once the compressed data has been decompressed.

## Retrieving the remaining data

If the Transient property of the CompressedStream class is set to false, it will close its inner stream once the compressed data has been decompressed. In order to continue reading the inner stream's remaining data, the Transient property **must** be set to true. This will prevent the inner stream from being closed by the compressed stream. 

Because the CompressedStream class always read 32K at a time, if the size of the compressed data is not a multiple of 32, the CompressedStream class will read more than necessary. For example, if the total size of the compressed data is 42K, the first call to Read will read 32K and so will the second even if there was only 10K of compressed data left to read. Both the first and second calls will return the corresponding decompressed data. The third call to Read will return 0 meaning that the end of the compressed section of the stream has been reached. The extra data that was read will be discarded. 

To continue reading the stream once the compressed data has been decompressed, you **could** simply close the CompressedStream and continue reading the inner stream however you might not be positioned at the correct location in the case where too much data was read. In order to circumvent this behavior, you can use the GetRemainingStream method. The `GetRemainingStream` method will return a stream which starts immediately after the last byte of compressed data allowing you to continue reading the data.

In the case where more than one chunks of compressed data are appended to each other in the same stream, you can use the GetRemainingStream method to decompress the next chunk of compressed data (demonstrated in the example below ). 

Keep in mind that closing the stream returned by the GetRemainingStream method will **not** close the inner stream. You will need to call the inner stream's Close method yourself once you are finished with the returned stream.  

## Demonstration

The following example demonstrates how to decompress appended chunks of compressed data contained within the same network stream.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Compression;
      using Xceed.FileSystem;
      using System.IO;
      using System.Net.Sockets;

      using( TcpClient client = new TcpClient( "MyServer", 42 ) )
      {
         // The returned stream does not close the connection when closed.
         // It does not have ownership of the socket.
         using( NetworkStream stream = client.GetStream() )
         {
            UncompressNextChunk( stream, new DiskFolder( @"d:\folder" ), 1 );
         }
      }

      public static void UncompressNextChunk( Stream sourceStream,
                                             DiskFolder destFolder,
                                             int chunkCount )
      {
         // We want to decompress the next chunk from the source stream.
         using( CompressedStream compStream = new CompressedStream( sourceStream ) )
         {
            // But since we'll want to access the data following the compressed
            // data in that source stream, we don't want the compressed stream to
            // close it.
            compStream.Transient = true;
            DiskFile destFile = ( DiskFile )destFolder.GetFile( "Chunk" + chunkCount.ToString() + ".txt" ); 

            if( !destFile.Exists )
               destFile.Create(); 

            bool endOfStream = true; 

            using( Stream destStream = destFile.OpenWrite( true ) )
            {
               byte[] buffer = new byte[ 32768 ];
               int read = 0; 

               while( ( read = compStream.Read( buffer, 0, buffer.Length ) ) > 0 )
               {
                  endOfStream = false;
                  destStream.Write( buffer, 0, read );
               }
            }
      
         // If we could not decompress anything at all, we consider this the
            // real end of stream.
            if( endOfStream )
               return; 

            // Before closing the compressed stream, we want to grab a stream on
            // the rest of the data. We cannot simply take sourceStream, since the
            // CompressedStream may have read more than the compressed data. And to
            // avoid having too many resources "alive", we delay calling ourselves
            // recursively after closing the compressed stream, though it would be
            // perfectly valid to make the call right here.
            sourceStream = compStream.GetRemainingStream();
         } 

         // We call ourselves recursively, with the stream returned by GetRemainingStream.
         UncompressNextChunk( sourceStream, destFolder, chunkCount + 1 );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Compression
      Imports Xceed.FileSystem
      Imports System.IO
      Imports System.Net.Sockets

      Dim client As New  TcpClient( "MyServer", 42 )

      ' The returned stream does not close the connection when closed.
      ' It does not have ownership of the socket.
      Dim stream As NetworkStream = client.GetStream()UncompressNextChunk( stream, _
                                                          New DiskFolder( "d:\folder" ), 1 )
      stream.Close()client.Close()   

      Public Sub UncompressNextChunk( ByVal sourceStream As Stream, _
                                      ByVal destFolder As DiskFolder, _
                                      ByVal chunkCount As Integer )

        ' We want to decompress the next chunk from the source stream.
        Dim compStream As New CompressedStream( sourceStream )

        ' But since we'll want to access the data following the compressed
        ' data in that source stream, we don't want the compressed stream to
        ' close it.
        compStream.Transient = True 

        Dim destFile As DiskFile = CType( destFolder.GetFile( "Chunk" + chunkCount.ToString() + ".txt" ), _ DiskFile )

        If Not destFile.Exists Then
            destFile.Create()
        End If 

        Dim endOfStream As Boolean = True
        Dim destStream As Stream = destFile.OpenWrite( true )
        Dim buffer( 32768 ) As Byte
        Dim read As Integer = 0  

        Doread = compStream.Read( buffer, 0, buffer.Length )

        If read > 0 Then
            endOfStream = False
            destStream.Write( buffer, 0, read )
        End If

        Loop Until read = 0 destStream.Close() 
            ' If we could not decompress anything at all, we consider this the
            ' real end of stream.
            If endOfStream Then
              return
            End If

            ' Before closing the compressed stream, we want to grab a stream on
            ' the rest of the data. We cannot simply take sourceStream, since the
            ' CompressedStream may have read more than the compressed data. And to
            ' avoid having too many resources "alive", we delay calling ourselves
            ' recursively after closing the compressed stream, though it would be
            ' perfectly valid to make the call right here.
            sourceStream = compStream.GetRemainingStream()compStream.Close() 

            ' We call ourselves recursively, with the stream returned by GetRemainingStream.
            UncompressNextChunk( sourceStream, destFolder, chunkCount + 1 )End Sub
    ```
  </TabItem>
</Tabs>