import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to send custom commands

The `SendCustomCommand` method of the FtpClient class and the `BeginSendCustomCommand`/ `EndSendCustomCommand` methods of the AsyncFtpClient class are used to send custom FTP commands to an FTP server. This means that commands that can be used from the command prompt FTP, although they might be recognized by some FTP servers, are not guaranteed to work. 

Not all commands are supported by all FTP servers. In order to determine which commands are supported, you can use the `SendCustomCommand` or `BeginSendCustomCommand`/`EndSendCustomCommand` methods to send the "HELP" command. 

The `SendCustomCommand` and `BeginSendCustomCommand`/`EndSendCustomCommand` methods do not support custom commands that require a data connection such as STOR (SendFile, `BeginSendFile`/ `EndSendFile`), RETR (`ReceiveFile`, `BeginReceiveFile`/ `EndReceiveFile`), NLST and LIST ( `GetFolderContents`, `BeginGetFolderContents`/ `EndGetFolderContents`), etc. For a complete list of the FTP commands that can be sent to an FTP server using either the `SendCustomCommand` and `BeginSendCustomCommand`/`EndSendCustomCommand` methods or another of the FtpClient's methods/properties, refer to the FTP commands glossary topic. 

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` instead to improve code readability.
::

:::note
When using Xceed FTP for .NET in a WinForms application, it is recommended that a SynchronizingObject be assigned to the SynchronizingObject property of the `FtpClient` class. For more information, jump to the [WinForms applications and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading). 
:::

## Synchronous (blocking) and asynchronous (non-blocking) demonstration using FtpClient

The following example demonstrates how to send the "HELP" command to an FTP server using the `SendCustomCommand` method. An asynchronous (non-blocking) demonstration is also available further below.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.Ftp;

        FtpClient ftp = new FtpClient();

        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        ftp.SynchronizingObject = this;

        ftp.Connect( "localhost" );    
        ftp.Login();  

        string reply = ftp.SendCustomCommand( "HELP" );
        MessageBox.Show( reply );

        ftp.Disconnect();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        ' When using FtpClient, you can instruct
        ' the library to automatically redirect events on the main UI thread
        ' by setting the SynchronizingObject property.
        ftp.SynchronizingObject = Me

        Dim ftp As New FtpClient()
        
        ftp.Connect( "localhost" )
        ftp.Login()

        Dim reply As String = ftp.SendCustomCommand( "HELP" )
        MessageBox.Show( reply )

        ftp.Disconnect()
      ```
    </TabItem>
</Tabs>

## Asynchronous (non-blocking) demonstration

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the AsyncFtpClient class is now considered obsolete. It is therefore recommended to use `FtpClient` and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

The following example demonstrates how to asynchronously send the "HELP" command to an FTP server using the BeginSendCustomCommand/ EndSendCustomCommand methods. A synchronous (non-blocking) demonstration is also available. 

To clarify the code, instead of using callbacks, we will wait for completion of the operation before calling the matching "End" method. More information is available in the [WinForms application and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading).

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.Ftp;

        AsyncFtpClient ftp = new AsyncFtpClient();

        IAsyncResult result = ftp.BeginConnect( "localhost", null, null );    

        while( !result.IsCompleted )
          Application.DoEvents();

        ftp.EndConnect( result );
        result = ftp.BeginLogin( null, null );

        while( !result.IsCompleted )
          Application.DoEvents();
          
        ftp.EndLogin( result );
        result = ftp.BeginSendCustomCommand( "HELP", null, null );

        while( !result.IsCompleted )
          Application.DoEvents();

        string reply = ftp.EndSendCustomCommand( result );
        MessageBox.Show( reply );
                                                        
        result = ftp.BeginDisconnect( null, null );

        while( !result.IsCompleted )
          Application.DoEvents();

        ftp.EndDisconnect( result );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        Dim ftp As New AsyncFtpClient()
        Dim result As IAsyncResult = ftp.BeginConnect("localhost", Nothing, Nothing)

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndConnect( result )
        result = ftp.BeginLogin( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndLogin( result )
        result = ftp.BeginSendCustomCommand( "HELP", Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        Dim reply As String = ftp.EndSendCustomCommand(result)
        MessageBox.Show( reply )

        result = ftp.BeginDisconnect( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndDisconnect( result )
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Are you using Xceed FTP for .NET in a WinForms application? Use the `AsyncFtpClient` class rather than the `FtpClient` class.