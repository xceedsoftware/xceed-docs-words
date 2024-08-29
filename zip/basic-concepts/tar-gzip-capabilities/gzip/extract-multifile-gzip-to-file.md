import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extract multi-file GZip archive to a single file

The following example demonstrates how to decompress a GZip archive that contains multiple segments that need to be concatenated into a single uncompressed destination file.

Typically, GZip is used to compress a single "stream". However, the file format allows for multiple streams to be archived in a single GZip file. These multiple streams can refer to different files but, the streams are often just segments of a single file that are meant to be concatenated into a single uncompressed file.

The GZip file format contains no field or flag that clearly indicates how the multiple streams are to be handled. Typically, they are meant to be concatenated into a single destination.

The default behavior of GZipArchive is to process the first file only and stop. This is because most GZip archives only contain one file. However, it is possible to make GZipArchive process all the segments in an archive and concatenate them into the destination file.

To enable the feature, the static property GZipArchive.AllowMultipleFiles must be set to 'true'. Then, the GZipArchive.CopyFilesTo() method is used, it takes a AbstractFile object as the destination instead of an AbstractFolder, meaning that the method will extract and concatenate all the files in the archive to the destination file.

:::note
FileSystem-based GZip is not currently available in Xceed's .NET Compact Framework products.
:::

## Steps
To extract items from a GZip archive to a single destination file, the following steps must be performed:

- Retrieve a reference to a GZip archive using the `GZipArchive` class. 

- Set the `GZipArchive.AllowMultipleFiles` to 'true'.

- Retrieve a reference to a file where the files will be extracted to using an `AbstractFile-derived` class such as `DiskFile`, `MemoryFile`, `FtpFile`, etc. 

- Call the `CopyFilesTo` method to copy the GZipped files to the destination file.

## Demonstration

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      static void Example()
      {
        // Select a GZip file
        AbstractFile gzipFile = new DiskFile( "MyFile.dat.gz" );

        // Select a destination file
        AbstractFile destinationFile = new DiskFile( "MyFile.dat" );

        /* By default, the component only sees or processes the first item it sees in the
        * archive. If our GZip file contains multiple segments making up a single file,
        * we need for the component "see" them. The AllowMultipleFiles property allows for that.
        * The segments will be seen as 'files' but that doesn't matter, we will use a special
        * implementation of CopyFilesTo() that extracts all the segments into a single
        * destination file. */

        // Allow the archive to see multiple files
        GZipArchive.AllowMultipleFiles = true;

        // Setup a logical GZip archive around the GZip file
        GZipArchive gzip = new GZipArchive( gzipFile );

        /* We need to extract all the segments of the archive into a single destination file.
        * GZipArchive contains a special flavor of CopyFilesTo() that takes an AbstractFile
        * as the destination. All the items in the archive will be extracted into the file,
        * one after the other. */

        // Extract all the segments from the archive to the destination file
        gzip.CopyFilesTo( destinationFile, true );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Private Shared Sub Example()
      ' Select a GZip file
      Dim gzipFile As AbstractFile = New DiskFile("MyFile.dat.gz")

      ' Select a destination file
      Dim destinationFile As AbstractFile = New DiskFile("MyFile.dat")

'       By default, the component only sees or processes the first item it sees in the
'       * archive. If our GZip file contains multiple segments making up a single file,
'       * we need for the component "see" them. The AllowMultipleFiles property allows for that.
'       * The segments will be seen as 'files' but that doesn't matter, we will use a special
'       * implementation of CopyFilesTo() that extracts all the segments into a single
'       * destination file. 

      ' Allow the archive to see multiple files
      GZipArchive.AllowMultipleFiles = True

      ' Setup a logical GZip archive around the GZip file
      Dim gzip As New GZipArchive(gzipFile)

'       We need to extract all the segments of the archive into a single destination file.
'       * GZipArchive contains a special flavor of CopyFilesTo() that takes an AbstractFile
'       * as the destination. All the items in the archive will be extracted into the file,
'       * one after the other. 

      ' Extract all the segments from the archive to the destination file
      gzip.CopyFilesTo(destinationFile, True)
    End Sub
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when extracting items from a GZip archive are:

- Do you want to move items rather than copy them? Use the `MoveTo` method.