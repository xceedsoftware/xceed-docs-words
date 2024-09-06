import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to list contents on an FTP server

This topic demonstrates how to list contents on an FTP server using the static `GetFtpContents` method of the `QuickFtp` class.

## GetFtpContents method

The `GetFtpContents` method has various overloads that can be used to list the contents of a server. Some only require that you specify the hostname, the local destination folder, and the files to receive, while others provide options such as using a username and password, port numbers, authentication, whether to replace existing files, preserve paths, proxies, passive transfers, synchronizing objects, etc. For details on the other overloads, see the reference documentation.

## Basic steps
To list contents on an FTP server, the following steps must be performed:

- Declare an array of `QuickFtpItem` objects that will contain the result of the call to the `GetFtpContents` method. 

- Iterate through the array of `QuickFtpItem` objects to retrieve information on each `QuickFtpItem` object it contains.

## Demonstration
In the following example, we specify the hostname, a port number, a username and a password, the remote folder to list, whether or not to get the list recursively, and a filter.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.Ftp;

          // If your trial period has expired, you must purchase a registered license key,
          // uncomment the appropriate line of code below, and insert your registered license key.
          // For more information, jump to the How the 45-day trial works and the
          // How to license the component once you purchase topics.
          // For Xceed Ftp for .NET:
          //Xceed.Ftp.Licenser.LicenseKey = "FTNXX-XXXXX-XXXXX-XXXX";

          // For Xceed Ftp for .NET Compact Framework:
          //Xceed.Ftp.Licenser.LicenseKey = "FTCXX-XXXXX-XXXXX-XXXX";

          // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

          QuickFtpItem[] items = QuickFtp.Receive("ftp.server.com", 21, "user",
                                                  "password", @"\public", true, @"*");

          foreach (QuickFtpItem item in items)
          { 
            Console.WriteLine(item.FullName);
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        ' If your trial period has expired, you must purchase a registered license key,
        ' uncomment the appropriate line of code below, and insert your registered license key.
        ' For more information, jump to the How the 45-day trial works and the
        ' How to license the component once you purchase topics.
        ' For Xceed Ftp for .NET:
        'Xceed.Ftp.Licenser.LicenseKey = "FTPXX-XXXXX-XXXXX-XXXX"

        ' For Xceed Ftp for .NET Compact Framework:
        'Xceed.Ftp.Licenser.LicenseKey = "FTCXX-XXXXX-XXXXX-XXXX"

        ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

        Dim items As QuickFtpItem() = QuickFtp.GetFtpContents("ftp.server.com", 21, "user", _
                                                              "password", "\public", True, "*" )
        For Each item As QuickFtpItem In items 
          Console.WriteLine(item.FullName)
        Next item
      ```
    </TabItem>
</Tabs>

## Things you should consider
The main questions you should ask yourself when listing contents on an FTP server are:

- Do you want to do more complex FTP operations? Use the `FileSystem`-based classes defined within the `Xceed.Ftp` namespace.