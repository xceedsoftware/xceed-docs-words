# Ftp Client Events

An *event* is a message *raised* by an object to signal the occurrence of an action. In order to receive event notifications, a caller must subscribe to the desired events.

Xceed FTP for .NET, via the `FtpClient` and `AsyncFtpClient` classes, exposes the following events which can be used to provide various information during an FTP operation.

:::note
`AsyncFtpClient`'s methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` and assign a **SynchronizingObject** to its `SynchronizingObject` property to improve code readability.
:::

Click on any one of the events listed below for detailed information regarding that event and examples of how it can be used.

| Events                                   | Description                                                                                 |
|------------------------------------------|---------------------------------------------------------------------------------------------|
| `CertificateReceived`                    | Raised when an FTP server's certificate was received and verified.                          |
| `CertificateRequired`                    | Raised when a client certificate is required by the FTP server, or the one provided was rejected. |
| `CommandSent`                            | Raised once for every command sent to the FTP server.                                       |
| `Disconnected`                           | Raised when the `Disconnect` method is called as well as when the connection is terminated by the FTP server. |
| `FileTransferStatus`                     | Raised for every 4Kb sent or received during a file transfer.                               |
| `MultipleFileTransferError`              | Raised when an error occurs while transferring multiple files to or from the FTP server to determine what action should be taken. |
| `ParsingListingLine`                     | Raised when a listing line is received from the FTP server.                                 |
| `ReceivingFile`                          | Raised for each file being received from the FTP server.                                    |
| `ReplyReceived`                          | Raised once for each reply received from the FTP server. If a reply contains multiple lines, they will be received as a group. |
| `SendingFile`                            | Raised for each file being sent to the FTP server.                                           |
| `StateChanged`                           | Raised when the `State` of the FTP client changes.                                           |

**Keep in mind that you should subscribe only to the necessary events to prevent a reduction in performance.**

A list of the equivalent `FTP commands` that are sent by each method is also available [here](/ftp/basic-concepts/ftp-capabilities/ftp-glossary/ftp-commands).
