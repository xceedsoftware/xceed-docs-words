import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reading and writing nested Zip archives

The following examples show how to use the ZipReader.GetItemDataStream and ZipWriter.GetItemDataStream methods to allow the component to easily handle nested zip archives.

A nested zip archive is when an item in an archive is another zip archive. By providing the stream returned by the method to a new instance of ZipWriter or ZipReader, a nested zip file will be created or read.

The first example shows how the ZipWriter.GetItemDataStream() method can be used to create a nested Zip archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      private void NestedArchiveExample( Stream someStream )
      {
        using( ZipWriter writer = new ZipWriter( someStream ) )
        {
          ZipItemLocalHeader header = new ZipItemLocalHeader();

          header.FileName = "File1.zip";
          writer.WriteItemLocalHeader( header );

          // Create a write stream that wraps the item's data
          using( Stream itemStream = writer.GetItemDataStream() )
          {
            // Feed the item stream to a new instance of ZipWriter
            using( ZipWriter nestedWriter = new ZipWriter( itemStream ) )
            {
              /* The 'using' statement will insure the nested zip file is properly terminated */

              // Add an item and some data into the nested zip file
              header.FileName = "File1.dat";
              nestedWriter.WriteItemLocalHeader( header );
              nestedWriter.WriteItemData( MediumFile1 );
            }
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Private Sub NestedArchiveExample(ByVal someStream As Stream)
      Using writer As New ZipWriter(someStream)
        Dim header As New ZipItemLocalHeader()

        header.FileName = "File1.zip"
        writer.WriteItemLocalHeader(header)

        ' Create a write stream that wraps the item's data
        Using itemStream As Stream = writer.GetItemDataStream()
          ' Feed the item stream to a new instance of ZipWriter
          Using nestedWriter As New ZipWriter(itemStream)
            ' The 'using' statement will insure the nested zip file is properly terminated

            ' Add an item and some data into the nested zip file
            header.FileName = "File1.dat"
            nestedWriter.WriteItemLocalHeader(header)
            nestedWriter.WriteItemData(MediumFile1)
          End Using
        End Using
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

The second example shows how the ZipReader.GetItemDataStream method can be used to read a nested Zip archive.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      private void ReadZipArchive( Stream archiveStream )
      {
        using( ZipReader reader = new ZipReader( archiveStream ) )
        {
          ZipItemLocalHeader header;

          while( ( header = reader.ReadItemLocalHeader() ) != null )
          {
            /* The component will not automatically identity what is and is
            * not a nested zip file. The application needs to have its own mechanism.
            *
            * This example will keep it simple and just look at the item's file name extension. */

            // If the item's extension is .zip
            if( StringComparer.OrdinalIgnoreCase.Compare( Path.GetExtension( header.FileName ), ".zip" ) == 0 )
            {
              // Create a read stream that wraps the item's data
              using( Stream itemStream = reader.GetItemDataStream() )
              {
                /* NOTE: While using a recursive call here makes for elegant and compact code that
                * helps illustrate the concept of nested zip archives, a maliciously crafted zip file
                * made up of a large number of nested zip files could make this code cause a stack overflow
                * due to excessive recursion. */

                // Call ourselves to read the nested archive
                this.ReadZipArchive( itemStream );
              }

              /* IMPORTANT: Before we can move on to the next item in the archive, ZipReader must have
              * reached the end of the current item's data. Reading a nested zip file does not ensure
              * this, so we need to make sure here by reading any remaining data into a dummy stream.
              *
              * Failure to do this will result in a ZipReaderException that reports that the object
              * is not in the correct state to read the next item header. */

              // Make sure we reach the end of the item's data
              reader.ReadItemData( Stream.Null );
            }
            else
            {
              // This example does not concern itself with normal items
              reader.ReadItemData( Stream.Null );
            }
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Private Sub ReadZipArchive(ByVal archiveStream As Stream)
      Using reader As New ZipReader(archiveStream)
        Dim header As ZipItemLocalHeader

        header = reader.ReadItemLocalHeader()
        Do While header IsNot Nothing
    '      The component will not automatically identity what is and is
    '      not a nested zip file. The application needs to have its own mechanism.
    '     
    '      This example will keep it simple and just look at the item's file name extension.

          ' If the item's extension is .zip
          If StringComparer.OrdinalIgnoreCase.Compare(Path.GetExtension(header.FileName), ".zip") = 0 Then
            ' Create a read stream that wraps the item's data
            Using itemStream As Stream = reader.GetItemDataStream()
    '          NOTE: While using a recursive call here makes for elegant and compact code that
    '          helps illustrate the concept of nested zip archives, a maliciously crafted zip file
    '          made up of a large number of nested zip files could make this code cause a stack overflow
    '          due to excessive recursion.

              ' Call ourselves to read the nested archive
              Me.ReadZipArchive(itemStream)
            End Using

    '        IMPORTANT: Before we can move on to the next item in the archive, ZipReader must have
    '        reached the end of the current item's data. Reading a nested zip file does not ensure
    '        this, so we need to make sure here by reading any remaining data into a dummy stream.
    '       
    '        Failure to do this will result in a ZipReaderException that reports that the object
    '        is not in the correct state to read the next item header.

            ' Make sure we reach the end of the item's data
            reader.ReadItemData(Stream.Null)
          Else
            ' This example does not concern itself with normal items
            reader.ReadItemData(Stream.Null)
          End If
          header = reader.ReadItemLocalHeader()
        Loop
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>