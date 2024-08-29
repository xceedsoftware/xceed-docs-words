import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AES Encryption

Xceed's implementation of AES encryption lets you incorporate industry standard strong encryption in your .NET applications.

## Encryption method

The `EncryptionMethod` enumeration provides the following values, representing the kind of encryption used:

| Value        | Description                                                                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------------------------------|
| Compatible   | The traditional ZIP encryption. This is a weak encryption method.                                                           |
| WinZipAES    | The WinZip AES encryption method. This is a strong encryption method. ***This encryption method is not available in Xceed's .NET Compact Framework products.*** |

:::tip
You can specify the implementation to be used for AES encryption. See [Using alternative AES implementations](/zip/advanced-concepts/using-alternative-aes-implementations) under _Advanced Concepts_.
:::

:::tip
The length of the password is not limited. However, to preserve compatibility with other Zip compression utilities, it is recommended that you limit passwords to no greater than 80 characters. It is also advisable to only use ASCII characters because there is no accepted standard on how to encode non-ASCII characters in passwords.
:::

## Encrypting

The following code demonstrates how to use Xceed's AES encryption. WinZipAES is used as the encryption method, and the encryption strength is set to 256 bits:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public void EncryptExample()
      {
        AbstractFile zipFile = new DiskFile( @"ZipFile.zip" );

        // If the zip file already exists
        if( zipFile.Exists )
        {
          // Delete it
          zipFile.Delete();
        }

        ZipArchive zip = new ZipArchive( zipFile );

        /* The length of the password is not limited. However, to preserve compatibility
        with other Zip compression utilities, it is recommended that you limit passwords
        to no greater than 80 characters.
        
        It is also advisable to only use ASCII characters because there is no
        accepted standard on how to encode non-ASCII characters in passwords. */
        string password = "MyPassword";

        zip.DefaultEncryptionMethod = EncryptionMethod.WinZipAes;
        zip.DefaultEncryptionStrength = 256;
        zip.DefaultEncryptionPassword = password;

        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Temp\foo" );

          // Zip the contents of the source folder
          sourceFolder.CopyFilesTo( zip, true, true );
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Sub EncryptExample()
      Dim zipFile As AbstractFile = New DiskFile("ZipFile.zip")

      ' If the zip file already exists
      If zipFile.Exists Then
        ' Delete it
        zipFile.Delete()
      End If

      Dim zip As New ZipArchive(zipFile)

'       The length of the password is not limited. However, to preserve compatibility
'      with other Zip compression utilities, it is recommended that you limit passwords
'      to no greater than 80 characters.
'      
'      It is also advisable to only use ASCII characters because there is no
'      accepted standard on how to encode non-ASCII characters in passwords. 
      Dim password As String = "MyPassword"

      zip.DefaultEncryptionMethod = EncryptionMethod.WinZipAes
      zip.DefaultEncryptionStrength = 256
      zip.DefaultEncryptionPassword = password

      Using batch As New AutoBatchUpdate(zip)
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Temp\foo")

        ' Zip the contents of the source folder
        sourceFolder.CopyFilesTo(zip, True, True)
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## Decrypting

Decryption is demonstrated in the following code. Note that it is not necessary to specify the encryption method or strength, as these are detected automatically.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public void DecryptExample()
      {
        // Setup a zip file
        AbstractFile zipFile = new DiskFile( @"ZipFile.zip" );

        // If the zip file doesn't exist
        if( !zipFile.Exists )
        {
          // Fail
          return;
        }

        // Setup a destination folder
        AbstractFolder destinationFolder = new DiskFolder( @"D:\Temp\Unzip" );

        ZipArchive zip = new ZipArchive( zipFile );

        /* The length of the password is not limited. However, to preserve compatibility
        with other Zip compression utilities, it is recommended that you limit passwords
        to no greater than 80 characters.
        
        It is also advisable to only use ASCII characters because there is no
        accepted standard on how to encode non-ASCII characters in passwords. */

        // Set up the list of password possible for the items in this archive
        this.m_passwords = new string[]
        {
          "MyPassword",
          "wrong password",
          "fkE%I-969%=6kei$[BbZ \"6Iq- =[",
          "}8{)zM#$k//O?t~=iG'Si{AF\"S~\'/8@1n",
        };

        // Use our most likely password as the default
        zip.DefaultDecryptionPassword = this.m_passwords[ 0 ];

        // Subscribe to the events that will allow us to handle invalid passwords
        ZipEvents events = new ZipEvents();
        events.ItemProgression += new ItemProgressionEventHandler( OnItemProgression );
        events.ItemException += new ItemExceptionEventHandler( OnItemException );

        // Unzip the contents of the zip archive to the destination folder
        zip.CopyFilesTo( events, zip, destinationFolder, true, true );
      }

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
            The was the 'compatible' encryption is designed doesn't provide for 100%
            accurate bad password detection, unfortunately.
              
            Note that AES encryption has no such design flaw. */
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

      private string[] m_passwords;
      private int m_passwordIndex;
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Sub DecryptExample()
      ' Setup a zip file
      Dim zipFile As AbstractFile = New DiskFile("ZipFile.zip")

      ' If the zip file doesn't exist
      If (Not zipFile.Exists) Then
        ' Fail
        Return
      End If

      ' Setup a destination folder
      Dim destinationFolder As AbstractFolder = New DiskFolder("D:\Temp\Unzip")

      Dim zip As New ZipArchive(zipFile)

'       The length of the password is not limited. However, to preserve compatibility
'      with other Zip compression utilities, it is recommended that you limit passwords
'      to no greater than 80 characters.
'      
'      It is also advisable to only use ASCII characters because there is no
'      accepted standard on how to encode non-ASCII characters in passwords. 

      ' Set up the list of password possible for the items in this archive
      Me.m_passwords = New String() { "MyPassword", "wrong password", "fkE%I-969%=6kei$[BbZ ""6Iq- =[", "}8{)zM#$k//O?t~=iG'Si{AF""S~'/8@1n" }

      ' Use our most likely password as the default
      zip.DefaultDecryptionPassword = Me.m_passwords(0)

      ' Subscribe to the events that will allow us to handle invalid passwords
      Dim events As New ZipEvents()
      AddHandler events.ItemProgression, AddressOf OnItemProgression
      AddHandler events.ItemException, AddressOf OnItemException

      ' Unzip the contents of the zip archive to the destination folder
      zip.CopyFilesTo(events, zip, destinationFolder, True, True)
    End Sub

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
'          The was the 'compatible' encryption is designed doesn't provide for 100%
'          accurate bad password detection, unfortunately.
'            
'          Note that AES encryption has no such design flaw. 
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

    Private m_passwords() As String
    Private m_passwordIndex As Integer
    ```
  </TabItem>
</Tabs>