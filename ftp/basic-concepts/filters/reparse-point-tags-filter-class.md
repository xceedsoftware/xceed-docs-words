import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ReparsePointTagsFilter class

The `ReparsePointTagsFilter` class can be used to filter files and folders according to their ReparsePointTags value.

## Background

Hard disks sometimes contain special files and folders that link to other files, folder and, sometimes, other volumes. These are known as symbolic links, hard links, directory junctions, volume mount points, depending on the literature and the version of Windows.

The term reparse point is used in Microsoft documentation to designate the special attribute that identify any kind of link or other special property of a file or item. A reparse point is a bit in the `System.IO.FileAttributes` enumeration.

Reparse point tags are a supplemental integer value that specify what specific type of reparse point a file or folder is.

So a file or folder that is a reparse point will have the ReparsePoint bit set in its Attributes and, possibly, have an associated reparse point tag value.

In practice, symbolic links, hard links, directory junctions, volume mount points are all links of some kind. Microsoft has a name for these special items. They are called name surrogates. They are identified by the Windows API macro IsReparseTagNameSurrogate().

By default, the .NET framework and Xceed Zip for .NET automatically follows any link it encounters during scanning and zipping transparently.

In some situations, transparently following links might not be the desired action. In these cases, this filter provides options to control whether a link is followed or not.

## WindowsDiskFile/WindowsDiskFolder needed to access reparse point tags

The .NET framework does not detect reparse points tags. It detects reparse points in general and sets the ReparsePoint bit set in the `Attributes` property.

While this can be a sufficient filtering criteria, it must be understood that not all reparse points are symbolic links and alike. Microsoft does not explain in detail what the other types are (you can view the names here) but it's possible an application will encounter them.

The WindowsDiskFile/WindowsDiskFolder classes access the Windows file system directly to perform operations. Therefore they can gain access to the reparse point tag information, allowing the ReparsePointTags filter to work to its full potential.

It is possible to use ReparsePointTags on any AbstractFile and AbstractFolder, but the reparse point tag value will always be 0.

## Prevent recursing into directories that are name surrogates
This example processes all the files that have the TXT **or** the EXE extension.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile zipFile = new DiskFile( "ReparsePointTagsFilterExample.zip" );

        if( zipFile.Exists )
          zipFile.Delete();

        ZipArchive zip = new ZipArchive( zipFile );

        /* Notice how we use WindowsDiskFolder here. WindowsDiskFile/WindowsDiskFolder classes
        are able to obtain the reparse point tag values from Windows. Unlike DiskFile/DiskFolder. */
              
        // Select a source folder
        AbstractFolder sourceFolder = new WindowsDiskFolder( @"C:\Users" );

        /* The default behavior of the ReparsePointTagsFilter is to exclude reparse
        point name surrogate files and folders when recursing into subfolders */

        // Create a reparse point filter
        Filter filters = new ReparsePointTagsFilter();

        /* Using the filter when zipping will exclude name surrogate files and folders */

        // Apply the reparse point filter when zipping
        sourceFolder.CopyFilesTo( zip, true, true, filters );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim zipFile As AbstractFile = New DiskFile("ReparsePointTagsFilterExample.zip")

        If zipFile.Exists Then
          zipFile.Delete()
        End If

        Dim zip As New ZipArchive(zipFile)

  '       Notice how we use WindowsDiskFolder here. WindowsDiskFile/WindowsDiskFolder classes
  '      are able to obtain the reparse point tag values from Windows. Unlike DiskFile/DiskFolder. 

        ' Select a source folder
        Dim sourceFolder As AbstractFolder = New WindowsDiskFolder("C:\Users")

  '       The default behavior of the ReparsePointTagsFilter is to exclude reparse
  '      point name surrogate files and folders when recursing into subfolders 

        ' Create a reparse point filter
        Dim filters As Filter = New ReparsePointTagsFilter()

        ' Using the filter when zipping will exclude name surrogate files and folders 

        ' Apply the reparse point filter when zipping
        sourceFolder.CopyFilesTo(zip, True, True, filters)
      ```
    </TabItem>
</Tabs>