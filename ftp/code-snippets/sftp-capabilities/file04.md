import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Obtaining the server public key fingerprint

During the connection sequence to a SSH server, the server sends its public key for authentication by the client. By default, the component accepts the public key received and the connection sequence moves to its next step.

It is possible for an application to be notified when the server's public key is received and authenticate the key using whatever method is appropriate for the application (e.g., using certificates or a local database, etc).

SSHClient's HostKeyReceived event governs this functionality. The event is triggered during connection sequence to a SSH server when the server's public key is received for authentication. The event arguments contain the server's public key. The key is available as an MD5 fingerprint or as the raw byte array. An application that subscribes to the event can accept or reject the key with the AcceptHostKey property.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            class PublicKeyFingerprint1
            {
              private static void OnHostKeyReceived( object sender, HostKeyReceivedEventArgs e )
              {
                /* The server's fingerprint is available as both a both array or a string */
                byte[] hostKeyMD5Fingerprint = e.HostKeyMD5Fingerprint;
                string hostKeyMD5FingerprintString = e.HostKeyMD5FingerprintString;

                /* TODO: Perform your fingerprint validation... */

                /* We can choose to accept or reject the server's key. Here we accept. */
                e.AcceptHostKey = true;
              }

              static void Example()
              {
                string host = "sftptest.dreamhosters.com";
                string username = "snippet_sftp";
                string password = "9MNfGgSx";

                SSHClient ssh = new SSHClient();

                // Ask to be notified when we receive the server's key and other information
                ssh.HostKeyReceived += OnHostKeyReceived;

                try
                {
                  ssh.Connect( host );
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
                  try
                  {
                    ssh.Authenticate( username, password );

                    /* ... */
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
                }
                finally
                {
                  // Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect();
                }
              }
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.SSH.Client
        Imports Xceed.SSH.Core
        Imports Xceed.SSH.Protocols
        Imports Xceed.FileSystem

        Namespace DocumentationExamples.SSH
          Friend Class PublicKeyFingerprint1
            Private Shared Sub OnHostKeyReceived(ByVal sender As Object, ByVal e As HostKeyReceivedEventArgs)
              ' The server's fingerprint is available as both a both array or a string 
              Dim hostKeyMD5Fingerprint() As Byte = e.HostKeyMD5Fingerprint
              Dim hostKeyMD5FingerprintString As String = e.HostKeyMD5FingerprintString

              ' TODO: Perform your fingerprint validation... 

              ' We can choose to accept or reject the server's key. Here we accept. 
              e.AcceptHostKey = True
            End Sub

            Private Shared Sub Example()
              Dim host As String = "sftptest.dreamhosters.com"
              Dim username As String = "snippet_sftp"
              Dim password As String = "9MNfGgSx"

              Dim ssh As New SSHClient()

              ' Ask to be notified when we receive the server's key and other information
              AddHandler ssh.HostKeyReceived, AddressOf OnHostKeyReceived

              Try
                ssh.Connect(host)
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
                Try
                  ssh.Authenticate(username, password)

                  '... 
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
              Finally
                ' Always make sure to disconnect from the server when the connection is no longer needed
                ssh.Disconnect()
              End Try
            End Sub
          End Class
        End Namespace
      ```
    </TabItem>
</Tabs>

### When reading files
Downloading opens SFtp remote files for reading and so uses the `SFtpFile.DefaultAutomaticReadFileShare` property value.

If supported by the server, it is best practice to enable blocking for writing and deleting when opening a file for reading. This way, it can be guaranteed that only a single process can write to a file at the same time but allow for any number of processes to read from the file at the same time. This is done by setting the SFtpFile.`DefaultAutomaticReadFileShare` property to %FileShare.Read:System.IO.FileShareFileShare%.

The default automatic FileShare can be returned to its default value by calling the `SFtpFile.SetDefaultAutomaticReadFileShare` method with null.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Set the read file share to allow reading but block writing and deleting by other processes when reading files
          SFtpFile.SetDefaultAutomaticReadFileShare( FileShare.Read );

          // Downloading opens SFtp remote files for reading and so uses the DefaultAutomaticReadFileShare property value
          remoteFolder.CopyFilesTo( localFolder, true, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Set the read file share to allow reading but block writing and deleting by other processes when reading files
        SFtpFile.SetDefaultAutomaticReadFileShare(FileShare.Read)

        ' Downloading opens SFtp remote files for reading and so uses the DefaultAutomaticReadFileShare property value
        remoteFolder.CopyFilesTo(localFolder, True, True)
      ```
    </TabItem>
</Tabs>

:::note
It is not necessary to test which version of the SFtp protocol is in use to change the FileShare options. If the protocol version does not support the FileShare options, the values are silently ignored.
:::

### Example
The following example shows how to change the default FileShare option values. It also shows what happens when a FileShare value isn't supported by the SFtp server and what an application can do to remedy the situation.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          void Example()
          {
            using( SSHClient ssh = new SSHClient() )
            {
              ssh.Connect( host );
              ssh.Authenticate( username, password );

              using( SFtpSession sftp = new SFtpSession( ssh ) )
              {
                /* FileShare options are only supported in versions 5 and later of the SFtp protocol.
                When lower versions are used, like the very common version 3, the FileShare values
                used by SFtpFile and silently not used when opening remote files. */

                // If the SFtp server run version 5 or later of the SFtp protocol
                if( sftp.SFtpServerProtocolVersion >= 5 )
                {
                  /* In this example, we test the protocol version number, but this is only done to
                  show you can. FileShare values are simply ignored when the protocol version
                  does not support them. */
                }

                // Set the write file share to block reading, writing and deleting by other processes when writing files
                SFtpFile.SetDefaultAutomaticWriteFileShare( FileShare.None );

                // Set the read file share to allow reading but block writing and deleting by other processes when reading files
                SFtpFile.SetDefaultAutomaticReadFileShare( FileShare.Read );

                AbstractFolder sourceFolder = new DiskFolder( @"D:\SomeFolder" );
                AbstractFolder destinationFolder = new SFtpFolder( sftp );

                FileSystemEvents events = new FileSystemEvents();
                
                // Handle the ItemException event to handle issues with file sharing
                events.ItemException += new ItemExceptionEventHandler( OnItemException );

                /* We will upload files here. Uploading opens SFtp remote files for writing
                and so uses the DefaultAutomaticWriteFileShare property value. */

                // Upload the contents of the local folder to the SFtp server
                sourceFolder.CopyFilesTo( events, null, destinationFolder, true, true );
              }
            }
          }

          static void OnItemException( object sender, ItemExceptionEventArgs e )
          {
            // Express the exception as a UnsupportedFileLockException object
            UnsupportedFileLockException unsupportedFileLockException = e.Exception as UnsupportedFileLockException;

            // If we did indeed get a UnsupportedFileLockException
            if( unsupportedFileLockException != null )
            {
              /* The SFtp server cannot make the locking guarantee for the FileShare value used
              in the operation. */

              // The exception message contains the FileShare value used that is not supported
              Console.WriteLine( unsupportedFileLockException.Message );

              // The FileShare value can be found in the FileShare property of the exception
              Console.WriteLine( "FileShare value used that is not supported: {0}", unsupportedFileLockException.FileShare );

              /* You can always revert to the default FileShare behavior which does not ask to lock the file */

              // Revert to the default write file share value
              SFtpFile.SetDefaultAutomaticWriteFileShare( null );

              // Revert to the default read file share value
              SFtpFile.SetDefaultAutomaticReadFileShare( null );

              // Retry the operation
              e.Action = ItemExceptionAction.Retry;
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
       Private Sub Example()
          Using ssh As New SSHClient()
            ssh.Connect(host)
            ssh.Authenticate(username, password)

            Using sftp As New SFtpSession(ssh)
    '           FileShare options are only supported in versions 5 and later of the SFtp protocol.
    '          When lower versions are used, like the very common version 3, the FileShare values
    '          used by SFtpFile and silently not used when opening remote files. 

              ' If the SFtp server run version 5 or later of the SFtp protocol
              If sftp.SFtpServerProtocolVersion >= 5 Then
    '             In this example, we test the protocol version number, but this is only done to
    '            show you can. FileShare values are simply ignored when the protocol version
    '            does not support them. 
              End If

              ' Set the write file share to block reading, writing and deleting by other processes when writing files
              SFtpFile.SetDefaultAutomaticWriteFileShare(FileShare.None)

              ' Set the read file share to allow reading but block writing and deleting by other processes when reading files
              SFtpFile.SetDefaultAutomaticReadFileShare(FileShare.Read)

              Dim sourceFolder As AbstractFolder = New DiskFolder("D:\SomeFolder")
              Dim destinationFolder As AbstractFolder = New SFtpFolder(sftp)

              Dim events As New FileSystemEvents()

              ' Handle the ItemException event to handle issues with file sharing
              AddHandler events.ItemException, AddressOf OnItemException

    '           We will upload files here. Uploading opens SFtp remote files for writing
    '          and so uses the DefaultAutomaticWriteFileShare property value. 

              ' Upload the contents of the local folder to the SFtp server
              sourceFolder.CopyFilesTo(events, Nothing, destinationFolder, True, True)
            End Using
          End Using
        End Sub

        Private Shared Sub OnItemException(ByVal sender As Object, ByVal e As ItemExceptionEventArgs)
          ' Express the exception as a UnsupportedFileLockException object
          Dim unsupportedFileLockException As UnsupportedFileLockException = TryCast(e.Exception, UnsupportedFileLockException)

          ' If we did indeed get a UnsupportedFileLockException
          If unsupportedFileLockException IsNot Nothing Then
    '         The SFtp server cannot make the locking guarantee for the FileShare value used
    '        in the operation. 

            ' The exception message contains the FileShare value used that is not supported
            Console.WriteLine(unsupportedFileLockException.Message)

            ' The FileShare value can be found in the FileShare property of the exception
            Console.WriteLine("FileShare value used that is not supported: {0}", unsupportedFileLockException.FileShare)

            ' You can always revert to the default FileShare behavior which does not ask to lock the file 

            ' Revert to the default write file share value
            SFtpFile.SetDefaultAutomaticWriteFileShare(Nothing)

            ' Revert to the default read file share value
            SFtpFile.SetDefaultAutomaticReadFileShare(Nothing)

            ' Retry the operation
            e.Action = ItemExceptionAction.Retry
          End If
        End Sub
      ```
    </TabItem>
</Tabs>