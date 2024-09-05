import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SFTP Capabilities

## Introduction
SFTP stands for SSH File Transfer Protocol. It provides file access, file management, and file transfer over a data stream. With the Xceed's SFTP component, that data stream is an SSH connection.

SSH stands for Secure Shell.  It is a network protocol for secure communication between two networked computers: a server and a client. Xceed's SFTP component implements the client side of SSH and SFTP.

Xceed SFTP is compiled for .NET, Xamarin Android and Xamarin iOS. The usage is the same for all platforms except for the `license key`.

## Usage
### Connecting
#### Network connection

In order to use SFTP, an SSH connection must first be established. The SSH connection handles the network communication, setting up key exchange, encryption, data integrity and authentication, and disconnecting. The `Xceed.SSH.Client`namespace implements the `SSHClient` class, which exposes methods and properties for these actions.

An SSHClient object is typically setup like this:

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            class SSHClientTypicalSetup1
            {
              static void Example()
              {
                string host = "sftptest.dreamhosters.com";
                string username = "snippet_sftp";
                string password = "9MNfGgSx";

                SSHClient ssh = new SSHClient();

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
            Friend Class SSHClientTypicalSetup1
              Private Shared Sub Example()
                Dim host As String = "sftptest.dreamhosters.com"
                Dim username As String = "snippet_sftp"
                Dim password As String = "9MNfGgSx"

                Dim ssh As New SSHClient()

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

  SSHClient implements the `System.IDisposable` interface. As such, it can be used as part of a using block to make sure the client gets disconnected and resources cleaned-up:

  <Tabs>
  <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.SSH.Client;
          using Xceed.SSH.Protocols;
          using Xceed.SSH.Core;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            class SSHClientTypicalSetup2
            {
              static void Example()
              {
                string host = "sftptest.dreamhosters.com";
                string username = "snippet_sftp";
                string password = "9MNfGgSx";

                using( SSHClient ssh = new SSHClient() )
                {
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

                  /* ... */

                  /* SSHClient.Dispose() will disconnect the client from the server */
                }
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
            Friend Class SSHClientTypicalSetup2
              Private Shared Sub Example()
                Dim host As String = "sftptest.dreamhosters.com"
                Dim username As String = "snippet_sftp"
                Dim password As String = "9MNfGgSx"

                Using ssh As New SSHClient()
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

                  '... 

                  ' SSHClient.Dispose() will disconnect the client from the server 
                End Using
              End Sub
            End Class
          End Namespace
      ```
  </TabItem>
</Tabs>

#### Using proxies
    
    *Main article: [Proxy Support](/ftp/basic-concepts/sftp-capabilities/proxy-support)*

Xceed SFtp for .NET is a proxy client. It supports HTTP and SOCKS proxy protocols to allow a proxy server to establish a connection to a SSH server on its behalf.

#### Key exchange and algorithm negotiation
    *Main article: [Key exchange and algorithm negotiation](/ftp/basic-concepts/sftp-capabilities/key-exch-algorithm-negotiation)*

A SSH connection implies the use of several algorithms that, together, make the connection secure. There are several encryption, data integrity, key exchange, public key and compression algorithms to choose from. These choices are made between the client (Xceed SFtp for .NET) and the server during a phase called key exchange.

#### Authenticating

    *Main article: [Public Key Authentication](/ftp/basic-concepts/sftp-capabilities/public-key-auth)*

    *Main article: [Keyboard-Interactive Authentication](/ftp/basic-concepts/sftp-capabilities/keyboard-interactive-auth)*

The examples above uses password authentication. The component also supports public key authentication and keyboard-interactive authentication.

### Starting SFtp

#### SFtpSession

Once the SSH connection has been successfully established, SFTP sessions can be started. The Xceed.SSH.Client namespace implements the SFtpSession class. This class represents a session between a client and an SFTP server.  The SFtpSession class implements the %IDisposable:System.IDisposable% interface, meaning that every SFtpSession object that is created should also be disposed of by calling the Dispose method or, in C#, creating the SFtpSession object within a using block. If an instance of an SFtpSession object is not disposed of, its connection with the SFtp server may remain active until the SFtp server times-out or the garbage collector clears the object.

:::warning
In the first release of the component, the class  Xceed.SSH.Client.SFtpSession was incorrectly called SFtpConnection. In all future builds and releases, the class name is SFtpSession. The SFtpConnection class still exists as a derived class of SFtpSession. But it has been marked as obsolete. Existing code can be modified to change the name SFtpConnection to SFtpSession. A simple "find and replace" in Visual Studio will do. The functionality remains the same.
:::

An SFtpSession object is typically setup like this:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using( SFtpSession sftp = new SFtpSession( ssh ) )
        {
          AbstractFolder homeFolder = new SFtpFolder( sftp );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Using sftp As New SFtpSession(ssh)
          Dim homeFolder As AbstractFolder = New SFtpFolder(sftp)
        End Using
      ```
    </TabItem>
</Tabs>

The `SFtpFolder` class is a specialization of the AbstractFolder class that exposes properties and methods that provide access to a folder located on an SFTP server.

The SFtpFile class is a specialization of the AbstractFile class that exposes properties and methods that provide access to a file located on an SFTP server.

The `SFtpFolder` and  SFtpFile classes allow you to list folder contents, send files, receive files and get file and folder information.

Items can be copied or moved (in other words, downloaded) from an SFTP server to a local drive, or any other type of folder supported by the [Xceed FileSystem](/ftp/basic-concepts/xceed-filesystem-core/overview), using the `CopyTo`, `CopyFilesTo`, `MoveTo`, or `MoveFilesTo` methods.

Items can be copied or moved (in other words, uploaded) from a local drive, or any other type of folder supported by the Xceed FileSystem, to an SFTP server using the `CopyTo`, `CopyFilesTo`, `MoveTo`, or `MoveFilesTo` methods.

### Downloading

#### Download one file to a folder

To download from a server, select a remote file for download, select a local folder as the destination and call the copy or move methods using the remote file as the source and the local folder as the destination.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote file
        AbstractFile remoteFile = new SFtpFile( sftp, "File1.dat" );

        // Select a local folder
        AbstractFolder localFolder = new DiskFolder( "D:\\DownloadedFiles" );

        // Download the remote file to the local folder
        remoteFile.CopyTo( localFolder, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote file
        Dim remoteFile As AbstractFile = New SFtpFile(sftp, "File1.dat")

        ' Select a local folder
        Dim localFolder As AbstractFolder = New DiskFolder("D:\DownloadedFiles")

        ' Download the remote file to the local folder
        remoteFile.CopyTo(localFolder, True)
      ```
    </TabItem>
</Tabs>

#### Download one file, specifying a custom destination file name
The destination doesn't have to be a folder. You can specify a custom filename when selecting the destination. That is possible because FileSystemItem objects (and their derived objects and don't need to represent physical entities that already exist.

The contents of the remote file will be copied over the local file that bears the specified name.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a specific local file
        AbstractFile localFile = localFolder.GetFile( "MyTargetFilename.dat" );

        // Download the remote file to the local file
        remoteFile.CopyTo( localFile, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
      ' Select a specific local file
      Dim localFile As AbstractFile = localFolder.GetFile("MyTargetFilename.dat")

      ' Download the remote file to the local file
      remoteFile.CopyTo(localFile, True)
      ```
    </TabItem>
</Tabs>

#### Download multiple files to a folder

A group of files can be downloaded from a folder with the CopyFilesTo() and MoveFilesTo(). A filter system is available to select files. By default, all files from the source folder are selected. In fact, when all files need to be selected for an operation, it's more efficient to not specify any filter than to use a "*" or "*.*" filter.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote folder
        AbstractFolder remoteFolder = new SFtpFolder( sftp, "SomeFolder" );

        // Select a local folder
        localFolder = new DiskFolder( "D:\\DownloadedFiles" );

        /* When all files need to be selected for an operation, it's more efficient to not specify
        * any filter than to use a "*" or "*.*" filter. */

        // Download the remote folder's files to the local folder
        remoteFolder.CopyFilesTo( localFolder, true, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
                ' Select a remote folder
                Dim remoteFolder As AbstractFolder = New SFtpFolder(sftp, "SomeFolder")

                ' Select a local folder
                localFolder = New DiskFolder("D:\DownloadedFiles")

      '           When all files need to be selected for an operation, it's more efficient to not specify
      '           * any filter than to use a "*" or "*.*" filter. 

                ' Download the remote folder's files to the local folder
                remoteFolder.CopyFilesTo(localFolder, True, True)
      ```
    </TabItem>
</Tabs>

#### Download selected files to a folder

The FileSystem filter system allows you to select a specific group of files to be selected based on a criteria.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Download the remote folder's XML files to the local folder
        remoteFolder.CopyFilesTo( localFolder, true, true, "*.xml" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
          ' Download the remote folder's XML files to the local folder
          remoteFolder.CopyFilesTo(localFolder, True, True, "*.xml")
      ```
    </TabItem>
</Tabs>

#### Download a complete folder

A folder itself, along with all its contents (no filtering applied), can be downloaded with the CopyTo() and MoveTo() methods.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Download the remote folder itself (and its contents) to the local folder
        remoteFolder.CopyTo( localFolder, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
          ' Download the remote folder itself (and its contents) to the local folder
          remoteFolder.CopyTo(localFolder, True)
      ```
    </TabItem>
</Tabs>

### Uploading

#### Upload a file to a folder

To upload from a local drive to a location on a server, the CopyTo/MoveTo methods are used. A local file is selected as the source and a remote folder is selected as the destination.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a local file
        AbstractFile localFile = new DiskFile( "D:\\SomeFile.dat" );

        // Select a remote folder
        AbstractFolder remoteFolder = new SFtpFolder( sftp );

        // Upload the local file to the remote folder
        localFile.CopyTo( remoteFolder, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
          ' Select a local file
          Dim localFile As AbstractFile = New DiskFile("D:\SomeFile.dat")

          ' Select a remote folder
          Dim remoteFolder As AbstractFolder = New SFtpFolder(sftp)

          ' Upload the local file to the remote folder
          localFile.CopyTo(remoteFolder, True)
      ```
    </TabItem>
</Tabs>

#### Upload a file to a folder using a custom destination filename
The remote destination doesn't have to be a folder. You can specify a custom filename when selecting the destination. That is possible because FileSystemItem objects (and their derived objects and don't need to represent physical entities that already exist.

The contents of the local file will be copied over the remote file that bears the specified name.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a specific remote file
        AbstractFile remoteFile = remoteFolder.GetFile( "MyTargetFilename.dat" );

        // Upload the local file to the remote file
        localFile.CopyTo( remoteFile, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
          ' Select a local file
          ' Select a specific remote file
          Dim remoteFile As AbstractFile = remoteFolder.GetFile("MyTargetFilename.dat")

          ' Upload the local file to the remote file
          localFile.CopyTo(remoteFile, True)
      ```
    </TabItem>
</Tabs>

If the situation requires it, it is possible to perform a manual upload by implementing the copy loop with an appropriate buffer size.

    *Main article: [Performing a manual upload](/ftp/code-snippets/sftp-capabilities/file02)*

#### Upload multiple files to a folder

A group of files can be uploaded from a folder with the CopyFilesTo() and MoveFilesTo(). A filter system is available to select files. By default, all files from the source folder are selected. In fact, when all files need to be selected for an operation, it's more efficient to not specify any filter than to use a "*" or "*.*" filter.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a local folder
        AbstractFolder localFolder = new DiskFolder( "D:\\SomeFolder" );

        /* Notice the standard of using the backslash as a folder separator in FileSystem
        * is maintained. FileSystem will convert the backslash to the proper separator
        * needed by the underlying media automatically. */

        // Select a remote folder
        remoteFolder = new SFtpFolder( sftp, "Data\\UploadedFiles" );

        /* When all files need to be selected for an operation, it's more efficient to not specify
        * any filter than to use a "*" or "*.*" filter. */

        // Upload the local folder's files to the remote folder
        localFolder.CopyFilesTo( remoteFolder, true, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
          ' Select a local folder
          Dim localFolder As AbstractFolder = New DiskFolder("D:\SomeFolder")

'           Notice the standard of using the backslash as a folder separator in FileSystem
'           * is maintained. FileSystem will convert the backslash to the proper separator
'           * needed by the underlying media automatically. 

          ' Select a remote folder
          remoteFolder = New SFtpFolder(sftp, "Data\UploadedFiles")

'           When all files need to be selected for an operation, it's more efficient to not specify
'           * any filter than to use a "*" or "*.*" filter. 

          ' Upload the local folder's files to the remote folder
          localFolder.CopyFilesTo(remoteFolder, True, True)
      ```
    </TabItem>
</Tabs>

#### Upload selected files to a folder
The FileSystem filter system allows you to select a specific group of files to be selected based on a criteria.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Upload the local folder's XML files to the remote folder
        localFolder.CopyFilesTo( remoteFolder, true, true, "*.xml" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
      ' Upload the local folder's XML files to the remote folder
      localFolder.CopyFilesTo(remoteFolder, True, True, "*.xml")
      ```
    </TabItem>
</Tabs>

#### Upload a complete folder
A folder itself, along with all its contents (no filtering applied), can be uploaded with the CopyTo() and MoveTo() methods.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Upload the local folder itself (and its contents) to the remote folder
        localFolder.CopyTo( remoteFolder, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
      ' Upload the local folder itself (and its contents) to the remote folder
      localFolder.CopyTo(remoteFolder, True)
      ```
    </TabItem>
</Tabs>

### Listing

#### Listing all items

The contents of folders can be obtained with the GetItems() method. It returns an array of FileSystemItem objects that will be objects derived from AbstractFile or AbstractFolder. The method takes a recursive parameter that specifies if the contents of sub folders are to be included in the list.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote folder
        remoteFolder = new SFtpFolder( sftp, "SomeFolder" );

        FileSystemItem[] items = remoteFolder.GetItems( true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote folder
        remoteFolder = New SFtpFolder(sftp, "SomeFolder")

        Dim items() As FileSystemItem = remoteFolder.GetItems(True)
      ```
    </TabItem>
</Tabs>

#### Listing folders only
The GetFolders() method works on the same principle as GetItems() but it only returns AbstractFolder objects.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFolder[] folders = remoteFolder.GetFolders( true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim folders() As AbstractFolder = remoteFolder.GetFolders(True)
      ```
    </TabItem>
</Tabs>

#### Listing files only

The GetFiles() method works on the same principle as GetItems() but it only returns AbstractFiles objects.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = remoteFolder.GetFiles( true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files() As AbstractFile = remoteFolder.GetFiles(True)
      ```
    </TabItem>
</Tabs>

#### Listing files with filters

The GetFiles() method accepts filters as parameters to narrow down the list of files returned.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] xmlFiles = remoteFolder.GetFiles( true, "*.xml" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim xmlFiles() As AbstractFile = remoteFolder.GetFiles(True, "*.xml")
      ```
    </TabItem>
</Tabs>

### Renaming

#### Rename a file

A SFtpFile, like any AbstractFile, can be renamed simply by setting its Name property to a new value.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote file
        remoteFile = new SFtpFile( sftp, "File1.dat" );

        // Rename the remote file
        remoteFile.Name = "NewName.dat";
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote file
        remoteFile = New SFtpFile(sftp, "File1.dat")

        ' Rename the remote file
        remoteFile.Name = "NewName.dat"
      ```
    </TabItem>
</Tabs>

#### Rename a folder
Renaming a folder works the same way as renaming a file, the SFtpFolder's Name property value is changed.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote folder
        remoteFolder = new SFtpFolder( sftp, "folder1" );

        // Rename the remote file
        remoteFolder.Name = "NewFolderName";
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote folder
        remoteFolder = New SFtpFolder(sftp, "folder1")

        ' Rename the remote file
        remoteFolder.Name = "NewFolderName"
      ```
    </TabItem>
</Tabs>

### Deleting
#### Delete a file
The Delete() method deletes files. The method throws an exception if the file to delete doesn't exist. It is good practice to check if the file exists before calling Delete().

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote file
        remoteFile = new SFtpFile( sftp, "File1.dat" );

        // If the remote file exists
        if( remoteFile.Exists )
        {
          /* Careful! You might not have the rights to delete files on the remote server */

          // Delete it
          remoteFile.Delete();
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote file
        remoteFile = New SFtpFile(sftp, "File1.dat")

        ' If the remote file exists
        If remoteFile.Exists Then
          ' Careful! You might not have the rights to delete files on the remote server 

          ' Delete it
          remoteFile.Delete()
        End If
      ```
    </TabItem>
</Tabs>

#### Delete a folder
The Delete() method deletes folders. All the files and sub folders will be deleted from the selected folder. Then, the folder itself will be deleted. The method throws an exception if the folder to delete doesn't exist. It is good practice to check if the folder exists before calling Delete().

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote folder
        remoteFolder = new SFtpFolder( sftp, "folder1\folder2" );

        // If the remote folder exists
        if( remoteFile.Exists )
        {
          /* Careful! You might not have the rights to delete files on the remote server */

          // Delete it
          remoteFolder.Delete();
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote folder
        remoteFolder = New SFtpFolder(sftp, "folder1" & Constants.vbFormFeed & "older2")

        ' If the remote folder exists
        If remoteFile.Exists Then
          ' Careful! You might not have the rights to delete files on the remote server 

          ' Delete it
          remoteFolder.Delete()
        End If
      ```
    </TabItem>
</Tabs>

### Creating
#### Create a file
The Create() method creates files. The method throws an exception if the file to create already exists.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Select a remote file
        remoteFile = new SFtpFile( sftp, @"folder1\folder2\NewFolder\NewFile1.dat" );

        // If the remote file doesn't exist yet
        if( !remoteFile.Exists )
        {
          // Create it
          remoteFile.Create();
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote file
        remoteFile = New SFtpFile(sftp, "folder1\folder2\NewFolder\NewFile1.dat")

        ' If the remote file doesn't exist yet
        If (Not remoteFile.Exists) Then
          ' Create it
          remoteFile.Create()
        End If
      ```
    </TabItem>
</Tabs>

#### Create a folder
The Create() method also creates folders. The method throws an exception if the folder to create already exists.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
       // Select a remote folder
      remoteFolder = new SFtpFolder( sftp, @"folder1\folder2\NewFolder\NewSubFolder" );

      // If the remote folder doesn't exist yet
      if( !remoteFolder.Exists )
      {
        // Create it
        remoteFolder.Create();
      }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Select a remote folder
        remoteFolder = New SFtpFolder(sftp, "folder1\folder2\NewFolder\NewSubFolder")

        ' If the remote folder doesn't exist yet
        If (Not remoteFolder.Exists) Then
          ' Create it
          remoteFolder.Create()
        End If
      ```
    </TabItem>
</Tabs>

## Naming conventions, home and root directories

SFTP defines the directory path separator as '/'. However, the Xceed FileSystem uses the '\' character. When using SFtpFolder and SftpFile, always use '\' as the folder separator. This allows consistency with the other specializations of FileSystemItem (DiskFile, ZippedFolder, etc). The component will translate the separator internally.

SFTP has concepts of the default directory, absolute and relative directories. File names starting with a backslash ('\') are "absolute", and are relative to the root of the file system. That root is defined by the server and its value usually depends on the user that is authenticated. Names starting with any other character are relative to the user's default directory. That default directory is defined by the server and its value usually depends on the user that is authenticated. An empty path name is valid, and refers to the default directory. A path name component ".."  refers to the parent directory, and "." refers to the current directory.

These conventions are in effect when you specify paths for SFtpFile and SFtpFolder.

For example, the following lines both make 'destinationFolder' refer to the default directory.  SFtpFolder internally resolves the logical default directory so that you can get the full, absolute path if you get the value of its FullName property. You will also get the folder name that the default path refers to with the Name property.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFolder home = new SFtpFolder( sftp );

        AbstractFolder homeToo = new SFtpFolder( sftp, "" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim home As AbstractFolder = New SFtpFolder(sftp)

        Dim homeToo As AbstractFolder = New SFtpFolder(sftp, "")
      ```
    </TabItem>
</Tabs>

The following line refers to a file, relative to the default directory. SFtpFile internally resolves the relative path so that you can get the full, absolute path if you get the value of its FullName property.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile file = new SFtpFile( sftp, @"folder1\folder2\somefile.dat" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim file As AbstractFile = New SFtpFile(sftp, "folder1\folder2\somefile.dat")
      ```
    </TabItem>
</Tabs>

## Permissions
The SFTP server decides what files and folders you see and files you have access to. Most of the time, access depends on the authenticated SSH user.

## One SSH connection, multiple SFtp sessions
The SSH protocol has the ability to multiplex a single connection into several logical channels. SFTP is one such channel. That means that you can use the same SSHClient object for multiple SFtpSession objects. For example, the following is allowed:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SFtpSession sftp1 = new SFtpSession( ssh );
        SFtpSession sftp2 = new SFtpSession( ssh );

        /* ... */

        sftp2.Dispose();
        sftp1.Dispose();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim sftp1 As New SFtpSession(ssh)
        Dim sftp2 As New SFtpSession(ssh)

        '... 

        sftp2.Dispose()
        sftp1.Dispose()
      ```
    </TabItem>
</Tabs>

Understand that creating multiple sessions will not necessarily increase overall transmission speed.

## Technical overview and limitations
This component implements version 2 of the SSH protocols (usually called SSH-2). Based on RFC 4250, RFC 4251, RFC 4252, RFC 4253, RFC 4254 and draft-ietf-secsh-filexfer-13. SSH-1 is not supported and is not planned.

The component uses the following client version string:

    SSH-2.0-Xceed.SSH.`version number`

where `version number`is the assembly's major and minor version number (for example, SSH-2.0-Xceed.SSH.5.2).

The component implements the following algorithms. The order in which the algorithms are listed in each category indicates the default preference of the component when negociating a connection. During negotiation, the client and the server exchange lists of supported algorithms. The first common algorithms between the lists are then used for the connection. So the higher the position in the list, the more an algorithm has a chance of being used.

#### Key exchange
- diffie-hellman-group-exchange-sha1
- diffie-hellman-group-exchange-sha256 (.NET 4.0 or later required)
- diffie-hellman-group1-sha1
- diffie-hellman-group14-sha1
- diffie-hellman-group14-sha256
- diffie-hellman-group15-sha512
- ecdh-sha2-1.3.132.0.10 (this is ecdh-sha2-secp256k1)
- ecdh-sha2-nistp256
- ecdh-sha2-nistp384
- ecdh-sha2-nistp521
- diffie-hellman-group16-sha512

#### Public key
- rsa-sha2-256
- rsa-sha2-512
- ssh-rsa
:::note 
Supported key lengths for RSA range from 384 bits to 4096 bits in increments of 8 bits if you have the Microsoft Enhanced Cryptographic Provider installed. Key lengths from 384 bits to 512 bits are supported in increments of 8 bits if you only have the Microsoft Base Cryptographic Provider installed.
:::
- ssh-dss
:::note
Supported key lengths range for DSS (also known as DSA) from 512 bits to 1024 bits in increments of 64 bits.
:::
- ecdsa-sha2-1.3.132.0.10 (this is ecdsa-sha2-secp256k1)
- ecdsa-sha2-nistp256
- ecdsa-sha2-nistp384
- ecdsa-sha2-nistp521

#### Encryption (both directions)
- aes128-cbc
- aes256-cbc
- aes192-cbc
- aes128-ctr
- aes256-ctr
- aes192-ctr
- aes128-gcm@openssh.com
- aes256-gcm@openssh.com
- aes128-gcm
- aes256-gcm
- 3des-cbc
- 3des-ctr
- arcfour256
- arcfour128
- arcfour
- none

#### Data integrity (both directions)
- hmac-sha1
- hmac-sha1-96
- hmac-sha2-256
- hmac-sha2-256-96
- hmac-sha2-512
- hmac-md5
- hmac-md5-96
- none

#### Compression (both directions)

- none

#### Languages (both directions)
- an empty list is always sent to the server

#### Authentication
- password
- publickey
- Putty Private Key file (PPK)
- keyboard-interactive

Support for more algorithms will be added in future versions of the component.

The component implements portions of version 6 of the SFTP protocol. It also supports version 3. The component asks the server for version 6 but accepts version 3 if that version is included in the server's reply. The component does not currently support any other version number (below 3 and version 4 and 5).

The component has been tested with WinSSHD and OpenSSH server software.