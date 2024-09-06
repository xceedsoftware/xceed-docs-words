import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to display progress information

The `FileTransferStatus`, `ReceivingFile` and `SendingFile` events of the `FtpClient` class can all be used to display progress information during an FTP operation. 

The FileTransferStatus event is raised for every packet sent or received during a file transfer, while the `ReceivingFile` and `SendingFile` events for each file being sent or received to and from the FTP server. 

Other events such as the `StateChanged`, `Disconnected`, `CommandSent` and `ReplyReceived` events can also be used to display information during an FTP operation.

## Demonstration

The following example demonstrates how to use the `FileTransferStatus` and `SendingFile` events to display progressing information while uploading files to an FTP server. It will also demonstrates how to use the CommandSent and ReplyReceived events to provide logging information during the process 

This example assumes that you are in a Windows application and that the form contains 2 labels, 2 progress bars and a listbox.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        FtpClient ftp = new FtpClient();
            
        ftp.FileTransferStatus += new FileTransferStatusEventHandler( this.file_transfer );
        ftp.SendingFile += new TransferringFileEventHandler( this.sending_file );
        ftp.CommandSent += new CommandSentEventHandler( this.command_sent );           
        ftp.ReplyReceived += new ReplyReceivedEventHandler( this.reply_received );
        
        ftp.Connect( "localhost" );
        ftp.Login();
                    
        ftp.SendMultipleFiles( @"C:\Demos\*", true, true );
        
        ftp.Disconnect();
        
        ftp.FileTransferStatus -= new FileTransferStatusEventHandler( this.file_transfer );
        ftp.SendingFile -= new TransferringFileEventHandler( this.sending_file );
        ftp.CommandSent -= new CommandSentEventHandler( this.command_sent );           
        ftp.ReplyReceived -= new ReplyReceivedEventHandler( this.reply_received );
        
        private void file_transfer( object sender, FileTransferStatusEventArgs e )
        {
          if( e.BytesTransferred == 0 )
          {
            label2.Text = "Receiving file " + e.LocalFilename;
            label1.Text = "Receiving file #" + e.FilesTransferred.ToString() + 
                          " of " + e.FilesTotal.ToString();
            label1.Refresh();
            label2.Refresh();
          }
                    
          progressBar2.Value = e.BytesPercent;      
          progressBar1.Value = e.AllBytesPercent;      
        }
                    
        private void sending_file( object sender, TransferringFileEventArgs e )
        {      
          listBox1.Items.Add( "SENDING " + e.LocalFilename.ToUpper() + " TO " +
                              e.RemoteFilename.ToUpper() );
          listBox1.Refresh();      
        }
        
        private void command_sent( object sender, CommandSentEventArgs e )
        {
          listBox1.Items.Add( ">> " + e.Command );
          listBox1.SelectedItem = listBox1.Items.Count - 1;
        }
        
        private void reply_received( object sender, ReplyReceivedEventArgs e )
        {
          foreach( string line in e.Reply.Lines )
          {
            listBox1.Items.Add( "<<" + line );
          }
        
          listBox1.SelectedItem = listBox1.Items.Count - 1;
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim ftp As New FtpClient()

        AddHandler ftp.FileTransferStatus, AddressOf Me.file_transfer
        AddHandler ftp.SendingFile, AddressOf Me.sending_file
        AddHandler ftp.CommandSent, AddressOf Me.command_sent
        AddHandler ftp.ReplyReceived, AddressOf Me.reply_received

        ftp.Connect( "localhost" )
        ftp.Login()

        ftp.SendMultipleFiles( "C:\Demos\*", True, True )

        ftp.Disconnect()

        RemoveHandler ftp.FileTransferStatus, AddressOf Me.file_transfer
        RemoveHandler ftp.SendingFile, AddressOf Me.sending_file
        RemoveHandler ftp.CommandSent, AddressOf Me.command_sent
        RemoveHandler ftp.ReplyReceived, AddressOf Me.reply_received

        Private Sub file_transfer(ByVal sender As Object, ByVal e As FileTransferStatusEventArgs)

          If e.BytesTransferred = 0 Then
            label2.Text = "Receiving file " + e.LocalFilename
            label1.Text = "Receiving file #" + e.FilesTransferred.ToString() + _
                          " of " + e.FilesTotal.ToString()

            label1.Refresh()
            label2.Refresh()
          End If

          progressBar2.Value = e.BytesPercent
          progressBar1.Value = e.AllBytesPercent
        End Sub

        Private Sub sending_file(ByVal sender As Object, ByVal e As TransferringFileEventArgs)

          listBox1.Items.Add("SENDING " + e.LocalFilename.ToUpper() + _
                            " TO " + e.RemoteFilename.ToUpper())
          listBox1.Refresh()
        End Sub

        Private Sub command_sent(ByVal sender As Object, ByVal e As CommandSentEventArgs)

          listBox1.Items.Add(">> " + e.Command)
          listBox1.SelectedItem = listBox1.Items.Count - 1
        End Sub

        Private Sub reply_received(ByVal sender As Object, ByVal e As ReplyReceivedEventArgs)

          Dim line As String
          For Each line In e.Reply.Lines

            listBox1.Items.Add("<<" + line)
          Next line

          listBox1.SelectedItem = listBox1.Items.Count - 1

        End Sub
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Do you want to know the state of the FTP client? Check the Connected and Busy properties. You can also check the State property for specific state information. The `StateChanged` event can also be used to know when the state of the FTP client changes. 

- Do you want to continue a multiple-file transfer (when using the `ReceiveMultipleFiles` or `SendingMultipleFiles` methods) when one or more of the files being transferred causes an error? Handle the `MultipleFileTransferError` event. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property.