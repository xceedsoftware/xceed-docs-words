# Zip and streaming capabilities

The `Xceed.Zip` namespace implements the [QuickZip](quick-zip) class, which exposes static methods that allow quick and easy zip file operations in one line of code. It also provides classes that implement methods for flexible handling of zip files as well as files and folders contained within zip files.

The Xceed Zip class library includes the `ZippedFolder` class, which represents a zipped folder, and the `ZipArchive` class, which represents the root of a zip file. Both these classes derive from the `AbstractFolder` class. It also includes the `ZippedFile` class, which derives from the `AbstractFile` class and represents a file contained within a zip file.

For more information regarding the abstract classes from which the ZippedFolder, ZipArchive, and ZippedFile classes derive, please refer to the [Introduction to the Xceed.FileSystem namespace](/ftp/basic-concepts/xceed-filesystem-core/overview).

The following diagram illustrates the class hierarchy of the Xceed.Zip namespace in relation to the Xceed.FileSystem namespace:

![File System Diagram](/img/FileSystem.gif)

## QuickZip class

The [QuickZip](quick-zip) class exposes static methods that allow quick and easy zip file operations for developers who do not wish to use the class library. However, it does not provide as much flexibility as the class library. In cases where more complex zip file operations are required or where events are needed, developers should use the other classes defined within the Xceed.Zip namespace.

## ZippedFolder class

The `ZippedFolder` class represents a folder contained within a zip file. This class derives and inherits methods from the AbstractFolder class of the Xceed.FileSystem namespace.

## ZipArchive class

The `ZipArchive` class represents the root (`\`) of a zip file. This class derives and inherits methods from the ZippedFolder class.

## ZippedFile class

The `ZippedFile` class represents a file contained within a zip file. This class derives and inherits methods from the AbstractFile class of the Xceed.FileSystem namespace.
