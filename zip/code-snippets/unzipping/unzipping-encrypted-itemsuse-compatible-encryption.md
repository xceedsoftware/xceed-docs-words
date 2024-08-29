import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Unzipping encrypted items that use 'compatible' encryption

When decrypting data using `Compatible` encryption, the password verification isn't 100% accurate.

It is possible that an invalid password will not be detected. In that case, decryption will process but the decrypted data will be garbage. This is an unfortunate design flaw of the encryption algorithm.

This behavior only applies to items encrypted with the `Compatible` encryption method.

In the context of unzipping, this will always result in a decompression failure or a checksum failure so no incorrect data will ever be delivered. However, special care needs to be taken when handling exceptions.

This example shows how this situation can be handled. It examines the exceptions thrown by decompression as well as what kind of items being processed to distinguish between an actual data error and a probable invalid password.

If all the encrypted items in an archive use the same password, this example is not absolutely necessary as any error can be treated in the same way. For example, many third party Zip tools will say something like: "Data error in item 'X'. Wrong password?".

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using System;

      using Xceed.FileSystem;
      using Xceed.Zip;

      namespace DocumentationExamples.Zip
      {
        class CompatibleEncryption
        {
          private void OnItemProgression( object sender, ItemProgressionEventArgs e )
          {
            /* We're about to process a new item */

            // Reset the password index
            this.m_passwordIndex = 0;
          }

          private void OnItemException( object sender, ItemExceptionEventArgs e )
          {
            bool badPassword = false;

            // Get the archive object we passed through the user data
            ZipArchive zip = ( ZipArchive ) e.UserData;

            /* We will try to ascertain if we have an invalid password */

            InvalidDecryptionPasswordException invalidDecryptionPasswordException;
            FileSystemIOException fileSystemIOException;

            invalidDecryptionPasswordException = e.Exception as InvalidDecryptionPasswordException;
            fileSystemIOException = e.Exception as FileSystemIOException;

            // If the exception says that a bad password was supplied
            if( invalidDecryptionPasswordException != null )
            {
              badPassword = true;
            }
            // If we had an I/O error during decryption
            else if( fileSystemIOException != null )
            {
              ZippedFile zippedFile = e.CurrentItem as ZippedFile;

              // If we were reading from a zipped file encrypted in the 'compatible' method
              if( zippedFile != null && zippedFile.Encrypted && 
                  zippedFile.EncryptionMethod.Equals( EncryptionMethod.Compatible ) )
              {
                /* It's possible the I/O error occurred because the password is invalid.
                The way the 'compatible' encryption is designed doesn't provide for 100%
                accurate bad password detection, unfortunately. */
                badPassword = true;
              }
            }

            // If we had a bad password
            if( badPassword )
            {
              // If we haven't gone through our password list
              if( this.m_passwordIndex < this.m_passwords.Length )
              {
                // Set the current password and move the index to the next password
                zip.DefaultDecryptionPassword = this.m_passwords[ this.m_passwordIndex++ ];

                // Retry unzipping the file
                e.Action = ItemExceptionAction.Retry;
              }
              else
              {
                // Skip the file
                e.Action = ItemExceptionAction.Ignore;
              }
            }
          }

          public void Example()
          {
            AbstractFile zipFile = new DiskFile( @"ZipFileWithEncryptedItems.zip" );
            AbstractFolder destinationFolder = new DiskFolder( @"Output" );

            ZipArchive zip = new ZipArchive( zipFile );

            // Set up the list of password possible for the items in this archive
            this.m_passwords = new string[]
            {
              "wrong password",
              "fkE%I-969%=6kei$[BbZ \"6Iq- =[",
              "}8{)zM#$k//O?t~=iG'Si{AF\"S~\'/8@1n",
            };

            ZipEvents events = new ZipEvents();

            // Subscribe to the events that will allow us to handle invalid passwords
            events.ItemProgression += new ItemProgressionEventHandler( OnItemProgression );
            events.ItemException += new ItemExceptionEventHandler( OnItemException );

            // Unzip the contents of the archive using the events object we set up
            zip.CopyFilesTo( events, zip, destinationFolder, true, true );
          }

          private string[] m_passwords;
          private int m_passwordIndex;
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Microsoft.VisualBasic
      Imports System

      Imports Xceed.FileSystem
      Imports Xceed.Zip

      Namespace DocumentationExamples.Zip
        Friend Class CompatibleEncryption
          Private Sub OnItemProgression(ByVal sender As Object, ByVal e As ItemProgressionEventArgs)
            ' We're about to process a new item 

            ' Reset the password index
            Me.m_passwordIndex = 0
          End Sub

          Private Sub OnItemException(ByVal sender As Object, ByVal e As ItemExceptionEventArgs)
            Dim badPassword As Boolean = False

            ' Get the archive object we passed through the user data
            Dim zip As ZipArchive = CType(e.UserData, ZipArchive)

            ' We will try to ascertain if we have an invalid password 

            Dim invalidDecryptionPasswordException As InvalidDecryptionPasswordException
            Dim fileSystemIOException As FileSystemIOException

            invalidDecryptionPasswordException = TryCast(e.Exception, InvalidDecryptionPasswordException)
            fileSystemIOException = TryCast(e.Exception, FileSystemIOException)

            ' If the exception says that a bad password was supplied
            If invalidDecryptionPasswordException IsNot Nothing Then
              badPassword = True
            ' If we had an I/O error during decryption
            ElseIf fileSystemIOException IsNot Nothing Then
              Dim zippedFile As ZippedFile = TryCast(e.CurrentItem, ZippedFile)

              ' If we were reading from a zipped file encrypted in the 'compatible' method
              If zippedFile IsNot Nothing AndAlso zippedFile.Encrypted AndAlso zippedFile.EncryptionMethod.Equals(EncryptionMethod.Compatible) Then
      '           It's possible the I/O error occurred because the password is invalid.
      '           The way the 'compatible' encryption is designed doesn't provide for 100%
      '           accurate bad password detection, unfortunately. 
                badPassword = True
              End If
            End If

            ' If we had a bad password
            If badPassword Then
              ' If we haven't gone through our password list
              If Me.m_passwordIndex < Me.m_passwords.Length Then
                ' Set the current password and move the index to the next password
                zip.DefaultDecryptionPassword = Me.m_passwords(Me.m_passwordIndex)
                Me.m_passwordIndex += 1

                ' Retry unzipping the file
                e.Action = ItemExceptionAction.Retry
              Else
                ' Skip the file
                e.Action = ItemExceptionAction.Ignore
              End If
            End If
          End Sub

          Public Sub Example()
            Dim zipFile As AbstractFile = New DiskFile("ZipFileWithEncryptedItems.zip")
            Dim destinationFolder As AbstractFolder = New DiskFolder("Output")

            Dim zip As New ZipArchive(zipFile)

            ' Set up the list of password possible for the items in this archive
            Me.m_passwords = New String() { "wrong password", "fkE%I-969%=6kei$[BbZ ""6Iq- =[", "}8{)zM#$k//O?t~=iG'Si{AF""S~'/8@1n" }

            Dim events As New ZipEvents()

            ' Subscribe to the events that will allow us to handle invalid passwords
            AddHandler events.ItemProgression, AddressOf OnItemProgression
            AddHandler events.ItemException, AddressOf OnItemException

            ' Unzip the contents of the archive using the events object we set up
            zip.CopyFilesTo(events, zip, destinationFolder, True, True)
          End Sub

          Private m_passwords() As String
          Private m_passwordIndex As Integer
        End Class
      End Namespace
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