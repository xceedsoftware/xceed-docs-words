---
title: Compressing a memory buffer (QuickCompression)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Compressing a byte array

This topic demonstrates how to compress a byte array using the static `Compress` method of the `QuickCompression` class.

## Basic steps

To compress a byte array, the following steps must be taken:

1- Retrieve a byte array containing the data to compress. For the purposes of this example, we will convert the string to compress to a byte array using the GetBytes method. 

2- Compress the data. The resulting compressed data will be returned as a byte array.

## Demonstration

The following example demonstrates how to compress an array of bytes using the static Compress method of the QuickCompression class.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Compression;
 
      byte[] data = System.Text.Encoding.Default.GetBytes( "This is the data to compress compress compress" );
      byte[] compressedData = QuickCompression.Compress( data );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Compression

    Dim data() As Byte = System.Text.Encoding.Default.GetBytes("This is the data to compress compress compress")

    Dim compressedData() As Byte = QuickCompression.Compress(data)
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to compress data as it is written to a stream? Use the `Write` method of the `CompressedStream` class. 

- Do you want to compress a string? Convert it to a byte array before passing it to the Compress method using the GetBytes method of the .NET Framework's System.Text.Encoding class. 

- Do you need to convert the resulting compressed byte array to a string? Use the GetString method of the .NET Framework's System.Text.Encoding class.