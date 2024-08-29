---
title: Listing the contents of a zip file (QuickZip)
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listing the contents of a zip file

This topic demonstrates how to list the contents of a zip file using the static `GetZipContents` method of the `QuickZip` class.

## Basic steps

To list the contents of a zip file, the following steps must be performed:

- Declare an array of `QuickZipItem` objects that will contain the result of the call to the `GetZipContents` method. 

- Iterate through the array of `QuickZipItem` objects to retrieve information on each `QuickZipItem` object it contains.

## Demonstration

This example demonstrates how to list the contents of a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip

      QuickZipItem[] items = QuickZip.GetZipContents( @"c:\test.zip", "*" );

      foreach( QuickZipItem item in items)
      {
        Console.WriteLine( item.Name );
      } 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip

      Dim items As QuickZipItem()
      Dim item As QuickZipItem

      items = QuickZip.GetZipContents( "c:\test.zip", "*" )
      For Each item In items
        Console.WriteLine( item.Name )
      Next
    ```
  </TabItem>
</Tabs>