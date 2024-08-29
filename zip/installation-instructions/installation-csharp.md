---
title: 'Installation for C#'
---
# Installation instructions for C#

## Assembly file locations

The installer will copy all the necessary files into the product's installation folder, usually in:

`<Installation Folder>\Xceed Zip for .NET v#.#\Bin\`

The assembly files located in the base directory target .NET framework 4.0 for maximum compatibility. However, different flavors of the components are available. These flavors target different versions of the .NET framework or platforms to take advantage of new features.

#### .NET 4.5

`<Installation Folder>\Xceed Zip for .NET v#.#\Bin\NET45`

#### .NET Standard

`<Installation Folder>\Xceed Zip for .NET v#.#\Bin\NETStandard`

Xamarin applications should use the .NET Standard flavor of the components. It is no longer necessary to use a Xamarin-specific flavor.

## Add References in application projects

The only thing left to do in order to begin using Xceed's components is to add the appropriate assemblies to your project, make sure the `CopyLocal` property of each reference is set to `true` if using a Compact Framework version, and license the product for runtime use. To do this, perform the following steps:

1. Start Visual Studio 2019, 2017, 2015, 2012, 2010, 2008, 2005.
2. On the Start Page, click on **New Project** (in VS2008 / VS2005, click on the "Project..." link next to "Create:"). This can also be done by selecting the "File > New > Project" menu item.
3. Under "Project types", select a relevant type, like "Visual C# > Windows" for example.
4. In the "Templates" section, select the type of application you want to create.
5. Enter the name of the project you want to create and the location where it will be created.
6. Click on the "OK" button.

You are now ready to add the necessary assemblies to your project.

:::note
Prior versions of the assemblies (6.8 and below) built for .NET 4 contained version numbers (v#.#) in their names. As of version 6.9, the names of the assemblies built for .NET 4, .NET 4.5, .NET Standard, Xamarin and older versions of .NET do not contain version numbers.
:::

To add references to the assemblies, select the **Add Reference** option from your **Project** menu. This can also be done by right-clicking on the **References** menu in the **Solution Explorer** and selecting the **Add Reference** option.

1. Select the `.NET` tab in the **Add Reference** dialog.
2. Select `Xceed.FileSystem.dll`. This assembly is necessary for both the Zip/compression and the FTP capabilities. If you need to use the Zip/compression capabilities, select `Xceed.Zip.dll`, as well as `Xceed.Tar.dll` and/or `Xceed.Gzip.dll` if you need Tar or GZip. If you need FTP capabilities, select the `Xceed.Ftp.dll`, `Xceed.Compression.dll`, and `Xceed.Compression.Formats.dll` assemblies. For streaming capabilities, select `Xceed.Compression.dll`. If the assemblies are not in the list of available components, you can browse for the assemblies (DLLs) through the **Browse** tab. You will need to browse for the DLLs if using a .NET Compact Framework product. If you need the SFTP capabilities, select `Xceed.FileSystem.dll`, `Xceed.SSH.SFtp.dll`, `Xceed.SSH.Core.dll`, `Xceed.SSH.Client.dll`, `Xceed.SSH.Protocols.dll`, and `Xceed.Compression.dll`, depending on your needs. 
3. Once you have finished selecting the assemblies from the list, click on the **OK** button.
4. If you are using one of Xceed's Compact Framework products, set the `CopyLocal` property of each reference to `true`.

:::note  
PPMd compression is now incorporated into the `Xceed.Compression.dll` assembly. The `Xceed.Compression.PPMd.v#.#.dll` is now obsolete and is no longer distributed with this product.
:::
Finally, you need to license the components for runtime use. Jump to the `Licensing` topic for detailed instructions.

You can then add `using` directives to your code to create aliases for existing namespaces and avoid having to type the fully qualified type names.

### Example code in C#

```csharp
// Zip
using Xceed.Compression;
using Xceed.FileSystem;
// using Xceed.FileSystem.Windows; // Optional secondary APIs
using Xceed.Zip;

// Streaming Compression
using Xceed.Compression;
using Xceed.Compression.Formats;

// Ftp
using Xceed.FileSystem;
using Xceed.Ftp;

// SSH and SFtp
using Xceed.FileSystem;
using Xceed.SSH.Client;
using Xceed.SSH.Protocols;
using Xceed.SSH.Core;

// Tar and GZip
using Xceed.FileSystem;
using Xceed.Tar;
// using Xceed.Tar.Streaming; // Optional secondary APIs
using Xceed.GZip;
```