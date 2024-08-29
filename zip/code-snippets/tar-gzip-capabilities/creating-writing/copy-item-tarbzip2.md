import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying items to Tar/Bzip2 archive

Xceed Zip for .NET contains FileSystem (derived from AbstractFile/AbstractFolder) clases for Tar. However, it only contains FileSystem classes for GZip and not BZip2.

However, our streaming compression component, Xceed.Compression.Formats, contains a BZip2 compressed stream class. Using that, Tar/BZip2 (.Tbz) archives can be created.


<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      static void Example()
      {
        Xceed.Tar.Licenser.LicenseKey = "<your ZIN license key>";
        Xceed.Compression.Formats.Licenser.LicenseKey = "<your ZIN license key>";

        AbstractFile tbzFile;

        // Select the Tar-BZip2 file
        tbzFile = new DiskFile( "Example.tbz" );

        // If the Tar-BZip2 file already exists
        if( tbzFile.Exists )
          // Delete it. We want to create a new archive, not update an existing one
          tbzFile.Delete();

        // Create and open the Tar-BZip2 file
        using( Stream stream = tbzFile.CreateWrite() )
        {
          // Wrap the file stream with a BZip2 stream
          using( BZip2CompressedStream bzip2Stream = new BZip2CompressedStream( stream ) )
          {
            // Wrap the BZip2 stream with a StreamFile object so we can feed it to FileSystem calls
            StreamFile streamFile = new StreamFile( bzip2Stream );

            // Create a logical Tar archive around the BZip2 stream file
            TarArchive tar = new TarArchive( streamFile );

            // Select a source folder
            AbstractFolder sourceFolder = new DiskFolder( @"D:\Data" );

            using( AutoBatchUpdate batch = new AutoBatchUpdate( tar ) )
            {
              // Add the files from the source folder to the archive
              sourceFolder.CopyFilesTo( tar, true, true );
            }
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

      Dim tbzFile As AbstractFile

      ' Select the Tar-BZip2 file
      tbzFile = New DiskFile("Example.tbz")

      ' If the Tar-BZip2 file already exists
      If tbzFile.Exists Then
        ' Delete it. We want to create a new archive, not update an existing one
        tbzFile.Delete()
      End If

      ' Create and open the Tar-BZip2 file
      Using stream As Stream = tbzFile.CreateWrite()
        ' Wrap the file stream with a BZip2 stream
        Using bzip2Stream As New BZip2CompressedStream(stream)
          ' Wrap the BZip2 stream with a StreamFile object so we can feed it to FileSystem calls
          Dim streamFile As New StreamFile(bzip2Stream)

          ' Create a logical Tar archive around the BZip2 stream file
          Dim tar As New TarArchive(streamFile)

          ' Select a source folder
          Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Data")

          Using batch As New AutoBatchUpdate(tar)
            ' Add the files from the source folder to the archive
            sourceFolder.CopyFilesTo(tar, True, True)
          End Using
        End Using
      End Using
    End Sub
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