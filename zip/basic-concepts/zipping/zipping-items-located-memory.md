import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Zipping items in memory

This topic demonstrates how to add items in memory to a zip file using both the `MemoryFile` class and the `OpenWrite` method of the `ZippedFile` class.

## Basic steps

To copy an item located in memory to a zip file using the `MemoryFile` class, the following steps must be performed:

- Retrieve a reference to a file located in memory using the `MemoryFile` class. With Xceed Zip for .NET, a file is a file; it does not matter if it is located within a zip file, on disk or in memory. 

- If the file does not exist, create it. 

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. 

- Call the `CopyTo` method to copy the entire contents of the folder to the zip file.

To write a data directly in a zip file, the following steps must be performed:

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. 

- Retrieve a reference to a new or existing file inside the zip file using the `ZippedFile` class. 

- Convert the data to write to the file within the zip file to a byte array. 

- Open a stream to the `ZippedFile` object using its `OpenWrite` method. 

- Write the data to the `ZippedFile` object.

## Demonstration

This example demonstrates how to copy a file located in memory to a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.
      MemoryFile file = new MemoryFile( "RAM_DRIVE", "file.txt" );

      if( !file.Exists )
          file.Create();

      ZipArchive zip = new ZipArchive( new DiskFile( @"d:\dump\test.zip" ) );
      file.CopyTo( zip, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

      Dim file As New MemoryFile("RAM_DRIVE", "file.txt")

      If Not file.Exists Then
        file.Create()
      End If

      Dim zip As New ZipArchive(New DiskFile("d:\dump\test.zip") )
      file.CopyTo(zip, True)
    ```
  </TabItem>
</Tabs>

This next example demonstrates how to write data directly in a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;
      using System.IO;

      // If your trial period has expired, you must purchase a registered license key,
      // uncomment the next line of code, and insert your registered license key.
      // For more information, jump to the How the 45-day trial works and the
      // How to license the component topics.
      //Xceed.Zip.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
      // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

      ZipArchive zipFile = new ZipArchive( new DiskFile( @"d:\dump\test.zip" ) );

      ZippedFile file = ( ZippedFile )zipFile.GetFile( "file.txt" );

      if( !file.Exists )
          file.Create();
      
      string data = "This is the data which will be added to the zip file";

      // Convert the data to a byte array.
      byte[] byteData = System.Text.Encoding.Default.GetBytes( data );

      // Write the information to the ZippedFile object
      using( Stream stream = file.OpenWrite( true ) )
      {
          stream.Write( byteData, 0, byteData.Length );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem
      Imports System.IO

      ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.
      Dim zipFile As New ZipArchive(New DiskFile("d:\dump\test.zip"))
      Dim file As ZippedFile = CType(zipFile.GetFile("file.txt"), ZippedFile)

      If Not file.Exists Then
        file.Create()
      End If

      Dim data As String = "This is the data which will be added to the zip file"

      ' Convert the data to a byte array.
      Dim byteData() As Byte = System.Text.Encoding.Default.GetBytes(data)

      ' Write the information to the ZippedFile object
      Dim stream As Stream = file.OpenWrite(True)

      stream.Write(byteData, 0, byteData.Length)
      stream.Close()
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be added to the zip file? Use `filters`. 

- Do you want to add items into a specific folder within the zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object. 

- Do you want to move items rather than copy them? Use the `MoveTo` and `MoveFilesTo` methods. 

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to copy a specific file or folder? Use the `CopyTo` method. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 

- Do you want to modify the default extra headers that are stored to a zip file? Set the ZipArchive's `DefaultExtraHeaders` property.

All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.