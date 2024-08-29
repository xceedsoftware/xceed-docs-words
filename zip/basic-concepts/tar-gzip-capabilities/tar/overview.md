# Xceed Tar

The Xceed.Tar namespace provides classes that implement methods for the flexible handling of Tar archives, as well as the files and folders they contain.

:::note
The Tar namespace is not currently available in Xceed's .NET Compact Framework products.
:::

The Xceed Tar namespace includes the `TarredFolder` class, which represents a `Tarred` folder, and the TarArchive class, which represents the root of a Tar file. Both these classes derive from the `AbstractFolder` class. The namespace also includes the TarredFile class, which derives from the `AbstractFile` class and represents a file contained within a Tar archive file. 

For more information on the abstract classes from which the `TarredFolder`, `TarArchive` and `TarredFile` classes derive, please refer to the Introduction to the **Xceed.FileSystem** namespace topic. 

The following diagram illustrates the class hierarchy of the Xceed.Tar namespace in regards to the **Xceed.FileSystem** namespace:

![Hierarchy of the Xceed.GZip](../../assets/09.gif)

## TarredFolder class
The TarredFolder class represents a folder contained within a Tar file. This class derives and inherits methods from the AbstractFolder class of the Xceed.FileSystem namespace.

## TarArchive class
The TarArchive class represents the root ("\") of a Tar file. This class derives and inherits methods from the TarredFolder class.

## TarredFile class
The TarredFile class represents a file contained within a Tar file. This class derives and inherits methods from the AbstractFile class of the Xceed.FileSystem namespace.