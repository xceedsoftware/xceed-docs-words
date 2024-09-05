# Xceed's FileSystem Core

The `Xceed.FileSystem` namespace serves as the core for **Xceed Zip for .NET**, **Xceed FTP for .NET**, **Xceed Zip for .NET Compact Framework**, **Xceed FTP for .NET Compact Framework**, and **Xceed SFTP for .NET**, providing classes that implement generic methods for handling abstract files and folders, as well as methods to handle files and folders located on disk, in memory, or in isolated storage (not available in the .NET Compact Framework versions of Xceed's products). In addition, this namespace is the core of Xceed's various data manipulation capabilities. See the introductions to the [Zip](/zip/basic-concepts/zip-and-streaming-capabilities), [FTP](/ftp/basic-concepts/ftp-capabilities/overview), [GZip](/zip/basic-concepts/tar-gzip-capabilities/gzip/overview), [Tar](/zip/basic-concepts/tar-gzip-capabilities/tar/overview), and `SSH` namespaces for details on their classes.

The class library contains the `FileSystemItem` abstract class, which represents the root class for all types of files and folders; the `AbstractFile` abstract class, which represents a generic file; and the `AbstractFolder` abstract class, which represents a generic folder. It also includes the `DiskFile` and `DiskFolder` classes, which represent files and folders located on a disk; the `MemoryFile` and `MemoryFolder` classes, which represent files and folders located in memory; the `IsolatedFile` and `IsolatedFolder` classes, which represent files and folders located in isolated storage; and the `StreamFile` class, which implements access to any type of stream as though it were a file.

The `FileSystemItem`, `AbstractFile`, and `AbstractFolder` classes cannot by themselves be instantiated. In order to create an instance of a file or folder, a class that derives from one of these base classes must be used. Since these base classes are abstract and do not know the kind of files and folders being manipulated, it becomes very easy to derive from these classes and extend the possibilities for file and folder manipulation. For example, a class could be derived from the `AbstractFile` class to handle files in Visual SourceSafe™ or SharePoint Server™.

The following diagram illustrates the class hierarchy of the various namespaces used in Xceed's .NET data manipulation products. Brief descriptions for the classes in the `Xceed.FileSystem` namespace are provided below. For details on other classes, see the introductions to the [FTP](/ftp/basic-concepts/ftp-capabilities/overview), [Zip](/zip/basic-concepts/zip-and-streaming-capabilities), [GZip](/zip/basic-concepts/tar-gzip-capabilities/gzip/overview), [Tar](/zip/basic-concepts/tar-gzip-capabilities/tar/overview), and `SSH` namespaces.

![FileSystem Class Hierarchy](/img/FileSystem.gif)

## FileSystemItem class

The `FileSystemItem` class is the root class for all types of items (file or folder) that can exist in a generic folder. It exposes properties and methods common to both files and folders, such as attributes, date, and name. Both the `AbstractFile` and `AbstractFolder` classes derive and inherit methods from this class.

## AbstractFile class

The `AbstractFile` class represents a generic file. It exposes properties and methods that are specific to files, such as reading data from and writing data to files. The `DiskFile` and `IsolatedFile` classes, as well as other classes like `ZippedFile` in the `Xceed.Zip` namespace, inherit methods from this abstract class.

## AbstractFolder class

The `AbstractFolder` class represents a generic folder, which can contain `FileSystemItem` objects. It exposes properties and methods common to all types of folders. The `DiskFolder` and `IsolatedFolder` classes, along with other classes like `ZipArchive` and `ZippedFolder` in the `Xceed.Zip` namespace, inherit methods from this abstract class.

## DiskFile class

The `DiskFile` class is a specialization of the `AbstractFile` class that represents a disk file and provides access to it through specific properties and methods.

## DiskFolder class

The `DiskFolder` class is a specialization of the `AbstractFolder` class that represents a disk folder and provides access to it through specific properties and methods.

## MemoryFile class

The `MemoryFile` class is a specialization of the `AbstractFile` class that provides access to a file located in memory.

## MemoryFolder class

The `MemoryFolder` class is a specialization of the `AbstractFolder` class that provides access to a folder located in memory.

## IsolatedFile class

The `IsolatedFile` class is a specialization of the `AbstractFile` class that provides access to a file located in isolated storage. This class is not available in Xceed's .NET Compact Framework products.

## IsolatedFolder class

The `IsolatedFolder` class is a specialization of the `AbstractFolder` class that provides access to a folder located in isolated storage. This class is not available in Xceed's .NET Compact Framework products.

