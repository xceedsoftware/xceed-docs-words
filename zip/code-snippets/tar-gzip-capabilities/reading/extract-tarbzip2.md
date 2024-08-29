import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting a Tar/BZip2 archive

Xceed Zip for .NET contains FileSystem (derived from AbstractFile/AbstractFolder) clases for Tar. However, it only contains FileSystem classes for GZip and not BZip2.

However, our streaming compression component, Xceed.Compression.Formats, contains a BZip2 compressed stream class. Using that, Tar/BZip2 (.Tbz) archives can be extracted.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      static void Example()
      {
        Xceed.Tar.Licenser.LicenseKey = "<your ZIN license key>";
        Xceed.Compression.Formats.Licenser.LicenseKey = "<your ZIN license key>";

        // Select the Tar-BZip2 file
        AbstractFile tbzFile = new DiskFile( "Example.tbz" );

        if( !tbzFile.Exists )
          // The file should exist
          throw new FileNotFoundException();

        // Open the Tbz file for reading
        using( Stream stream = tbzFile.OpenRead() )
        {
          // Wrap the stream around a BZip2CompressedStream
          using( BZip2CompressedStream bzip2Stream = new BZip2CompressedStream( stream ) )
          {
            // Select an extraction folder
            AbstractFolder destinationFolder = new DiskFolder( @"Output" );

            // Wrap the stream around a StreamFile so we can pass it to FileSystem objects
            StreamFile streamFile = new StreamFile( bzip2Stream );

            /* Because bzip2Stream is a non-seekable stream, we can't use the normal
            * TarArchive class because it seeks in the archive to enumerate and extract
            * items. Instead, we will use the StreamingTar.Untar() static method.
            *
            * As the name implies, StreamingTar uses a streaming approach and doesn't seek
            * in the archive. This works well with BZip2CompressedStream. */

            // Decompress and dearchive all the items in the tar archive
            Xceed.Tar.Streaming.StreamingTar.Untar( streamFile, destinationFolder, true );
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Private Shared Sub Example()
      Xceed.Tar.Licenser.LicenseKey = "<your ZIN license key>"
      Xceed.Compression.Formats.Licenser.LicenseKey = "<your ZIN license key>"

      ' Select the Tar-BZip2 file
      Dim tbzFile As AbstractFile = New DiskFile("Example.tbz")

      If (Not tbzFile.Exists) Then
        ' The file should exist
        Throw New FileNotFoundException()
      End If

      ' Open the Tbz file for reading
      Using stream As Stream = tbzFile.OpenRead()
        ' Wrap the stream around a BZip2CompressedStream
        Using bzip2Stream As New BZip2CompressedStream(stream)
          ' Select an extraction folder
          Dim destinationFolder As AbstractFolder = New DiskFolder("Output")

          ' Wrap the stream around a StreamFile so we can pass it to FileSystem objects
          Dim streamFile As New StreamFile(bzip2Stream)

'           Because bzip2Stream is a non-seekable stream, we can't use the normal
'           * TarArchive class because it seeks in the archive to enumerate and extract
'           * items. Instead, we will use the StreamingTar.Untar() static method.
'           *
'           * As the name implies, StreamingTar uses a streaming approach and doesn't seek
'           * in the archive. This works well with BZip2CompressedStream. 

          ' Decompress and dearchive all the items in the tar archive
          Xceed.Tar.Streaming.StreamingTar.Untar(streamFile, destinationFolder, True)
        End Using
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when extracting items from a GZip archive are:

- Do you want to move items rather than copy them? Use the `MoveTo` method.