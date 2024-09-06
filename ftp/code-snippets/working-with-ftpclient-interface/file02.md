import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to continue a multiple-file transfer

## Introduction
By default, when calling the `ReceiveMultipleFiles` and `SendMultipleFiles` methods of the FtpClient class or the `BeginReceiveMultipleFiles`/ `EndReceiveMultipleFiles` methods of the AsyncFtpClient class, if an error occurs during the transfer of one of the files, the entire multiple-file transfer operation will be aborted. To prevent the operation from being aborted or to try to correct the situation, the `MultipleFileTransferError` event can be used. 

In the `MultipleFileTransferError` event, you can decide to Abort the entire operation (default behavior), retry transferring the item that caused the error, or ignore the item that caused the error and continue transferring the other items. 

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the AsyncFtpClient class is now considered obsolete. It is therefore recommended to use FtpClient instead to improve code readability.
:::

:::note
When using Xceed FTP for .NET in a WinForms application, it is recommended that a SynchronizingObject be assigned to the SynchronizingObject property of the FtpClient class to ensure that the UI remains responsive. For more information, jump to the [WinForms applications and threading topic](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading). 
:::

All the methods above receive the files from the FTP server's current working directory. If you want to receive the files from another location, you could use the `ChangeCurrentFolder` or `BeginChangeCurrentFolder`/ `EndChangeCurrentFolder`, or `ChangeToParentFolder` or `BeginChangeToParentFolder`/ `EndChangeToParentFolder` methods to change the current working folder. The current working folder can be retrieved via the `GetCurrentFolder` or `BeginGetCurrentFolder`/ `EndGetCurrentFolder` methods. 

**Other methods of the FTP client must not be called in this event handler! For example, `DeleteFile` cannot be called to delete an existing file so that the file transfer (for that particular file) can be retried.**

## Synchronous (blocking) and asynchronous (non-blocking) demonstration using FtpClient

The following examples show how to connect to an FTP server through an HTTP proxy server.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        FtpClient ftp = new FtpClient();            

        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        client.SynchronizingObject = this;

        ftp.MultipleFileTransferError += new MultipleFileTransferErrorEventHandler( this.transfer_error );
                  

        ftp.Connect( "localhost" );
        ftp.Login();
        ftp.ChangeCurrentFolder( "ClientFiles" );
        ftp.ReceiveMultipleFiles( string.Empty, @"C:\ClientFiles", false, false );
        ftp.Disconnect(); 

        ftp.MultipleFileTransferError -= new MultipleFileTransferErrorEventHandler( this.transfer_error ); 
                  

        private void transfer_error( object sender, MultipleFileTransferErrorEventArgs e )
        {
          FtpReplyException exception = e.Exception as FtpReplyException;

          if( exception != null )
          {
            listBox1.Items.Add( "Unable to transfer " + e.RemoteItemName + 
                                ". The message returned by the FTP server was : " + e.Exception.Message );
            e.Action = MultipleFileTransferErrorAction.Ignore;
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
        client.SynchronizingObject = Me

        AddHandler ftp.MultipleFileTransferError, AddressOf Me.transfer_error            

        ftp.Connect( "localhost" )
        ftp.Login()
        ftp.ChangeCurrentFolder
        ftp.Login()
        ftp.ChangeCurrentFolder( "ClientFiles" )
        ftp.ReceiveMultipleFiles( String.Empty, "C:\ClientFiles", False, False )
        ftp.Disconnect() 

        RemoveHandler ftp.MultipleFileTransferError, AddressOf Me.transfer_error            

        Private Sub transfer_error( ByVal sender As Object, _
                                    ByVal e As MultipleFileTransferErrorEventArgs )            

          If TypeOf e.Exception Is FtpReplyException Then
            ListBox1.Items.Add("Unable to transfer " + e.RemoteItemName + _
                              ". The message returned by the FTP server was : " + e.Exception.Message)
              e.Action = MultipleFileTransferErrorAction.Ignore
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

## Asynchronous (non-blocking ) demonstration using AsyncFtpClient
:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the AsyncFtpClient class is now considered obsolete. It is therefore recommended to use FtpClient and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

The following example demonstrates how to use the `MultipleFileTransferError` event to continue downloading during the multiple-file transfer even when one of the files causes an error. A synchronous (blocking) demonstration is also available. 

To clarify the code, instead of using callbacks, we will wait for completion of the operation before calling the matching "End" method. More information is available in the WinForms application and threading topic.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          AsyncFtpClient ftp = new AsyncFtpClient();
            
          ftp.MultipleFileTransferError += new MultipleFileTransferErrorEventHandler( this.transfer_error );
                      
          IAsyncResult result = ftp.BeginConnect( "localhost", null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          ftp.EndConnect( result );
          
          result = ftp.BeginLogin( null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          ftp.EndLogin( result );
                      
          result = ftp.BeginChangeCurrentFolder( "ClientFiles", null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          ftp.EndChangeCurrentFolder( result );
          
          result = ftp.BeginReceiveMultipleFiles( string.Empty, @"C:\ClientFiles", false, false, null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          ftp.EndReceiveMultipleFiles( result );
          
          result = ftp.BeginDisconnect( null, null );
          
          while( !result.IsCompleted )
            Application.DoEvents();
          
          ftp.EndDisconnect( result );
          
          ftp.MultipleFileTransferError -= new MultipleFileTransferErrorEventHandler( this.transfer_error );
                      
          private void transfer_error( object sender, MultipleFileTransferErrorEventArgs e )
          {
            FtpReplyException exception = e.Exception as FtpReplyException;
                        
            if( exception != null )
            {
              listBox1.Items.Add( "Unable to transfer " + e.RemoteItemName +
                                  ". The message returned by the FTP server was : " + e.Exception.Message );
              e.Action = MultipleFileTransferErrorAction.Ignore;
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim ftp As New AsyncFtpClient()

        AddHandler ftp.MultipleFileTransferError, AddressOf Me.transfer_error

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

        result = ftp.BeginChangeCurrentFolder( "ClientFiles", Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndChangeCurrentFolder( result )

        result = ftp.BeginReceiveMultipleFiles( String.Empty, "C:\ClientFiles", False, False, Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndReceiveMultipleFiles( result )

        result = ftp.BeginDisconnect( Nothing, Nothing )

        While Not result.IsCompleted
          Application.DoEvents()
        End While

        ftp.EndDisconnect( result )

        RemoveHandler ftp.MultipleFileTransferError, AddressOf Me.transfer_error

        Private Sub transfer_error(ByVal sender As Object, ByVal e As MultipleFileTransferErrorEventArgs)

          If TypeOf e.Exception Is FtpReplyException Then
            ListBox1.Items.Add("Unable to transfer " + e.RemoteItemName + _
                              ". The message returned by the FTP server was : " + e.Exception.Message)
            e.Action = MultipleFileTransferErrorAction.Ignore
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Are you using Xceed FTP for .NET in a WinForms application? Use the `AsyncFtpClient` class rather than the `FtpClient` class. 

- Do you want the FTP server to initiate the data connection rather than the FTP client? Set the `PassiveTransfer` property to false. 

- Do you want the file(s) to be received in ASCII mode rather than binary? Set the `RepresentationType` property to ASCII. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the `Timeout` property. 

- Do you want to create a log file of the FTP process? Set the `TraceWriter` property. 

- Do you want to know the state of the FTP client? Check the `Connected` and `Busy` properties. You can also check the State property for specific state information. The `StateChanged` event can also be used to know when the state of the FTP client changes. 

- Do you want to know when a file is being received? Handle the `ReceivingFile` event. 

- Do you want to display progress information? Handle the `FileTransferStatus` event. 

- Do you want to abort the FTP operation? Call the Abort method. **Note that the Abort method should not be called in the `MultipleFileTransferError` event. If you want the multiple-file transfer operation to automatically abort if an error occurs, set e.Action to MutlipleFileTransferErrorAction.Abort (default value). **

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property.