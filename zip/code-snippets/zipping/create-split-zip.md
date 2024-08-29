import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating split zip files

Xceed Zip for .NET allows you to create split zip files which have the PkZip or Xceed Zip ActiveX naming conventions through the use of the `SplitNameFormat` and `SplitSize` properties of the `ZipArchive` class, as well as the option to create your own custom naming convention by also handling the `DiskRequired` event and changing the ZipFile property of the event arguments.

## Basic steps

To create a split zip file, the following steps must be performed:

- Retrieve a reference to a folder whose files will be added to the zip file, using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes. With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. **The last part or the part that has the .zip extension must be used when creating an instance of the ZipArchive class. **

- Set the `SplitNameFormat` and `SplitSize` properties of the ZipArchive object to the desired values. If you want to provide your own custom naming convention, set the SplitNameFormat property to `SplitNameFormat.None`. In this case, you **must** handle the `DiskRequired` event.

:::caution
It is important to note that setting the SplitNameFormat and SplitSize properties will not automatically update the zip file. The zip file will only be updated at the next operation (for example, when files are added to the zip file or when the zip file's comment is modified ).
:::

- If you want to provide your own custom naming convention, then you will need to subscribe to the `DiskRequired` event. You can also use the `DiskRequired` event to change the location where the split zip file parts are created and the size of each split part. 

- Call the `CopyFilesTo` method to copy the entire contents of the folder to the zip file.

## Demonstration

The following example demonstrates how to create a split zip file with the PkZip naming convention.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.Zip.Sfx;
      using Xceed.FileSystem;

      ZipArchive zip = new ZipArchive( new DiskFile( @"d:\split\test.zip" ) );
      DiskFolder source = new DiskFolder( @"c:\windows\fonts" ); 

      zip.SplitNameFormat = SplitNameFormat.PkZip;
      zip.SplitSize = 1000000; 

      source.CopyFilesTo( zip, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
        Imports Xceed.Zip
        Imports Xceed.Zip.Sfx
        Imports Xceed.FileSystem

        Dim zip As New ZipArchive( new DiskFile( "d:\split\test.zip" ) )
        Dim source As New DiskFolder( "c:\windows\fonts" ) 

        zip.SplitNameFormat = SplitNameFormat.PkZip
        zip.SplitSize = 1000000 

        source.CopyFilesTo( zip, True, True )
    ```
  </TabItem>
</Tabs>

The next example demonstrates how to create a split zip file where each split part is located in a different folder and has the .zip extension. 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      ZipEvents zipEvents = new ZipEvents();
      zipEvents.DiskRequired += new DiskRequiredEventHandler( this.OnDiskRequired );

      /*Once the user has confirmed that the appropriate disk is in the drive, set the DiskRequiredAction
      to Continue. Setting the Action to Fail will not cause the whole operation to fail, but only the deleting step to be skipped.*/
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
        Dim WithEvents zipEvents As New ZipEvents()
        AddHandler zipEvents.DiskRequired, AddressOf Me.OnDiskRequired

        ' The first split zip file part will be located in the "1" folder.
        ' All subsequent parts will be located in folders representing their part number.
        Dim zip As New ZipArchive(zipEvents, Nothing, New DiskFile("d:\split\1\test.zip"))

        Dim source As New DiskFolder("c:\windows\fonts")

        zip.SplitNameFormat = SplitNameFormat.None
        zip.SplitSize = 1000000

        source.CopyFilesTo( zipEvents, Nothing, zip, True, True )

        ' This method will handle the DiskRequired events that are raised.
        ' In it, we change the folder in which the part will be created.
        Private Sub OnDiskRequired(ByVal sender As Object, ByVal e As DiskRequiredEventArgs)

          e.ZipFile = New DiskFile(e.ZipFile.ParentFolder.ParentFolder.GetFolder((e.DiskNumber).ToString()).FullName + e.ZipFile.Name)

          e.Action = DiskRequiredAction.Continue
        End Sub
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to add items into a specific folder within the self-extracting zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's `DefaultExtraHeaders` property.

**All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.**