# Tar and GZip capabilities

Although [Tar](/zip/basic-concepts/tar-gzip-capabilities/tar/overview) and [GZip](/zip/basic-concepts/tar-gzip-capabilities/gzip/overview) are more commonly used on Unix or Linux platforms, incorporating Xceed’s implementations of these file formats into your applications will ensure maximum compatibility with file types. 

Tar and GZip are usually used together. Tar is an archiver: it gathers a collection of files or folders into a single file, while preserving file system information (such as permissions, dates and the directory structure); however, it does not compress the files in any way. The GZip format on the other hand is typically used to compress single files (although it is possible for a GZip archive to contain multiple files; see [Multi-file operations](/zip/basic-concepts/tar-gzip-capabilities/gzip/performing-multifile-gzip) for details). 

Using these two formats together—using Tar to create an archive and then compressing it with GZip—can potentially attain greater compression ratios than using a compressing archiver such as ZIP. The ZIP format compresses the individual files and then archives them into a single .zip file. With a GZipped Tar file, files are first archived into a .tar file and then the whole archive is compressed. The advantage here is that the compression engine searches for similar patterns across the entire archive, rather than just within each individual file, thereby increasing the chances of finding these patterns, the basis of this kind of compression. Another advantage to using GZip is that it is currently not encumbered by patents. As a result, there are no additional licensing fees to worry about. When used together, the resulting files typically have a .tar.gz or .tgz extension. 

Because it has limitations when used by itself, GZip will be presented briefly in the next book. Tar will then be more fully described in another book, in which the more common practice of using the formats together will also be presented. 

:::note
Tar and FileSystem-based GZip are not currently available in Xceed's .NET Compact Framework products.
:::

## Xceed’s FileSystem namespace

Xceed’s implementations of `Tar` and `GZip` are both derived from Xceed’s own FileSystem namespace. For this reason, it may be useful to be familiar with this namespace before proceeding. See the `Xceed.FileSystem` topic for details.