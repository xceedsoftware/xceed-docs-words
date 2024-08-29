import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating spanned zip files

Xceed Zip for .NET allows you to create zip files which can span random access drives such as diskettes, ZIP drives and CDs.

## Basic steps

To create a spanned zip file, the following steps must be performed:

- Retrieve a reference to a folder whose files will be added to the zip file, using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes. With ***Xceed Zip for .NET***, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

- Create an instance of the `ZipEvents` class and subscribe to the DiskRequired event. In the `DiskRequired` event handler, we will prompt the user to insert a new disk when needed. 

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. In the constructor of the `ZipArchive` class, be sure to pass the newly created `ZipEvents` object.  

- Set the AllowSpanning property of the `ZipArchive` to true (default is false). When updating a spanned zip file, AllowSpanning must be set to true otherwise the zip file will no longer be spanned. 

- Call the `CopyFilesTo` method to copy the entire contents of the folder to the zip file.

## Demonstration

The following example demonstrates how to create a spanned zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;
      
      DiskFolder source = new DiskFolder( @"c:\windows\fonts" );
      
      ZipEvents zipEvents = new ZipEvents();
      zipEvents.DiskRequired += new DiskRequiredEventHandler( this.OnDiskRequired );
      
      ZipArchive zip = new ZipArchive( zipEvents, null, new DiskFile( @"a:\test.zip" ) );
      zip.AllowSpanning = true;
      
      source.CopyFilesTo( zipEvents, null, zip, true, true );
      
      // This method will handle the DiskRequired events that are raised.
      //
      // The code contained within this method is the suggested implementation to use when spanning.
      private void OnDiskRequired( object sender, DiskRequiredEventArgs e )
      {   
        if( e.Action == DiskRequiredAction.Fail )
        {
          if( MessageBox.Show( "Disk #" + e.DiskNumber.ToString() + " is required.", "Disk Required", MessageBoxButtons.OKCancel ) == DialogResult.OK )
            e.Action = DiskRequiredAction.Continue;
          else
            e.Action = DiskRequiredAction.Fail;
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      Dim source As New DiskFolder("c:\windows\fonts")

      Dim WithEvents zipEvents As New ZipEvents()
      AddHandler zipEvents.DiskRequired, AddressOf Me.OnDiskRequired

      Dim zip As New ZipArchive(zipEvents, Nothing, New DiskFile("a:\test.zip"))
      zip.AllowSpanning = true

      source.CopyFilesTo( zipEvents, null, zip, true, true )

      ' This method will handle the DiskRequired events that are raised.
      '
      ' The code contained within this method is the suggested implementation to use when spanning.
      Private Sub OnDiskRequired(ByVal sender As Object, ByVal e As DiskRequiredEventArgs)
        If e.Action = DiskRequiredAction.Fail Then

          If MessageBox.Show("Disk #" + e.DiskNumber.ToString() + " is required.", "Disk Required", MessageBoxButtons.OKCancel) = DialogResult.OK Then
            e.Action = DiskRequiredAction.Continue
          Else
            e.Action = DiskRequiredAction.Fail
          End If
        End If
      End Sub
    ```
  </TabItem>
</Tabs>

## Updating existing spanned zip files

When you are updating and existing spanned zip file, there are a few things that you must keep in mind :

- The last disk **must** be in the drive before the update operation begins (when the instance of the `ZipArchive` class has been created). 

- The update process **will take longer** than if you are creating a new spanned zip file. 

-   The DiskRequired event will be raised more times than if you are creating a new spanned zip file. 

- In the case where you update a spanned zip file but the resulting zip file contains less spanned parts, you can choose to delete the extra zip file parts (not the entire disk) after the new zip file has been created. This is done by checking for the Deleting `DiskRequiredReason` in the DiskRequired event and prompting your user to insert the appropriate disk so that the extra zip file part(s) can be deleted. Once the user has confirmed that the appropriate disk is in the drive, set the `DiskRequiredAction` to Continue. Setting the Action to Fail will not cause the whole operation to fail, but only the deleting step to be skipped.

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you want to prevent the creation of spanned zip files? Set the `AllowSpanning` property to false (default). 

- Do you want to add items into a specific folder within the zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's `DefaultExtraHeaders` property.

All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.