import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Uncompressing a file with QuickGZip

This topic demonstrates how to uncompress a file using the static `Ungzip` method of the `QuickGZip` class, specifying several parameters.

:::note
QuickGZip is not currently available in Xceed's Compact Framework products.
:::

## GZip method

The Ungzip method has a few overloads that can be used to uncompress files.

## Demonstration

In the following example, we specify several parameters and also use some callbacks.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;

      QuickGZip.Ungzip(@"d:\test.gz", @"d:\", true, new QuickGZip.ByteProgressionCallback(this.OnByteProgression),
                      new QuickGZip.ItemProgressionCallback(this.OnItemProgression), null, "*");

      public void OnByteProgression( string currentItemName, long currentItemsByteProcessed,
                                    long currentItemTotalBytes, byte currentItemPercent,
                                    long allItemsByteProcessed, long allItemsTotalBytes,
                                    byte allItemsPercent,  object userParams)
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
      Imports Xceed.GZip

      QuickGZip.Ungzip("d:\test.gz", "d:\", True, New QuickGZip.ByteProgressionCallback( AddressOf Me.OnByteProgression), _
                      New QuickGZip.ItemProgressionCallback(AddressOf Me.OnItemProgression), _
                      Nothing, "*")

      Public Sub OnByteProgression(ByVal currentItemName As String, ByVal  currentItemsByteProcessed As Long, _
                                  ByVal currentItemTotalBytes As Long, ByVal currentItemPercent As Byte, _
                                  ByVal allItemsByteProcessed As Long, ByVal allItemsTotalBytes As Long, _
                                  ByVal allItemsPercent As Byte, ByVal userParams As Object) 
        'Do stuff
      End Sub

      Public Sub OnItemProgression(ByVal currentItemName As String, ByVal itemProcessed As Long, _
                                  ByVal totalItemCount As Long, ByVal totalItemPercent As Byte, _
                                  ByRef abort As Boolean, ByVal userParams As Object)
        'Do stuff
      End Sub
    ```
  </TabItem>
</Tabs>

## Remarks

QuickGZip only supports uncompressing a single file from a gzipped file.

## Things you should consider

The main questions you should ask yourself when uncompressing an item with Ungzip are:

- Do you want to do more complex GZip operations? Use the `FileSystem`-based classes defined within the `Xceed.GZip` namespace.