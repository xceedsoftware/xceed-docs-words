import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Handling File Sharing Issues

## Introduction
The concept of file sharing is an option when a file is opened successfully. The option defines what is to happen if another process tries to open the same file should it work or fail.

In the .NET framework, the option is defined by the %T:System.IO.FileShare% enumeration. The `Xceed.FileSystem.AbstractFile` uses the enumeration with the `OpenRead()` and `OpenWrite()` methods as an optional parameter. Default values are available and can be changed at a global level.

In the world of SFtp, FileShare options are only supported in versions 5 and later of the SFtp protocol. When lower versions are used, like the very common version 3 that most servers implement, the FileShare values used by SFtpFile and silently ignored when opening remote files.

### Default behavior
The default behavior of the component is allow sharing of files for both reading and writing. This means that no blocking is requested when opening remote SFtp files. This behavior is different than other FileSystem media like DiskFile for example where no sharing is allowed when opening a file for writing.

Some SFtp servers return errors when %T:System.IO.FileShare% options block reading and/or writing by other server processes when a file is opened. To prevent errors, blocking is not used by default by SFtpFile.

### When writing files
Uploading opens SFtp remote files for writing and so uses the `SFtpFile.DefaultAutomaticWriteFileShare` property value.

If supported by the server, it is best practice to enable blocking for reading, writing and deleting when opening a file for writing. This way, it can be guaranteed that only a single process can write to a file at the same time. This is done by calling `SFtpFile.SetDefaultAutomaticWriteFileShare` method to %FileShare.None:System.IO.FileShareFileShare%.

The default automatic FileShare can be returned to its default value by calling the `SFtpFile.SetDefaultAutomaticWriteFileShare` method with null.


<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        // Set the write file share to block reading and/or writing by other processes when writing files
        SFtpFile.SetDefaultAutomaticWriteFileShare( FileShare.None );

        // Uploading opens SFtp remote files for writing and so uses the DefaultAutomaticWriteFileShare property value
        localFolder.CopyFilesTo( remoteFolder, true, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Set the write file share to block reading and/or writing by other processes when writing files
        SFtpFile.SetDefaultAutomaticWriteFileShare(FileShare.None)

        ' Uploading opens SFtp remote files for writing and so uses the DefaultAutomaticWriteFileShare property value
        localFolder.CopyFilesTo(remoteFolder, True, True)
      ```
    </TabItem>
</Tabs>

### When reading files
Downloading opens SFtp remote files for reading and so uses the SFtpFile.DefaultAutomaticReadFileShare property value.

If supported by the server, it is best practice to enable blocking for writing and deleting when opening a file for reading. This way, it can be guaranteed that only a single process can write to a file at the same time but allow for any number of processes to read from the file at the same time. This is done by setting the SFtpFile.DefaultAutomaticReadFileShare property to %FileShare.Read:System.IO.FileShareFileShare%.

The default automatic FileShare can be returned to its default value by calling the SFtpFile.SetDefaultAutomaticReadFileShare method with null.

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

## Example
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