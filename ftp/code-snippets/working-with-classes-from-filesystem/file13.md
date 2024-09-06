import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to list specific files on an FTP server

Xceed FTP for .NET currently provides automatic support for listing the contents of AS400, DOS (Windows), UNIX and VMS FTP servers when calling the `GetItems`, `GetFiles`, or `GetFolders` methods. To modify or manually parse the listing lines returned by the FTP server, the `ParsingListingLine` event can be used, or a new listing parser added to the FTP connection's ListingParsers collection. 

Usually, if you only want to modify or filter the listing lines returned by the `GetItems`, `GetFiles` or `GetFolders` methods, you would handle the `ParsingListingLine` event rather than creating a listing parser. If however, you want to support the listing lines returned by an FTP server that is not automatically supported by Xceed FTP for .NET, then your best option would be to create a listing parser as it will make it easier to reuse your code. 

To create a custom listing parser, create a class that derives from the FtpListingParser class and override the ParseLine method. In the ParseLine method, parse the line that is received as a parameter to create and return a new FtpItemInfo object that contains the FTP item's information. Once you have your custom listing parser, add it to the FTP connection's ListingParsers collection. 

The following example demonstrates how use the `ParsingListingLine` event to manually parse the listing lines returned by an FTP server to remove the potential   "." and ".." items:

1. Create an instance of the `FtpConnection` class to establish a connection between the client and the FTP server. If you are using `FtpConnection` in a UI application, assign your form (or any other control that implements the ISynchronizeInvoke interface) to the SynchronizingObject property and call `Application.DoEvents` in an event.

2. Subscribe to the FtpConnection's `ParsingListingLine` event. In your `ParsingListingLine` event handler, remove any instances of "." and ".." by setting the Valid parameter to false if one of them are encountered. 

3. Create an instance of an FtpFolder which will represent the folder on the FTP server whose content to list. If a folder name is not specified, the folder will represent the current working folder.     

4. Call the FtpFolder's `GetItems` method to list the contents of the FtpFolder. The contents of the FtpFolder will be listed via the `ParsingListingLine` event rather than looping through the collection of `FileSystemItems` returned by the `GetItems` method. 

5. Dispose of the `FtpConnection` once the file transfer is completed by calling its Dispose method or, in C#, by creating the FtpConnection instance in a using block. If an instance of an `FtpConnection` object is not disposed of, connections with the FTP server may remain active until the FTP server times-out or the garbage-collector passes.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.FileSystem;
        using Xceed.Ftp;
        
        using( FtpConnection connection = new FtpConnection( "ftp.server.com" ) )
        {
          //When using FtpConnection in a UI application
          connection.SynchronizingObject = this;

          connection.ParsingListingLine += new ParsingListingLineEventHandler( this.parsing_listingline );
        
          FtpFolder folder = new FtpFolder( connection );
          folder.GetItems( true );       
        
          connection.ParsingListingLine -= new ParsingListingLineEventHandler( this.parsing_listingline );
        }  
        
        private void parsing_listingline( object sender, ParsingListingLineEventArgs   e )
        {
          if( ( e.Item.Name == "." ) || ( e.Item.Name == ".." ) )
          {
            e.Valid = false;
          }
          else
          {
            System.Diagnostics.Debug.WriteLine( e.Item.Name );        
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
          AddHandler connection.ParsingListingLine, AddressOf Me.parsing_listingline 

          'When using FtpConnection in a UI application
          connection.SynchronizingObject = Me

          Dim folder As New FtpFolder( connection )
          folder.GetItems( True )
        Finally
          RemoveHandler connection.ParsingListingLine, AddressOf Me.parsing_listingline
          connection.Dispose()
        End Try

        Private Sub parsing_listingline( ByVal sender As Object, ByVal e As ParsingListingLineEventArgs  )
          If ( e.Item.Name = "." ) Or ( e.Item.Name = ".." ) Then
            e.Valid = False
          Else
            System.Diagnostics.Debug.WriteLine( e.Item.Name )      
          End If  
        End Sub
      ```
    </TabItem>
</Tabs>

## Events
Contrary to other events which are subscribed to by creating an instance of a `FileSystemEvents` class, the `ParsingListingLine` event can only be subscribed to via the `FtpConnection` instance. If any other events are required, an instance of the `FileSystemEvents` class must be created and the desired events subscribed to. 

If you are using `FtpConnection` in a UI application, assign your form (or any other control that implements the `ISynchronizeInvoke` interface) to the `SynchronizingObject` property and call `Application.DoEvents` in an event.

All methods exposed by the Xceed FileSystem's `FileSystemItem`, `AbstractFolder`, `AbstractFile`, and derived classes have an overload that can be used when events are required.