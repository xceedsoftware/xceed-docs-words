import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a local folder

Items can be deleted using the Delete method. With the `Xceed FileSystem`, a folder is a folder regardless of if it is located on a local disk, in a zip file, in memory, or on an FTP server. 

The following example demonstrates how to delete a file on a local drive using the steps listed below:

1. Create an instance of a `DiskFile` which will represent the file on the local drive to delete. 

2. Verify if the file exists prior to deleting it using the Exists property. If an attempt is made to delete a file that does not exist, an exception will be thrown. 

3. Delete the file by calling its `Delete` method 

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;

        DiskFile file = new DiskFile( "c:\\test.txt" );

        if( file.Exists )
          file.Delete();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem

        Dim file As New DiskFile( "c:\test.txt" )

        If file.Exists Then
          file.Delete()
        End If
      ```
    </TabItem>
</Tabs>

## Events
All methods exposed by the Xceed FileSystem's `FileSystemItem`, `AbstractFolder`, `AbstractFile`, and derived classes have an overload that can be used when events are required. Events can be handled by creating an instance of the FileSystemEvents class and subscribing to the desired events. For example:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
 
        DiskFile file = new DiskFile( @"c:\test.txt" );
        FileSystemEvents events = new FileSystemEvents();
        events.ByteProgression += new ByteProgressionEventHandler( this.byte_progression );
        
        if( file.Exists )
          file.Delete( events, null );
        
        events.ByteProgression -= new ByteProgressionEventHandler( this.byte_progression );
        
        private void byte_progression( object sender, ByteProgressionEventArgs e )
        {
          System.Diagnostics.Debug.WriteLine( e.CurrentFileBytes.Percent.ToString() );
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem

        Dim file As New DiskFile("c:\test.txt")
        Dim events As New FileSystemEvents()
        AddHandler events.ByteProgression, AddressOf Me.byte_progression

        If file.Exists Then
          file.Delete( events, Nothing )
        End If

        RemoveHandler events.ByteProgression, AddressOf Me.byte_progression

        Private Sub byte_progression(ByVal sender As Object, ByVal e As ByteProgressionEventArgs)
          System.Diagnostics.Debug.WriteLine(e.CurrentFileBytes.Percent.ToString())
        End Sub
      ```
    </TabItem>
</Tabs>

## Things to consider

- Do you want to display progress information? Create an instance of the `FileSystemEvents` class and handle the `ByteProgression` and/or `ItemProgression` events. 

- Do you want to display progress information when a folder is being scanned? Create an instance of the `FileSystemEvents` class and handle the `ScanningFolder` event. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the `ItemException` event.