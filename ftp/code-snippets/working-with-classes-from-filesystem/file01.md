import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to connect through an HTTP proxy server

The Proxy property and the `HttpProxyClient` class are used to connect to an FTP server through an HTTP proxy. Once the Proxy property has been set with an `HttpProxyClient` object, regular FileSystem FTP operations can be performed. The Proxy property cannot be changed once a connection has been made to the FTP server. Note that only HTTP proxy servers are currently supported. Furthermore, there is no need to use the proxy capabilities when connecting through a transparent proxy server. 

The following examples demonstrate how to connect to an FTP server through an HTTP proxy server using the steps listed below:

1. Create an instance of the *FtpConnection* class for the connection between the client and the FTP server. If you are using *FtpConnection* in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the SynchronizingObject property and call Application.DoEvents in an event such as ByteProgression.

2. Assign an `HttpProxyClient` object to the *FtpConnection*'s Proxy property. 

3. Perform any FileSystem-based operations you wish, such as transferring files and folders to or from the FTP server, compressing or uncompressing them, encrypting or decrypting them, using them with memory-based operations, etc. The code below downloads a folder to the local computer. For more details on how to perform this operation, see the next topic, How to copy items from an FTP server (download). 

4. Dispose of the *FtpConnection* once the operation is completed by calling its Dispose method or, in C#, by creating the *FtpConnection* instance in a using block.   If an instance of an *FtpConnection* object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;
        
        using (FtpConnection connection = new FtpConnection( "ftp.myplace.com",
                                                            "ftp_user_name",
                                                            "ftp_user_name's remote password" ) )
        {
          connection.Proxy = new HttpProxyClient( "192.168.0.20", 8080,
                                                  "proxy_user_name",
                                                  "proxy_user_name's proxy password" );
          //When using FtpConnection in a UI application
          connection.SynchronizingObject = this; 

          FtpFolder source = new FtpFolder( connection );
          DiskFolder destination = new DiskFolder( "d:\\ftp_download" );
        
          source.CopyFilesTo( destination, false, true );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem
        Imports Xceed.Ftp

        Dim connection As FtpConnection

        Try
          connection = New FtpConnection( "ftp.myplace.com", "ftp_user_name",
                                          "ftp_user_name's remote password" )

          'When using FtpConnection in a UI application 
          connection.SynchronizingObject = Me


          connection.Proxy = new HttpProxyClient( "192.168.0.20", _
                                                  8080, "proxy_user_name", _
                                                  "proxy_user_name's proxy password" )

        Dim source As New FtpFolder(connection)
        Dim destination As New DiskFolder("d:\ftp_download")

          source.CopyFilesTo( destination, False, True )            
        Finally
          connection.Dispose()
        End Try
      ```
    </TabItem>
</Tabs>