# Zip64 zip file format

The Zip64 zip file format is the 64-bit counterpart of the zip file format that is used by PKZIP 4.5 and up. It supports up to 2^64 - 1 files within a zip archive, as well as files that have a size greater than 4GB for a zip file size that can reach up to about 18 million terabytes (more precisely, 2^64 - 1 bytes).

Split or spanned zip files can have a maximum of 2^32 - 1 parts.

## Extra and ending headers

The Zip64 extra headers are found in both the local and central headers of a zip file. They can hold the compressed size, the uncompressed size, the local header offset, or the disk number of the zip file.

The Zip64 ending header, as well as the Zip64 ending header locator, are found between the central directory (the central headers) and the normal ending header. They can hold the disk numbers, central header offset, and size of the zip file, and the number of files in it in the case where these values are higher than the respective capacities of the normal ending header fields.

**All zip files will automatically be created in the Zip64 zip file format if the limitations of the regular Zip format are reached.**

:::note
 Although Xceed Zip for .NET supports the Zip64 zip file format, it limits the size of each zipped file and the total zip file to 2^63 - 1, since a Stream's `Offset` property is a signed long integer. Also, because each zipped file takes at least 76 bytes (local and central headers), the maximum number of files within the zip file is around 2^56 files.
:::
