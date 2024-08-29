# Xceed GZip

The Xceed.GZip namespace provides classes that implement methods for the flexible handling of GZip archives and the files they contain.

:::note
The GZip namespace is not currently available in Xceed's Compact Framework products.
:::

Xceed's GZip namespace includes the `GZipArchive` class, which represents the GZip file and derives from the `AbstractFolder` class, and the `GZippedFile` class, which represents the file contained within the GZip file and derives from the `AbstractFile` class. A `GZippedFolder` class also exists (derived from AbstractFolder), which represents a GZipped folder, but because GZip files cannot contain folders, this class cannot be instantiated and is only used as a base class for `GZipArchive`. 

For more information on the abstract classes from which these classes derive, please refer to the Introduction to the `Xceed.FileSystem` namespace topic. 
The following diagram illustrates the class hierarchy of the Xceed.GZip namespace in regards to the `Xceed.FileSystem` namespace:

![Hierarchy of the Xceed.GZip](../../assets/09.gif)

## GZippedFolder class

The GZippedFolder class is the base class of GZipArchive, and derives and inherits methods from the AbstractFolder class of the Xceed.FileSystem namespace. It cannot be instantiated. To create or access a GZip archive, use the GZipArchive class.

## GZipArchive class

The GZipArchive class represents a GZip archive. This class derives and inherits methods from the GZippedFolder class.

## GZippedFile class

The GZippedFile class represents a file contained within a GZipped file. This class derives and inherits methods from the AbstractFile class of the Xceed.FileSystem namespace.