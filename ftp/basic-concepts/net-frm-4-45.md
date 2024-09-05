# .NET Framework 4.5, 4.7 and .NET Standard versions of the libraries

## Background

The Xceed .NET Libraries aim to support the broadest range of scenarios and target installations as possible. Because of this, the libraries are compiled against the lowest possible version of the .NET framework so that compatibility is maximized.

- Xceed Libraries version 4.9 and lower are compiled against version 2.0 of the .NET framework.
- Xceed Libraries version 5.0 and higher are compiled against version 4.0 of the .NET framework.

If the application using the Xceed libraries targets a higher version of the .NET framework, the component will run on that higher version without issue. The .NET framework versions do not need to match.

## Features specific to later versions of the .NET framework

As time passes and new features are added to the .NET framework, it becomes desirable to have the Xceed Libraries use them. However, this would force existing applications to upgrade .NET framework versions, which is not always welcome or possible. Furthermore, features only available to the latest framework version might not be of interest to all clients.

Our commitment remains compatibility. So, when applicable, multiple flavors of Xceed components will be offered, each targeting a different .NET framework version.

### .NET 4 flavor

### .NET 4.5 and 4.7 flavors

- The .NET 4.5 flavor is compiled to target and use features in version 4.5 of the .NET framework.
- The .NET 4.7 flavor is compiled to target and use features in version 4.7 of the .NET framework.

The DLLs for these flavors can be found in the `<Xceed Libraries installation directory>\Xceed Zip for .NET vX.X\Bin\NET45` directory and `NET47` directory respectively. The DLLs are the same as the regular ones except they are compiled to target the specified .NET framework version and leverage new classes in the framework.

To use these flavors of the components:

- The application needs to target .NET 4.5 or later. This can be set in the project's "Properties" under the "Application" tab by selecting ".NET Framework 4.5" or a higher version in the "Target framework" combo-box.
- The project needs to reference the .NET45 component DLLs, which can be found in the directory mentioned above.

The same logic applies to the .NET 4.7 flavor.

### The following unique features are available when using the .NET 4.7 flavor:

#### Xceed Ftp for .NET: TLS 1.2 support

The TLS 1.2 encryption is implemented in this flavor of Xceed FTP for .NET and .NET Standard. This allows the component to connect to FTP servers that use that encryption. There are new values in the `Xceed.Ftp.AuthenticationMethod` enumeration.

:::note
The .NET 4.5 flavor also supports TLS 1.2, but there is a bug in the .NET framework that causes disconnecting from FileZilla FTP servers to generate a 425 error code. This bug is fixed when using the .NET 4.7 flavor.
:::

### .NET Standard flavor

The .NET Standard flavor is compiled to target and use features in .NET Standard 2.0.

The DLLs for this flavor can be found in the `<Xceed Libraries installation directory>\Xceed Zip for .NET vX.X\Bin\NETStandard` directory. The DLLs are the same as the regular ones except they are compiled to target .NET Standard 2.0. 

To use this flavor of the components:

- The application can target .NET Core 2.0 or later, .NET 5, .NET Framework 4.6.1 or later, Mono 5.4 or later, or Xamarin.
- The project needs to reference the .NETStandard component DLLs, which can be found in the directory mentioned above.

The .NET Standard flavor contains all the features of the .NET 4 and .NET 4.5 flavors of the components.

## See Also

- [.NET Standard information](https://docs.microsoft.com/en-us/dotnet/standard/net-standard)

