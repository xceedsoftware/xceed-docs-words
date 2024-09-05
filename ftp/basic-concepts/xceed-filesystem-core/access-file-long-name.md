import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Accessing files with long names and/or paths on Windows

The .NET framework has a significant limitation when it comes to accessing files. All the classes, methods and properties in the System.IO namespace that manipulates file and folder names are limited to so-called system-defined maximum lengths. From the .NET documentation:

:::caution
The specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
:::

This limitation does not cause problems in most situations. But on Windows systems, if there is a need to access a files whose name or path is longer than the .NET limit, a %System.IO.PathTooLongException% will be thrown.

To counter this, Xceed FileSystem implements the WindowsDiskFile and WindowsDiskFolder classes. The classes work in the exact same way as DiskFile and DiskFolder but internally, they do not use the .NET framework to access the file or folder they represent. Instead, they make direct, native calls to the Windows API. For example, to open a file for reading, WindowsDiskFile will call the CreateFile() function of the Windows API. The path limit under Windows is much larger than the .NET framework. It stands at 32,767 characters.

## Usage

The WindowsDiskFile and WindowsDiskFolder classes are located in the Xceed.FileSystem.Windows assembly. To use the classes, the Xceed.FileSystem.Windows.dll file needs to be added as a reference in your application project.

Because the functionality requires calling Windows directly, using the Xceed.FileSystem.Windows assembly requires the "full trust" permission level and will only work on Windows systems.

The Xceed.FileSystem.Windows assembly is entirely optional. No Xceed assembly directly references it so existing application will continue to behave as they did before.

### Namespace

The WindowsDiskFile and WindowsDiskFolder classes are located in the Xceed.FileSystem.Windows namespace. The namespace must be added to your code.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;
      using Xceed.FileSystem.Windows;
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.FileSystem
      Imports Xceed.FileSystem.Windows
    ```
  </TabItem>
</Tabs>

### Long file names and paths

A path is considered long when it more than 248 characters in length. A file name is considered long when it is more than 260 characters in length.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      string veryLongFileName = @"SomeLongFileNameThatGoesOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnUntilItEnds.dat";
      string veryLongPath = @"Folder1\Folder2\Folder3\Folder4\Folder5\Folder6\Folder7\Folder8\Folder9\SomeLongFolderNameThatGoesOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnUntilItEnds\FinalFolder";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Private veryLongFileName As String = "SomeLongFileNameThatGoesOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnUntilItEnds.dat"
      Private veryLongPath As String = "Folder1\Folder2\Folder3\Folder4\Folder5\Folder6\Folder7\Folder8\Folder9\SomeLongFolderNameThatGoesOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnAndOnUntilItEnds\FinalFolder"
    ```
  </TabItem>
</Tabs>

### Usage with normal paths

Usage of WindowsDiskFile and WindowsDiskFolder is not restricted to long paths, you can use the classes on normal paths as you would with DiskFile and DiskFolder.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile file = new WindowsDiskFile( @"D:\Data\SomeFile.dat" );
      AbstractFolder destinationFolder = new WindowsDiskFolder( @"D:\SomeFolder" );

      file.CopyTo( destinationFolder, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim file As AbstractFile = New WindowsDiskFile("D:\Data\SomeFile.dat")
      Dim destinationFolder As AbstractFolder = New WindowsDiskFolder("D:\SomeFolder")

      file.CopyTo(destinationFolder, True)
    ```
  </TabItem>
</Tabs>

### Mixing use of DiskFile/DiskFolder with WindowsDiskFile/WindowsDiskFolder

Because both set of classes derive from AbstractFile/AbstractFolder, they can be used together so that WindowsDiskFile/WindowsDiskFolder are only used in specific cases where access to a long file or folder is needed.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      // Select a file with a normal file name
      AbstractFile file = new DiskFile( @"D:\Data\SomeFile.dat" );

      // Select a folder with a long path
      AbstractFolder destinationFolder = new WindowsDiskFolder( @"D:\SomeFolder\" + veryLongPath );

      // Copy the file to the destination folder
      file.CopyTo( destinationFolder, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      ' Select a file with a normal file name
      Dim file As AbstractFile = New DiskFile("D:\Data\SomeFile.dat")

      ' Select a folder with a long path
      Dim destinationFolder As AbstractFolder = New WindowsDiskFolder("D:\SomeFolder\" & veryLongPath)

      ' Copy the file to the destination folder
      file.CopyTo(destinationFolder, True)
    ```
  </TabItem>
</Tabs>

### Unzipping into a WindowsDiskFolder
A classic problem situation is dealing with zip archives. Zip archives can contain items with long names. Unzipping such an item into a DiskFolder would make the .NET framework throw a %System.IO.PathTooLongException%. By unzipping into a WindowsDiskFolder, items with long names will be unzipped into WindowsDiskFile objects that can handle the name.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      // Select a zip file
      AbstractFile zipFile = new DiskFile( @"D:\Data\SomeZipFile.zip" );

      // If the zip file exists
      if( zipFile.Exists )
        // Delete it
        zipFile.Delete();

      // Create a logical zip archive around the zip file
      ZipArchive zip = new ZipArchive( zipFile );

      // Select an existing file as a source
      AbstractFile file = new DiskFile( @"D:\Data\SomeFile.dat" );

      // Select a specific long name in the zip archive
      AbstractFile zippedFile = zip.GetFile( veryLongFileName );

      // Copy the source file to the long named zipped file
      file.CopyTo( zippedFile, true );

      // Select a WindowsDiskFolder as the destination folder
      AbstractFolder destinationFolder = new WindowsDiskFolder( @"D:\SomeFolder" );
            
      // Unzip the files in the zip archive to the destination folder
      zip.CopyFilesTo( destinationFolder, true, true );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      ' Select a zip file
      Dim zipFile As AbstractFile = New DiskFile("D:\Data\SomeZipFile.zip")

      ' If the zip file exists
      If zipFile.Exists Then
        ' Delete it
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Select an existing file as a source
      Dim file As AbstractFile = New DiskFile("D:\Data\SomeFile.dat")

      ' Select a specific long name in the zip archive
      Dim zippedFile As AbstractFile = zip.GetFile(veryLongFileName)

      ' Copy the source file to the long named zipped file
      file.CopyTo(zippedFile, True)

      ' Select a WindowsDiskFolder as the destination folder
      Dim destinationFolder As AbstractFolder = New WindowsDiskFolder("D:\SomeFolder")

      ' Unzip the files in the zip archive to the destination folder
      zip.CopyFilesTo(destinationFolder, True, True)
    ```
  </TabItem>
</Tabs>

### Zipping from WindowsDiskFile and WindowsDiskFolder
Another classic problem is zipping from a disk that contains files with long names or a folder structure that amounts to a long path. Using DiskFolder, an exception is thrown when an item that cannot be handled is encountered. Using WindowsDiskFile and WindowsDiskFolder objects as sources, the files can be handled properly.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      // Select a zip file
      AbstractFile zipFile = new DiskFile( @"D:\Data\SomeZipFile.zip" );

      // If the zip file exists
      if( zipFile.Exists )
        // Delete it
        zipFile.Delete();

      // Create a logical zip archive around the zip file
      ZipArchive zip = new ZipArchive( zipFile );

      using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
      {
        // Select an existing WindowsDiskFile with a long file name
        AbstractFile file = new WindowsDiskFile( @"D:\Data\" + veryLongFileName );

        // Add it to the zip archive
        file.CopyTo( zip, true );

        // Select a folder that might contain files with long names or a sub folder structure that amounts to a long path
        AbstractFolder folder = new WindowsDiskFolder( @"D:\OtherFolderThatContainsFileWithLongNames" );
        
        // Add the folder to the zip archive
        folder.CopyFilesTo( zip, true, true );
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      ' Select a zip file
      Dim zipFile As AbstractFile = New DiskFile("D:\Data\SomeZipFile.zip")

      ' If the zip file exists
      If zipFile.Exists Then
        ' Delete it
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      Using batch As New AutoBatchUpdate(zip)
        ' Select an existing WindowsDiskFile with a long file name
        Dim file As AbstractFile = New WindowsDiskFile("D:\Data\" & veryLongFileName)

        ' Add it to the zip archive
        file.CopyTo(zip, True)

        ' Select a folder that might contain files with long names or a sub folder structure that amounts to a long path
        Dim folder As AbstractFolder = New WindowsDiskFolder("D:\OtherFolderThatContainsFileWithLongNames")

        ' Add the folder to the zip archive
        folder.CopyFilesTo(zip, True, True)
      End Using
    ```
  </TabItem>
</Tabs>

### Allowing DiskFile and DiskFolder to handle long names

If you have existing code which use DiskFile and DiskFolder that you do not wish to modify but would like to benefit from long path support, you can instruct DiskFile and DiskFolder to automatically use WindowsDiskFile and WindowsDiskFolder internally. This way, they will support long paths the same way.

:::tip
The feature is enabled by a global property DiskFile.DefaultIOHandler. It will affect all DiskFile and DiskFolder objects that will be created after the property is set. Existing objects will continue to behave the same. To avoid confusion, it is advisable to set the property before you start creating DiskFile and DiskFolder objects.
:::

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      // Create an instance of the Windows IO Handler
      Xceed.FileSystem.IO.IIOHandler ioHandler = new Win32IOHandler();

      // Instruct DiskFile and DiskFolder to use our IO handler from now on
      DiskFile.DefaultIOHandler = ioHandler;

      // Select a DiskFile with a long file name
      AbstractFile file = new DiskFile( @"D:\" + veryLongFileName );

      // Select a DiskFolder with a long path
      AbstractFolder folder = new DiskFolder( @"D:\" + veryLongPath );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      ' Create an instance of the Windows IO Handler
      Dim ioHandler As Xceed.FileSystem.IO.IIOHandler = New Win32IOHandler()

      ' Instruct DiskFile and DiskFolder to use our IO handler from now on
      DiskFile.DefaultIOHandler = ioHandler

      ' Select a DiskFile with a long file name
      Dim file As AbstractFile = New DiskFile("D:\" & veryLongFileName)

      ' Select a DiskFolder with a long path
      Dim folder As AbstractFolder = New DiskFolder("D:\" & veryLongPath)
    ```
  </TabItem>
</Tabs>