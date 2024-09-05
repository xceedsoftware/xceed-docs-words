# FTP Client Properties

Xceed FTP for .NET, via the `FtpClient` and `AsyncFtpClient` classes, exposes the following properties, which can be used to determine the behavior of the FTP client when it connects and is connected to an FTP server.

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. Therefore, the AsyncFtpClient class is now considered obsolete. It is recommended to use `FtpClient` and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability.
:::

Click on any of the properties listed below for detailed information about that property and how it affects the FTP client.

| Properties                 | Description                                                                                                                                                            |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Busy`      | Indicates if the FTP client is currently performing an FTP operation.                                                                                                   |
| `Connected` | Indicates if the FTP client is connected to an FTP server.                                                                                                             |
| `Encoding`  | The **Encoding** that is used to encode commands sent to the server and decode replies and folder listings received from the server.                                     |
| `HostName`  | The host name used to connect.                                                                                                                                         |
| `KeepAliveInterval` | The interval, in seconds, at which a NOOP command is sent on the command channel while idle or during a file transfer.                                            |
| `ListingParsers` | A collection of `FtpListingParser` objects that are used to parse the listing lines returned when retrieving the contents of a remote folder.       |
| `LocalAddress` | The local IP address and port from which the FTP client is connected.                                                                                                |
| `LocalDataAddress` | The IP address and port of the client-side data connection for subsequent data connections.                                                                        |
| `PassiveTransfer` | Indicates if the FTP client should initiate the data connection rather than the FTP server.                                                                        |
| `PreAllocateStorage` | Indicates if the FTP server must reserve enough space **before** a file is sent.                                                                                  |
| `Proxy`    | The proxy client to use for connecting and/or logging in via a proxy server (supports only HTTP proxy servers).                                                          |
| `RepresentationType` | Indicates how the data is transferred to and from the FTP server.                                                                                                |
| `SendTelnetInterruptSignal` | Indicates if the Telnet interrupt signal should be sent before the QUIT command, allowing the FTP server to be notified of the connection termination.         |
| `SendTypeCommand` | Indicates if the TYPE command should be sent before initiating a file transfer.                                                                                     |
| `ServerAddress` | The IP address and port to which the FTP client is connected.                                                                                                        |
| `ServerFolderSeparator` | The FTP server's folder separator character.                                                                                                                   |
| `State`    | Indicates the current state of the FTP client.                                                                                                                          |
| `SynchronizingObject` | The object used to marshal event-handler calls that are issued when an interval has elapsed.                                                                     |
| `Timeout`  | Indicates, in seconds, after what period of time an FTP operation should time out.                                                                                       |
| `TraceWriter` | Traces the connection/disconnection process and the commands and replies exchanged with the FTP server.                                                                |
| `TransferMode` | The transfer mode used to send and receive data to and from an FTP server.                                                                                            |
| `UseRemoteAddress` | Indicates if the remote address should be used for transfers.                                                                                                      |
