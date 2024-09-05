import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FTP capabilities

In addition to the `FtpClient` class, which provides quick and easy access to FTP functionalities in the same style as the ActiveX version of Xceed's FTP library, the `Xceed.Ftp` namespace also exposes the `FtpConnection`, `FtpFolder`, and `FtpFile` classes which work together to create the FTP FileSystem implementation. Note: Unless otherwise stated, references to Xceed FTP for .NET apply to Xceed FTP for .NET Compact Framework.

![File System Diagram](/img/FileSystem.gif)

## FtpConnection class

The `FtpConnection` class represents a connection between a client and an FTP server.  The `FtpConnection` class implements the IDisposable interface meaning that every `FtpConnection` object that is created should also be disposed of by calling the Dispose method or, in C#, creating the `FtpConnection` within a using block. If an instance of an `FtpConnection` object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes. 

The `FtpConnection` will create connections with the FTP server transparently and as necessary until it is disposed of. To prevent connections with an FTP server from being kept alive, the `CloseConnections` method can be called. The `CloseConnections` method will close any connections that are not being used; however, the `FtpConnection` instance will remain usable. 

To test if a connection with the specified FTP server is possible before the `FtpConnection` instance is passed to FtpFile or FtpFolder objects, the `TestConnection` method can be used. If a connection with an FTP server is not possible, exceptions will be thrown when trying to access properties of the FtpFile and/or FtpFolder instances.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {
          // Any code that uses the FtpConnection object should be placed
          // between the creation and disposal of the FtpConnection instance.
          FtpFolder folder = new FtpFolder( connection );

          foreach( FileSystemItem item in folder.GetItems( true ) )
          {
            System.Diagnostics.Debug.WriteLine( item.FullName );
          }
        }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim connection As FtpConnection

        Try
          ' Any code that uses the FtpConnection object should be placed
          ' between the creation and disposal of the FtpConnection instance.
          connection = New FtpConnection( "ftp.server.com" )

          Dim source As New FtpFolder( connection )
          Dim destination As New DiskFolder( "d:\ftp_download" )
        
          source.CopyFilesTo( destination, False, True )
        Finally
          connection.Dispose()
        End Try
    ```
  </TabItem>
</Tabs>

## FtpFolder class

The `FtpFolder` class is a specialization of the `AbstractFolder` class that exposes properties and methods that provide access to a folder located on an FTP server.

## FtpFile class

The `FtpFile` class is a specialization of the `AbstractFile` class that exposes properties and methods that provide access to a file located on an FTP server.