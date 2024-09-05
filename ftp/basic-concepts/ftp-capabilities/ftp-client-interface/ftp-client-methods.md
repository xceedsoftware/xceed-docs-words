# FTP Client Methods

Xceed FTP for .NET, via the `FtpClient` and `AsyncFtpClient` classes, exposes the following methods which can be used to perform various operations on an FTP server.

:::note
`AsyncFtpClient`'s methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

Click on any one of the methods listed below for detailed information regarding that method.

| Methods                                | Description                                                                                                 |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `Abort`                                | Aborts the current FTP command.                                                                              |
| `Authenticate`                         | Authenticates and encrypts the current FTP connection.                                                       |
| `BeginAbort` (`AsyncFtpClient`)        | Begins the process of aborting the current FTP command.                                                      |
| `BeginAuthenticate` (`AsyncFtpClient`) | Begins the authentication and encryption of the current FTP connection.                                      |
| `BeginChangeCurrentFolder` (`AsyncFtpClient`) | Begins the process of changing the current working folder of the FTP server.                              |
| `BeginChangeToParentFolder` (`AsyncFtpClient`) | Begins the process of changing the current working folder of the FTP server to the parent folder.          |
| `BeginChangeTransferMode` (`AsyncFtpClient`) | Begins the process of changing the transfer mode. Don't forget to call `EndChangeTransferMode`!             |
| `BeginChangeUser` (`AsyncFtpClient`)   | Begins the process of changing the currently logged-in user without disconnecting from the FTP server.        |
| `BeginConnect` (`AsyncFtpClient`)      | Begins the connection process of the FTP client to an FTP server.                                             |
| `BeginCreateFolder` (`AsyncFtpClient`) | Begins the process of creating a folder on the FTP server.                                                   |
| `BeginDeleteFile` (`AsyncFtpClient`)   | Begins the process of deleting a file from the FTP server.                                                   |
| `BeginDeleteFolder` (`AsyncFtpClient`) | Begins the processing of deleting a folder from the FTP server.                                              |
| `BeginDisconnect` (`AsyncFtpClient`)   | Begins the process of disconnecting the FTP client from the FTP server to which it is connected.              |
| `BeginGetCurrentFolder` (`AsyncFtpClient`) | Begins the process of retrieving the current working folder of the FTP server.                            |
| `BeginGetDownloadStream` (`AsyncFtpClient`) | Begins the process of retrieving a direct access to the read-only data stream being received beginning at the specified offset. |
| `BeginGetFolderContents` (`AsyncFtpClient`) | Begins the process of retrieving the contents of the current working folder.                                |
| `BeginGetRawExtendedFeatures` (`AsyncFtpClient`) | Begins the process of retrieving a list of the extended features that are implemented by the FTP server. Don't forget to call `EndGetRawExtendedFeatures`! |
| `BeginGetRawFolderContents` (`AsyncFtpClient`) | Begins the process of retrieving an **unprocessed**, clear text list representing the contents of the current working folder as sent by the FTP server. |
| `BeginGetUploadStream` (`AsyncFtpClient`) | Begins the process of retrieving a direct access to the **write-only** data stream to send to.              |
| `BeginLogin` (`AsyncFtpClient`)        | Begins the login process of the FTP client to the FTP server to which it is connected.                        |
| `BeginReceiveFile` (`AsyncFtpClient`)  | Begins the process of receiving the specified file from the current working folder and stores it on the local system. |
| `BeginReceiveMultipleFiles` (`AsyncFtpClient`) | Begins the process of retrieving the files that match the provided file mask from the current working folder and stores them on the local system in the specified folder. |
| `BeginRenameFile` (`AsyncFtpClient`)   | Begins the process of renaming a file on the FTP server.                                                     |
| `BeginSendCustomCommand` (`AsyncFtpClient`) | Begins the process of sending a **custom** command to the FTP server.                                      |
| `BeginSendFile` (`AsyncFtpClient`)     | Begins the process of sending the specified file to the FTP server's current working folder.                  |
| `BeginSendFileToUniqueName` (`AsyncFtpClient`) | Begins the process of sending the specified file to the FTP server's current working folder and stores it using a unique filename. |
| `BeginSendMultipleFiles` (`AsyncFtpClient`) | Begins the process of sending the files that match the provided file mask to the FTP server's current working folder. |
| `ChangeCurrentFolder`                  | Changes the current working folder of the FTP server.                                                        |
| `ChangeToParentFolder`                 | Changes the current working folder of the FTP server to the parent folder.                                    |
| `ChangeTransferMode`                   | Changes the current transfer mode.                                                                           |
| `ChangeUser`                           | Changes the currently logged-in user without disconnecting from the FTP server.                               |
| `ClearCommandChannel`                  | Clears the command channel after login to facilitate firewall NAT when connecting using a secure data channel. |
| `Connect`                              | Connects the FTP client to an FTP server. This method will only connect you to the FTP server. Once connected, you must call the `Login` method to log in to the FTP server. |
| `CreateFolder`                         | Creates a folder on the FTP server.                                                                          |
| `DeleteFile`                           | Deletes a file from the FTP server.                                                                          |
| `DeleteFolder`                         | Deletes a folder from the FTP server.                                                                        |
| `Disconnect`                           | Disconnects the FTP client from the FTP server to which it is connected.                                      |

A list of the equivalent `FTP commands` that are sent by each method is also available [here](/ftp/basic-concepts/ftp-capabilities/ftp-glossary/ftp-commands).
