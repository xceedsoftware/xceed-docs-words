import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting items from a Tar archive with QuickTar

This topic demonstrates how to extract items from a Tar archive using the static Untar method of the QuickTar class, specifying several parameters.

:::note
Tar is not currently available in Xceed's Compact Framework products.
:::

## Untar method

The Untar method has a few overloads that can be used to extract files from a Tar archive. Some only require that you specify the archive name and the files to extract, the destination folder, and whether the Tar archive is compressed by GZip, while others provide options such as whether existing files should be replaced and the directory structure preserved in the destination Tar archive, whether the Tar operation should be performed recursively. Events are also supported.

## Demonstration

In the following example, we specify several parameters and also use some callbacks.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTar.Untar(@"d:\test.tar", @"d:\output\", true, true, true, true,
               new QuickTar.ByteProgressionCallback(this.OnByteProgression),
               new QuickTar.ItemProgressionCallback(this.OnItemProgression),
               null, @"*");

      public void OnByteProgression( string currentItemName, long currentItemsByteProcessed,
                                    long currentItemTotalBytes, byte currentItemPercent,
                                    long allItemsByteProcessed, long allItemsTotalBytes,
                                    byte allItemsPercent, object userParams)
      { 
        //Do stuff
      }

      public void OnItemProgression( string currentItemName,
                                    long itemProcessed, 
                                    long totalItemCount, 
                                    byte totalItemPercent, 
                                    ref bool abort, 
                                    object userParams)
      {
        //Do stuff
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickTar.Untar("d:\test.tar", "d:\output\", True, True, True, _
               True, New QuickTar.ByteProgressionCallback(Me.OnByteProgression), _
               New QuickTar.ItemProgressionCallback(Me.OnItemProgression), _
               Nothing, "*")  

      Public Sub OnByteProgression(ByVal currentItemName As String, _
                                  ByVal currentItemsByteProcessed As Long, _
                                  ByVal currentItemTotalBytes As Long, _ 
                                  ByVal currentItemPercent As Byte, _
                                  ByVal allItemsByteProcessed As Long, _
                                  ByVal allItemsTotalBytes As Long, _
                                  ByVal allItemsPercent As Byte, _
                                  ByVal userParams As Object) 
        'Do stuff
      End Sub

      Public Sub OnItemProgression(ByVal currentItemName As String, _
                                  ByVal itemProcessed As Long, _
                                  ByVal totalItemCount As Long, _
                                  ByVal totalItemPercent As Byte, _
                                  ByRef abort As Boolean, _
                                  ByVal userParams As Object)
        ' Do stuff
      End Sub
    ```
  </TabItem>
</Tabs>

## Handling paths
When extracting files from within a Tar archive file, the directory structure can be restored fully or partrially, or it can be omitted altogether. 

If the `preservePaths` parameter of the Untar method is set to **false**, the files specified in the *filesToUntar* parameter will be restored directly into the root of the destination folder without recreating the directory structure. 

For example, if you have a Tar archive containing files in the "folder1" subfolder and files in the "folder1\folder2" subfolder, the following code will untar all files right into "c:\temp", without creating any subfolders:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTar.Untar( @"c:\test.tar", @"c:\temp", true, true, false, @"folder1\*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickTar.Untar( "c:\test.tar", "c:\temp", True, True, False, "folder1\*" )
    ```
  </TabItem>
</Tabs>

If however the *preservePaths* parameter is set to **true**, the part of the path that is explicitly included in the *filesToUntar* parameter will not be restored into the destination folder. 

For example, for the same Tar archive as above, the following code will create the folder "folder2" into the "c:\temp" destination folder. Files that were in the "folder1" subfolder in the archive will be extracted directly into the root of "c:\temp", and files that were in "folder1\folder2" will be extracted into "c:\temp\folder2":

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTar.Untar( @"c:\test.tar", @"c:\temp", true, true, true, @"folder1\*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickTar.Untar( "c:\test.tar", "c:\temp", True, True, True, "folder1\*" )
    ```
  </TabItem>
</Tabs>

The following example will extract files into "c:\temp\folder1" and "c:\temp\folder1\folder2":

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTar.Untar( @"c:\test.tar", @"c:\temp", true, true, true, @"*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickTar.Untar( "c:\test.tar", "c:\temp", True, True, True, "*" )
    ```
  </TabItem>
</Tabs>

## Remarks

When recursively adding files to a zip file, you have to consider every filename you place in the filesToTar parameter as a filemask. For example, if you set the *filesToTar* parameter to "c:\file.txt", the **entire** "c:\" drive will be scanned and all the files that are named "file.txt" that are found will be included in the Tar archive.

Note that the *filesToTar* parameter of the Tar method cannot be null; otherwise, an ArgumentNullException exception will be thrown.

If the *isTarCompressed* parameter is set to true, the GZip file retreived must have the following format: tarFileName.gz. An exception is thrown if the Tar archive is not compressed.

## Things you should consider

The main questions you should ask yourself when adding items to a Tar archive are:

- Do you want to do more complex Tar operations? Use the `FileSystem`-based classes defined within the `Xceed.Tar` namespace.