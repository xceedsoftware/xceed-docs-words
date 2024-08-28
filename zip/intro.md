---
title: Zip for .NET
---

# Features of Xceed Zip for .NET

## .NET Technology

- 100% managed code, written in C#; complete source code available through a Blueprint subscription
- Entirely rewritten and redesigned -- not a .NET interface over a recycled ActiveX component like some other software vendors are trying to sell
- Object-oriented design created specifically for versions 4 and 2.0 to 3.5 of the .NET Framework
- Seamless integration with the .NET base class libraries
- All error handling works through .NET exception classes
- Objects don’t need to be explicitly disposed of
- CLS compliant (Common Language Specification)
- Does not use unsafe blocks for minimal permission requirements
- Works with .NET Isolated Storage for temporary files as needed (*not available in .NET CF version*)
- Documentation fully integrated into Visual Studio .NET
- VB.NET and C# samples include:
  - A WinZip™-like zip application
  - A PKZIP™-like console zip application
  - A streaming compression sample
  - A Windows Explorer-like application that allows you to work with files, folders, and zip files interchangeably; also shows how to compress and decompress HTTP web responses with GZip, memory streams, and file streams using Zlib/Deflate (*not all samples are available for .NET CF version*)
- The .NET 4 build is compiled using the Client Profile.

## Major Features

- File and folder synchronization, on `FileSystemItem` and `FileSystemItem`-derived objects, such as `AbstractFile` or `AbstractFolder` objects and their derivatives
- Full Windows Vista support
- Three new "Quick" classes provide static methods that let you perform FTP, Tar, and GZip operations with a single line of code: `QuickFtp`, `QuickTar`, and `QuickGZip`. These new classes accompany and complement the currently available `QuickZip` and `QuickCompression` classes.
- Xceed FTP for .NET Compact Framework
- Easy-to-use, rock-solid security through industry-standard AES encryption, compatible with WinZip 9 and higher, with encryption strengths of 128, 192, and 256 bits. Alternative AES implementations to the default can be specified. **(Not supported by Xceed Zip for .NET Compact Framework)**
- The only library to provide WinZip 12 compatibility, supporting the LZMA algorithm for improved compression in certain situations. **(New in version 4.1)**
- UTF-8 character encoding is available in headers for improved support of international characters in filenames and comments. **(New in version 4.1)**
- Support for the Zip64 zip file format
- Support for BZip2 compression algorithm
- Support for the PPMd compression algorithm, for producing the most compressed output possible, especially with text and XML files
- Support for extra headers containing detailed time-stamp information in both PKWARE and Info-Zip formats (last modified, last accessed, and creation) and Unicode file names (for international characters).
- Create new zip files or update existing zip files on disk or in memory
- Zip or unzip to and from disks, memory, or isolated storage
- Read, write, and update zip files split into multiple parts
- Create powerful fully customized self-extracting zip files
- Supports the new Deflate64™ compression method
- List contents of a zip file with complete file specifications
- Compress or decompress any .NET stream
- Supports encryption and decryption of .NET streams using compatible encryption
- Compress and decompress byte arrays completely in memory
- Copy, move, rename, delete, and change attributes of files and folders in a zip file, on disk, in memory, or in isolated storage
- Zip password encryption
- One-line shortcut classes for basic zip file and compression operations
- Fully extensible classes so you can customize the library’s functionality as needed
- Information-rich status report events with percentages, byte and file counts
- Programmable filter system to limit processing to specific files or folders, with built-in filters for file attribute, size, date timestamp, and filenames. Create your own custom filters as needed.
- Efficiently creates zip files by allowing developers to decide whether folder entries should be written to the archive, which reduces its size. **(New in version 5.1/4.3)**
- Can create archives using the Deflate format without compression, for full compatibility with Xceed Real-Time Zip and generally improved flexibility. **(New in version 5.1/4.3)**

## Tar and GZip Features (*non-FileSystem GZip support only in CF version*)

- Tar and GZip for maximum compatibility between your applications and the data they need to work with
- Handle Tar and GZip files as easily as if they were regular files and folders
- Full read/write compatibility with USTAR format Tar archives
- Read compatibility with GNU Tar archives as long as archive entries do not use the header extensions of this format

## Other Features

- Zip encryption on a per-file basis (*password protection only in .NET CF version*)
- Recursively zip or unzip entire directories and their contents
- Control the path information stored in the zip file for each file or folder
- Zip or unzip only files newer than those already in the zip file or destination folder
- Overwrite files only in certain conditions
- Split zip file can use the Pkware or Xceed naming convention for each zip file part or create your own custom naming convention
- Split zip file parts can be written to different folders
- Triggers only the events your application subscribes to for increased performance
- Get and set individual file comments or the global zip file comment
- Supports different encryption passwords for each file
- Controllable compression levels and methods
- Supports UNC paths
- Ability to preview which files will end up being processed
- Process system and hidden files, overwrite read-only files
- Supports the GZip, Zlib, Info-Zip, Java, and proprietary compression formats that include embedded checksums to ensure data integrity
- True .NET pass-through stream object that can automatically compress or decompress any other type of .NET stream's data
- Calculate CRC-32 and Adler-32 checksums on streams or byte arrays

## Self-Extracting Zip File Features

- Create new self-extracting zip files or transform already existing zip files into self-extracting zip files
- Self-extracting zip files can span multiple disks
- Creates 32-bit self-extracting zip files that work on all Windows 95, 98, ME, NT, 2000, and XP operating systems, or 16-bit self-extracting zip files that work on Windows 3.x as well
- Update and reconfigure an existing self-extracting zip file
- Create self-extracting zip files for the traditional PKZIP 2.04g compression method. Also supports the Deflate64™, BZip2, and BWT methods.
- Create self-extracting zip files that support AES encryption. **(Not available in CF version)**
- Use extra headers such as Unicode filenames, extended filestamps, and security descriptors.
- Supports the Zip64 zip file format allowing the creation of Zip files that can contain a practically unlimited number of archived files. Note: Due to limitations in the Windows operating system, creating or using self-extracting Zip files larger than 2 GB is not recommended.
- Customizable introduction message and dialog box titles
- Display a license agreement with configurable accept and refuse buttons
- Customize all other messages, prompts, and button captions
- Customize the self-extracting zip file's application icon (*not available in .NET CF version*)
- Set the default unzipping folder
- Allow user to select an alternate unzipping folder
- Request a password whenever an encrypted file is encountered
- The user can enter the decryption password or skip the file if they don't have the password for the file
- Display a text file after successfully unzipping files
- Customizable overwrite behavior with dialog box offering the user various overwrite options
- Display unzipping status
- User interaction and dialogs can be selectively shut off for quiet operation
- Execute one or more applications (optionally with parameters) or open documents after successfully unzipping files
- Copy one or more files from one location to another after unzipping
- Register DLLs (or other libraries) on the system after unzipping
- Add or change key values in the registry after unzipping
- Create self-extracting zip files with a built-in decryption password. This prevents users from using compression utilities to unzip the files, forcing users to view your custom introduction, license agreement, or warning messages.
- Create program groups and insert items into program groups
- Associate filename extensions with applications
- Allows 3rd-party install or setup programs (and their data files) to be unzipped into a temporary folder, executed, and then deleted upon completion
- Custom paths, filenames, strings, and prompts are parsed, allowing you to insert strings such as the current folder, windows and windows system directories, the temporary folder, and more.
---