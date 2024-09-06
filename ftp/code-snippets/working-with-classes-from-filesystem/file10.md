import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to list all items on an FTP server

The content of a folder on an FTP server (or to any other type of folder supported by the `Xceed FileSystem`) can be listed using the GetItems, `GetFiles`, or `GetFolders` methods. 

The following example demonstrates how to list the contents of an FTP server's current working directory using the steps listed below:

1. Create an instance of the `FtpConnection` class to establish a connection between the client and the FTP server. If you are using `FtpConnection` in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the `SynchronizingObject` property and call `Application.DoEvents` in an event; see the Events section below for an example of this.

2. Create an instance of an FtpFolder which will represent the folder on the FTP server whose content to list. If a folder name is not specified, the folder will represent the current working folder. 

3. Call the FtpFolder's GetItems method to retrieve a listing of all the items contained in the FTP folder and loop through the collection to print the list of items. 

4. Dispose of the FtpConnection once the operation is completed by calling its Dispose method or, in C#, by creating the FtpConnection instance in using blocks. If an instance of an FtpConnection object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.     

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;
        
        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {        
          FtpFolder folder = new FtpFolder( connection );
        
          foreach( FileSystemItem item in folder.GetItems( true ) )
          {
            System.Diagnostics.Debug.WriteLine( item.FullName );
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem
        Imports Xceed.Ftp

        Dim connection As FtpConnection

        Try        
          connection = New FtpConnection( "ftp.server.com" )

          Dim folder As New FtpFolder(connection) 
          Dim item As FileSystemItem

          For Each item in folder.GetItems( True )
            System.Diagnostics.Debug.WriteLine( item.FullName )
          Next Item

        Finally
          connection.Dispose()
        End Try
      ```
    </TabItem>
</Tabs>

## Events
All methods exposed by the Xceed FileSystem's `FileSystemItem`, `AbstractFolder`, `AbstractFile`, and derived classes have an overload that can be used when events are required. 

If you are using `FtpConnection` in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the `SynchronizingObject` property and call `Application.DoEvents` in an event.

With the exception of the FtpConnection's `ParsingListingLine` event, events can be handled by creating an instance of the `FileSystemEvents` class and subscribing to the desired events. For example:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;

        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {         
          //When using FtpConnection in a UI application
          connection.SynchronizingObject = this;

          FileSystemEvents events = new FileSystemEvents();
          events.ScanningFolder += new ScanningFolderEventHandler( this.scanning_folder );

          FtpFolder folder = new FtpFolder( connection );

          foreach( FileSystemItem item in folder.GetItems( events, null, true ) )
          {
            System.Diagnostics.Debug.WriteLine( item.FullName );
          }

          events.ScanningFolder -= new ScanningFolderEventHandler( this.scanning_folder );
        }

        private void scanning_folder( object sender, ScanningFolderEventArgs e )
        {
          System.Diagnostics.Debug.WriteLine( e.CurrentItem.Name );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem
        Imports Xceed.Ftp

        Dim connection As FtpConnection
        Dim events As FileSystemEvents

        Try        
          connection = New FtpConnection( "ftp.server.com" )
          'When using FtpConnection in a UI application
          connection.SynchronizingObject = Me

          events = New FileSystemEvents()
          AddHandler events.ScanningFolder, AddressOf Me.scanning_folder

          Dim folder As New FtpFolder( connection )
          Dim item As FileSystemItem

          For Each item in folder.GetItems( events, Nothing, True )
            System.Diagnostics.Debug.WriteLine( item.FullName )
          Next Item

        Finally
          connection.Dispose()
          RemoveHandler events.ScanningFolder, AddressOf Me.scanning_folder
        End Try

        Private Sub scanning_folder( ByVal sender As Object, ByVal e As ScanningFolderEventArgs )
          System.Diagnostics.Debug.WriteLine( e.CurrentItem.Name )
        End Sub
      ```
    </TabItem>
</Tabs>

## Things to consider

- Do you want to retrieve a listing that contains only files? Use the `GetFiles` method instead of the `GetItems` method. 

- Do you want to retrieve a listing that contains only folders? Use the `GetFolders` method instead of the `GetItems` method. 

- Do you want the FTP server to initiate the data connection rather than the client-side? Set the FtpConnection's `PassiveTransfer` property to false. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the FtpConnection's `Timeout` property. 

- Do you want to create a log file of the FTP process? Set the FtpConnection's `TraceWriter` property. 

- Do you want to filter (specify specific files and folders) the items that are to be listed? Use [filters](/ftp/basic-concepts/filters/overview). 

- Do you want to display progress information? Create an instance of the `FileSystemEvents` class and handle the ByteProgression and/or `ItemProgression` events. 

- Do you want to display progress information when a folder is being scanned? Create an instance of the `FileSystemEvents` class and handle the `ScanningFolder` event. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the `ItemException` event. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property. 

- Do you want quick and easy access to FTP functionalities in the same style as the ActiveX version of the Xceed FTP Library? Use the `FtpClient` class instead. **(Note: The AsyncFtpClient should now be considered obsolete. Instead, use the FtpClient class, assigning a value to its SynchronizingObject property.)**