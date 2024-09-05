---
title: FTP Features
---

# Features of Xceed FTP for .NET

## .NET technology

- 100% managed code written in C#, source code available through a Blueprint subscription.
- Object-oriented design created specifically for versions 4 and 2.0 to 3.5 of the .NET Framework.
- VB.NET and C# sample applications included.
- All error handling works through .NET exception classes.
- Objects don’t need to be explicitly disposed of.
- CLS compliant (Common Language Specification).
- Does not use unsafe blocks for minimal permission requirements.
- Documentation fully integrated into Visual Studio.NET.
- Built using `System.Net.Sockets` namespace.
- The .NET 4 build is compiled using the Client Profile.

## FTP protocol features

- RFC 959, 1123, and 1579 compliant.
- Support for "Knowledge of Extra Capabilities", also known as the FEAT command. *(New in version 3.5)*
- Support for MODE Z data transfer. *(New in version 3.5)*
- Enables connections to FTP servers through HTTP proxy servers.
- SSL 3.0, 3.1, and TLS 1.2 support for both FtpClient and FileSystem. *(Updated in version 6.0)*
- Partial RFC 2228 and 2389 compliance. *(New in version 3.5)*
- Solid, built-in support for various server types including Unix, VMS, AS/400, and DOS.
- Supports all major FTP operations and allows sending of custom commands.
- Supports FTP passive mode for firewall and proxy server resilience.
- CCC (clear command channel) command and UseRemoteAddress property make connecting to a server residing behind a firewall easy. *(New in version 4.0)*
- Supports the File eXchange Protocol (FXP).
- Supports listings for machine processing (MLST and MLSD).

## Major features

- File and folder synchronization on `FileSystemItem` and `FileSystemItem`-derived objects, such as `AbstractFile` or `AbstractFolder` objects and their derivatives.
- Full Windows Vista support.
- Three new "Quick" classes provide static methods that let you perform FTP, Tar, and GZip operations with a single line of code: QuickFtp, QuickTar, and QuickGZip. These new classes accompany and complement the currently available QuickZip and QuickCompression classes.
- Xceed FTP for .NET Compact Framework.
- Provides a more flexible and object-oriented way of working with files and folders on the FTP server just as easily as if they were local filesystem elements. Based on Xceed’s own powerful FileSystem classes.
- Send and receive files, folders, or entire directory structures quickly and easily.
- Send and receive files to or from disk or from any kind of stream, including memory streams.
- Replicate a local directory structure with a remote directory structure on an FTP server and vice-versa.
- Operations can be aborted at any time.
- Support for asynchronous FTP operations.
- Provides a rich set of events to keep your application notified of all FTP activity.
- Allows you to verify at any time the exact state of the component, including whether it is connected or not, busy or not, sending, receiving, deleting, etc.
- Obtain a detailed listing of files on the FTP server via a collection object or by events.
- Rename and delete files on the FTP server.
- Resume file transfers from any byte offset.

## Component interactivity / Events

- Provides status report events on a file-by-file basis as well as on the entire operation being performed.
- Status reports include various completion percentages, byte counts, file counts, bytes per second, bytes skipped, number of files skipped, and more. Displaying a progress bar could not be easier!
- Events are triggered for all major operations such as whenever a file is being sent, received, listed, etc.
- When sending multiple files and an error occurs, allows you to retry the file, skip it and continue, or abort the entire operation.
- Provides complete file information for the current file being processed.

## Other features

- Create filters so you can send or receive only files that fit specific criteria such as file size or date.
- Allows you to rename or change filenames and paths before sending.
- Automatic logging to memory or to disk.
- Use the automatic directory listing parser or create your own custom parser for unknown listing formats and FTP server types. You can do this in two ways - through inheritance or by handling an event.
- Set a timeout limit on all operations and have an exception triggered if it is exceeded.
- Send a file to an FTP server and have the server give it a unique filename.
- Can send files as ASCII or Binary.
- Triggers an event if the connection to the FTP server is lost.
- Allows you to change the user that is currently logged in without disconnecting.
- Built-in tweaks for working with non-standard FTP server types including settable FTP server folder separator character, storage pre-allocation, and TYPE command sending.
- Specify an FTP server by IP address or host name.
- Specify files to send or receive using wildcards.