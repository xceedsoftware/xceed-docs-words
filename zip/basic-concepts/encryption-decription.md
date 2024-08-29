# Encryption and Decryption

## Xceed .NET Libraries Documentation

### Encryption and Decryption

The zip format supports a light encryption algorithm that uses a string password to encrypt its data. This type of encryption can resist attacks by amateurs if the password is well chosen and long enough (at least 16 characters). However, it may not resist attacks by determined users or experts. Therefore, it is recommended to use long passwords and **not to rely solely on this encryption system to protect sensitive data**.

:::tip
The length of the password is not limited, but for compatibility with **Xceed Zip Compression Library** (an ActiveX component) and many popular Zip compression utilities, it is recommended that passwords be no longer than 80 characters.
:::

### Encrypting Files

To encrypt files you are copying to a zip file, set the `DefaultEncryptionPassword` property of the corresponding `ZipArchive` object. The `ZipArchive` class represents both the root folder of a zip file and the zip file itself. You can obtain a reference to the `ZipArchive` object using the `RootFolder` property of any `ZippedFile` or `ZippedFolder` object.

When files are added to the zip file, the `DefaultEncryptionPassword` property is used to encrypt the files. If this property is not set, the files are not encrypted.

### Decrypting Files

To decrypt files you are extracting from a zip file, set the `DefaultDecryptionPassword` property of the corresponding `ZipArchive` object. The `ZipArchive` class represents both the root folder and the zip file. A reference to the `ZipArchive` object can be obtained using the `RootFolder` property of any `ZippedFile` or `ZippedFolder` object.

When extracting encrypted files, the `DefaultDecryptionPassword` is used to decrypt them. If the password is not set or is incorrect, an exception will be thrown. For more information on handling exceptions, see the `Handling exceptions` topic.

### Accessing the Contents of an Encrypted ZippedFile Object

To access the contents of an encrypted `ZippedFile` object, use an overload of the `OpenWrite` or `OpenRead` methods that takes a password as a parameter.

#### Example: Opening a ZippedFile Object for Reading (C#)

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
