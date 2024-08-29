---
title: Converting zip and self-extracting zip files
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Converting zip and self-extracting zip files

A self-extracting zip file is a zip file that has the necessary information in its prefix (header) to unzip the files it contains without the need for third party applications such as WinZip ™ or even Xceed Zip for .NET. Therefore, converting a regular zip file only requires that the self-extractor binary be written in its prefix.  

## Basic concepts - Converting a zip file to a self-extracting zip file

To convert a zip file to a self-extracting zip file, the following steps must be taken :

- Retrieve a reference to a new or existing zip file using the `ZipArchive` class. 

- Change the extension of the zip file to .EXE using the ZipArchive's `Name` property. 

- Create and configure a `XceedSfxPrefix` object. The `XceedSfxPrefix` object contains all the information required to allow the file to self-extract. 

- Assign the `XceedSfxPrefix` to the ZipArchive's `SfxPrefix` property.

## Demonstration

The following example demonstrates how to convert a regular zip file to a self-extracting zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.Zip.Sfx;
      using Xceed.FileSystem;
      
      // Retrieve a reference to an existing zip file.
      ZipArchive zip = new ZipArchive( new DiskFile( @"C:\Test\Fonts.zip" ) );
      
      // Change its extension to .EXE.
      zip.ZipFile.Name = "Fonts.exe"; {{< spaces>
      
      // Create and configure a XceedSfxPrefix object.
      XceedSfxPrefix sfx = new XceedSfxPrefix( new DiskFile( @"C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin" ) );
      
      sfx.DialogStrings[ DialogStrings.Title ] = "Welcome to Xceed Zip for .NET!";
      sfx.DefaultDestinationFolder = @"C:\";
      sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly;      
      
      // Assign the prefix to the zip file.
      zip.SfxPrefix = sfx;
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Zip
    Imports Xceed.Zip.Sfx
    Imports Xceed.FileSystem

    ' Retrieve a reference to an existing zip file.
    Dim zip As New ZipArchive(New DiskFile("C:\Test\Fonts.zip"))

    ' Change its extension to .EXE.
    zip.ZipFile.Name = "Fonts.exe" 

    ' Create and configure a XceedSfxPrefix object.
    Dim sfx As New XceedSfxPrefix(New DiskFile("C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin"))

    sfx.DialogStrings( DialogStrings.Title ) = "Welcome to Xceed Zip for .NET!"
    sfx.DefaultDestinationFolder = "C:\"
    sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly

    ' Assign the prefix to the zip file.
    zip.SfxPrefix = sfx
    ```
  </TabItem>
</Tabs>

## Basic concepts - Converting a self-extracting zip file to a zip file

To convert a self-extracting zip file to a regular zip file, the following steps must be taken :

- Retrieve a reference to a new or existing zip file using the ZipArchive class. 

- Change the extension of the zip file to .ZIP. 

- Set the ZipArchive's SfxPrefix property to null (Nothing in Visual Basic).

## Demonstration

The following example demonstrates how to convert a self-extracting zip file to a regular zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.FileSystem;
      
      // Retrieve a reference to an existing self-extracting zip file.
      ZipArchive zip = new ZipArchive( new DiskFile( @"C:\Test\Fonts.exe" ) );
      
      // Change its extension to .ZIP.
      zip.ZipFile.Name = "Fonts.zip";        
      
      // Remove the prefix.
      zip.SfxPrefix = null;  
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Zip
    Imports Xceed.FileSystem

    ' Retrieve a reference to an existing self-extracting zip file.
    Dim zip As New ZipArchive(New DiskFile("C:\Test\Fonts.exe"))

    ' Change its extension to .ZIP.
    zip.ZipFile.Name = "Fonts.zip"

    ' Remove the prefix.
    zip.SfxPrefix = Nothing
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to change the location of the temporary folder. Set the ZipArchive's `TempFolder` or `DefaultTempFolder` property. 

- Do you only want to do basic zip file operations? Use the [QuickZip](/zip/basic-concepts/quick-zip) class. 