# The FTP protocol

The File Transfer Protocol (FTP) was first submitted as a Request For Comments (RFC) in 1971. The original proposition evolved into RFC 959, in October 1985, which is the official specification in use today. 

The FTP protocol is a relatively simple protocol that allows access to a remote file system in a standard way. It comprises commands for manipulating and navigating remote directories, manipulating remote files (rename, delete, etc.), and of course transferring files. It is designed to be used interactively by human end-users as well as by automated processes. 

Being targeted for the Internet, it was designed as a platform-independent protocol from the ground up. Therefore, the specification includes provisions for handling cross-platform issues (such as text encoding) and for dealing with files and directories in a common denominator fashion. 

FTP has grown to be the de facto protocol used for transferring files on the Internet. Huge public and private software archives are using FTP. Many organizations use FTP as a means to transfer data files between remote offices and their headquarters. Many companies provide software updates to their customers via an FTP server. Even with the emergence of HTTP, which is mainly used to fetch HTML files from a server, FTP is still widely used.

As of version 3.5, support for MODE Z data compression during transfer, and "Knowledge of Extra Capabilities", also known as the FEAT command, were added.

## Technical details

The FTP protocol model is composed of a user process and a server process. The user begins by initiating a control connection to the server, which by default listens on TCP port 21. Once the control connection is established, it will remain open for the duration of the session, and will be used to exchange commands and replies between the client and the server. 

The information exchanged on the control connection is text-based, and therefore human-readable. All FTP commands are 3 or 4 letter words, followed by optional arguments. All FTP replies begin with a 3-digit numeric code, followed by optional detail text. Each digit in the reply code has a particular meaning. For instance, all codes beginning with 2 are positive (success) replies, and all codes beginning with 5 are negative (failure) replies. 

Most FTP servers require user authentication before allowing any other commands to be executed. The authentication scheme used by FTP is a pretty simple one, where a user name and a password need to be sent to and validated by the server. The scheme is far from being perfect, the biggest flaw being its vulnerability to network spies, because the authentication username and password are sent as clear text on the control connection. 

All commands that require data to be transferred between the two hosts require a second connection to be established. This second connection is called the data connection . The data connection is used for transferring files (upload or download) and for transferring directory listings. The data connection is usually closed after each transfer, and re-opened as needed. 

There are two ways in which a data connection can be established: either the server or the client can be responsible for initiating the connection. The scenario in which the client initiates the data connection is commonly referred to as "passive transfer", since the PASV command is implied. This is the preferred way of initiating the data connection, because most firewalls will prevent incoming connections from the outside world, but will allow outgoing connections to pass through. 