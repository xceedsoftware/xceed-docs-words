---
title: Removing items from a zip file (QuickZip)
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Removing items from a zip file

This topic demonstrates how to remove file(s) from within a zip file using the static Remove method of the `QuickZip` class.

## Remove method

The Remove method can be used to remove one or more files and folders from within a zip file either recursively or not.

## Demonstration

The following example demonstrates how to remove all files that begin with "xceed" from a zip file that contains various files.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;

      QuickZip.Remove( @"d:\test\files.zip", true, "xceed*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip

      QuickZip.Remove( "d:\test\files.zip", true, "xceed*" )
    ```
  </TabItem>
</Tabs>

## Remarks

Note that the filesToRemove parameter of the Remove method cannot be null otherwise an ArgumentNullException exception will be thrown.

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to do more complex zip file operations? Use the other classes defined within the `Xceed.Zip namespace`.