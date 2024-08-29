import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Optimizing Batch Updates to a Folder

## Xceed .NET Libraries Documentation

### Optimizing Batch Updates to a Folder

When performing multiple operations on a folder, the process can take a while to complete. Although events can provide feedback during these lengthy operations, it is also possible to reduce the time it takes to accomplish all the operations if the folder class being used implements the `IBatchUpdateable` interface.

The `IBatchUpdateable` interface is defined within the `Xceed.FileSystem` namespace and is implemented by the "Archive" classes, such as the `ZipArchive`, `TarArchive`, and `GZipArchive` classes.

### `IBatchUpdateable` Interface

The `IBatchUpdateable` interface implements the `BeginUpdate` and `EndUpdate` methods, which allow you to define a scope within which all modifications to a folder will be committed. Using this interface increases the speed of operations on the folder since modifications are not committed each time a method is called but rather once for all operations when the `EndUpdate` method is called.

If a class implements the `IBatchUpdateable` interface, the `BeginUpdate` and `EndUpdate` methods can be called directly on the class. The following example shows how to do this with a Zip archive:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem;
      using Xceed.Zip;

      ZipArchive archive = new ZipArchive(new DiskFile(@"c:\test.zip"));
      archive.BeginUpdate();
      // Code for operations on the folder
      archive.EndUpdate();
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.FileSystem
      Imports Xceed.Zip

      Dim archive As New ZipArchive(New DiskFile("c:\test.zip"))
      archive.BeginUpdate()
      ' Code for operations on the folder
      archive.EndUpdate()
    ```
  </TabItem>
</Tabs>

### Classes that Implement the IBatchUpdateable Interface
The AutoBatchUpdate class automatically checks if the folder class passed to its constructor implements the IBatchUpdateable interface. If it does, the BeginUpdate and EndUpdate methods are called automatically. If not, the code is executed normally.

#### Basic Steps
To perform batch updates, follow these steps:

- Verify if the folder class implements the IBatchUpdateable interface. This can only be done via the root of the folder.
- If the IBatchUpdateable interface is implemented, call the BeginUpdate method to mark the beginning of your scope.
- Perform the various operations on the folder.
- To commit the modifications made to the folder, call the EndUpdate method. It is important to always call EndUpdate; otherwise, the modifications will not be committed.
#### Demonstration
This example demonstrates how to use the IBatchUpdateable interface directly:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.FileSystem
      
      //folder represents any type of folder
      IBatchUpdateable batch = folder.RootFolder as IBatchUpdateable;
                
      //Check if our folder class implements the IBatchUpdateable interface via it's root
      //If it does, call the BeginUpdate method.
      if( batch != null )
        batch.BeginUpdate();
      
      try
      {
        //Perform the various operations.
      }
      finally
      {
        if( batch != null )
          batch.EndUpdate();
      } 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.FileSystem

      Dim batch As IBatchUpdateable = Nothing

      If TypeOf folder.RootFolder Is IBatchUpdateable Then
        batch = folder.RootFolder
        batch.BeginUpdate()
      End If

      Try
      'Perform the various operations
      Finally
        If Not batch Is Nothing Then
          batch.EndUpdate()
        End If
      End Try
    ```
  </TabItem>
</Tabs>

This example demonstrates how to use the AutoBatchUpdate class rather than manually calling the BeginUpdate and EndUpdate methods manually:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      //folder represents any type of folder
      using( AutoBatchUpdate batch = new AutoBatchUpdate( folder.RootFolder ) )
      { 
        //Perform the various operations.
        //Once the scope of the using statement is exited, if the folder class implemented
        //the IBatchUpdateable interface, the changes to the folder will be committed.
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      'folder represents any type of folder
      Dim batch As New AutoBatchUpdate( folder.RootFolder ) 

      'Perform the various operations.
      'Commit the modifications to the folder

      batch.Dispose()
    ```
  </TabItem>
</Tabs>