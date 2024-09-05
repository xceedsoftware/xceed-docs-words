---
title: 'Installation for .NET Standard'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation Instructions for .NET Standard

## Xceed .NET Libraries Documentation

### Installation Instructions for .NET Standard

For [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) development, the installer will copy the .NET Standard assembly DLLs into the product's installation folder, usually in:

`<Installation Folder>\Xceed Zip for .NET v#.#\Bin\NETStandard <Installation Folder>\Xceed Zip for .NET v#.#\Bin\Signed DLLs\NETStandard`

:::note
The assemblies are not added to the global assembly cache.
:::

### Requirements

- Visual Studio 2017 version 15.3 (or later) with .NET Core feature installed.
- Or, on non-Windows platforms, the [.NET Core 2.0 (or later) SDK](https://github.com/dotnet/core/tree/master/release-notes/download-archives).

### New Project

To create a new project:

1. Start Visual Studio.
2. From the menu bar, pick `File -> New -> Project`.
3. Under "Installed", select your preferred programming language, like Visual C# or Visual Basic.
4. Select a project type that supports .NET Standard assemblies. Microsoft maintains a [table](http://immo.landwerth.net/netstandard-versions/#) that shows the supported platforms.
5. Enter the name of the project you want to create and the location where it will be created.
6. Click the "OK" button.

### Add References

Xceed assemblies can now be added to the project:

1. Select the "Add Reference" option from your "Project" menu. This can also be done by right-clicking on the "References" menu in the "Solution Explorer" and selecting the "Add Reference" option.
2. Click the "Browse..." button.
3. Browse to the folder where the .NET Standard DLLs have been installed. Select the DLL files appropriate for the needs of the application. 
4. Once you have finished selecting the assemblies from the list, click on the "OK" button.

### Set the LicenseKey Property

The components need to be licensed for runtime use. Refer to the `Licensing` topic for detailed instructions.

### Add Using Directives

You can then add `using` directives to your code to create aliases for existing namespaces and avoid having to type the fully qualified type names.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      // Zip
      using Xceed.Compression;
      using Xceed.FileSystem;
      //using Xceed.FileSystem.Windows; // Optional secondary APIs
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
      //using Xceed.Tar.Streaming; // Optional secondary APIs
      using Xceed.GZip;
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      ' Zip
    Imports Xceed.Compression
    Imports Xceed.FileSystem
    'using Xceed.FileSystem.Windows; // Optional secondary APIs
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
    'using Xceed.Tar.Streaming; // Optional secondary APIs
    Imports Xceed.GZip
    ```
  </TabItem>
</Tabs>