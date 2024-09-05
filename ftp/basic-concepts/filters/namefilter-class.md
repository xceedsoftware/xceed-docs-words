import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NameFilter

The `NameFilter` class can be used to filter files and folders according to their names.

## Case sensitivity
When using NameFilter classes, by default, case sensitivity is not enforced. In order to enforce case sensitivity, a greater-than symbol (>) must be used as the first character of the string. For example:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, ">*.TXT" );
        AbstractFile[] files = myFolder.GetFiles( true, ">*.txt|*.exe" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, ">*.TXT" )
        Dim files As AbstractFile() = myFolder.GetFiles( True, ">*.txt|*.exe" ) 
      ```
    </TabItem>
</Tabs>

## Demonstration
Process all files that have the TXT extension. Since, by default, the `FilterScope` enumeration is set to **File** and we are using "*.txt" as the filter, there is no need to implicitly set the FilterScope enumeration in the constructor of the NameFilter class.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, new NameFilter( "*.txt" ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, New NameFilter( "*.txt" ) )
      ```
    </TabItem>
</Tabs>

Since we are using a basic string filter, the NameFilter class is used by default, therefore we can omit the creation of a new NameFilter class and simply use a basic filter.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, "*.txt" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, "*.txt" )
      ```
    </TabItem>
</Tabs>

Process all files that have either the TXT or EXE extension.
<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, new OrFilter( new NameFilter( "*.txt" ), new NameFilter( "*.exe" ) ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, New OrFilter( New NameFilter( "*.txt" ), New NameFilter( "*.exe" ) ) )
      ```
    </TabItem>
</Tabs>

It is possible to simplify the above example by using the pipe (|) character to separate the two strings. The pipe character servers the same purpose as the OrFilter class and removes the necessity of creating two instances of the NameFilter class and regrouping them within an OrFilter class.
<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, new NameFilter( "*.txt|*.exe" ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, New NameFilter( "*.txt|*.exe" ) )
      ```
    </TabItem>
</Tabs>

Here are more complex examples
<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        /*
        * Consider the following folder and file hierarchy:
        * 
        * Folder: NameFilter1
        * |-------> Folder: Folder1
        *           |-------> Folder: TargetName
        *                     |-------> Folder: TargetNameAndExtraChars
        *                               |-------> File: File1.dat
        *                               |-------> File: File2.dat
        *                               |-------> File: TargetName.dat
        *                               |-------> File: TargetName
        * |-------> Folder: TargetName
        * 
        * |-------> Folder: Folder3
        *           |-------> Folder: Folder3_1
        *                     |-------> Folder: TargetName
        *                               |-------> Folder: Folder3_1_1
        *                                         |-------> Folder: TargetName
        *                                                   |-------> File: File3.dat
        *                                                   |-------> File: File4.dat
        *                               |-------> File: File5.dat
        * |-------> File: File6.dat
        * |-------> File: File7.dat
        * 
        * Suppose our goal is to select all folders (not files) that bear the name 'TargetName',
        * then the folders:
        * 
        * NameFilter1->Folder1->TargetName
        * NameFilter1->TargetName
        * NameFilter1->Folder3->Folder3_1->TargetName
        * NameFilter1->Folder3->Folder3_1->TargetName->Folder3_1_1->TargetName
        * 
        * should be selected. The 'TargetNameAndExtraChars' folder is not an exact match and the file
        * 'TargetName' is a file not a folder.
        * 
        * The 'TargetName' folder under 'Folder3_1_1' is an interesting case because it is below a
        * previous matched folder. That may or may not be desired. We can address both situations.
        */

        AbstractFolder baseFolder = new DiskFolder( @"NameFilter1" );

        // This is the name we will be looking for
        string targetName = "TargetName";

        // If our test folders don't exist
        if( !baseFolder.Exists )
        {
          /* We will create a set of files and folders to test our filter */

          AbstractFile sourceFile, file;
          AbstractFolder folder;

          file = baseFolder.GetFile( @"File6.dat" );
          file.Create();
          file = baseFolder.GetFile( @"File7.dat" );
          file.Create();

          sourceFile = file;

          folder = baseFolder.GetFolder( string.Format( @"Folder1\{0}\{0}AndExtraChars", targetName ) );
          sourceFile.CopyTo( folder.GetFile( "File1.dat" ), true );
          sourceFile.CopyTo( folder.GetFile( "File2.dat" ), true );
          sourceFile.CopyTo( folder.GetFile( targetName + ".dat" ), true );
          sourceFile.CopyTo( folder.GetFile( targetName ), true );

          folder = baseFolder.GetFolder( targetName );
          folder.Create();

          folder = baseFolder.GetFolder( string.Format( @"Folder3\Folder3_1\{0}", targetName ) );
          sourceFile.CopyTo( folder.GetFile( "File5.dat" ), true );
          folder = folder.GetFolder( string.Format( @"Folder3_1_1\{0}", targetName ) );
          sourceFile.CopyTo( folder.GetFile( "File3.dat" ), true );
          sourceFile.CopyTo( folder.GetFile( "File4.dat" ), true );
        }

        AbstractFolder[] folders;
        AbstractFile[] files;

        /*
        * The simplest approach is use a NameFilter object and set the scope to FilterScope.Folder.
        * This will select all the folders that have our targetName.
        * 
        * The key is the FilterScope argument set to Folder */

        // Create a name filter that accepts our targetName on a folder only (case insensitive)
        NameFilter nameFilter = new NameFilter( targetName, FilterScope.Folder );

        // Get any folder that match our name filter
        folders = baseFolder.GetFolders( true, nameFilter );

        Console.WriteLine( "Simple filtering" );
        foreach( AbstractFolder folder in folders )
        {
          Console.WriteLine( folder.FullName );
        }
        Console.WriteLine();

        /* The output will be:
        * NameFilter1->Folder1->TargetName
        * NameFilter1->TargetName
        * NameFilter1->Folder3->Folder3_1->TargetName
        * NameFilter1->Folder3->Folder3_1->TargetName->Folder3_1_1->TargetName


        /*
        * If you only want the most top level folder that matches the filter and not any sub folders
        * that also match the filter, you can add filters that exclude them.
        * 
        * The key is to prevent the filtering engine to recurse into folders that match our tagetName.
        * Again, the FilterScope parameter can be put to good use.
        */

        // Create a name filter that matches the name 'Aid' but only when determining if the
        // filter engine should look into a recursed folder
        NameFilter recurseFilter = new NameFilter( targetName, FilterScope.Recurse );

        // Wrap our recurse filter in a NotFilter to invert the decision
        NotFilter notFilter = new NotFilter( recurseFilter );

        // Get all the folders that match our name and do not match the name when recursing into sub folders
        folders = baseFolder.GetFolders( true, nameFilter, notFilter );

        Console.WriteLine( "Filtering with only top-level matches" );
        foreach( AbstractFolder folder in folders )
        {
          Console.WriteLine( folder.FullName );

          /* TODO: Here, you can process all the files that are in the folder individually
              with folder.GetFiles() or as a group using methods like folder.CopyFilesTo(), etc */
        }
        Console.WriteLine();

        /******************************/

        /* If you're simply looking for files */

        // Get all the files that match our name (this works because by default, the FilterScore is for files only)
        files = baseFolder.GetFiles( true, targetName );

        Console.WriteLine( "Filtering for files only" );
        foreach( AbstractFile file in files )
        {
          Console.WriteLine( file.FullName );
        }
        Console.WriteLine();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        '      
        '       * Consider the following folder and file hierarchy:
        '       * 
        '       * Folder: NameFilter1
        '       * |-------> Folder: Folder1
        '       *           |-------> Folder: TargetName
        '       *                     |-------> Folder: TargetNameAndExtraChars
        '       *                               |-------> File: File1.dat
        '       *                               |-------> File: File2.dat
        '       *                               |-------> File: TargetName.dat
        '       *                               |-------> File: TargetName
        '       * |-------> Folder: TargetName
        '       * 
        '       * |-------> Folder: Folder3
        '       *           |-------> Folder: Folder3_1
        '       *                     |-------> Folder: TargetName
        '       *                               |-------> Folder: Folder3_1_1
        '       *                                         |-------> Folder: TargetName
        '       *                                                   |-------> File: File3.dat
        '       *                                                   |-------> File: File4.dat
        '       *                               |-------> File: File5.dat
        '       * |-------> File: File6.dat
        '       * |-------> File: File7.dat
        '       * 
        '       * Suppose our goal is to select all folders (not files) that bear the name 'TargetName',
        '       * then the folders:
        '       * 
        '       * NameFilter1->Folder1->TargetName
        '       * NameFilter1->TargetName
        '       * NameFilter1->Folder3->Folder3_1->TargetName
        '       * NameFilter1->Folder3->Folder3_1->TargetName->Folder3_1_1->TargetName
        '       * 
        '       * should be selected. The 'TargetNameAndExtraChars' folder is not an exact match and the file
        '       * 'TargetName' is a file not a folder.
        '       * 
        '       * The 'TargetName' folder under 'Folder3_1_1' is an interesting case because it is below a
        '       * previous matched folder. That may or may not be desired. We can address both situations.
        '       

        Dim baseFolder As AbstractFolder = New DiskFolder("NameFilter1")

        ' This is the name we will be looking for
        Dim targetName As String = "TargetName"

        ' If our test folders don't exist
        If (Not baseFolder.Exists) Then
          ' We will create a set of files and folders to test our filter 

          Dim sourceFile, file As AbstractFile
          Dim folder As AbstractFolder

          file = baseFolder.GetFile("File6.dat")
          file.Create()
          file = baseFolder.GetFile("File7.dat")
          file.Create()

          sourceFile = file

          folder = baseFolder.GetFolder(String.Format("Folder1\{0}\{0}AndExtraChars", targetName))
          sourceFile.CopyTo(folder.GetFile("File1.dat"), True)
          sourceFile.CopyTo(folder.GetFile("File2.dat"), True)
          sourceFile.CopyTo(folder.GetFile(targetName & ".dat"), True)
          sourceFile.CopyTo(folder.GetFile(targetName), True)

          folder = baseFolder.GetFolder(targetName)
          folder.Create()

          folder = baseFolder.GetFolder(String.Format("Folder3\Folder3_1\{0}", targetName))
          sourceFile.CopyTo(folder.GetFile("File5.dat"), True)
          folder = folder.GetFolder(String.Format("Folder3_1_1\{0}", targetName))
          sourceFile.CopyTo(folder.GetFile("File3.dat"), True)
          sourceFile.CopyTo(folder.GetFile("File4.dat"), True)
        End If

        Dim folders() As AbstractFolder
        Dim files() As AbstractFile

        '      
        '       * The simplest approach is use a NameFilter object and set the scope to FilterScope.Folder.
        '       * This will select all the folders that have our targetName.
        '       * 
        '       * The key is the FilterScope argument set to Folder 

        ' Create a name filter that accepts our targetName on a folder only (case insensitive)
        Dim nameFilter As New NameFilter(targetName, FilterScope.Folder)

        ' Get any folder that match our name filter
        folders = baseFolder.GetFolders(True, nameFilter)

        Console.WriteLine("Simple filtering")
        For Each folder As AbstractFolder In folders
          Console.WriteLine(folder.FullName)
        Next folder
        Console.WriteLine()

        '       The output will be:
        '       * NameFilter1->Folder1->TargetName
        '       * NameFilter1->TargetName
        '       * NameFilter1->Folder3->Folder3_1->TargetName
        '       * NameFilter1->Folder3->Folder3_1->TargetName->Folder3_1_1->TargetName
        '
        '
        '      /*
        '       * If you only want the most top level folder that matches the filter and not any sub folders
        '       * that also match the filter, you can add filters that exclude them.
        '       * 
        '       * The key is to prevent the filtering engine to recurse into folders that match our tagetName.
        '       * Again, the FilterScope parameter can be put to good use.
        '       

        ' Create a name filter that matches the name 'Aid' but only when determining if the
        ' filter engine should look into a recursed folder
        Dim recurseFilter As New NameFilter(targetName, FilterScope.Recurse)

        ' Wrap our recurse filter in a NotFilter to invert the decision
        Dim notFilter As New NotFilter(recurseFilter)

        ' Get all the folders that match our name and do not match the name when recursing into sub folders
        folders = baseFolder.GetFolders(True, nameFilter, notFilter)

        Console.WriteLine("Filtering with only top-level matches")
        For Each folder As AbstractFolder In folders
          Console.WriteLine(folder.FullName)

          '         TODO: Here, you can process all the files that are in the folder individually
          '            with folder.GetFiles() or as a group using methods like folder.CopyFilesTo(), etc 
        Next folder
        Console.WriteLine()

        '****************************

        ' If you're simply looking for files 

        ' Get all the files that match our name (this works because by default, the FilterScore is for files only)
        files = baseFolder.GetFiles(True, targetName)

        Console.WriteLine("Filtering for files only")
        For Each file As AbstractFile In files
          Console.WriteLine(file.FullName)
        Next file
        Console.WriteLine()
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Do you only want to target specific types of folder items? Use the `FilterScope` enumeration in the constructor of the `NameFilter` class.

 