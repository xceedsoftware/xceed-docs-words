import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to copy memory data to a file on an FTP server

Data located in memory can be copied (in other words, uploaded) to a file located on an FTP server (or to any other type of file supported by the Xceed FileSystem) using the OpenWrite or CreateWrite methods. 

The following example demonstrates how to copy data located in memory to a file located on an FTP server using the steps listed below:

1. Create an instance of the `FtpConnection` class to establish a connection between the client and the FTP server. If you are using `FtpConnection` in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the SynchronizingObject property and call `Application.DoEvents` in an event such as ByteProgression.

2. Create an instance of an FtpFile which will represent the file on the FTP server to which the data will be copied. By default, the file will be created in the current working folder. 

3. Retrieve a stream to the file on the FTP server using the FtpFile's `OpenWrite` method specifying the FileShare mode as well as the RepresentationType with which the data will be transferred. The stream returned by the `OpenWrite` method is guaranteed to be writable, but is not seekable. 

4. Write to the destination file using the stream's Write method. Because the stream was opened using the Ascii RepresentationType, we will encode the data with the same encoding. 

5. Dispose of the stream using its Dispose method. 

6. Dispose of the `FtpConnection` once the file transfer is completed by calling its Dispose method or, in C#, by creating the FtpConnection instance in a using block. If an instance of an `FtpConnection` object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.      

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;

        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {

          string data = "This is the data that will be contained in the file";
        
          FtpFile file = new FtpFile( connection, "test.txt" );
        
          using( System.IO.Stream stream = file.OpenWrite( true, System.IO.FileShare.Write, RepresentationType.Ascii ) )
          {      
            byte[] byteData = System.Text.Encoding.ASCII.GetBytes( data );
          stream.Write( byteData, 0, byteData.Length );
          }        
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem
        Imports Xceed.Ftp

        Dim connection As FtpConnection
        Dim stream As System.IO.Stream

        Try
          connection = New FtpConnection( "ftp.server.com" )

          Dim file As New FtpFile(connection, "test.txt")
          stream = file.OpenWrite( True, System.IO.FileShare.Write, RepresentationType.Ascii )

          Dim data As String = "This is the data that will be contained in the file"
          Dim byteData As Byte() = System.Text.Encoding.ASCII.GetBytes(data)
          stream.Write( byteData, 0, byteData.Length )
        Finally
          stream.Close()        
          connection.Dispose()
        End Try
      ```
    </TabItem>
</Tabs>

## Things to consider

- Does the file that you want to copy data to not exist on the FTP server? Use the `CreateWrite` method rather than the `OpenWrite` method. 

- Do you want the FTP server to initiate the data connection rather than the client-side? Set the FtpConnection's `PassiveTransfer` property to false. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the FtpConnection's Timeout property. 

- Do you want to create a log file of the FTP process? Set the FtpConnection's `TraceWriter` property. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the ItemException event. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property. 

- Do you want quick and easy access to FTP functionalities in the same style as the ActiveX version of the Xceed FTP Library? Use the `FtpClient` class instead. **(Note: The `AsyncFtpClient` should now be considered obsolete. Instead, use the `FtpClient` class, assigning a value to its SynchronizingObject property.)**