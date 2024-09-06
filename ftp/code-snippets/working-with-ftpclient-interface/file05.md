import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to manually parse listing lines

Xceed FTP for .NET currently provides automatic support for listing the contents of AS400, DOS (Windows), UNIX and VMS FTP servers when calling the `GetFolderContents` method of the `FtpClient` class or the `BeginGetFolderContents`/ `EndGetFolderContents` methods of the AsyncFtpClient class. To modify or manually parse the listing lines returned by the FTP server, the ParsingListingLine event can be used, or a new listing parser added to the FTP client's ListingParsers collection. 

Usually, if you only want to modify or filter the listing lines returned by the `GetFolderContents` or `BeginGetFolderContents`/`EndGetFolderContents` methods, you would handle the ParsingListingLine event rather than creating a listing parser. If however you want to support the listing lines returned by an FTP server that is not automatically supported by Xceed FTP for .NET, then your best option would be to create a listing parser as it will make it easier to reuse your code. 

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` instead to improve code readability.
::

:::note
When using Xceed FTP for .NET in a WinForms application, it is recommended that a SynchronizingObject be assigned to the SynchronizingObject property of the `FtpClient` class. For more information, jump to the [WinForms applications and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading). 
:::

To create a custom listing parser, create a class that derives from the `FtpListingParser` class and override the `ParseLine` method. In the `ParseLine` method, parse the line that is received as a parameter to create and return a new `FtpItemInfo` object that contains the FTP item's information. Once you have your custom listing parser, add it to the FTP client's `ListingParsers` collection. 

The `GetFolderContents` and `BeginGetFolderContents`/`EndGetFolderContents` methods retrieve the entire (or filtered) contents of the FTP server's current working folder. 

If you want to retrieve the contents of another folder, you could use the `ChangeCurrentFolder` or `BeginChangeCurrentFolder`/ `EndChangeCurrentFolder` methods, or `ChangeToParentFolder` or `BeginChangeToParentFolder`/ `EndChangeToParentFolder` methods to change the current working folder. The current working folder can be retrieved via the `GetCurrentFolder` or `BeginGetCurrentFolder`/ `EndGetCurrentFolder` methods. 

:::note
The `ReceiveMultipleFiles` and `SendMultipleFiles` method will also raise the `ParsingListingLine` event.
:::

## Synchronous (blocking) and asynchronous (non-blocking) demonstration using FtpClient

The following examples demonstrates how use the `ParsingListingLine` event to manually parse the listing lines returned by an FTP server to remove the potential   "." and ".." items. An asynchronous (non-blocking) demonstration is also available.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        FtpClient ftp = new FtpClient();
 
        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        ftp.SynchronizingObject = this;

        ftp.ParsingListingLine += new ParsingListingLineEventHandler( this.parsing_line );
                    
        ftp.Connect( "localhost" );
        ftp.Login();
                    
        ftp.GetFolderContents();
        
        ftp.Disconnect();
        
        ftp.ParsingListingLine -= new ParsingListingLineEventHandler( this.parsing_line );
                    
        private void parsing_line( object sender, ParsingListingLineEventArgs e )
        {
          if( ( e.Item.Name == "." ) || ( e.Item.Name == ".." ) )
          {
            e.Valid = false;
          }
          else
          {
            listBox1.Items.Add( e.Item.Name );        
          } 
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim ftp As New FtpClient()

        ' When using FtpClient, you can instruct
        ' the library to automatically redirect events on the main UI thread
        ' by setting the SynchronizingObject property.
        ftp.SynchronizingObject = Me

        AddHandler ftp.ParsingListingLine, AddressOf Me.parsing_line

        ftp.Connect( "localhost" )
        ftp.Login()

        ftp.GetFolderContents()

        ftp.Disconnect()

        RemoveHandler ftp.ParsingListingLine, AddressOf Me.parsing_line

        Private void parsing_line( ByVal sender As Object, _
                                  ByVal e As ParsingListingLineEventArgs )
          If( e.Item.Name = "." ) Or ( e.Item.Name = ".." ) Then
            e.Valid = False
          Else
            ListBox1.Items.Add( e.Item.Name )
          End If
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
        AsyncFtpClient ftp = new AsyncFtpClient ();
 
        ftp.ParsingListingLine += new ParsingListingLineEventHandler( this.parsing_line );            
        IAsyncResult result = ftp.BeginConnect( "localhost", null, null);
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndConnect( result );
        result = ftp.BeginLogin( null, null);
        
        while( !result.IsCompleted )
          Application.DoEvents();
                    
        ftp.EndLogin( result );
        result = ftp.BeginGetFolderContents( null, null);
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndGetFolderContents( result );
        result = ftp.BeginDisconnect( null, null);
        
        while( !result.IsCompleted )
          Application.DoEvents();
        
        ftp.EndDisconnect( result );
        ftp.ParsingListingLine -= new ParsingListingLineEventHandler( this.parsing_line );
                    
        private void parsing_line( object sender, ParsingListingLineEventArgs e )
        {
          if( ( e.Item.Name == "." ) || ( e.Item.Name == ".." ) )
          {
            e.Valid = false;
          }
          else
          {
            listBox1.Items.Add( e.Item.Name );        
          } 
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim ftp As New AsyncFtpClient()

        AddHandler ftp.ParsingListingLine, AddressOf Me.parsing_line

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
        result = ftp.BeginGetFolderContents( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndGetFolderContents( result )
        result = ftp.BeginDisconnect( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndDisconnect( result )
        RemoveHandler ftp.ParsingListingLine, AddressOf Me.parsing_line

        Private Sub parsing_line(ByVal sender As Object, ByVal e As ParsingListingLineEventArgs)
          If (e.Item.Name = ".") Or (e.Item.Name = "..") Then
            e.Valid = False
          Else
            ListBox1.Items.Add(e.Item.Name)
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Are you using Xceed FTP for .NET in a WinForms application? Use the `AsyncFtpClient` class rather than the `FtpClient` class. 

- Do you want to know the state of the FTP client? Check the `Connected` and `Busy` properties. You can also check the `State` property for specific state information. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property.