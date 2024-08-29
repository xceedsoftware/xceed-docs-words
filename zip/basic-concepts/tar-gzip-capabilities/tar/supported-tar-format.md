# Supported tar formats

For various historical reasons, there are several Tar formats. All Tar formats use one 512-byte file header for each file contained in the archive to describe the content of that file. Each header is then followed by the content of the file it represents, in blocks of 512 bytes. The end of the archive is marked by at least two zero-filled 512-byte blocks. The main differences between the formats lie in how information is represented in the headers and in a few limitations of particular formats. 

Xceed’s Tar implementation is fully compatible (reading and creating) with the “USTAR” (“Unix Standard TAR”) archive format. The implementation is capable of reading but not writing files with a “GNU Tar” format, as long as archive entries do not use the header extensions of this format. If unsupported header extensions are encountered when reading a Tar archive, an exception will be thrown. 

Xceed’s Tar implementation does not allow item types other than file or folder to be created. Types other than file and folder can however be read from existing Tar archives and rewritten.

## USTAR’s limitations

The USTAR format has a few limitations, two of which should be emphasized. It should be noted that these are limitations of the USTAR format and not of Xceed’s Tar implementation. 

First, the underlying representation (i.e., in the Tar format itself) of the name of an item in a Tar archive is made up of two fields, namely, Name and Prefix (which corresponds roughly to the pathname). These fields are combined and exposed through the FullName property. The combined length of the file and path names cannot exceed 256 characters, but there are additional restrictions. 

The underlying Name field is limited to 100 characters, so the actual name of a file (without pathname) is limited to 100 characters. The underlying Prefix field is limited to 155 characters. If however the entire Name field has not been used by the name of the item, it is possible that part of the pathname will be stored in the Name field, but the break must occur on a file system separator. In other words, if the Prefix field has been used, the FullName will be built as follows: Prefix (155 characters maximum) + "\" + Name (100 characters maximum), for a total of 256 characters. If you attempt to add an item to a Tar archive that does not respect the restrictions described here, an exception will be thrown. 

The second limitation is that the maximum size of file that can be archived is 8 GB. This does not mean that the maximum size of a Tar archive is 8 GB: a Tar archive can contain as many 8-gigabyte items as is allowed by the file system of the operating system.

## IgnoreEndingHeaders property

A normal Tar archive will be terminated by 2 empty headers. Xceed's implementation of Tar will by default stop reading the archive when these 2 headers have been reached (as do most other implementatoins of Tar). However, if for some reason there is data following the empty headers, you can set the IgnoreEndingHeaders property to true to continue reading past these headers and read until the end of file. 

:::note
Tar is not currently available in Xceed's .NET Compact Framework products.
:::