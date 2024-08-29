import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding items to a Tar archive with QuickTar

This topic demonstrates how to add items to a Tar archive using the static `Tar` method of the `QuickTar` class, specifying several parameters.

:::note
Tar is not currently available in Xceed's Compact Framework products.
:::

## Tar method

The Tar method has various overloads that can be used to add files to a Tar archive. Some only require that you specify the archive name and the files to add to the archive, while others provide options such as whether existing files should be replaced and the directory structure preserved in the destination Tar archive, whether the Tar operation should be performed recursively, and whether the archive should be compressed using GZip to "tarFileName".gz. Events are also supported.

## Demonstration

In the following example, we specify several parameters and also use some callbacks.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        QuickTar.Tar(@"d:\test.tar", false, true, true,
                    new QuickTar.ByteProgressionCallback(this.OnByteProgression),
                    new QuickTar.ItemProgressionCallback(this.OnItemProgression),
                    null, @"d:\test\*");

        public void OnByteProgression( string currentItemName, long currentItemsByteProcessed,
                                      long currentItemTotalBytes, byte currentItemPercent,
                                      long allItemsByteProcessed, long allItemsTotalBytes,
                                      byte allItemsPercent, object userParams)
        { 
          //Do stuff
        }

        public void OnItemProgression( string currentItemName, long itemProcessed,
                                      long totalItemCount, byte totalItemPercent,
                                      ref bool abort, object userParams)
        { 
          //Do stuff
        }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickTar.Tar("d:\test.tar", False, True, True, _
                  New QuickTar.ByteProgressionCallback(Me.OnByteProgression), _
                  New QuickTar.ItemProgressionCallback(Me.OnItemProgression), _
                  Nothing, "d:\test\*")

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
        'Do stuff
      End Sub
    ```
  </TabItem>
</Tabs>

## Remarks

When recursively adding files to a zip file, you have to consider every filename you place in the *filesToTar* parameter as a filemask. For example, if you set the *filesToTar* parameter to "c:\file.txt", the **entire** "c:\" drive will be scanned and all the files that are named "file.txt" that are found will be included in the Tar archive.

Note that the filesToTar parameter of the Tar method cannot be null; otherwise, an `ArgumentNullException` exception will be thrown.

## Things you should consider

The main questions you should ask yourself when adding items to a Tar archive are:

- Do you want to do more complex Tar operations? Use the `FileSystem`-based classes defined within the `Xceed.Tar` namespace.