import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# QuickFtp class

This topic briefly presents some of the simpler overloads of the static methods of the QuickFtp class; for a complete list, see the class's methods in the reference documentation. Also, see the appropriate topics under [Task-Based Help](/ftp/code-snippets/overview) for more complete examples.

## The methods
Only the simpler overloads ar presented here. Other overloads let you specify user names and passwords, authentication methods, and callbacks (certificate required/received, item/byte progression).

The Send method lets you send files to an FTP server. The following specifies the hostname of the FTP server to connect to, the remote destination folder, and the files to send (searching recursively). 

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        QuickFtp.Send("ftp.server.com", @"\public", @"d:\test\test.txt");
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        QuickFtp.Send("ftp.server.com", "\public", "d:\test\test.txt")
      ```
    </TabItem>
</Tabs>

The Receive method lets you retrieve files from an FTP server. The following specifies the FTP server hostname, the local folder in which to place the file, and the file to receive. 

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        QuickFtp.Receive("ftp.server.com", @"d:\", @"test\test.txt");
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        QuickFtp.Receive("ftp.server.com", "d:\", "test\test.txt")
      ```
    </TabItem>
</Tabs>

The GetFtpContents method instructs the FTP server to list its contents. The following specifies the FTP server hostname, the remote folder to list, and no filters.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        QuickFtpItem[] items = QuickFtp.GetFtpContents("ftp.server.com", @"\", null);
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim items As QuickFtpItem() = QuickFtp.GetFtpContents("ftp.server.com", "\", Nothing)
      ```
    </TabItem>
</Tabs>

Finally, the Delete method deletes items from an FTP server. 

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        QuickFtp.Delete("ftp.server.com", false, @"test\test.txt");
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        QuickFtp.Delete("ftp.server.com", False, "test\test.txt")
      ```
    </TabItem>
</Tabs>

## Remarks

Overloads which do not have a recursive parameter automatically perform their operation recursively.