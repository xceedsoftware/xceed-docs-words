---
title: Encrypting and decrypting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Encryption and decryption

The zip format supports a light encryption algorithm which uses a string password to encrypt its data. This type of encryption can resist attacks by amateurs if the password is well chosen and long enough (at least 16 characters), but it will probably not resist attacks by determined users or experts. Therefore, we suggest that you always use long passwords, and when possible, **do not rely solely on this encryption system to protect sensitive data.**

:::tip
The length of the password is not limited. However, to preserve compatibility with Xceed Zip Compression Library (an ActiveX component) and with many popular Zip compression utilities, it is recommended that you limit passwords to no greater than 80 characters.
:::

## Encrypting files

In order to encrypt files you are copying to a zip file, the `DefaultEncryptionPassword` property of the corresponding `ZipArchive` object must be set.   The `ZipArchive` class represents both the root folder of a zip file as well as the zip file itself.   A reference on the corresponding `ZipArchive` object can be obtained using the RootFolder property of any ZippedFile or `ZippedFolder` object. 

When files are added to the zip file, the `DefaultEncryptionPassword` property of the `ZipArchive` object is consulted and the password that is assigned to this property is used to encrypt the files. If the `DefaultEncryptionPassword` property is not set, then the files are not encrypted.

## Decrypting files

In order to decrypt files you are extracting from a zip file, the `DefaultDecryptionPassword` property of the corresponding ZipArchive object must be set. The ZipArchive class represents both the root of a zip file as well as the zip file itself. A reference on the corresponding ZipArchive object can be obtained by using the RootFolder property of any ZippedFile or ZippedFolder object. 

When extracting encrypted files, the `DefaultDecryptionPassword` property of the ZipArchive object is consulted and the password that is assigned to this property is used to decrypt the files. In the case where you are trying to extract an encrypted file without setting the `DefaultDecryptionPassword` of the ZipArchive object or with an invalid password, an exception will be thrown. 

## Accessing the contents of an encrypted ZippedFile object

In order to access the contents of an encrypted ZippedFile object, an overload of the `OpenWrite` or `OpenRead` methods that takes a password as a parameter must be used.

Open an instance of a ZippedFile object for reading:

```csharp
      using Xceed.FileSystem;
      using Xceed.Zip;
      using Xceed.Compression;
      using System.IO;

      ZippedFile file = new ZippedFile( new DiskFile( @"c:\test.zip" ), @"file.txt" ); 

      Stream s = file.OpenRead( FileShare.Read, "password" );

      // You can also use the default encryption password specified in the
      // DefaultDecryptionPassword property of the corresponding ZipArchive object: 

      ZippedFile file = new ZippedFile( new DiskFile( @"c:\test.zip" ), @"file.txt" );
      ZipArchive archive = ( ZipArchive )file.RootFolder; 

      Stream s = file.OpenRead( FileShare.Read, archive.DefaultDecryptionPassword ); 

      //Open an instance of a ZippedFile object for writing: 

      ZippedFile file = new ZippedFile( new DiskFile( @"c:\test.zip" ), @"file.txt" ); 

      Stream s = file.OpenWrite( FileShare.Write, CompressionMethod.Deflated,
                                CompressionLevel.Normal, "password" ); 

      // You can also use the default compression method and level as well
      // as the default encryption password of the corresponding ZipArchive object: 

      ZippedFile file = new ZippedFile( new DiskFile( @"c:\test.zip" ), @"file.txt" );
      ZipArchive archive = ( ZipArchive )file.RootFolder; 

      archive.DefaultEncryptionPassword = "password"; 

      Stream s = file.OpenWrite( FileShare.Write, archive.DefaultCompressionMethod,
                                archive.DefaultCompressionLevel, archive.DefaultEncryptionPassword );
    ```

