import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing an item from a gzipped file with QuickGZip

This topic demonstrates how to remove a file from a gzipped file using the static `Remove` method of the `QuickGZip` class.

:::note
QuickGZip is not currently available in Xceed's Compact Framework products.
:::

## Remove method

There is only one version of the Remove method.

## Demonstration

In the following example, we specify the gzipped file and the file to remove.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;

      QuickGZip.Remove(@"d:\test.gz", "test.txt")
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.GZip

    QuickGZip.Remove("d:\test.gz", "test.txt")
    ```
  </TabItem>
</Tabs>

## Remarks
GZipped files may only contain one file.

## Things you should consider

The main questions you should ask yourself when removing an item from a gzipped file are:

- Do you want to do more complex GZip operations? Use the `FileSystem`-based classes defined within the `Xceed.GZip` namespace.