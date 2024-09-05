import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using the FXP Protocol

FXP stands for the File eXchange Protocol. It is a method of transferring data that uses FTP to transfer files from one remote server to another server without routing the file data through the client's connection. As such, it is a server-to-server protocol.

While FXP is referred as a distinct protocol, it is, in fact, simply a clever usage of the standard FTP protocol. No special server set up is required.

:::note
Some FTP servers disallow FXP file transfers for security reasons. The FTP client has no way to detect this. If an FXP transfer is attempted on a server that does not allow it, an exception will be thrown.
:::

In practice, making an FXP file transfers means that 2 FTP client objects are used. One for each FTP server. A file is selected on the first client, that client is connected to the source server. A destination path is selected on the second client, that client is connected to the destination server. The first client then initiates a FTP file transfer by asking the destination server to connect to the source server and retrieve the selected file.

For a FXP transfer to work, one client needs to have its FxpPassiveTransfer property set to true. The other client's value for the property needs to be set to false. Also, both clients must use the same value for the RepresentationType and TransferMode properties.

:::note
Xceed Ftp for .NET only supports making FXP transfers on unencrypted data channels. This means that when connecting to both source and destination FTP servers, the *dataProtection* parameter must be DataChannelProtection.Clear. It is, however, permitted for the control channel of either source of destination FTP client to be encrypted.
:::

The FXP functionality is available through both the `FtpClient` and the `FileSystem` interfaces.

<details>
  <summary>FXP file transfers using the FtpClient interface</summary>

  FXP transfers are initiated with the static method FtpClient.FxpCopy(). Before the method is called, the context must be properly set up.

  **Step by step instructions**

  1. Because FtpClient.FxpCopy() is static, two independent FtpClient objects are needed. One client for the source file on the source server, another client for the destination file on the destination server.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Create a FTP client to control our source server
          FtpClient sourceClient = new FtpClient();

          // Create a FTP client to control our destination server
          FtpClient destinationClient = new FtpClient();
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          ' Create a FTP client to control our source server
          Dim sourceClient As New FtpClient()

          ' Create a FTP client to control our destination server
          Dim destinationClient As New FtpClient()
      ```
    </TabItem>
  </Tabs>

  2. Connect to each server using the needed credentials for each server.
  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Connect to the source server
          sourceClient.Connect( "localhost", 21 );
          sourceClient.Login( "normal", "normal" );

          // Connect to the destination server
          destinationClient.Connect( "localhost", 23 );
          destinationClient.Login( "normal", "normal" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          ' Connect to the source server
          sourceClient.Connect("localhost", 21)
          sourceClient.Login("normal", "normal")

          ' Connect to the destination server
          destinationClient.Connect("localhost", 23)
          destinationClient.Login("normal", "normal")
      ```
    </TabItem>
  </Tabs>

  3. Make sure the properties on each FtpClient are valid for FXP transfers.
  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          /* For a FXP transfer, only one client can be setup for passive transfer.
            The FxpServer enumeration allows to select either the source or destination client
            as the one that will be setup as passive.
            
            A FxpServer value is supplied to FtpClient.FxpCopy() */
          FxpServer passiveServer = FxpServer.Source;

          /* For a FXP transfer, both clients must use the same representation type.
          The default values suit us fine here. */
          //sourceClient.RepresentationType = RepresentationType.Binary;
          //destinationClient.RepresentationType = RepresentationType.Binary;

          /* For a FXP transfer, both clients must use the same transfer mode.
          The default values suit us fine here. */
          //sourceClient.TransferMode = TransferMode.Stream;
          //destinationClient.TransferMode = TransferMode.Stream;
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          '         For a FXP transfer, only one client can be setup for passive transfer.
          '           The FxpServer enumeration allows to select either the source or destination client
          '           as the one that will be setup as passive.
          '          
          '           A FxpServer value is supplied to FtpClient.FxpCopy() 
                  Dim passiveServer As FxpServer = FxpServer.Source

          '         For a FXP transfer, both clients must use the same representation type.
          '         The default values suit us fine here. 
                  'sourceClient.RepresentationType = RepresentationType.Binary;
                  'destinationClient.RepresentationType = RepresentationType.Binary;

          '         For a FXP transfer, both clients must use the same transfer mode.
          '         The default values suit us fine here. 
                  'sourceClient.TransferMode = TransferMode.Stream;
                  'destinationClient.TransferMode = TransferMode.Stream;
      ```
    </TabItem>
  </Tabs>

  4. Select source and destination files and call FtpClient.FxpCopy().
  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Change the current folder on the source server to get to the file we want
          sourceClient.ChangeCurrentFolder( "normal1" );

          // Copy a file from the source server's current folder to the destination server giving the file a specific name
          FtpClient.FxpCopy( sourceClient, "tvDebug.log", destinationClient, "FxpCopy.xml", passiveServer );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          ' Change the current folder on the source server to get to the file we want
          sourceClient.ChangeCurrentFolder("normal1")

          ' Copy a file from the source server's current folder to the destination server giving the file a specific name
          FtpClient.FxpCopy(sourceClient, "tvDebug.log", destinationClient, "FxpCopy.xml", passiveServer)
      ```
    </TabItem>
  </Tabs>

**Putting it all together**

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Create a FTP client to control our source server
          FtpClient sourceClient = new FtpClient();

          // Create a FTP client to control our destination server
          FtpClient destinationClient = new FtpClient();

          try
          {
            // Connect to the source server
            sourceClient.Connect( "localhost", 21 );

            /* FXP transfers cannot be performed over encrypted data channels. While it is ok
            to encrypt the control channel, the data channel must remain clear. The DataChannelProtection.Clear
            value ensures that. */
            //sourceClient.Authenticate( AuthenticationMethod.Tls, VerificationFlags.None, null, DataChannelProtection.Clear );
            
            // Login to the source server
            sourceClient.Login( "normal", "normal" );

            // Connect to the destination server
            destinationClient.CertificateReceived += delegate( object sender, CertificateReceivedEventArgs e )
            {
              e.Action = VerificationAction.Accept;
            };

            destinationClient.Connect( "localhost", 10021 );

            /* FXP transfers cannot be performed over encrypted data channels. While it is ok
            to encrypt the control channel, the data channel must remain clear. The DataChannelProtection.Clear
            value ensures that. */
            //destinationClient.Authenticate( AuthenticationMethod.Ssl, VerificationFlags.None, null, DataChannelProtection.Clear );
            
            // Login to the destination server
            destinationClient.Login( "normal", "normal" );

            /* For a FXP transfer, only one client can be setup for passive transfer.
              The FxpServer enumeration allows to select either the source or destination client
              as the one that will be setup as passive.
              
              A FxpServer value is supplied to FtpClient.FxpCopy() */
            FxpServer passiveServer = FxpServer.Source;

            // Change the current folder on the source server to get to the file we want
            sourceClient.ChangeCurrentFolder( "normal1" );

            // Copy a file from the source server's current folder to the destination server giving the file a specific name
            FtpClient.FxpCopy( sourceClient, "tvDebug.log", destinationClient, "FxpCopy.xml", passiveServer );

            // Copy a file from a specific path on the source server to the destination server using the same name
            FtpClient.FxpCopy( sourceClient, "/SftpFolder5/Folder2/ntprint.inf", destinationClient, "ntprint.inf", passiveServer );

            // Copy a file from a specific path on the source server to a specific folder relative to the current folder on the destination server
            FtpClient.FxpCopy( sourceClient, "/SftpFolder5/Folder2/ntprint.inf", destinationClient, "Folder2/ntprint.inf", passiveServer );
          }
          finally
          {
            if( sourceClient.Connected )
              sourceClient.Disconnect();

            if( destinationClient.Connected )
              destinationClient.Disconnect();
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          ' Create a FTP client to control our source server
          Dim sourceClient As New FtpClient()

          ' Create a FTP client to control our destination server
          Dim destinationClient As New FtpClient()

          Try
            ' Connect to the source server
            sourceClient.Connect("localhost", 21)

    '         FXP transfers cannot be performed over encrypted data channels. While it is ok
    '         to encrypt the control channel, the data channel must remain clear. The DataChannelProtection.Clear
    '         value ensures that. 
            'sourceClient.Authenticate( AuthenticationMethod.Tls, VerificationFlags.None, null, DataChannelProtection.Clear );

            ' Login to the source server
            sourceClient.Login("normal", "normal")

            ' Connect to the destination server
            AddHandler destinationClient.CertificateReceived, AddressOf AnonymousMethod1

            destinationClient.Connect("localhost", 10021)

    '         FXP transfers cannot be performed over encrypted data channels. While it is ok
    '         to encrypt the control channel, the data channel must remain clear. The DataChannelProtection.Clear
    '         value ensures that. 
            'destinationClient.Authenticate( AuthenticationMethod.Ssl, VerificationFlags.None, null, DataChannelProtection.Clear );

            ' Login to the destination server
            destinationClient.Login("normal", "normal")

    '         For a FXP transfer, only one client can be setup for passive transfer.
    '           The FxpServer enumeration allows to select either the source or destination client
    '           as the one that will be setup as passive.
    '          
    '           A FxpServer value is supplied to FtpClient.FxpCopy() 
            Dim passiveServer As FxpServer = FxpServer.Source

            ' Change the current folder on the source server to get to the file we want
            sourceClient.ChangeCurrentFolder("normal1")

            ' Copy a file from the source server's current folder to the destination server giving the file a specific name
            FtpClient.FxpCopy(sourceClient, "tvDebug.log", destinationClient, "FxpCopy.xml", passiveServer)

            ' Copy a file from a specific path on the source server to the destination server using the same name
            FtpClient.FxpCopy(sourceClient, "/SftpFolder5/Folder2/ntprint.inf", destinationClient, "ntprint.inf", passiveServer)

            ' Copy a file from a specific path on the source server to a specific folder relative to the current folder on the destination server
            FtpClient.FxpCopy(sourceClient, "/SftpFolder5/Folder2/ntprint.inf", destinationClient, "Folder2/ntprint.inf", passiveServer)
          Finally
            If sourceClient.Connected Then
              sourceClient.Disconnect()
            End If

            If destinationClient.Connected Then
              destinationClient.Disconnect()
            End If
          End Try
      ```
    </TabItem>
  </Tabs>

</details>

<details>
  <summary>FXP file transfers using the FileSystem interface</summary>

  With the FileSystem interface, FXP transfers are initiated automatically when the context of a call to Copy() meets the requirements for a FXP transfer. Because of this, FXP transfers are disabled by default so that behavior from previous versions is preserved and that you retain control over when FXP transfers are made.

  If the context of a transfer doesn't meet requirements or FXP transfers are disabled, a standard FTP transfer is performed. No error message or event is triggered by the decision. The process is automatic.

  FXP transfer permissions are controlled by values of the `FxpTransferPolicy Enumeration` in the `FtpConnection.FxpTransferPolicy` Property. Then the context for the transfer is set up and the transfer is initiated with a normal call to `CopyTo()`.

  **Step by step instructions**

  1. Two independent FtpConnection objects are needed. One connection for the source file on the source server, another connection for the destination file on the destination server.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Connect to the source server
          FtpConnection sourceClient = new FtpConnection( "localhost", 21, "normal", "normal" );

          // Connect to the destination server
          FtpConnection destinationClient = new FtpConnection( "localhost", 23, "normal", "normal" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          ' Connect to the source server
          Dim sourceClient As New FtpConnection("localhost", 21, "normal", "normal")

          ' Connect to the destination server
          Dim destinationClient As New FtpConnection("localhost", 23, "normal", "normal")
      ```
    </TabItem>
  </Tabs>

  2. Make sure FXP is enabled on each FtpConnection and that the properties are valid for FXP transfers.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          /* By default, the FXP transfer policy is to not allow any FXP transfers. */

          // Enable FXP uploads on the source client
          sourceClient.FxpTransferPolicy = FxpTransferPolicy.AcceptOutgoingTransfers;

          // Enable FXP downloads on the destination client
          destinationClient.FxpTransferPolicy = FxpTransferPolicy.AcceptIncomingTransfers;

          /* For a FXP transfer, only one client can have the FxpPassiveTransfer property set to true.
            The default value for the property is true. So we need to set the property to false
            on one of the two clients. */
          destinationClient.FxpPassiveTransfer = false;

          /* For a FXP transfer, both clients must use the same transfer mode.
          The default values suit us fine here. */
          //sourceClient.TransferMode = TransferMode.Stream;
          //destinationClient.TransferMode = TransferMode.Stream;
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
              ' By default, the FXP transfer policy is to not allow any FXP transfers. 

              ' Enable FXP uploads on the source client
              sourceClient.FxpTransferPolicy = FxpTransferPolicy.AcceptOutgoingTransfers

              ' Enable FXP downloads on the destination client
              destinationClient.FxpTransferPolicy = FxpTransferPolicy.AcceptIncomingTransfers

        '       For a FXP transfer, only one client can have the FxpPassiveTransfer property set to true.
        '        The default value for the property is true. So we need to set the property to false
        '        on one of the two clients. 
              destinationClient.FxpPassiveTransfer = False

        '       For a FXP transfer, both clients must use the same transfer mode.
        '       The default values suit us fine here. 
              'sourceClient.TransferMode = TransferMode.Stream;
              'destinationClient.TransferMode = TransferMode.Stream;
      ```
    </TabItem>
  </Tabs>

  3. Select source and destination files and call CopyTo().
  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          AbstractFolder sourceFolder;
          AbstractFile sourceFile, destinationFile;

          // Copy a file from the source server to the destination server giving the file a specific name
          sourceFolder = new FtpFolder( sourceClient, "normal1" );
          sourceFile = sourceFolder.GetFile( "tvDebug.log" );
          destinationFile = new FtpFile( destinationClient, "FxpCopy.xml" );

          /* There is no special method to perform FXP transfers. CopyTo() examines the context
            of the transfer. If it involves FTP files at both source and destination on two different
            servers, the FXP transfer policy and other parameters are valid for FXP, it will be
            initiated. If not, a standard file transfer will be made. */

          sourceFile.CopyTo( destinationFile, true );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
              Dim sourceFolder As AbstractFolder
              Dim sourceFile, destinationFile As AbstractFile

              ' Copy a file from the source server to the destination server giving the file a specific name
              sourceFolder = New FtpFolder(sourceClient, "normal1")
              sourceFile = sourceFolder.GetFile("tvDebug.log")
              destinationFile = New FtpFile(destinationClient, "FxpCopy.xml")

        '       There is no special method to perform FXP transfers. CopyTo() examines the context
        '        of the transfer. If it involves FTP files at both source and destination on two different
        '        servers, the FXP transfer policy and other parameters are valid for FXP, it will be
        '        initiated. If not, a standard file transfer will be made. 

              sourceFile.CopyTo(destinationFile, True)
      ```
    </TabItem>
  </Tabs>

  **Putting it all together**
  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          // Connect to the source server
          using( FtpConnection sourceClient = new FtpConnection( "localhost", 21, "normal", "normal" ) )
          {
            sourceClient.TraceWriter = new StreamWriter( @"sourceClient.log", false );

            // Connect to the destination server
            using( FtpConnection destinationClient = new FtpConnection( "localhost", 23, "normal", "normal" ) )
            {
              /* For a FXP transfer, only one client can have the FxpPassiveTransfer property set to true.
              The default value for the property is true. So we need to set the property to false
              on one of the two clients. */
              destinationClient.FxpPassiveTransfer = false;

              /* By default, the FXP transfer policy is to not allow any FXP transfers. */

              // Enable FXP uploads on the source client
              sourceClient.FxpTransferPolicy = FxpTransferPolicy.AcceptOutgoingTransfers;

              // Enable FXP downloads on the destination client
              destinationClient.FxpTransferPolicy = FxpTransferPolicy.AcceptIncomingTransfers;

              AbstractFolder sourceFolder, destinationFolder;
              AbstractFile sourceFile, destinationFile;

              // Copy a file from the source server to the destination server giving the file a specific name
              sourceFolder = new FtpFolder( sourceClient, "normal1" );
              sourceFile = sourceFolder.GetFile( "tvDebug.log" );
              destinationFile = new FtpFile( destinationClient, "FxpCopy.xml" );
              
              /* There is no special method to perform FXP transfers. CopyTo() examines the context
              of the transfer. If it involves FTP files at both source and destination on two different
              servers, the FXP transfer policy and other parameters are valid for FXP, it will be
              initiated. If not, a standard file transfer will be made. */
              
              sourceFile.CopyTo( destinationFile, true );

              // Copy a file from a specific path on the source server to the destination server using the same name
              sourceFile = new FtpFile( sourceClient, @"\SftpFolder5\Folder2\ntprint.inf" );
              destinationFolder = new FtpFolder( destinationClient );
              sourceFile.CopyTo( destinationFolder, true );

              // Copy a file from a specific path on the source server to a specific folder relative to the home folder on the destination server
              sourceFile = new FtpFile( sourceClient, @"\SftpFolder5\Folder2\ntprint.inf" );
              destinationFolder = new FtpFolder( destinationClient, "Folder2" );
              sourceFile.CopyTo( destinationFolder, true );
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
              ' Connect to the source server
              Using sourceClient As New FtpConnection("localhost", 21, "normal", "normal")
                sourceClient.TraceWriter = New StreamWriter("sourceClient.log", False)

                ' Connect to the destination server
                Using destinationClient As New FtpConnection("localhost", 23, "normal", "normal")
        '           For a FXP transfer, only one client can have the FxpPassiveTransfer property set to true.
        '           The default value for the property is true. So we need to set the property to false
        '           on one of the two clients. 
                  destinationClient.FxpPassiveTransfer = False

                  ' By default, the FXP transfer policy is to not allow any FXP transfers. 

                  ' Enable FXP uploads on the source client
                  sourceClient.FxpTransferPolicy = FxpTransferPolicy.AcceptOutgoingTransfers

                  ' Enable FXP downloads on the destination client
                  destinationClient.FxpTransferPolicy = FxpTransferPolicy.AcceptIncomingTransfers

                  Dim sourceFolder, destinationFolder As AbstractFolder
                  Dim sourceFile, destinationFile As AbstractFile

                  ' Copy a file from the source server to the destination server giving the file a specific name
                  sourceFolder = New FtpFolder(sourceClient, "normal1")
                  sourceFile = sourceFolder.GetFile("tvDebug.log")
                  destinationFile = New FtpFile(destinationClient, "FxpCopy.xml")

        '           There is no special method to perform FXP transfers. CopyTo() examines the context
        '           of the transfer. If it involves FTP files at both source and destination on two different
        '           servers, the FXP transfer policy and other parameters are valid for FXP, it will be
        '           initiated. If not, a standard file transfer will be made. 

                  sourceFile.CopyTo(destinationFile, True)

                  ' Copy a file from a specific path on the source server to the destination server using the same name
                  sourceFile = New FtpFile(sourceClient, "\SftpFolder5\Folder2\ntprint.inf")
                  destinationFolder = New FtpFolder(destinationClient)
                  sourceFile.CopyTo(destinationFolder, True)

                  ' Copy a file from a specific path on the source server to a specific folder relative to the home folder on the destination server
                  sourceFile = New FtpFile(sourceClient, "\SftpFolder5\Folder2\ntprint.inf")
                  destinationFolder = New FtpFolder(destinationClient, "Folder2")
                  sourceFile.CopyTo(destinationFolder, True)
                End Using
              End Using
      ```
    </TabItem>
  </Tabs>

</details>