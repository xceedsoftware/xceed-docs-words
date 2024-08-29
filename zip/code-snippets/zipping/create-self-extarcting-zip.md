import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating self-extracting zip files

A self-extracting zip file is a zip file that has the necessary information in its prefix (header) to unzip the files it contains without the need for third party applications such as WinZip ™ or even Xceed Zip for .NET.

## Basic steps

To create a self-extracting zip file, the following steps must be taken.

- Retrieve a reference to a new or existing zip file using the ZipArchive class. 

- Create an instance of the `XceedSfxPrefix` class. This object contains all the necessary information to create self-extracting zip files and will be used as the source binary. 

- Configure the self-extractor binary by setting various properties of the `XceedSfxPrefix` object. 

- Assign the prefix to the `SfxPrefix` property of the ZipArchive object. Since setting the Prefix property updates the self-extracting zip file and we will be doing other updates to the self-extracting zip file, we will do a batch update. 

- Retrieve a reference to a folder whose files will be added to the zip file using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder` or `IsolatedFolder` classes. With Xceed Zip for .NET, a folder is a folder; it does not matter if it is located within a zip file, on disk or in memory. 

- Copy the folder and its content into the self-extracting zip file using the `CopyTo` method.

## Demonstration

The following example demonstrates how to create a self-extracting zip file:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.Zip.Sfx;
      using Xceed.FileSystem;
      
      ZipArchive zip = new ZipArchive( new DiskFile( @"C:\Test\Fonts.exe" ) );
      XceedSfxPrefix sfx = new XceedSfxPrefix( new DiskFile( @"C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin" ) );
      
      sfx.DialogStrings[ DialogStrings.Title ] = "Welcome to Xceed Zip for .NET!";
      sfx.DefaultDestinationFolder = @"C:\";
      sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly;      
      
      using( AutoBatchUpdate update = new AutoBatchUpdate( zip ) )
      {             
        zip.SfxPrefix = sfx;
        DiskFolder folder = new DiskFolder( @"C:\Windows\Fonts" );
        ZippedFolder destinationFolder = ( ZippedFolder )zip.GetFolder( "Windows" );
            
        if( !destinationFolder.Exists )
            destinationFolder.Create();
      
        folder.CopyTo( destinationFolder, true );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
        Imports Xceed.Zip
        Imports Xceed.Zip.Sfx
        Imports Xceed.FileSystem

        Dim zip As New ZipArchive(New DiskFile("C:\Test\Fonts.exe"))
        Dim sfx As New XceedSfxPrefix(New DiskFile("C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin"))

        sfx.DialogStrings(DialogStrings.Title) = "Welcome to Xceed Zip for .NET!"
        sfx.DefaultDestinationFolder = "C:\"
        sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly

        zip.BeginUpdate()

        zip.SfxPrefix = sfx
        Dim folder As New DiskFolder("C:\Windows\Fonts")
        Dim destinationFolder As ZippedFolder = CType(zip.GetFolder("Windows"), ZippedFolder)

        If Not destinationFolder.Exists Then
          destinationFolder.Create()
        End If

        folder.CopyTo(destinationFolder, True)
        zip.EndUpdate()
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to add items into a specific folder within the self-extracting zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

**All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.**