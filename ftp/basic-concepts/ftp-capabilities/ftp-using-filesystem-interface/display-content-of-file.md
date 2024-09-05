---
title: How to copy items from an FTP server (download)
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to display the content of a file on an FTP server

The content of a file located on an FTP server (or to any other type of file supported by the [Xceed FileSystem](/ftp/basic-concepts/xceed-filesystem-core/overview)) can be displayed using the `OpenRead` method. 

The following example demonstrates how to display the content of a file located on an FTP server using the steps listed below:

- Create an instance of the `FtpConnection` class to establish a connection between the client and the FTP server. If you are using FtpConnection in a UI application, assign your form (or any other control that implements the ISynchronizeInvoke interface) to the `SynchronizingObject` property and call Application.DoEvents in an event such as ByteProgression.

- Create an instance of an `FtpFile` which will represent the file on the FTP server whose content is to be displayed. By default, the file is assumed to be located in the current working folder. 

- Retrieve a stream to the file on the FTP server using the FtpFile's `OpenRead` method specifying the RepresentationType with which the data will be retrieved. The stream returned by the `OpenRead` method is not seekable. 

- Since the stream returned by the `OpenRead` method is not seekable (meaning that neither the length or position can be retrieved), data can be read by either looping through the stream until the end of the stream has been reached, or a StreamReader can be created around the stream to read the data.

- Because the stream was opened using the **Ascii** RepresentationType, we will encode the data with the same encoding. 

- Dispose of the stream using its Dispose method. 

- Dispose of the FtpConnection once the file transfer is completed by calling its Dispose method or, in C#, by creating the FtpConnection instance in a using block. If an instance of an FtpConnection object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;
        
        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {        
          //When using FtpConnection in a UI application
          connection.SynchronizingObject = this;

          FtpFile file = new FtpFile( connection, "test.txt" );
        
          using( System.IO.Stream stream = file.OpenRead( RepresentationType.Ascii ) )
          {
            System.IO.StreamReader reader = new System.IO.StreamReader( stream, System.Text.Encoding.ASCII );
            System.Diagnostics.Debug.WriteLine( reader.ReadToEnd() );
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
          'When using FtpConnection in a UI application 
          connection.SynchronizingObject = Me

          Dim file As New FtpFile(connection, "test.txt")
          stream = file.OpenRead( RepresentationType.Ascii )

          Dim reader As New System.IO.StreamReader(stream, System.Text.Encoding.ASCII)
          System.Diagnostics.Debug.WriteLine( reader.ReadToEnd() )

        Finally
          stream.Close()
          connection.Dispose()
        End Try
    ```
  </TabItem>
</Tabs>

## Things to consider

- Do you want the FTP server to initiate the data connection rather than the client-side? Set the FtpConnection's `PassiveTransfer` property to **false**. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the FtpConnection's   `Timeout` property. 

- Do you want to create a log file of the FTP process? Set the FtpConnection's `TraceWriter` property. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the ItemException event. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property. 

- Do you want quick and easy access to FTP functionalities in the same style as the ActiveX version of the Xceed FTP Library? Use the `FtpClient` class instead. (Note: The `AsyncFtpClient` should now be considered obsolete. Instead, use the `FtpClient` class, assigning a value to its `SynchronizingObject` property.)