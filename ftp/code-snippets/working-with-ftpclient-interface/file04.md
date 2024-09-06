import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to list the contents of an FTP folder

The `GetFolderContents` and `GetRawFolderContents` methods of the FtpClient class as well as the `BeginGetFolderContents`/ `EndGetFolderContents` and `BeginGetRawFolderContents`/ `EndGetRawFolderContents` methods of the `AsyncFtpClient` class are used to list the contents of a folder on an FTP server. 

All these methods retrieve the entire (or filtered) contents of the FTP server's current working folder; however, the `GetFolderContents` and `BeginGetFolderContents`/`EndGetFolderContents` methods will return a collection of FtpItemInfo objects while the `GetRawFolderContents` and `BeginGetRawFolderContents`/`EndGetRawFolderContents` methods will return an unprocessed, clear text list (`StringList`). 

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` instead to improve code readability.
::

:::note
When using Xceed FTP for .NET in a WinForms application, it is recommended that a SynchronizingObject be assigned to the SynchronizingObject property of the `FtpClient` class. For more information, jump to the [WinForms applications and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading). 
:::

All the methods above list the files from the FTP server's current working directory. If you want to list the files from another location, you could use the `ChangeCurrentFolder` or `BeginChangeCurrentFolder`/ `EndChangeCurrentFolder`, or `ChangeToParentFolder` or `BeginChangeToParentFolder`/ `EndChangeToParentFolder` methods to change the current working folder. The current working folder can be retrieved via the `GetCurrentFolder` or `BeginGetCurrentFolder`/ `EndGetCurrentFolder` methods.

## Synchronous (blocking) and asynchronous (non-blocking) demonstration using FtpClient

The following example demonstrates how to list the entire contents of an FTP server's current working folder using the GetFolderContents method and provide logging information during the process using the CommandSent and ReplyReceived events. An asynchronous (non-blocking) demonstration is also available.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.Ftp;
 
        FtpClient ftp = new FtpClient();

        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        client.SynchronizingObject = this;
              
        ftp.CommandSent += new CommandSentEventHandler( this.FTP_CommandSent );
        ftp.ReplyReceived += new ReplyReceivedEventHandler( this.FTP_ReplyReceived );
        
        ftp.Connect( "localhost" );
        ftp.Login();
        
        FtpItemInfoList items = ftp.GetFolderContents( string.Empty );
        
        foreach( FtpItemInfo item in items )
        {
          listBox1.Items.Add( item.Type.ToString() + " " + item.Name );
        }
        
        ftp.Disconnect();
        
        ftp.CommandSent -= new CommandSentEventHandler( this.FTP_CommandSent );
        ftp.ReplyReceived -= new ReplyReceivedEventHandler( this.FTP_ReplyReceived );
        
        private void FTP_CommandSent( object sender, CommandSentEventArgs e )
        {
          listBox1.Items.Add( ">> " + e.Command );
        }
        
        private void FTP_ReplyReceived( object sender, ReplyReceivedEventArgs e )
        {
          listBox1.Items.Add( "<< " + e.Reply.ToString() );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        Dim ftp As New FtpClient()

        ' When using FtpClient, you can instruct
        ' the library to automatically redirect events on the main UI thread
        ' by setting the SynchronizingObject property.
        client.SynchronizingObject = Me

        AddHandler ftp.CommandSent, AddressOf Me.FTP_CommandSent
        AddHandler ftp.ReplyReceived, AddressOf Me.FTP_ReplyReceived

        ftp.Connect( "localhost" )
        ftp.Login()

        Dim items As FtpItemInfoList = "ftp://ftp.GetFolderContents(String.Empty">ftp.GetFolderContents(String.Empty)
        Dim item As FtpItemInfo

        For Each item In items
          ListBox1.Items.Add( item.Type.ToString() + " " + item.Name )
        Next item

        ftp.Disconnect()

        RemoveHandler ftp.CommandSent, AddressOf Me.FTP_CommandSent
        RemoveHandler ftp.ReplyReceived, AddressOf Me.FTP_ReplyReceived

        Private Sub FTP_CommandSent(ByVal sender As Object, ByVal e As CommandSentEventArgs)
          ListBox1.Items.Add(">> " + e.Command)
        End Sub

        Private Sub FTP_ReplyReceived(ByVal sender As Object, ByVal e As ReplyReceivedEventArgs)
          ListBox1.Items.Add("<< " + e.Reply.ToString())
        End Sub
      ```
    </TabItem>
</Tabs>

## Asynchronous (non-blocking) demonstration
:::note
`AsyncFtpClient`'s methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use FtpClient and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

The following example demonstrates how to list the entire contents of an FTP server's current working folder using the GetFolderContents method and provide logging information during the process using the CommandSent and ReplyReceived events. A synchronous (blocking) demonstration is also available. 

To clarify the code, instead of using callbacks, we will wait for completion of the operation before calling the matching "End" method. More information is available in the [WinForms application and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading).

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.Ftp;
 
        AsyncFtpClient ftp = new AsyncFtpClient();
              
        ftp.CommandSent += new CommandSentEventHandler( this.FTP_CommandSent );
        ftp.ReplyReceived += new ReplyReceivedEventHandler( this.FTP_ReplyReceived );
        
        IAsyncResult result = ftp.BeginConnect( "localhost", null, null );
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndConnect( result );
        result = ftp.BeginLogin( null, null );
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndLogin( result );
        result = ftp.BeginGetFolderContents( string.Empty, null, null );
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        FtpItemInfoList items = ftp.EndGetFolderContents( result );
        
        foreach( FtpItemInfo item in items )
        {
          listBox1.Items.Add( item.Type.ToString() + " " + item.Name );
        }
        
        result = ftp.BeginDisconnect( null, null );
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndDisconnect( result );
        
        ftp.CommandSent -= new CommandSentEventHandler( this.FTP_CommandSent );
        ftp.ReplyReceived -= new ReplyReceivedEventHandler( this.FTP_ReplyReceived );
        
        private void FTP_CommandSent( object sender, CommandSentEventArgs e )
        {
          listBox1.Items.Add( ">> " + e.Command );
        }
        
        private void FTP_ReplyReceived( object sender, ReplyReceivedEventArgs e )
        {
          listBox1.Items.Add( "<< " + e.Reply.ToString() );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        Dim ftp As New AsyncFtpClient()

        AddHandler ftp.CommandSent, AddressOf Me.FTP_CommandSent
        AddHandler ftp.ReplyReceived, AddressOf Me.FTP_ReplyReceived

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
        result = ftp.BeginGetFolderContents( string.Empty, Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        Dim items As FtpItemInfoList = ftp.EndGetFolderContents(result)
        Dim item As FtpItemInfo

        For Each item In items
          ListBox1.Items.Add( item.Type.ToString() + " " + item.Name )
        Next item

        result = ftp.BeginDisconnect( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndDisconnect( result )

        RemoveHandler ftp.CommandSent, AddressOf Me.FTP_CommandSent
        RemoveHandler ftp.ReplyReceived, AddressOf Me.FTP_ReplyReceived

        Private Sub FTP_CommandSent(ByVal sender As Object, ByVal e As CommandSentEventArgs)
          ListBox1.Items.Add(">> " + e.Command)
        End Sub

        Private Sub FTP_ReplyReceived(ByVal sender As Object, ByVal e As ReplyReceivedEventArgs)
          ListBox1.Items.Add("<< " + e.Reply.ToString())
        End Sub
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Are you using Xceed FTP for .NET in a WinForms application? Use the AsyncFtpClient class rather than the `FtpClient` class. 

- Do you want the FTP server to initiate the data connection rather than the FTP client? Set the `PassiveTransfer` property to false. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the `Timeout` property. 

- Do you want to create a log file of the FTP process? Set the `TraceWriter` property. 

- Do you want to know the state of the FTP client? Check the Connected and Busy properties. You can also check the State property for specific state information. 

- Do you want to know when a file's information is being listed/parsed and/or manually parse the listing? Handle the `ParsingListingLine` event. The `ParsingListingLine` event will not be raised by the `GetRawFolderContents` method. 

- Do you want to display progress information? Handle the `FileTransferStatus` event. 

- Do you want to abort the FTP operation? Call the `Abort` method. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property.