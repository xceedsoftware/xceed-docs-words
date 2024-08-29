import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Compressing a file with QuickGZip

This topic demonstrates how to compress a file using the static `GZip` method of the `QuickGZip` class, specifying several parameters.

:::note
QuickGZip is not currently available in Xceed's Compact Framework products.
:::

## GZip method

The GZip method has a few overloads that can be used to compress files.

## Demonstration

In the following example, we specify several parameters and also use some callbacks.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;

      QuickGZip.GZip(@"d:\test.gz", true, new QuickGZip.ByteProgressionCallback(this.OnByteProgression),
                    new QuickGZip.ItemProgressionCallback(this.OnItemProgression),
                    null, @"d:\testDR\test.txt");

      public void OnByteProgression( string currentItemName, long currentItemsByteProcessed,
                                    long currentItemTotalBytes, byte currentItemPercent,
                                    long allItemsByteProcessed, long allItemsTotalBytes, 
                                    byte allItemsPercent, object userParams)
      { 
        //Do stuff
      }

      public void OnItemProgression( string currentItemName, long itemProcessed, 
                                    long totalItemCount, byte totalItemPercent, 
                                    ref bool abort, 
                                    object userParams)
      {
        //Do stuff
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.GZip

    QuickGZip.GZip("d:\test.gz", True, New QuickGZip.ByteProgressionCallback(Me.OnByteProgression), _
                  New QuickGZip.ItemProgressionCallback(Me.OnItemProgression), Nothing, _
                  "d:\testDR\test.txt")

    Public Sub OnByteProgression(ByVal currrentItemName As String, _
                                ByVal currentItemsByteProcessed As Long, _
                                ByVal currentItemTotalBytes As Long, _
                                ByVal currentItemPercent As Long, _
                                ByVal allItemsByteProcessed As Long, _
                                ByVal allItemsTotalBytes As Long, _
                                ByVal allItemsPercent As Byte, ByVal userParams As Object)
      'Do stuff

    End Sub

    Public Sub OnItemProgression(ByVal currentItemName As String, ByVal itemProcessed As Long, _
                                ByVal totalItemCount As Long, ByVal totalItemPercent As Byte, _
                                ByVal abort As Boolean, ByVal userParams As Object)
      'Do stuff
    End Sub
    ```
  </TabItem>
</Tabs>

## Remarks

QuickGZip only supports single file compression because although the compression process allows compression of multiple files, the content of the entire GZip file must first be uncompressed before adding additional files to the GZip file.

## Things you should consider

The main questions you should ask yourself when compressing items with GZip are:

-Do you want to do more complex GZip operations? Use the `FileSystem`-based classes defined within the `Xceed.GZip` namespace.