---
title: 'Installation for VB.NET'
---
# Installation instructions for VB.NET

## Assembly file locations

The installer will copy all the necessary files into the product's installation folder (usually in `<Installation Folder>\Xceed Components\Bin\.NET`) and place a copy of all the assemblies in the global assembly cache (the latter step may not occur for all .NET 4 assemblies). The only thing left to do in order to begin using Xceed's components is to add the appropriate assemblies to your project, make sure the `CopyLocal` property of each reference is set to "true" if using a Compact Framework version, and license the product for runtime use. To do this, perform the following steps:

1. Start Visual Studio 2012/2010/2008/2005.
2. On the Start Page, click on **New Project** (in VS2008 / VS2005, click on the "Project..." link next to "Create:"). This can also be done by selecting the "File > New > Project" menu item.
3. Under "Project types", select "Visual Basic > Windows".
4. In the "Templates" section, select the type of application you want to create. If you are using one of Xceed's Compact Framework components, choose *Smart Device Application*.
5. Enter the name of the project you want to create and the location where it will be created.
6. Click on the "OK" button.

You are now ready to add the necessary assemblies to your project.

:::note
Prior versions of the assemblies (6.8 and below) built for .NET 4 contained version numbers (v#.#) in their names. As of version 6.9, the names of the assemblies built for .NET 4, .NET 4.5, .NET Standard, Xamarin and older versions of .NET do not contain version numbers.
:::

To add references to the assemblies:

1. Select the "Add Reference" option from your **Project** menu. This can also be done by right-clicking on the **References** menu in the **Solution Explorer** and selecting the "Add Reference" option.
2. Select the ".NET" tab in the **Add Reference** dialog.
3. Select `Xceed.FileSystem.dll`. This assembly is necessary for both the Zip/compression and the FTP capabilities. If you need to use the Zip/compression capabilities, select `Xceed.Zip.dll`, as well as `Xceed.Tar.dll` and/or `Xceed.Gzip.dll` if you need Tar or GZip. If you need FTP capabilities, select the `Xceed.Ftp.dll`, `Xceed.Compression.dll`, and `Xceed.Compression.Formats.dll` assemblies. For streaming capabilities, select `Xceed.Compression.dll`. If the assemblies are not in the list of available components, you can browse for the assemblies (DLLs) through the **Browse** tab. You will need to browse for the DLLs if using a .NET Compact Framework product. If you need the SFTP capabilities, select `Xceed.SSH.SFtp.dll`, `Xceed.SSH.Core.dll`, `Xceed.SSH.Protocols.dll`, and `Xceed.Compression.dll`, depending on your needs.
4. Once you have finished selecting the assemblies from the list, click on the "OK" button.
5. If you are using one of Xceed's Compact Framework products, set the `CopyLocal` property of each reference to `true`.

> **Note**  
> PPMd compression is now incorporated into the `Xceed.Compression.dll` assembly. The `Xceed.Compression.PPMd.v#.#.dll` is now obsolete and is no longer distributed with this product.

Finally, you need to license the components for runtime use. Jump to the `Licensing` topic for detailed instructions.

You can then use `Imports` statements to create aliases for existing namespaces and avoid having to type the fully qualified type names.

### Example code in VB.NET

```vbnet
' Zip
Imports Xceed.Compression
Imports Xceed.FileSystem
' Imports Xceed.FileSystem.Windows; // Optional secondary APIs
Imports Xceed.Zip

' Streaming Compression
Imports Xceed.Compression
Imports Xceed.Compression.Formats

' Ftp
Imports Xceed.FileSystem
Imports Xceed.Ftp

' SSH and SFtp
Imports Xceed.FileSystem
Imports Xceed.SSH.Client
Imports Xceed.SSH.Protocols
Imports Xceed.SSH.Core

' Tar and GZip
Imports Xceed.FileSystem
Imports Xceed.Tar
' Imports Xceed.Tar.Streaming; // Optional secondary APIs
Imports Xceed.GZip
