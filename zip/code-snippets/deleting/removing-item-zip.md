import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a zip file

This topic demonstrates how to remove items from a folder by retrieving a reference to a file within a zip file.

## Basic steps

To remove an item from a zip file, the following steps must be performed:

- Retrieve a reference to a file contained within the zip file using the `ZippedFile` class. 

- Once we have a reference to a file we verify the Exists property to make sure that the file actually exists. 

- Call the `Delete` method to delete the file.

## Demonstration

This example demonstrates how to remove a file from within a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;

      ZippedFile f = new ZippedFile( new DiskFile( @"c:\test.zip" ), "file.txt" ); 

      if( f.Exists )
      {
        f.Delete();
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.FileSystem

      Dim f As New ZippedFile( New DiskFile( "c:\test.zip" ), "file.txt" ) 

      If f.Exists Then
        f.Delete()
      End If
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to filter (specify specific files and folders) the items that are to be deleted? Use filters. 

- Do you want to remove a specific folder? Create an instance of a `ZippedFolder` object rather than a `ZippedFile` object 

- Do you already have a reference on a folder? Use the `GetFolder` or `GetFile` method to retrieve a reference on the file or folder to remove. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 