import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a gzipped file with QuickGZip

This topic demonstrates how to list the contents of a gzipped file using the static `GetGZipContents` method of the `QuickGZip` class.

:::note
QuickGZip is not currently available in Xceed's Compact Framework products.
:::

## GetGZipContents method

There is only one version of the `GetGZipContents` method. The method returns a `QuickGZipItem` object, which you can process as you wish.

## Basic steps

To list the contents of a gzipped file, the following steps must be performed:

- Declare a `QuickGZipItem` object that will contain the result of the call to the `GetGZipContents` method. 

- Process the returned `QuickGZipItem` object.

## Demonstration

In the following example, we specify the gzipped file whose contents will be listed.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.GZip;
      QuickGZipItem item = QuickGZip.GetGZipContents(@"d:\test.gz"); 

      Console.WriteLine("The item's full name is {0}", item.FullName);
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.GZip

      Dim item As QuickGZipItem = QuickGZip.GetGZipContents("d:\test.gz") 

      Console.WriteLine("The item's full name is {0}", item.FullName)
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when listing the contents of a gzipped file are:

- Do you want to do more complex GZip operations? Use the `FileSystem`-based classes defined within the `Xceed.GZip` namespace.