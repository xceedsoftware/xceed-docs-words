---
title: Zipping (QuickZip)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding files to a zip file (zipping)

This topic will demonstrates how to add files to a zip file using the static `Zip` method of the `QuickZip` class.

## Zip method

The Zip method has various overloads that can be used to zip files. Some only require that you specify the zip file and the files you want to add to the zip file while others let you decide on a number of other factors among which are the possibility to encrypt the files that are added to the zip file, create self-extracting zip files and create spanned or split zip files.

## Demonstration

In the following example, we will create a regular zip file:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using Xceed.Zip;
      QuickZip.Zip( @"d:\test.zip", true, true, false, @"d:\file.txt" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
        Imports Xceed.Zip
        QuickZip.Zip( "d:\test.zip", True, True, False, "d:\file.txt" )
    ```
  </TabItem>
</Tabs>

In the next example, we will create a spanned, self-extracting zip file:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using Xceed.Zip;
        using Xceed.Zip.Sfx;
        using Xceed.FileSystem;

        // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

        XceedSfxPrefix sfx = new XceedSfxPrefix( new DiskFile( @"C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin" ) );

        sfx.DialogStrings[ DialogStrings.Title ] = "Welcome to Xceed Zip for .NET!";
        sfx.DefaultDestinationFolder = @"C:\";sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly;

        QuickZip.Zip( @"a:\sfx.exe", string.Empty, true, true, false,
                      sfx, new QuickZip.DiskRequiredCallback( this.QuickDiskRequired ),
                      null, @"d:\file.txt" );

        // This method will handle the DiskRequired events that are raised when creating
        // spanned or split zip files.
        private bool QuickDiskRequired( string zipFile, int diskNumber, object userData )
        {
          if( MessageBox.Show( "Disk #" + diskNumber.ToString() + " is required.",
                                "Disk Required", MessageBoxButtons.OKCancel ) == DialogResult.OK )
              return true;
          else
              return false;    
        }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
        Imports Xceed.Zip
        Imports Xceed.Zip.Sfx
        Imports Xceed.FileSystem

        ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

        Dim sfx As New XceedSfxPrefix(New DiskFile("C:\Program Files\Xceed Components\Bin\Sfx\xcdsfx32.bin"))

        sfx.DialogStrings(DialogStrings.Title) = "Welcome to Xceed Zip for .NET!"
        sfx.DefaultDestinationFolder = "C:\"sfx.ExistingFileBehavior = ExistingFileBehavior.OverwriteOlderOnly

        QuickZip.Zip("a:\sfx.exe", String.Empty, True, True, False, sfx, _
                    New QuickZip.DiskRequiredCallback(AddressOf Me.QuickDiskRequired), _
                    Nothing, "d:\file.txt")

        ' This method will handle the DiskRequired events that are raised when creating
        ' spanned or split zip files.

        Private Function QuickDiskRequired(ByVal zipFile As String, _
                                          ByVal diskNumber As Integer, _
                                          ByVal userData As Object) As Boolean

          If (MessageBox.Show("Disk #" + diskNumber.ToString() + " is required.", _
                              "Disk Required", MessageBoxButtons.OKCancel) = DialogResult.OK) Then
              Return True
          Else
              Return False
          End If
        End Function
    ```
  </TabItem>
</Tabs>

## Remarks

When recursively adding files to a zip file, you have to consider every filename you place in the filesToZip parameter as a filemask. For example, if you set the filesToZip parameter to "c:\file.txt", the **entire** "c:\" drive will be scanned and all the files that are named "file.txt" that are found will be included in the zip file. 

Note that the *filesToZip* parameter of the Zip method cannot be null otherwise an `ArgumentNullException` exception will be thrown.

## Things you should consider

The main questions you should ask yourself when copying items to a zip file are:

- Do you want to do more complex zip file operations? Use the other classes defined within the `Xceed.Zip namespace`.

**All zip files will automatically be created in the [Zip64 zip file format](/zip/basic-concepts/zip64-zip-file-format) if the limitations of the regular Zip format are reached.**
