# Getting Started

Xceed's FileSystem Core based products let you perform a variety of operations on files, folders, and zip files, in addition to compressing and decompressing streams and byte arrays, and handling FTP operations.

The FTP capabilities are represented by the `Xceed.Ftp.dll` assembly, which defines the [Xceed.Ftp](/ftp/basic-concepts/ftp-capabilities/overview) namespace.

## Xceed.FileSystem namespace

The [Xceed.FileSystem](/ftp/basic-concepts/xceed-filesystem-core/overview) namespace defines classes that provide generic methods for handling abstract files and folders as well as methods to handle files and folders located on disk, in memory, and in isolated storage. For example, if you wanted to copy a disk file from one folder to another, the classes defined within the Xceed.FileSystem namespace would allow you to do it.

Here are some quick examples to get you started:

- [Copying items to a folder](/ftp/basic-concepts/xceed-filesystem-core/copy-items-folder)
- [Listing the contents of a folder](/ftp/basic-concepts/xceed-filesystem-core/listing-content-folder)
- [Removing items from a folder](/ftp/basic-concepts/xceed-filesystem-core/remove-item-folder)

## Xceed.Ftp namespace

The [Xceed.Ftp](/ftp/basic-concepts/ftp-capabilities/overview) namespace defines classes that provide methods for performing FTP operations. As with Xceed's Zip capabilities, classes derived from the Xceed.FileSystem namespace are provided, making FTP operations on files and folders as easy as if they were local.

Here are some examples to get you started:

- [How to copy items from an FTP server (download)](/ftp/basic-concepts/ftp-capabilities/ftp-using-filesystem-interface/copy-item-from-ftp)
- [How to copy items from an FTP server to another](/ftp/code-snippets/working-with-classes-from-filesystem/file03)
- [How to copy items from an FTP server to a zip file on another FTP server](/ftp/code-snippets/working-with-classes-from-filesystem/file04)
- [How to copy items from an FTP server to memory (download)](/ftp/code-snippets/working-with-classes-from-filesystem/file05)
- [How to copy items to and from a local folder](/ftp/code-snippets/working-with-classes-from-filesystem/file06)
- [How to copy items to an FTP server](/ftp/basic-concepts/ftp-capabilities/ftp-using-filesystem-interface/copy-item-to-ftp)
- [How to copy memory data to a file on an FTP server](/ftp/code-snippets/working-with-classes-from-filesystem/file08)
- [How to perform Secure FTP transfers](/ftp/basic-concepts/ftp-capabilities/secure-ftp) (not available in Xceed's .NET Compact Framework products)
- [How to display the content of a file on an FTP server](/ftp/basic-concepts/ftp-capabilities/ftp-using-filesystem-interface/display-content-of-file)
- [How to list all items on an FTP server](/ftp/basic-concepts/ftp-capabilities/ftp-using-filesystem-interface/list-all-item-on-ftp)
- [How to list specific files on an FTP server](/ftp/code-snippets/working-with-classes-from-filesystem/file11)
- [How to list the contents of a local folder](/ftp/code-snippets/working-with-classes-from-filesystem/file12)
- [How to manually parse listing lines](/ftp/code-snippets/working-with-classes-from-filesystem/file13)
- [How to remove items from a local folder](/ftp/code-snippets/working-with-classes-from-filesystem/file14)

An `FtpClient` class is also provided, which gives quick and easy access to FTP functionalities in the same style as the ActiveX version of the Xceed FTP Library. See the following topics to get started:

- [WinForms applications and threading](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/winform-apps-threading)
- [FTP client properties](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/ftp-client-properties)
- [FTP client methods](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/ftp-client-methods)
- [FTP client events](/ftp/basic-concepts/ftp-capabilities/ftp-client-interface/ftp-client-events)

Here are some quick examples to get you started using **QuickFtp**:

- [Receiving files](/ftp/code-snippets/working-with-quickftp-class/file01)
- [Sending files](/ftp/code-snippets/working-with-quickftp-class/file02)
- [Listing contents](/ftp/code-snippets/working-with-quickftp-class/file03)
- [Deleting files](/ftp/code-snippets/working-with-quickftp-class/file04)

