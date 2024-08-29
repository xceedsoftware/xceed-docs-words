import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a zip file

This topic demonstrates how to get a listing of all of the files contained in a zip file.

## Basic steps

To list the contents of a zip file, the following steps must be performed:

- Retrieve a reference to a zip file using the `ZipArchive` class. 

- Call the `GetFiles` method to retrieve a listing of the files contained within the zip file. 

- You can now loop through the files and extract the desired information.

## Demonstration

This example demonstrates how to list the contents of a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;
      
      ZipArchive zip = new ZipArchive( new DiskFile( @"c:\test.zip" ) );
      
      foreach( AbstractFile f in zip.GetFiles( true ) )
      {
        Console.WriteLine( f.FullName );
      } 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      Dim zip As New ZipArchive(New DiskFile("c:\test.zip"))
      Dim f As AbstractFile

      For Each f In zip.GetFiles( True )
        ListBox1.Items.Add( f.FullName )
      Next
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be listed? Use `filters`. 

- Do you also want to retrieve a listing of the zipped folders? Use the `GetFolders` method. 

- Do you want to retrieve a reference to a single zipped file or folder? Use the `GetFile` or `GetFolder` methods. 

- Do you want to list the contents of a specific folder within the zip file? Create an instance of a `ZippedFolder` object rather than a `ZipArchive` object.    

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 