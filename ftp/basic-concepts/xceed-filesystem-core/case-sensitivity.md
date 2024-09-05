import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Case sensitivity

­The classes defined within the `Xceed.FileSystem` namespace and other derived classes do **not** enforce case sensitivity. When a string is passed to a method call, for example, the `GetFile` method, the string is not manipulated in any way and is used "as is".

## Case sensitive source or destination

When dealing with case sensitive sources or destinations such as UNIX FTP servers or zip files, it is up to the user to pass a valid string to the method. For example, if you were to use the GetFile method to retrieve a reference to a file within a zip file and the filename exists in both lower case and uppercase, it is up to you to pass the filename in the appropriate case in order to retrieve a reference to the desired file. This is necessary because the GetFile method does **not** create a `NameFilter` class around the string passed in the method call. 

For example, if we wanted to retrieve a reference to file.txt located in a zip file but FILE.TXT also exists, the following code would be used:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile textFile = myFolder.GetFile( "file.txt" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFile As AbstractFile   myFolder.GetFile( "file.txt" )
    ```
  </TabItem>
</Tabs>

To retrieve a reference to FILE.TXT rather than file.txt, the following code would be used:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile textFile = myFolder.GetFile( "FILE.TXT" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFile As AbstractFile   myFolder.GetFile( "FILE.TXT" )
    ```
  </TabItem>
</Tabs>

## NameFilter class

When using NameFilter classes, by default, case sensitivity is **not** enforced. In order to enforce case sensitivity, a greater-than symbol (>) must be used as the first character of the string. 

For example, if we were to use the following code, all files that have the TXT extension would be returned regardless of the case:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile[] textFiles = myFolder.GetFiles( true, "*.TXT" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFiles As AbstractFile() = myFolder.GetFiles( true, "*.TXT" )
    ```
  </TabItem>
</Tabs>

In order to return only the TXT files that have an extension in upper case, it is necessary to add the greater-than symbol:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile[] textFiles = myFolder.GetFiles( true, ">*.TXT" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFiles As AbstractFile() = myFolder.GetFiles( true, ">*.TXT" )
    ```
  </TabItem>
</Tabs>

The greater-then symbol affects the entire string passed to the name filter. Therefore, if you were to use the following code, all the files that have the TXT extension in lower case and all the files that have the EXE extension in lower case will be returned:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile[] textFiles = myFolder.GetFiles( true, ">*.txt|*.exe" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFiles As AbstractFile() = myFolder.GetFiles( True, ">*.txt|*.exe" )
    ```
  </TabItem>
</Tabs>

If you wanted to retrieve all the files that have the TXT extension in lower case or all the files that have the EXE extension [without case sensitivity], you would need to create a NameFilter around each one:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      AbstractFile[] textFiles = myFolder.GetFiles( true, 
                                              new OrFilter( new NameFilter( ">*.txt" ),
                                              new NameFilter( "*.EXE" ) ) );
    ``` 
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim textFiles As AbstractFile() = myFolder.GetFiles( True, _
                                                     New OrFilter( New NameFilter( ">*.txt" ), _
                                                     New NameFilter( "*.EXE" ) ) )
    ```
  </TabItem>
</Tabs>