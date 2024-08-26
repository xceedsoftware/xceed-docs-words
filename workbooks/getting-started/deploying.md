# Deploying

When distributing an application that uses Xceed's Workbooks for .NET, specific assemblies must be distributed (listed in the **Redistributable Files** section below). These files must either be installed into the global assembly cache or placed in the same directory as your executable.

Both signed and unsigned versions of the assemblies are available. Either version can be distributed, but please remember that signed software of any kind can sometimes cause problems because the .NET Framework or the operating system must contact an authentication server, which can in turn trigger firewall alerts, etc.

:::note
 Only the file(s) specifically identified in the documentation as Redistributable Files may be distributed. You may not redistribute the Xceed installation package.
:::

## Installing Assemblies into the Global Assembly Cache

In order to install assemblies into the global assembly cache, Microsoft Windows Installer 2.0 must be used. This is the recommended and most common way to add assemblies to the global assembly cache, and it provides reference counting of assemblies in the global assembly cache, along with other benefits.

For more information in regard to installing assemblies into the global assembly cache, please refer to the *"Installing an Assembly into the Global Assembly Cache"* topic of the .NET Framework Developer's Guide.

## Redistributable Files

Registered users are permitted to distribute the following assemblies along with any applications developed using Xceed Workbooks for .NET. Under no circumstances is it permitted to distribute any other files.

- **For applications developed using Xceed Workbooks for .NET Framework:**
  - `Xceed.Workbooks.NET.dll`

- **For applications developed using Xceed Workbooks for .NET 5+:**
  - `Xceed.Workbooks.NET.dll`

## Location of Assemblies

All the assemblies required to distribute an application that uses Xceed Workbooks for .NET are located in the **[Program Files]\Xceed\Xceed Workbooks for .NET [version]\Bin** folder.

All the assemblies required to distribute an application that uses Xceed Workbooks for .NET 5+ are located in the **[Program Files]\Xceed\Xceed Workbooks for .NET [version]\Bin\NET5** folder.
