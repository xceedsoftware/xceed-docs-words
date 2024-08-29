# Getting Started

## Xceed .NET Libraries Documentation

### Getting Started

Xceed's FileSystem Core-based products allow you to perform various operations on files, folders, and zip files. These operations include compressing and decompressing streams and byte arrays, as well as handling FTP operations.

The Zip capabilities of Xceed's FileSystem-based products are represented by three assemblies:

- `Xceed.Zip.dll` defines the `Xceed.Zip` namespace.
- `Xceed.FileSystem.dll` defines the `Xceed.FileSystem` namespace.
- `Xceed.Compression.dll` defines the `Xceed.Compression` namespace.

Additional capabilities include:

- Tar and GZip functionalities, defined by the `Xceed.Tar.dll` and `Xceed.GZip.dll` assemblies.
- FTP capabilities, defined by the `Xceed.Ftp.dll` assembly and the `Xceed.Ftp` namespace.

:::warning
The .NET Compact Framework versions do not support Tar, GZip, or Secure FTP.
:::

### Xceed.Zip Namespace

The `Xceed.Zip` namespace provides methods for performing various zip file operations. These classes integrate with the `Xceed.FileSystem` namespace, allowing you to work with zip files as if they were regular folders.

If you prefer quick operations without learning the `Xceed.FileSystem` concepts, the `QuickZip` class offers static methods for one-line zip file operations.

Some examples:

- [Copying disk items to a zip file](zipping/copy-items-zip-file) (**zipping**)
- [Creating a zip file in memory](zipping/create-zip-in-memory)
- [Creating spanned zip files](zipping/create-spanned-zip-files)
- [Creating split zip files](zipping/create-split-zip-files)
- [Zipping items in memory](zipping/zipping-items-located-memory)
- [Extracting items from a zip file](unzipping/exctracting-items-from-zip-file) (**unzipping**)
- [Extracting items to memory](unzipping/unzipping-to-memory)
- [Extracting items from a generic stream](unzipping/unzipping-items-from-zip-file)
- [Listing the contents of a zip file](listing-content-zip-file)
- [Removing items from a zip file](removing-items-from-zip-file)
- [Encryption and decryption](encryption-decription)

### Xceed.Tar and Xceed.GZip Namespaces

The `Xceed.Tar` and `Xceed.GZip` namespaces handle tar and gzip archives.

Some examples:

- [Copying an item to a gzip archive](tar-gzip-capabilities/gzip/copy-item-to-gzip)
- [Listing the contents of a tar archive](tar-gzip-capabilities/tar/listing-content-tarfile)

:::tip
Tar and GZip assemblies are not available in the .NET Compact Framework versions.
:::