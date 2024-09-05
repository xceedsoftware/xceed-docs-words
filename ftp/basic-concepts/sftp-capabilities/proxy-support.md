import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Proxy Support

Some SSH/SFtp servers cannot be accessed from the open internet. They can only be access through proxies.

In the context of network computing, a proxy is a server that allows clients to make indirect network connections to other network services. These servers are called proxy servers.

Components or applications that support connecting to services through a proxy server are called proxy clients.

There are various protocols that define how a proxy client can request a proxy server to make a network connection on its behalf.

Xceed SFtp for .NET is a proxy client. It supports the following proxy protocols:

- HTTP proxy through the `HttpProxyClient` Class
- SOCKS 4 / 4A proxy through the `SOCKS4ProxyClient` Class
- SOCKS 5 proxy through the `SOCKS5ProxyClient` Class

To use, a proxy client object of the desired type is created and initialized with the proxy server's address and the credentials to access the proxy server, if applicable. Then, it is assigned to the SSHClient.ProxyClient property before the SSH client attempts to connect. When SSHClient.Connect() is called, it will use the proxy client to have the proxy server make the actual connection to the SSH server on its behalf.

The authentication parameters of the proxy clients are optional. Some servers require them others do not. As such, the user name, password, etc parameters of proxy clients can be null. If required, check with the administrator of the proxy server to get proper credentials.

:::note
There is no need to use the proxy capabilities of the component when connecting through a transparent proxy server. A transparent proxy intercepts normal communication at the network layer level, without requiring any special client configuration. Therefore, clients don't need to be aware of the existence of the proxy.
:::

Once the client is connected, operations proceed as normal. The proxy client is only used to establish the connection to the SSH server. It plays no role after that.

<details>

  <summary>Example: Http Proxy Client</summary>

  The following example demonstrates how the HttpProxyClient Class can be used to connect to a SSH server via a HTTP proxy server.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using( SSHClient ssh = new SSHClient() )
        {
          string host = "sftptest.dreamhosters.com";
          string username = "snippet_sftp";
          string password = "9MNfGgSx";

          try
          {
            // Set up the information for a HTTP proxy server
            string proxyServerHostName = "proxyserverhost.com";
            int proxyServerPort = 80;
            string proxyServerUsername = "proxyServerUsername";
            string proxyServerPassword = "proxyServerPassword";

            // Create a HTTP proxy client using the information and credentials
            ProxyClient proxyClient = new HttpProxyClient( 
              proxyServerHostName, 
              proxyServerPort, 
              proxyServerUsername, 
              proxyServerPassword );

            // Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient;

            // Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect( host );
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHProxyClientException e )
          {
            // This means that an error occurred with the proxy client assigned to the SSH client

            Exception exception = e.InnerException;
            if( exception != null )
            {
              // This exception contains information about the true cause of the SSHProxyClientException.
              // Note that it may have an InnerException itself.
            }

            throw;
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHIdentificationStringException )
          {
            // This means the component was unable to identify the server as a SSH server
            throw;
          }
          catch( SSHKeyExchangeException )
          {
            // This means the client and the server failed to negotiate terms for a connection
            // This usually indicates an interoperability problem with certain old or broken servers
            throw;
          }
          catch( UnsupportedSSHProtocolException )
          {
            // This means the server is using a version of the SSH protocol that is not supported.
            throw;
          }
          catch( SSHTimeoutException )
          {
            // This means the client did not receive a response from the server within the required
            // time. This usually indicate a problem with the Internet connection or an interoperability
            // problem between the server and the client.
            throw;
          }

          try
          {
            ssh.Authenticate( username, password );
          }
          // These exceptions can be thrown by a call to Authenticate()
          catch( SSHIncorrectPasswordException )
          {
            // This means the authentication method is supported by the server but the password
            // was incorrect for the specified username 
            throw;
          }
          catch( SSHAuthenticationPartialSuccessException )
          {
            // This means the authentication was successful but the server requires an additional authentication
            // using another method specified in the exception information
            throw;
          }
          catch( SSHUnsupportedAuthenticationMethodException )
          {
            // This means the authentication method is not supported by the server
            throw;
          }
          catch( SSHAuthenticationFailedException )
          {
            // This means the authentication method failed
            throw;
          }

          /* Perform file operations as normal */
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Using ssh As New SSHClient()
          Dim host As String = "sftptest.dreamhosters.com"
          Dim username As String = "snippet_sftp"
          Dim password As String = "9MNfGgSx"

          Try
            ' Set up the information for a HTTP proxy server
            Dim proxyServerHostName As String = "proxyserverhost.com"
            Dim proxyServerPort As Integer = 80
            Dim proxyServerUsername As String = "proxyServerUsername"
            Dim proxyServerPassword As String = "proxyServerPassword"

            ' Create a HTTP proxy client using the information and credentials
            Dim proxyClient As ProxyClient = New HttpProxyClient(proxyServerHostName, proxyServerPort, proxyServerUsername, proxyServerPassword)

            ' Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient

            ' Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect(host)
          ' These exception can be thrown by a call to Connect()
          Catch e As SSHProxyClientException
            ' This means that an error occurred with the proxy client assigned to the SSH client

            Dim exception As Exception = e.InnerException
            If exception IsNot Nothing Then
              ' This exception contains information about the true cause of the SSHProxyClientException.
              ' Note that it may have an InnerException itself.
            End If

            Throw
          ' These exception can be thrown by a call to Connect()
          Catch e1 As SSHIdentificationStringException
            ' This means the component was unable to identify the server as a SSH server
            Throw
          Catch e2 As SSHKeyExchangeException
            ' This means the client and the server failed to negotiate terms for a connection
            ' This usually indicates an interoperability problem with certain old or broken servers
            Throw
          Catch e3 As UnsupportedSSHProtocolException
            ' This means the server is using a version of the SSH protocol that is not supported.
            Throw
          Catch e4 As SSHTimeoutException
            ' This means the client did not receive a response from the server within the required
            ' time. This usually indicate a problem with the Internet connection or an interoperability
            ' problem between the server and the client.
            Throw
          End Try

          Try
            ssh.Authenticate(username, password)
          ' These exceptions can be thrown by a call to Authenticate()
          Catch e5 As SSHIncorrectPasswordException
            ' This means the authentication method is supported by the server but the password
            ' was incorrect for the specified username 
            Throw
          Catch e6 As SSHAuthenticationPartialSuccessException
            ' This means the authentication was successful but the server requires an additional authentication
            ' using another method specified in the exception information
            Throw
          Catch e7 As SSHUnsupportedAuthenticationMethodException
            ' This means the authentication method is not supported by the server
            Throw
          Catch e8 As SSHAuthenticationFailedException
            ' This means the authentication method failed
            Throw
          End Try

          ' Perform file operations as normal 
        End Using
      ```
    </TabItem>
</Tabs>
</details>

<details>

  <summary>Example: SOCKS 4/4A Proxy Client</summary>

  The following example demonstrates how the SOCKS4ProxyClient Class can be used to connect to a SSH server via a SOCKS 4/4A proxy server.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using( SSHClient ssh = new SSHClient() )
        {
          string host = "sftptest.dreamhosters.com";
          string username = "snippet_sftp";
          string password = "9MNfGgSx";

          try
          {
            // Set up the information for a SOCKS 4/4A proxy server
            string proxyServerHostName = "proxyserverhost.com";
            int proxyServerPort = 1080;
            string proxyServerUserID = "proxyServerUserID";

            // Create a SOCKS 4/4A proxy client using the information and credentials
            ProxyClient proxyClient = new SOCKS4ProxyClient(
              proxyServerHostName,
              proxyServerPort,
              proxyServerUserID );

            // Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient;

            // Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect( host );
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHProxyClientException e )
          {
            // This means that an error occurred with the proxy client assigned to the SSH client

            Exception exception = e.InnerException;
            if( exception != null )
            {
              // This exception contains information about the true cause of the SSHProxyClientException.
              // Note that it may have an InnerException itself.
            }

            throw;
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHIdentificationStringException )
          {
            // This means the component was unable to identify the server as a SSH server
            throw;
          }
          catch( SSHKeyExchangeException )
          {
            // This means the client and the server failed to negotiate terms for a connection
            // This usually indicates an interoperability problem with certain old or broken servers
            throw;
          }
          catch( UnsupportedSSHProtocolException )
          {
            // This means the server is using a version of the SSH protocol that is not supported.
            throw;
          }
          catch( SSHTimeoutException )
          {
            // This means the client did not receive a response from the server within the required
            // time. This usually indicate a problem with the Internet connection or an interoperability
            // problem between the server and the client.
            throw;
          }

          try
          {
            ssh.Authenticate( username, password );
          }
          // These exceptions can be thrown by a call to Authenticate()
          catch( SSHIncorrectPasswordException )
          {
            // This means the authentication method is supported by the server but the password
            // was incorrect for the specified username 
            throw;
          }
          catch( SSHAuthenticationPartialSuccessException )
          {
            // This means the authentication was successful but the server requires an additional authentication
            // using another method specified in the exception information
            throw;
          }
          catch( SSHUnsupportedAuthenticationMethodException )
          {
            // This means the authentication method is not supported by the server
            throw;
          }
          catch( SSHAuthenticationFailedException )
          {
            // This means the authentication method failed
            throw;
          }

          /* Perform file operations as normal */
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Using ssh As New SSHClient()
          Dim host As String = "sftptest.dreamhosters.com"
          Dim username As String = "snippet_sftp"
          Dim password As String = "9MNfGgSx"

          Try
            ' Set up the information for a SOCKS 4/4A proxy server
            Dim proxyServerHostName As String = "proxyserverhost.com"
            Dim proxyServerPort As Integer = 1080
            Dim proxyServerUserID As String = "proxyServerUserID"

            ' Create a SOCKS 4/4A proxy client using the information and credentials
            Dim proxyClient As ProxyClient = New SOCKS4ProxyClient(proxyServerHostName, proxyServerPort, proxyServerUserID)

            ' Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient

            ' Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect(host)
          ' These exception can be thrown by a call to Connect()
          Catch e As SSHProxyClientException
            ' This means that an error occurred with the proxy client assigned to the SSH client

            Dim exception As Exception = e.InnerException
            If exception IsNot Nothing Then
              ' This exception contains information about the true cause of the SSHProxyClientException.
              ' Note that it may have an InnerException itself.
            End If

            Throw
          ' These exception can be thrown by a call to Connect()
          Catch e9 As SSHIdentificationStringException
            ' This means the component was unable to identify the server as a SSH server
            Throw
          Catch e10 As SSHKeyExchangeException
            ' This means the client and the server failed to negotiate terms for a connection
            ' This usually indicates an interoperability problem with certain old or broken servers
            Throw
          Catch e11 As UnsupportedSSHProtocolException
            ' This means the server is using a version of the SSH protocol that is not supported.
            Throw
          Catch e12 As SSHTimeoutException
            ' This means the client did not receive a response from the server within the required
            ' time. This usually indicate a problem with the Internet connection or an interoperability
            ' problem between the server and the client.
            Throw
          End Try

          Try
            ssh.Authenticate(username, password)
          ' These exceptions can be thrown by a call to Authenticate()
          Catch e13 As SSHIncorrectPasswordException
            ' This means the authentication method is supported by the server but the password
            ' was incorrect for the specified username 
            Throw
          Catch e14 As SSHAuthenticationPartialSuccessException
            ' This means the authentication was successful but the server requires an additional authentication
            ' using another method specified in the exception information
            Throw
          Catch e15 As SSHUnsupportedAuthenticationMethodException
            ' This means the authentication method is not supported by the server
            Throw
          Catch e16 As SSHAuthenticationFailedException
            ' This means the authentication method failed
            Throw
          End Try

          ' Perform file operations as normal 
        End Using
      ```
    </TabItem>
</Tabs>
</details>

<details>

  <summary>Example: SOCKS 5 Proxy Client</summary>

  The following example demonstrates how the `SOCKS5ProxyClient` Class can be used to connect to a SSH server via a SOCKS 5 proxy server.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using( SSHClient ssh = new SSHClient() )
        {
          string host = "sftptest.dreamhosters.com";
          string username = "snippet_sftp";
          string password = "9MNfGgSx";

          try
          {
            // Set up the information for a SOCKS 5 proxy server
            string proxyServerHostName = "proxyserverhost.com";
            int proxyServerPort = 1080;
            string proxyServerUsername = "proxyServerUsername";
            string proxyServerPassword = "proxyServerPassword";

            // Create a SOCKS 5 proxy client using the information and credentials
            ProxyClient proxyClient = new SOCKS5ProxyClient(
              proxyServerHostName,
              proxyServerPort,
              proxyServerUsername,
              proxyServerPassword );

            // Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient;

            // Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect( host );
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHProxyClientException e )
          {
            // This means that an error occurred with the proxy client assigned to the SSH client

            Exception exception = e.InnerException;
            if( exception != null )
            {
              // This exception contains information about the true cause of the SSHProxyClientException.
              // Note that it may have an InnerException itself.
            }

            throw;
          }
          // These exception can be thrown by a call to Connect()
          catch( SSHIdentificationStringException )
          {
            // This means the component was unable to identify the server as a SSH server
            throw;
          }
          catch( SSHKeyExchangeException )
          {
            // This means the client and the server failed to negotiate terms for a connection
            // This usually indicates an interoperability problem with certain old or broken servers
            throw;
          }
          catch( UnsupportedSSHProtocolException )
          {
            // This means the server is using a version of the SSH protocol that is not supported.
            throw;
          }
          catch( SSHTimeoutException )
          {
            // This means the client did not receive a response from the server within the required
            // time. This usually indicate a problem with the Internet connection or an interoperability
            // problem between the server and the client.
            throw;
          }

          try
          {
            ssh.Authenticate( username, password );
          }
          // These exceptions can be thrown by a call to Authenticate()
          catch( SSHIncorrectPasswordException )
          {
            // This means the authentication method is supported by the server but the password
            // was incorrect for the specified username 
            throw;
          }
          catch( SSHAuthenticationPartialSuccessException )
          {
            // This means the authentication was successful but the server requires an additional authentication
            // using another method specified in the exception information
            throw;
          }
          catch( SSHUnsupportedAuthenticationMethodException )
          {
            // This means the authentication method is not supported by the server
            throw;
          }
          catch( SSHAuthenticationFailedException )
          {
            // This means the authentication method failed
            throw;
          }

          /* Perform file operations as normal */
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Using ssh As New SSHClient()
          Dim host As String = "sftptest.dreamhosters.com"
          Dim username As String = "snippet_sftp"
          Dim password As String = "9MNfGgSx"

          Try
            ' Set up the information for a SOCKS 5 proxy server
            Dim proxyServerHostName As String = "proxyserverhost.com"
            Dim proxyServerPort As Integer = 1080
            Dim proxyServerUsername As String = "proxyServerUsername"
            Dim proxyServerPassword As String = "proxyServerPassword"

            ' Create a SOCKS 5 proxy client using the information and credentials
            Dim proxyClient As ProxyClient = New SOCKS5ProxyClient(proxyServerHostName, proxyServerPort, proxyServerUsername, proxyServerPassword)

            ' Assign the proxy client to the SSHClient for usage
            ssh.ProxyClient = proxyClient

            ' Connect to the SSH server. This will be done via the proxy client we assigned
            ssh.Connect(host)
          ' These exception can be thrown by a call to Connect()
          Catch e As SSHProxyClientException
            ' This means that an error occurred with the proxy client assigned to the SSH client

            Dim exception As Exception = e.InnerException
            If exception IsNot Nothing Then
              ' This exception contains information about the true cause of the SSHProxyClientException.
              ' Note that it may have an InnerException itself.
            End If

            Throw
          ' These exception can be thrown by a call to Connect()
          Catch e17 As SSHIdentificationStringException
            ' This means the component was unable to identify the server as a SSH server
            Throw
          Catch e18 As SSHKeyExchangeException
            ' This means the client and the server failed to negotiate terms for a connection
            ' This usually indicates an interoperability problem with certain old or broken servers
            Throw
          Catch e19 As UnsupportedSSHProtocolException
            ' This means the server is using a version of the SSH protocol that is not supported.
            Throw
          Catch e20 As SSHTimeoutException
            ' This means the client did not receive a response from the server within the required
            ' time. This usually indicate a problem with the Internet connection or an interoperability
            ' problem between the server and the client.
            Throw
          End Try

          Try
            ssh.Authenticate(username, password)
          ' These exceptions can be thrown by a call to Authenticate()
          Catch e21 As SSHIncorrectPasswordException
            ' This means the authentication method is supported by the server but the password
            ' was incorrect for the specified username 
            Throw
          Catch e22 As SSHAuthenticationPartialSuccessException
            ' This means the authentication was successful but the server requires an additional authentication
            ' using another method specified in the exception information
            Throw
          Catch e23 As SSHUnsupportedAuthenticationMethodException
            ' This means the authentication method is not supported by the server
            Throw
          Catch e24 As SSHAuthenticationFailedException
            ' This means the authentication method failed
            Throw
          End Try

          ' Perform file operations as normal 
        End Using
      ```
    </TabItem>
</Tabs>
</details>