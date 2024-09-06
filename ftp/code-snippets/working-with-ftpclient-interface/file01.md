import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to connect through an HTTP proxy server

The Proxy property and the `HttpProxyClient` class are used to connect to an FTP server through an HTTP proxy. Once the Proxy property has been set with an `HttpProxyClient` object, regular FTP operations can be performed. The Proxy property cannot be set when `FtpClient` is connected. Note that only HTTP proxy servers are currently supported. Furthermore, there is no need to use the proxy capabilities when connecting through a transparent proxy server. 

:::note
When using Xceed FTP for .NET in a WinForms application, it is recommended that a SynchronizingObject be assigned to the SynchronizingObject property of the FtpClient class to ensure that the UI remains responsive. For more information, jump to the [WinForms applications and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading).
:::

## Synchronous (blocking) and asynchronous (non-blocking) demonstration using FtpClient

The following examples show how to connect to an FTP server through an HTTP proxy server.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.Ftp;

        FtpClient client = new FtpClient(); 

        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        client.SynchronizingObject = this;

        client.Proxy = new HttpProxyClient( "192.168.0.20", 8080,
                                            "proxy_user_name",
                                            "proxy_user_name's proxy password" ); 

        client.Connect( "ftp.myplace.com", 21 );
        client.Login( "ftp_user_name", "ftp_user_name's remote password");

        client.ReceiveFile( "test.txt", @"d:\new_text.txt" );
        client.Disconnect();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        Dim client As New FtpClient() 

        ' When using FtpClient, you can instruct
        ' the library to automatically redirect events on the main UI thread
        ' by setting the SynchronizingObject property.
        client.SynchronizingObject = Me

        client.Proxy = new HttpProxyClient( "192.168.0.20", _
                                            8080, "proxy_user_name", _
                                            "proxy_user_name's proxy password" ) 
        client.Connect( "ftp.myplace.com", 21 )
        client.Login( "ftp_user_name", "ftp_user_name's remote password")

        client.ReceiveFile( "test.txt", "d:\new_text.txt" )
        client.Disconnect()
      ```
    </TabItem>
</Tabs>

## Asynchronous (non-blocking ) demonstration using AsyncFtpClient
:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the AsyncFtpClient class is now considered obsolete. It is therefore recommended to use FtpClient and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

The following examples show how to connect to an FTP server through an HTTP proxy server.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.Ftp;
          
          AsyncFtpClient client = new AsyncFtpClient();
          client.Proxy = new HttpProxyClient( "192.168.0.20", 8080, "proxy_user_name", "proxy_user_name's proxy password" );
              
          IAsyncResult result = client.BeginConnect( "ftp.myplace.com:21", null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          client.EndConnect( result );
          result = ftp.BeginLogin( "ftp_user_name", "ftp_user_name's remote password" );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          client.EndLogin( result );
          result = client.BeginReceiveFile( "test.txt", @"d:\new_text.txt", null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          client.EndReceiveFile( result );
          result = client.BeginDisconnect( null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          client.EndDisconnect( result );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        Dim client As New AsyncFtpClient()
        client.Proxy = new HttpProxyClient( "192.168.0.20", 8080, "proxy_user_name", "proxy_user_name's proxy password" )

        Dim result As IAsyncResult
        result = client.BeginConnect( "ftp.myplace.com:21", null, null )

        While( !result.IsCompleted )
          Application.DoEvents()
        End While

        client.EndConnect( result )
        result = ftp.BeginLogin( "ftp_user_name", "ftp_user_name's remote password" )

        While( !result.IsCompleted )
          Application.DoEvents()
        End While

        client.EndLogin( result );
        result = client.BeginReceiveFile( "test.txt", "d:\new_text.txt", null, null )

        While( !result.IsCompleted )
          Application.DoEvents()
        End While

        client.EndReceiveFile( result )
        result = client.BeginDisconnect( null, null )

        While( !result.IsCompleted )
          Application.DoEvents()
        End While

        client.EndDisconnect( result )
      ```
    </TabItem>
</Tabs>