import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Copying items to a zip file (zipping)

This topic demonstrates how to copy files and folders to a zip file using a disk folder as the source where the files to process are located.

## Basic steps

To copy items to a zip file, the following steps must be performed:

- **Step 1:** Retrieve a reference to a folder whose files will be added to the zip file, using either the `DiskFolder`, `ZippedFolder`, `ZipArchive`, `MemoryFolder`, or `IsolatedFolder` classes. With Xceed's FileSystem-based products, a folder is a folder; it does not matter if it is located within a zip file, on disk, or in memory.
- **Step 2:** Retrieve a reference to a new or existing zip file using the `ZipArchive` class.
- **Step 3:** Call the `CopyFilesTo` method to copy the entire contents of the folder to the zip file.

## Demonstration

This example demonstrates how to copy files from a disk folder to a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void CopyItemsToZip()
      {
        // Select a file that will be our zip file
        AbstractFile zipFile = new DiskFile( "CopyItemsToZip1.zip" );

        /* The component doesn't have distinct add and update operations.
          If you want any existing zip file to be overwritten, you need to delete the
          zip file before starting to perform any operation. */

        // If the zip file already exists
        if( zipFile.Exists )
          // Delete it
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        ZipArchive zip = new ZipArchive( zipFile );

        /* It may be tempting to Create() the zip file before starting to perform operations.
          But this is an unnecessary step that will hinder performance. Indeed, if the component
          sees that the zip file doesn't already exist, it can perform optimizations when adding
          files. */
        //zipFile.Create();

        /* When performing multiple operations on a zip archive, the best performance can
          be achieved by wrapping the operations in a 'batch update'. This will make the
          component wait until all relevant operations are completed before writing the 
          zip archive final structure and metadata, greatly improving performance with large
          archives. */

        // Wrap the operations that modify the zip archive in a batch update
        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          // Select a source folder
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Data" );

          // Zip the files in the source folder into the zip archive
          sourceFolder.CopyFilesTo( zip, true, true );

          // Select an individual file
          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );

          // Select a specific target name and path for the file in the archive
          AbstractFile targetFile = zip.GetFile( @"MyFolder1\MyFolder2\MyNamedFile.mydata" );

          // Zip it to the archive
          sourceFile.CopyTo( targetFile, true );
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub CopyItemsToZip()
      ' Select a file that will be our zip file
      Dim zipFile As AbstractFile = New DiskFile("CopyItemsToZip1.zip")

'       The component doesn't have distinct add and update operations.
'         If you want any existing zip file to be overwritten, you need to delete the
'         zip file before starting to perform any operation. 

      ' If the zip file already exists
      If zipFile.Exists Then
        ' Delete it
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

'       It may be tempting to Create() the zip file before starting to perform operations.
'         But this is an unnecessary step that will hinder performance. Indeed, if the component
'         sees that the zip file doesn't already exist, it can perform optimizations when adding
'         files. 
      'zipFile.Create();

'       When performing multiple operations on a zip archive, the best performance can
'         be achieved by wrapping the operations in a 'batch update'. This will make the
'         component wait until all relevant operations are completed before writing the 
'         zip archive final structure and metadata, greatly improving performance with large
'         archives. 

      ' Wrap the operations that modify the zip archive in a batch update
      Using batch As New AutoBatchUpdate(zip)
        ' Select a source folder
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Data")

        ' Zip the files in the source folder into the zip archive
        sourceFolder.CopyFilesTo(zip, True, True)

        ' Select an individual file
        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")

        ' Select a specific target name and path for the file in the archive
        Dim targetFile As AbstractFile = zip.GetFile("MyFolder1\MyFolder2\MyNamedFile.mydata")

        ' Zip it to the archive
        sourceFile.CopyTo(targetFile, True)
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to copy a file rather than a folder or its contents? Create a `DiskFile` class rather than a `DiskFolder` class. 

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you want to add items into a specific folder within the zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's DefaultExtraHeaders property.

All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.