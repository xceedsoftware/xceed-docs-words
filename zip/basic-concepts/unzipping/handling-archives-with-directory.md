import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Handling archives with directory traversal items (ZipSlip)

## Introduction
When unzipping, while very rare, some archives can have items whose names contain directory traversal elements like the parent directory "..". With enough of these put together, the effective target file can be computed to be outside the base destination folder specified for the unzip operation.

The Zip specification does allow directory traversal elements in the name of zipped items. As such, those archives are not considered invalid and the components support them. However, the construct can be abused to overwrite important files outside the control of an application. This has been called by security researchers the [Zip Slip vulnerability](https://snyk.io/research/zip-slip-vulnerability) in June 2018.

## Is this cause for worry
If an application unzips archives that have been created by Xceed components or other reputable zip tools and libraries, there is no cause to worry. These tools do not allow the creation of zip archive that contain directory traversal elements. This is the overwhelming majority of scenarios.

If an application is meant to unzip archives receives from unknown sources, then measures can be taken to prevent files from being created outside the destination directory if the behavior is not desired.

## Which components are affected
Xceed Zip for .NET, Xceed Zip for Xamarin, Xceed Zip for .NET Standard, Xceed Zip for COM/ActiveX and Xceed Zip for x64 will all honor the directory traversal elements in a zipped item name when the automatic unzip methods like CopyTo() and MoveTo() are used.

If an application uses its own custom code to identity and select items to be unzipped, then the vulnerability can be avoided by checking the effective destination path to see if it is outside the base destination folder.

When using automatic methods, an application can monitor the destination path of each item that will be unzipped and exclude those that would fall outside the base destination folder.

## Which components are not affected
Xceed Real-Time Zip for .NET, Xceed Real-Time Zip for Xamarin, Xceed Real-Time Zip for .NET Standard and Xceed Real-Time for Silverlight are not affected directly because they do not offer an automatic way to unzip an archive.

It is up to the application code to validate the destination path of each item unzipped from the archive.

## Example solution
The AddingItemToProcess event can be used to filter out potentially dangerous zipped items whose names contain relative path elements (like ..\..\) that, during an unzip operation can create or overwrite files outside of the base destination folder.


<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
    public static void ZipSlip()
    { 
      AbstractFile zipFile = new DiskFile( "ZipSlip1.zip" );

      if( !zipFile.Exists )
        throw new InvalidProgramException( "The zip file must exist for this example to work correctly" );

      // Create a logical zip archive around the zip file
      ZipArchive zip = new ZipArchive( zipFile );

      // Create a FileSystemEvents object
      FileSystemEvents events = new FileSystemEvents();

      // Subscribe to the AddingItemToProcess event
      events.AddingItemToProcess += OnAddingItemToProcessExclude;

      // Setup a destination folder
      AbstractFolder destinationFolder = new DiskFolder( @"D:\ZipSlip\Output" );

      // User the destination folder as userData
      object userData = destinationFolder;

      // Unzip the contents of the archive
      zip.CopyFilesTo( events, userData, destinationFolder, true, true );
    }

    private static void OnAddingItemToProcessExclude( object sender, ItemProcessingEventArgs e )
    {
      // Retrieve the destination folder from the user data
      AbstractFolder destinationFolder = ( AbstractFolder ) e.UserData;
      string destinationFullname = destinationFolder.FullName;

      FileSystemItem destinationItem = e.TargetItem;
      string targetPath = destinationItem.FullName;

      // If the target path does not start with the destination path
      if( !targetPath.StartsWith( destinationFullname ) )
      {
        /* The zipped item contains relative path modifiers that make the destination
          go outside the base destination path. In some controlled situations, that
          might be ok, but we chose not to allow it here. We will exclude this item. */

        e.Excluded = true;
      }
    }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub ZipSlip()
      Dim zipFile As AbstractFile = New DiskFile("ZipSlip1.zip")

      If (Not zipFile.Exists) Then
        Throw New InvalidProgramException("The zip file must exist for this example to work correctly")
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Create a FileSystemEvents object
      Dim events As New FileSystemEvents()

      ' Subscribe to the AddingItemToProcess event
      AddHandler events.AddingItemToProcess, AddressOf OnAddingItemToProcessExclude

      ' Setup a destination folder
      Dim destinationFolder As AbstractFolder = New DiskFolder("D:\ZipSlip\Output")

      ' User the destination folder as userData
      Dim userData As Object = destinationFolder

      ' Unzip the contents of the archive
      zip.CopyFilesTo(events, userData, destinationFolder, True, True)
    End Sub

    Private Shared Sub OnAddingItemToProcessExclude(ByVal sender As Object, ByVal e As ItemProcessingEventArgs)
      ' Retrieve the destination folder from the user data
      Dim destinationFolder As AbstractFolder = CType(e.UserData, AbstractFolder)
      Dim destinationFullname As String = destinationFolder.FullName

      Dim destinationItem As FileSystemItem = e.TargetItem
      Dim targetPath As String = destinationItem.FullName

      ' If the target path does not start with the destination path
      If (Not targetPath.StartsWith(destinationFullname)) Then
        ' The zipped item contains relative path modifiers that make the destination
        ' go outside the base destination path. In some controlled situations, that
        ' might be ok, but we chose not to allow it here. We will exclude this item. 

        e.Excluded = True
      End If
    End Sub
    ```
  </TabItem>
</Tabs>