import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a Tar archive with QuickTar

This topic demonstrates how to remove items from a Tar archive using the static `Remove` method of the `QuickTar` class.

:::note
Tar is not currently available in Xceed's Compact Framework products.
:::

## Remove method

There is only one version of the Remove method.

## Demonstration

In the following example, we specify the Tar archive and the files to remove, and we indicate that the Remove operation should be performed recursively.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTar.Remove(@"d:\test.tar", true, "*old*");
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    QuickTar.Remove("d:\test.tar", True, "*old*")
    ```
  </TabItem>
</Tabs>

## Remarks

Note that the filesToRemove parameter of the Remove method cannot be null otherwise an ArgumentNullException exception will be thrown.

## Things you should consider

The main questions you should ask yourself when adding items to a Tar archive are:

- Do you want to do more complex Tar operations? Use the `FileSystem`-based classes defined within the `Xceed.Tar` namespace.