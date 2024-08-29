import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a Tar archive with QuickTar

This topic demonstrates how to list the contents of a Tar archive using the static `GetTarContents` method of the `QuickTar` class.

:::note
Tar is not currently available in Xceed's Compact Framework products.
:::

## GetTarContents method

There is only one version of the GetTarContents method. The method returns a list of `QuickTarItem` objects, which you can process as you wish.

## Basic steps
To list the contents of a FTP Tar archive, the following steps must be performed:

- Declare an array of `QuickTarItem` objects that will contain the result of the call to the `GetTarContents` method. 

- Iterate through the array of `QuickTarItem` objects to retrieve information on each `QuickTarItem` object it contains.

## Demonstration

In the following example, we specify the Tar archive and the files to remove, and we indicate that the Remove operation should be performed recursively.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickTarItem[] items = QuickTar.GetTarContents(@"d:\test.tar", true, "*");

      foreach (QuickTarItem item in items)
      { 
        Console.WriteLine(item.FullName);
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Dim items As QuickTarItem() = QuickTar.GetTarContents("d:\test.tar", True, "*")

      For Each item As QuickTarItem In items 
        Console.WriteLine(item.FullName)
      Next item
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when adding items to a Tar archive are:

- Do you want to do more complex Tar operations? Use the `FileSystem`-based classes defined within the `Xceed.Tar` namespace.