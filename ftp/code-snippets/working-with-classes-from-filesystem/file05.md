import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to copy items from an FTP server to memory

Items can be copied or moved (in other words, downloaded) from an FTP server to a folder located in memory (or any other type of folder supported by the `Xceed FileSystem`) using the `CopyTo`, `CopyFilesTo`, `MoveTo`, or `MoveFilesTo` methods. 

The following example demonstrates how to copy files located in a folder on an FTP server to a folder located in memory using the steps listed below:

1. Create an instance of the FtpConnection class to establish a connection between the client and the FTP server. If you are using FtpConnection in a UI application, assign your form (or any other control that implements the ISynchronizeInvoke interface) to the SynchronizingObject property and call `Application.DoEvents` in an event such as ByteProgression; see the Events section below for an example of this.

2. Create an instance of an FtpFolder which will represent the folder on the FTP server from which to retrieve the files. If a folder name is not specified, the folder will represent the current working folder. 

3. Create an instance of a MemoryFolder which will representing the folder, in memory, where the files will be downloaded to. Any other implementation of the `AbstractFolder` class, such as the `DiskFolder` class which represents a folder located on a local drive, can also be used as the destination folder. 

4. Call the FtpFolder's `CopyFilesTo` method to copy the folder and its content from the FTP server to memory. 

5. Dispose of the FtpConnection once the file transfer is completed by calling its Dispose method or, in C#, by creating the FtpConnection instance in a using block. If an instance of an FtpConnection object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.      

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;
        
        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {
          FtpFolder source = new FtpFolder( connection, "test" );        
          MemoryFolder destination = new MemoryFolder( "RAM", "temp_files" );
        
          source.CopyFilesTo( destination, true, true );
        
          foreach( AbstractFile file in destination.GetFiles( true ) )
          {
            System.Diagnostics.Debug.WriteLine( file.Name );
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

        Dim source As New FtpFolder(connection, "test")
        Dim destination As New MemoryFolder("RAM", "temp_files")

          source.CopyFilesTo( destination, True, True )

        Dim file As AbstractFile
        For Each file In destination.GetFiles( True )
          System.Diagnostics.Debug.WriteLine( file.Name )
        Next file

        Finally
          connection.Dispose()
        End Try
      ```
    </TabItem>
</Tabs>

## Events
All methods exposed by the Xceed FileSystem's `FileSystemItem`, `AbstractFolder`, `AbstractFile`, and derived classes have an overload that can be used when events are required. 

If you are using FtpConnection in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the `SynchronizingObject` property and call `Application.DoEvents` in an event.

With the exception of the FtpConnection's `ParsingListingLine` event, events can be handled by creating an instance of the FileSystemEvents class and subscribing to the desired events. For example:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;

        FileSystemEvents events = new FileSystemEvents();
        events.ItemProgression += new ItemProgressionEventHandler( this.item_progression );
        events.ByteProgression += new ByteProgressionEventHandler( this.byte_progression );

        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {
          //When using FtpConnection in a UI application
          connection.SynchronizingObject = this;

          FtpFolder source = new FtpFolder( connection, "test" );        
          MemoryFolder destination = new MemoryFolder( "RAM", "temp_files" );

          source.CopyFilesTo( events, null, destination, true, true );

          foreach( AbstractFile file in destination.GetFiles( true ) )
          {
            System.Diagnostics.Debug.WriteLine( file.Name );
          }
        }

        events.ItemProgression -= new ItemProgressionEventHandler( this.item_progression );
        events.ByteProgression -= new ByteProgressionEventHandler( this.byte_progression );

        private void item_progression( object sender, ItemProgressionEventArgs e )
        {
          System.Diagnostics.Debug.WriteLine( e.CurrentItem.Name );
        }

        private void byte_progression( object sender, ByteProgressionEventArgs e )
        {
          Application.DoEvents();
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
          AddHandler events.ItemProgression, AddressOf Me.item_progression
          AddHandler events.ByteProgression, AddressOf Me.byte_progression

          Dim source As New FtpFolder(connection, "test")
          Dim destination As New MemoryFolder("RAM", "temp_files")

          source.CopyFilesTo( events, Nothing, destination, True, True )

          Dim file As AbstractFile
          For Each file In destination.GetFiles( True )
            System.Diagnostics.Debug.WriteLine( file.Name )
          Next file

        Finally
          connection.Dispose()
          RemoveHandler events.ItemProgression, AddressOf Me.item_progression
          RemoveHandler events.ItemProgression, AddressOf Me.byte_progression
        End Try

        Private Sub item_progression(ByVal sender As Object, ByVal e As ItemProgressionEventArgs)
          System.Diagnostics.Debug.WriteLine(e.CurrentItem.Name)
        End Sub

        Private Sub byte_progression( ByVal sender As Object, ByVal e As ByteProgressionEventArgs )
          Application.DoEvents()
        End Sub
      ```
    </TabItem>
</Tabs>

## Things to consider

- Do you want the FTP server to initiate the data connection rather than the client-side? Set the FtpConnection's `PassiveTransfer` property to **false**. 

- Do you want to decrease or increase the period of time after which an FTP operation should timeout? Change the value of the FtpConnection's `Timeout` property. 

- Do you want to create a log file of the FTP process? Set the FtpConnection's `TraceWriter` property. 

- Do you want to filter (specify specific files and folders) the items that are to be copied? Use [filters](/ftp/basic-concepts/filters/overview). 

- Do you want to display progress information? Create an instance of the FileSystemEvents class and handle the ByteProgression and/or `ItemProgression` events. 

- Do you want to display progress information when a folder is being scanned? Create an instance of the `FileSystemEvents` class and handle the `ScanningFolder` event. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the `ItemException` event. 

- Do you want to prevent routers from prematurely closing the command channel while a long data transfer is taking place. Set the `KeepAliveInterval` property. 

- Do you want quick and easy access to FTP functionalities in the same style as the ActiveX version of the Xceed FTP Library? Use the `FtpClient` class instead. **(Note: The AsyncFtpClient should now be considered obsolete. Instead, use the FtpClient class, assigning a value to its SynchronizingObject property.)**