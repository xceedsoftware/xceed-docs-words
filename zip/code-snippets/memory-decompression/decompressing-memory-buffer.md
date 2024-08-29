---
title: Decompressing a memory buffer (QuickCompression)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Decompressing a byte array

This topic demonstrates how to decompress a compressed byte array using the static `Decompress` method if the `QuickCompression` class.

## Basic steps

To decompress a compressed byte array, the following steps must be taken:

- Retrieve a byte array containing the compressed data. For the purposes of this example, our compressed data is the data compressed using the `Compress` example. 

- `Decompress` the data. The resulting compressed data will be returned as a byte array.

## Demonstration

The following example demonstrates how to decompress an array of bytes using the static Decompress method of the QuickCompression class.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Compression;
      // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework. 

      byte[] decompressedData = QuickCompression.Decompress( compressedData ); 

      // Display the decompressed data
      MessageBox.Show( System.Text.Encoding.Default.GetString( decompressedData ) );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
    Imports Xceed.Compression

    ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

    Dim decompressedData() As Byte = QuickCompression.Decompress(compressedData) 

    ' Display the decompressed data
    MessageBox.Show(System.Text.Encoding.Default.GetString(decompressedData))
    ```
  </TabItem>
</Tabs>

## Things you should consider

The main questions you should ask yourself when compressing data read from a stream are:

- Do you want to decompress data as it is read from a stream? Use the `Read` method of the `CompressedStream` class. 

- Do you need to convert the resulting decompressed byte array to a string? Use the `GetString` method of the .NET Framework's `System.Text.Encoding` class.