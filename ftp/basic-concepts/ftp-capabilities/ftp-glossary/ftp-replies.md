# FTP replies

A reply is an acknowledgment (positive or negative) sent from server to user via the control connection in response to FTP commands. The general form of a reply is a completion code (including error codes) followed by a text string. The codes are for use by programs and the text is usually intended for human users.

There are 5 categories of replies that can be returned by an FTP server. These are:

| Reply type                 | Description                                                                                                                                         |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **PositivePreliminary**     | The requested action is being initiated and another reply should be expected before proceeding with a new command. Any reply between 100 and 159 inclusively is a positive preliminary reply. |
| **PositiveCompletion**      | The requested action has been successfully completed and a new request may be initiated. Any reply between 200 and 259 inclusively is a positive completion reply.                         |
| **PositiveIntermediate**    | The command has been accepted, but the requested action is being held in abeyance, pending receipt of further information. Another command specifying this information is expected by the FTP server. Any reply between 300 and 359 inclusively is a positive intermediate reply. |
| **TransientNegativeCompletion** | The command was not accepted and the requested action did not take place, but the error condition is temporary and the action may be requested again. Any reply between 400 and 459 inclusively is a transient negative completion reply. |
| **PermanentNegativeCompletion** | The command was not accepted and the requested action did not take place. Any reply between 500 and 559 inclusively is a permanent negative completion reply. |

The following table provides a list of all the replies that can be returned by an FTP server:

| Reply  | Description                                                                                                   |
|--------|---------------------------------------------------------------------------------------------------------------|
| 110    | Restart marker reply.                                                                                          |
| 120    | Service ready in nnn minutes.                                                                                  |
| 125    | Data connection already open; transfer starting.                                                               |
| 150    | File status okay; about to open data connection.                                                               |
| 200    | Command okay.                                                                                                  |
| 202    | Command not implemented, superfluous at this site.                                                             |
| 211    | System status, or system help reply.                                                                           |
| 212    | Directory status.                                                                                              |
| 213    | File status.                                                                                                   |
| 214    | Help message.                                                                                                  |
| 215    | NAME system type.                                                                                              |
| 220    | Service ready for new user.                                                                                    |
| 221    | Service closing control connection.                                                                            |
| 225    | Data connection open; no transfer in progress.                                                                 |
| 226    | Closing data connection.                                                                                       |
| 227    | Entering Passive Mode (h1,h2,h3,h4,p1,p2).                                                                     |
| 230    | User logged in, proceed.                                                                                       |
| 250    | Requested file action okay, completed.                                                                         |
| 257    | "PATHNAME" created.                                                                                            |
| 331    | User name okay, need password.                                                                                 |
| 332    | Need account for login.                                                                                        |
| 350    | Requested file action pending further information.                                                             |
| 421    | Service not available, closing control connection.                                                             |
| 425    | Can't open data connection.                                                                                    |
| 426    | Connection closed; transfer aborted.                                                                           |
| 450    | Requested file action not taken. File unavailable (e.g., file busy).                                           |
| 451    | Requested action aborted: local error in processing.                                                           |
| 452    | Requested action not taken. Insufficient storage space in system.                                              |
| 500    | Syntax error, command unrecognized.                                                                            |
| 501    | Syntax error in parameters or arguments.                                                                       |
| 502    | Command not implemented.                                                                                       |
| 503    | Bad sequence of commands.                                                                                      |
| 504    | Command not implemented for that parameter.                                                                    |
| 530    | Not logged in.                                                                                                 |
| 532    | Need account for storing files.                                                                                |
| 550    | Requested action not taken. File unavailable (e.g., file not found, no access).                                |
| 551    | Requested action aborted: page type unknown.                                                                   |
| 552    | Requested file action aborted. Exceeded storage allocation (for current directory or dataset).                 |
| 553    | Requested action not taken. File name not allowed.      