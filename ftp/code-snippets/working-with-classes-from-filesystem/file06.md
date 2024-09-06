import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying items to and from a local folder

Items can be copied or moved from one location to another using the `CopyTo`, `CopyFilesTo`, `MoveTo`, or `MoveFilesTo` methods. With the `Xceed FileSystem`, a folder is a folder regardless of if it is located on a local disk, in a zip file, in memory, or on an FTP server. 

The following example demonstrates how to copy files from one local folder to another using the steps listed below:

1. Create an instance of a DiskFolder which will represent the source folder from which to retrieve the files. 

2. Create an instance of a DiskFolder which will represent the destination folder where the files will be copied to. 

3. Call the source folder's CopyFilesTo method to copy the files to the destination folder.     

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;

        DiskFolder source = new DiskFolder( @"c:\source" );
        DiskFolder destination = new DiskFolder( @"c:\destination" );

        source.CopyFilesTo( destination, true, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem

        Dim source As New DiskFolder( "c:\source" )
        Dim destination As New DiskFolder( "c:\destination" ) 

        source.CopyFilesTo( destination, True, True )
      ```
    </TabItem>
</Tabs>

## Events
All methods exposed by the Xceed FileSystem's `FileSystemItem`, `AbstractFolder`, `AbstractFile`, and derived classes have an overload that can be used when events are required. Events can be handled by creating an instance of the `FileSystemEvents` class and subscribing to the desired events. For example:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;

        DiskFolder source = new DiskFolder( @"c:\source" );
        DiskFolder destination = new DiskFolder( @"c:\destination" );

        FileSystemEvents events = new FileSystemEvents()
        events.ItemException += new ItemExceptionEventHandler this.item_exception

        source.CopyFilesTo( events, null, destination, true, false );

        events.ItemException -= new ItemExceptionEventHandler this.item_exception

        private void item_exception( object sender, ItemExceptionEventArgs e )
        {
          if( e.Exception is ItemAlreadyExistsException )
          {
              e.TargetItem.Delete();
              e.Action = ItemExceptionAction.Retry;
          }
        }  
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.FileSystem

        Dim source As New DiskFolder( "c:\source" )
        Dim destination As New DiskFolder( "c:\destination" )

        Dim events As New FileSystemEvents
        AddHandler events.ItemException, AddressOf Me.item_exception

        source.CopyFilesTo( events, Nothing, destination, True, False)

        RemoveHandler events.ItemException, Addressof Me.item_exception

        Private Sub item_exception( ByVal sender As Object, ByVal e As ItemExceptionEventArgs )
          If TypeOf e.Exception Is ItemAlreadyExistsException Then
              e.TargetItem.Delete()
              e.Action = ItemExceptionAction.Retry
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

## Things to consider

- Do you want to filter (specify specific files and folders) the items that are to be copied? Use [filters](/ftp/basic-concepts/filters/overview). 

- Do you want to display progress information? Create an instance of the `FileSystemEvents` class and handle the `ByteProgression` and/or `ItemProgression` events. 

- Do you want to display progress information when a folder is being scanned? Create an instance of the `FileSystemEvents` class and handle the `ScanningFolder` event. 

- Do you want to intervene when an error occurs with one or more of the items being manipulated? Create an instance of the `FileSystemEvents` class and handle the `ItemException` event.