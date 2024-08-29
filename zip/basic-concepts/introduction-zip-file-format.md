# Introduction to the Zip File Format

## Xceed .NET Libraries Documentation

### Introduction to the Zip File Format

A zip file is a single file that contains one or more compressed files. Zip files usually have the ".ZIP" filename extension, which helps to clearly identify them.

Each file in a zip file is stored either as compressed data or as raw uncompressed data and can be encrypted or not.

The Zip file format supports multiple compression methods. Long ago, the Zip file format was often updated to support newer compression methods. This phenomenon ended when the Deflate method was introduced with the release of PKZip 2. Deflate was fast and had decent compression. It became the de-facto compression method for the Zip file format.

Today, Deflate remains the only compression method you can count on to be compatible with Zip applications everywhere. Even the release of Deflate64 by PKWare did not affect Deflate's popularity. Deflate64 offers better compression than Deflate but remains incompatible with most Zip applications.

The zip file format is also extensible. New types of information about a file can be stored in it while still remaining compatible with existing compression utilities.

Structurally, a zip file consists of one or more sections, each containing a file header followed by a file's compressed or raw, uncompressed data. The file headers contain information such as the file's name, attributes, and size. Following these sections is a compact "central directory" section, which contains (mostly redundant) information about each file stored in the zip file. This central directory is very useful for quickly determining the contents of the zip file, as it eliminates the need to scan through the entire zip file to find the file headers. At the very end of the zip file, an optional "zip comment" section can be provided and can be as large as 64K.

For more information regarding the zip file format, please refer to the [Zip File Format](http://www.info-zip.org/doc/MANUAL) document provided by the Info-Zip group.
  