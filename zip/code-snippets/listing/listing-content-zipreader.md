import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a Zip archive using ZipReader

The following example demonstrates how to list the contents of a Zip archive using the `ZipReader`.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      static void ListContents()
      {
        // Create a list to contain the zipped item names
        List<string> filenames = new List<string>();

        // TODO: Somehow obtain a stream to the source Zip file
        using( Stream zipFileStream = ObtainZipFileStream() )
        {
          // Create a Zip reader object around the stream.
          // Remember that ZipReader doesn't close the underlying stream given here
          using( ZipReader zipReader = new ZipReader( zipFileStream ) )
          {
            // Optional. Provide the default password for encrypted items in the archive
            zipReader.EncryptionPassword = "Password";

            // Create a large buffer for speed
            byte[] buffer = new byte[ 1024 * 1024 ];
          
            ZipItemLocalHeader zipItemLocalHeader;

            // While the reader finds local headers
            while( ( zipItemLocalHeader = zipReader.ReadItemLocalHeader() ) != null )
            {
              // Add the filename to our list
              filenames.Add( zipItemLocalHeader.FileName );

              // Skip over the data using our buffer. This avoids recreating one each time
              zipReader.ReadItemData( Stream.Null, buffer, 0, buffer.Length );
            }
          
            // Optional. Have the reader give us the zip ending header
            ZipEndHeader endHeader = zipReader.ReadEndHeader();
          
            // If the header contains a global zip comment
            if( endHeader != null && !String.IsNullOrEmpty( endHeader.ZipComment ) )
            {
              // TODO: Do something with the global zip comment
            }
          }
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Shared Sub ListContents()
      ' Create a list to contain the zipped item names
      Dim filenames As List(Of String) = New List(Of String)()

      ' TODO: Somehow obtain a stream to the source Zip file
      Using zipFileStream As Stream = ObtainZipFileStream()
        ' Create a Zip reader object around the stream.
        ' Remember that ZipReader doesn't close the underlying stream given here
        Using zipReader As New ZipReader(zipFileStream)
          ' Optional. Provide the default password for encrypted items in the archive
          zipReader.EncryptionPassword = "Password"

          ' Create a large buffer for speed
          Dim buffer(1024 * 1024 - 1) As Byte

          Dim zipItemLocalHeader As ZipItemLocalHeader

          ' While the reader finds local headers
          zipItemLocalHeader = zipReader.ReadItemLocalHeader()
          Do While zipItemLocalHeader IsNot Nothing
            ' Add the filename to our list
            filenames.Add(zipItemLocalHeader.FileName)

            ' Skip over the data using our buffer. This avoids recreating one each time
            zipReader.ReadItemData(Stream.Null, buffer, 0, buffer.Length)
            zipItemLocalHeader = zipReader.ReadItemLocalHeader()
          Loop

          ' Optional. Have the reader give us the zip ending header
          Dim endHeader As ZipEndHeader = zipReader.ReadEndHeader()

          ' If the header contains a global zip comment
          If endHeader IsNot Nothing AndAlso (Not String.IsNullOrEmpty(endHeader.ZipComment)) Then
            ' TODO: Do something with the global zip comment
          End If
        End Using
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>