import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to delete items from an FTP server

This topic demonstrates how to delete items on an FTP server using the static `Delete` method of the `QuickFtp` class.

## Delete method

The `Delete` method has various overloads that can be used to delete items from an FTP server. Some only require that you specify the hostname, whether to perform the delete recursively, and the files to delete, while others provide options such as using a username and password, port numbers, authentication, proxies, passive transfers, synchronizing objects, etc. For details on the other overloads, see the reference documentation.

## Demonstration
In the following example, we specify the hostname, a port number, a username and a password, the remote folder to list, whether or not to get the list recursively, and a filter. The method returns `QuickFtpItem` objects, which provide information on the items being listed. This information can then be handled as desired.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.
          QuickFtp.Delete("ftp.server.com", false, @"test\test.txt");
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.
        QuickFtp.Delete("ftp.server.com", False, "test\test.txt")
      ```
    </TabItem>
</Tabs>

## Things you should consider
The main questions you should ask yourself when deleting items from an FTP server are:

- Do you want to do more complex FTP operations? Use the `FileSystem`-based classes defined within the `Xceed.Ftp` namespace.