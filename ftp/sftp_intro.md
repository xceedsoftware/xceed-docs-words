# Features of Xceed SFTP for .NET

## .NET technology
- Works with .NET 4 / 4.5 and 2.0-3.5, ASP.NET 4 / 4.5 and 2.0-3.5, and Visual Studio 2005-2012.
- 100% managed code written in C#, source code available through a Blueprint subscription.
- All error handling works through .NET exception classes.
- CLS compliant (Common Language Specification).
- Documentation fully integrated into Visual Studio.
- Built using System.Net.Sockets namespace.
- The .NET 4 build is compiled using the Client Profile.

## SFTP protocol features
- Complies with RFC 4253, 4252, and 4254.
- Implements the SSH-2 protocols. This means that data exchanges with the server use strong encryption and data integrity checks. Encryption keys are exchanged in a secure manner and are automatically changed periodically during a session.
- Implements versions 3 and 6 of the SFTP protocol. Versions 4 and 5 are not supported but automatic fallback to version 3 works with most servers.
- Items from the SFTP server are represented by `SFtpFile` and `SFtpFolder` objects, allowing them to be manipulated like regular files and folders. These classes integrate with Xceed's FileSystem component.
- Unlike FTP, SFTP enforces a precise date and time format (down to the second for version 3 servers and down to the nanosecond for version 6 servers). This makes it easy and consistent to determine the freshest file between client and server machines.

## Major features
- Securely sends and receives files, folders or entire directory structures quickly and easily.
- Securely sends and receives files to or from disk or memory streams.
- Obtain a detailed listing of files and folders. Create, rename, and delete files and folders on the SFTP server using `SFtpFile` and `SFtpFolder` properties and methods, all without the need to maintain and monitor a "current working directory".

## Component interactivity / Events
- When sending multiple files and an error occurs, allows you to retry the file, skip it and continue, or abort the entire operation.

## Other features
- Supports connecting through proxies. HTTP, SOCKS 4/4A, and SOCKS 5 proxies are supported.
- Flexible synchronization of any number of folders and files of any type (`FileSystemItem` and `FileSystemItem`-derived objects, such as `AbstractFile` or `AbstractFolder` objects and their derivatives), wherever they are located.
- Can use established filters (name, date, attributes, size) to select files for listing, sending, or receiving, or create your own to fit specific criteria.
- Allows a destination file or folder to have a different name than the source when transferring files.
- SFTP activity can be logged to disk, console, or any `System.IO.TextWriter` object.
- Can set a timeout limit on all operations and have an exception triggered if it is exceeded.
- Triggers an event if the connection to the SFTP server is lost.
- Accepts SFTP server by IP address or host name.
- Supports wildcard in files to send or receive.