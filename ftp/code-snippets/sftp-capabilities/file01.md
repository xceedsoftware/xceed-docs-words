import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connecting to an SFTP server

The following example demonstrates how to connect to a SSH server, setup a SFTP session and perform file operations like uploading and downloading files.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.SSH.Client;
          using Xceed.SSH.Protocols;
          using Xceed.SSH.Core;

          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            class ConnectingToASFtpServerExample1
            {
              static void Example()
              {
                string hostName = "sftptest.dreamhosters.com";
                int portNumber = 0;

                string username = "snippet_sftp";
                string password = "9MNfGgSx";

                SSHClient ssh;

                // Create a SSHClient object
                ssh = new SSHClient();

                // Optional. When debugging, it is very useful to capture trace messages from the component.
                // We assign a trace writer early so that all trace messages are captured. Most errors occur during connection.
                // Any System.IO.TextWriter can be assigned here.
                //ssh.TraceWriter = Console.Out;
                // Or...
                //ssh.TraceWriter = new StreamWriter( @"D:\Log\XceedSFtp.log", true );

                // Connect the SSHClient to the specified host using the specified port number
                try
                {
                  ssh.Connect( hostName, portNumber );
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
                    // Authenticate ourselves to the server using the specified username and password combination
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

                  // Create an SFtp session object based on the SSH client we have setup
                  using( SFtpSession sftp = new SFtpSession( ssh ) )
                  {
                    Upload1( sftp );
                    Download1( sftp );
                  }
                }
                catch( FileSystemIOException )
                {
                  throw;
                }
                catch( SSHTimeoutException )
                {
                  // This means the client did not receive a response from the server within the required
                  // time. This usually indicate a problem with the Internet connection or an interoperability
                  // problem between the server and the client.
                  throw;
                }
                finally
                {
                  // Disconnect from the SSH server
                  ssh.Disconnect();
                }
              }

              static void Upload1( SFtpSession sftp )
              {
                // Create an events object
                FileSystemEvents events = new FileSystemEvents();

                // Handle the ByteProgression event
                events.ByteProgression += new ByteProgressionEventHandler( OnByteProgression );

                // Handle the ItemProgression event
                events.ItemProgression += new ItemProgressionEventHandler( OnItemProgression );

                // Select a local file
                AbstractFile localFile = new DiskFile( "D:\\SomeFile.dat" );
                
                // Select a remote folder to put the file in
                AbstractFolder remoteFolder = new SFtpFolder( sftp );
                
                // Upload the local file to the remote folder
                localFile.CopyTo( remoteFolder, true );

                // Select a specific remote file name for our upload
                AbstractFile remoteFile = remoteFolder.GetFile( "MyContextSpecicFileName.dat" );

                /* Progression can be tracked by passing a properly setup FileSystemEvents object
                * to the file operation method. */

                // Upload the local file to the remote file
                localFile.CopyTo( events, null, remoteFile, true );

                // Select a local folder
                AbstractFolder localFolder = new DiskFolder( "D:\\SomeFolder" );

                // Upload all the files with the .xml extension in the local folder to the remote folder 
                localFolder.CopyFilesTo( events, null, remoteFolder, true, true, "*.xml" );

                /* When all files need to be selected for an operation, it's more efficient to not specify
                * any filter than to use a "*" or "*.*" filter. */

                // Upload all the files in the local folder to the remote folder 
                localFolder.CopyFilesTo( events, null, remoteFolder, true, true );
              }

              static void Download1( SFtpSession sftp )
              {
                // Create an events object
                FileSystemEvents events = new FileSystemEvents();

                // Handle the ByteProgression event
                events.ByteProgression += new ByteProgressionEventHandler( OnByteProgression );

                // Handle the ItemProgression event
                events.ItemProgression += new ItemProgressionEventHandler( OnItemProgression );

                // Select a remote file
                AbstractFile remoteFile = new SFtpFile( sftp, "SomeFile.dat" );

                // Select a local folder to put the file in
                AbstractFolder localFolder = new DiskFolder( "D:\\DownloadedFiles" );

                // Download the remote file to the local folder
                remoteFile.CopyTo( localFolder, true );

                // Select a specific local file name for our download
                AbstractFile localFile = localFolder.GetFile( "MyContextSpecicFileName.dat" );

                /* Progression can be tracked by passing a properly setup FileSystemEvents object
                * to the file operation method. */

                // Download the remote file to the local file
                remoteFile.CopyTo( events, null, localFile, true );

                // Select a remote folder
                AbstractFolder remoteFolder = new SFtpFolder( sftp, "SomeFolder" );

                // Download all the files with the .xml extension in the remote folder to the local folder 
                remoteFolder.CopyFilesTo( events, null, localFolder, true, true, "*.xml" );

                /* When all files need to be selected for an operation, it's more efficient to not specify
                * any filter than to use a "*" or "*.*" filter. */

                // Download all the files in the remote folder to the local folder 
                remoteFolder.CopyFilesTo( events, null, localFolder, true, true );
              }

              static void OnItemProgression( object sender, ItemProgressionEventArgs e )
              {
                // Report progress
                Console.WriteLine( "{0}/{1} ({2}%): {3}%", e.AllItems.Processed, e.AllItems.Total, e.AllItems.Percent, e.TargetItem.FullName );
              }

              static void OnByteProgression( object sender, ByteProgressionEventArgs e )
              {
                // Report progress
                Console.WriteLine( "{0}: {1}%", e.TargetItem.Name, e.CurrentFileBytes.Percent );
              }
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.SSH.Client
        Imports Xceed.SSH.Protocols
        Imports Xceed.SSH.Core

        Imports Xceed.FileSystem

        Namespace DocumentationExamples.SSH
          Friend Class ConnectingToASFtpServerExample1
            Private Shared Sub Example()
              Dim hostName As String = "sftptest.dreamhosters.com"
              Dim portNumber As Integer = 0

              Dim username As String = "snippet_sftp"
              Dim password As String = "9MNfGgSx"

              Dim ssh As SSHClient

              ' Create a SSHClient object
              ssh = New SSHClient()

              ' Optional. When debugging, it is very useful to capture trace messages from the component.
              ' We assign a trace writer early so that all trace messages are captured. Most errors occur during connection.
              ' Any System.IO.TextWriter can be assigned here.
              'ssh.TraceWriter = Console.Out;
              ' Or...
              'ssh.TraceWriter = new StreamWriter( @"D:\Log\XceedSFtp.log", true );

              ' Connect the SSHClient to the specified host using the specified port number
              Try
                ssh.Connect(hostName, portNumber)
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
                  ' Authenticate ourselves to the server using the specified username and password combination
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

                ' Create an SFtp session object based on the SSH client we have setup
                Using sftp As New SFtpSession(ssh)
                  Upload1(sftp)
                  Download1(sftp)
                End Using
              Catch e9 As FileSystemIOException
                Throw
              Catch e10 As SSHTimeoutException
                ' This means the client did not receive a response from the server within the required
                ' time. This usually indicate a problem with the Internet connection or an interoperability
                ' problem between the server and the client.
                Throw
              Finally
                ' Disconnect from the SSH server
                ssh.Disconnect()
              End Try
            End Sub

            Private Shared Sub Upload1(ByVal sftp As SFtpSession)
              ' Create an events object
              Dim events As New FileSystemEvents()

              ' Handle the ByteProgression event
              AddHandler events.ByteProgression, AddressOf OnByteProgression

              ' Handle the ItemProgression event
              AddHandler events.ItemProgression, AddressOf OnItemProgression

              ' Select a local file
              Dim localFile As AbstractFile = New DiskFile("D:\SomeFile.dat")

              ' Select a remote folder to put the file in
              Dim remoteFolder As AbstractFolder = New SFtpFolder(sftp)

              ' Upload the local file to the remote folder
              localFile.CopyTo(remoteFolder, True)

              ' Select a specific remote file name for our upload
              Dim remoteFile As AbstractFile = remoteFolder.GetFile("MyContextSpecicFileName.dat")

        '       Progression can be tracked by passing a properly setup FileSystemEvents object
        '       * to the file operation method. 

              ' Upload the local file to the remote file
              localFile.CopyTo(events, Nothing, remoteFile, True)

              ' Select a local folder
              Dim localFolder As AbstractFolder = New DiskFolder("D:\SomeFolder")

              ' Upload all the files with the .xml extension in the local folder to the remote folder 
              localFolder.CopyFilesTo(events, Nothing, remoteFolder, True, True, "*.xml")

        '       When all files need to be selected for an operation, it's more efficient to not specify
        '       * any filter than to use a "*" or "*.*" filter. 

              ' Upload all the files in the local folder to the remote folder 
              localFolder.CopyFilesTo(events, Nothing, remoteFolder, True, True)
            End Sub

            Private Shared Sub Download1(ByVal sftp As SFtpSession)
              ' Create an events object
              Dim events As New FileSystemEvents()

              ' Handle the ByteProgression event
              AddHandler events.ByteProgression, AddressOf OnByteProgression

              ' Handle the ItemProgression event
              AddHandler events.ItemProgression, AddressOf OnItemProgression

              ' Select a remote file
              Dim remoteFile As AbstractFile = New SFtpFile(sftp, "SomeFile.dat")

              ' Select a local folder to put the file in
              Dim localFolder As AbstractFolder = New DiskFolder("D:\DownloadedFiles")

              ' Download the remote file to the local folder
              remoteFile.CopyTo(localFolder, True)

              ' Select a specific local file name for our download
              Dim localFile As AbstractFile = localFolder.GetFile("MyContextSpecicFileName.dat")

        '       Progression can be tracked by passing a properly setup FileSystemEvents object
        '       * to the file operation method. 

              ' Download the remote file to the local file
              remoteFile.CopyTo(events, Nothing, localFile, True)

              ' Select a remote folder
              Dim remoteFolder As AbstractFolder = New SFtpFolder(sftp, "SomeFolder")

              ' Download all the files with the .xml extension in the remote folder to the local folder 
              remoteFolder.CopyFilesTo(events, Nothing, localFolder, True, True, "*.xml")

        '       When all files need to be selected for an operation, it's more efficient to not specify
        '       * any filter than to use a "*" or "*.*" filter. 

              ' Download all the files in the remote folder to the local folder 
              remoteFolder.CopyFilesTo(events, Nothing, localFolder, True, True)
            End Sub

            Private Shared Sub OnItemProgression(ByVal sender As Object, ByVal e As ItemProgressionEventArgs)
              ' Report progress
              Console.WriteLine("{0}/{1} ({2}%): {3}%", e.AllItems.Processed, e.AllItems.Total, e.AllItems.Percent, e.TargetItem.FullName)
            End Sub

            Private Shared Sub OnByteProgression(ByVal sender As Object, ByVal e As ByteProgressionEventArgs)
              ' Report progress
              Console.WriteLine("{0}: {1}%", e.TargetItem.Name, e.CurrentFileBytes.Percent)
            End Sub
          End Class
        End Namespace
      ```
    </TabItem>
</Tabs>