---
title: Unzipping (QuickZip)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting files from a zip file (unzipping)

This topic demonstrates how to unzip files using the static Unzip method of the QuickZip class. 

When unzipping the contents of a spanned zip file, the **last** disk must be in the drive before the operation begins.

## Unzip method

The Unzip method has various overloads that can be used to unzip files. Some only require that you specify the zip file and the files you want to extract while others let you decide on a number of other factors among which are the possibility to decrypt encrypted files and unzip files from split or spanned zip files.

## Demonstration

In the following example, we will unzip the contents of a regular zip file:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.Zip.Sfx;

      QuickZip.Unzip( @"d:\test.zip", @"d:\", true, true, false, "*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.Sfx

      QuickZip.Unzip( "d:\test.zip", "d:\", True, True, False, "*" )
    ```
  </TabItem>
</Tabs>

In the next example, we will extract the contents of a spanned, self-extracting zip file:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      using Xceed.Zip.Sfx;
      
      QuickZip.Unzip( @"a:\sfx.exe", @"d:\", string.Empty, true, true, false, new QuickZip.DiskRequiredCallback( this.QuickDiskRequired ) ,null, "*" );
      
      // This method will handle the DiskRequired events that are raised when creating
      // spanned or split zip files.
      private bool QuickDiskRequired( string zipFile, int diskNumber, object userData )
      {
        if( MessageBox.Show( "Disk #" + diskNumber.ToString() + " is required.", "Disk Required", MessageBoxButtons.OKCancel ) == DialogResult.OK )
            return true;
        else
            return false;    
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Zip
      Imports Xceed.Sfx

      QuickZip.Unzip( "a:\sfx.exe", "d:\", string.Empty, true, true, false, New QuickZip.DiskRequiredCallback(AddressOf Me.QuickDiskRequired) ,Nothing, "*" )

      ' This method will handle the DiskRequired events that are raised when creating
      ' spanned or split zip files.
      Private Function QuickDiskRequired(ByVal zipFile As String, ByVal diskNumber As Integer, ByVal userData As Object) As Boolean
        If (MessageBox.Show("Disk #" + diskNumber.ToString() + " is required.", "Disk Required", MessageBoxButtons.OKCancel) = DialogResult.OK) Then
          Return True
        Else
          Return False
        End If
      End Function
    ```
  </TabItem>
</Tabs>

## Handling paths

When extracting files from within a zip file, the directory structure can be restored fully or partrially or it can be omitted altogether. 

If the preservePaths parameter of the Unzip method is set to **false**, the files specified in the filesToUnzip parameter will be restored directly into the root of the destination folder without recreating the directory structure. 

For example, if you have a zip file containing files in the "folder1" subfolder and files in the "folder1\folder2" subfolder, the following code will unzip all files right into "c:\temp", without creating any subfolders:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Zip.QuickZip.Unzip( @"c:\test.zip", @"c:\temp", true, true, false, @"folder1\*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Xceed.Zip.QuickZip.Unzip( "c:\test.zip", "c:\temp", True, True, False, "folder1\*" )
    ```
  </TabItem>
</Tabs>

If the preservePaths parameter is set to **true**, the part of the path that is explicitly included in the filesToUnzip parameter will not be restored into the destination folder. 

For example, for the same zip file as above, the following code will create the folder "folder2" into the "c:\temp" destination folder. Files that were in the "folder1" subfolder in the zip will be unzipped directly into the root of "c:\temp", and files that were in "folder1\folder2" will be unzipped into "c:\temp\folder2":

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Zip.QuickZip.Unzip( @"c:\test.zip", @"c:\temp", true, true, true, @"folder1\*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Xceed.Zip.QuickZip.Unzip( "c:\test.zip", "c:\temp", True, True, True, "folder1\*" )
    ```
  </TabItem>
</Tabs>

The following example will unzip files into "c:\temp\folder1" and "c:\temp\folder1\folder2":

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Zip.QuickZip.Unzip( @"c:\test.zip", @"c:\temp", true, true, true, @"*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Xceed.Zip.QuickZip.Unzip( "c:\test.zip", "c:\temp", True, True, True, "*" )
    ```
  </TabItem>
</Tabs>

## Remarks

Note that the filesToUntar parameter of the Untar method cannot be null; otherwise, an ArgumentNullException exception will be thrown.

## Things you should consider

The main questions you should ask yourself when extracting files from a Tar archive are:

- Do you want to do more complex Tar archive operations? Use the FileSystem-based classes defined within the `Xceed.Tar`.