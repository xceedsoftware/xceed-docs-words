import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Secure FTP (SSL/TLS)

As of version 2.0, Xceed FTP for .NET supports both SSL 3.0 and TLS (SSL 3.1). SSL and TLS are protocols layered above connection protocols (such as TCP /IP ) but beneath application protocols (such as FTP) that provide encrypted, authenticated communications between a client and a server. 

:::note
Secure FTP is not supported by Xceed FTP for .NET Compact Framework.
:::

## Implicit versus explicit SSL connections (per RFC 2228)

Connecting securely and authenticating are two distinct methods of establishing a secure connection with an FTP server. In the first case, the Secure FTP server may require an SSL connection to be established first, before it sends its initial welcome message. This is called an **implicit** SSL connection. In the second case,   the connection is established in clear text and a special FTP command must be sent to the Secure FTP server to change the connection into a secure connection. This is called an **explicit** SSL connection. 

In most cases, FTP servers that support SSL authentication will accept a normal connection on port 21. Once the connection is established, it is necessary to authenticate before logging in, using the `Authenticate` method. When securing the connection explicitly, it is also possible to secure data connections using the overload of the `Authenticate` method which requires a `DataChannelProtection` enum as a parameter. 

Servers that require an implicit SSL connection usually listen on port 990 rather than 21.

## Certificates
A certificate is a digitally signed statement from one entity (person, company, etc.) that states that the public key of another entity has a particular value. Trusting the certificate's signature implies that you trust that the association in the certificate between the specified public key and the other entity is authentic. 

The certificate that is received from the FTP server is verified against the VerificationFlags provided at connection or authentication. By default, if a certificate received from an FTP server contains anomalies, it will be rejected. If no anomalies are detected, it will be accepted. 

To reduce the severity with which the FTP server's certificate is verified, the `CertificateReceived` event must be handled and the verification flags modified. Once the verification flags have been modified, the verification action must be set to VerifyAgain to verify the server's certificate again. To indiscriminately accept the certificate received from the FTP sever, regardless of anomalies, the verification action must be set to Accept. 

Keep in mind that the server certificate that was accepted during the command channel connection will be the only certificate that will be accepted during the data channel connection. 

Client certificates can be sent to the FTP server when connecting (implicit SSL), when authenticating (explicit SSL), or via the `CertificateRequired` event. If the FTP server rejects the client certificate (or no certificate was provided when connecting or authenticating), the `CertificateRequired` event will be raised allowing a new certificate to be provided. If the same invalid certificate is provided in the `CertificateReceived` event, an exception will be thrown.

Client certificates are often optional. It depends on how the FTP server has been configured. If the `CertificateRequired` event is triggered, the server is informing you that you must supply a certificate for the connection to be successful.

:::caution
If different invalid certificates are provided in the `CertificateRequired` event, a loop will occur!
:::

Keep in mind that the client certificate that was used for the command channel connection will be the same one that is used for the data channel connection.

## SSL demonstration

<details>

  <summary>Example: Implicit SSL connection</summary>

  The following example demonstrates how to use an **implicit** SSL connection to securely connect to, log into, and disconnect from a secure FTP server using the `FtpClient` interface. We will handle the `CertificateReceived` event to validate the certificate received from the FTP server. For an explicit SSL connection demonstration, refer to the Quick Tour Sample. An example using the `FtpConnection` class follows below.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          static void ImplicitSSLExample()
          {
            try
            {
              FtpClient ftp = new FtpClient();
              //ftp.TraceWriter = Console.Out;

              // Subscribe to the CertificateReceived event
              ftp.CertificateReceived += new CertificateReceivedEventHandler( OnCertificateReceived );

              // Pick an authentication method
              AuthenticationMethod authenticationMethod = AuthenticationMethod.Ssl;

              // Pick verification flags. If unsure, pick 'None'.
              VerificationFlags verificationFlags = VerificationFlags.None;

              // Supply a client certificate to submit to the server. This example doesn't use one
              Certificate clientCertificate = null;

              // Connect implicitly to the server using encryption. Notice the port number reserved for this
              // This form always enables encryption for the data channel (for file transfers)
              ftp.Connect( "localhost", 990, authenticationMethod, verificationFlags, clientCertificate );

              try
              {
                // Login. The exchanged information will be encrypted
                ftp.Login( "username", "password" );

                /* Perform your file transfers */
              }
              finally
              {
                // Make sure we always disconnect
                ftp.Disconnect();

                ftp.CertificateReceived -= new CertificateReceivedEventHandler( OnCertificateReceived );
              }
            }
            catch( Exception exception )
            {
              // Output some information about it
              Console.WriteLine( "-->{0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

              // Fetch the inner exception
              exception = exception.InnerException;

              // While there is an exception
              while( exception != null )
              {
                // Output some information about it
                Console.WriteLine( "-->Inner exception: {0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

                // Fetch the inner exception
                exception = exception.InnerException;
              }
            }
          }

          static void OnCertificateReceived( object sender, CertificateReceivedEventArgs e )
          {
            // The Status argument property tells you if the server certificate was accepted
            // based on the VerificationFlags provided in the call to Connect().
            if( e.Status != VerificationStatus.ValidCertificate )
            {
              Console.WriteLine( "The server certificate is invalid: {0}", e.Status.ToString() );
              Console.WriteLine( e.ServerCertificate.ToString() );

              // You have three choices here:
              //
              //  1) Refuse the certificate by setting e.Action to VerificationAction.Reject,
              //      thus making the authentication fail. This is e.Action's default value
              //      when the server certificate isn't valid.
              //
              //  2) Set e.Flags to less restrictive criterion and ask the library to
              //      validate the certificate again by setting e.Action to
              //      VerificationAction.VerifyAgain.
              //
              //  3) Force the library to accept this certificate by setting e.Action to
              //      VerificationAction.Accept.
              //
              // We'll do #1 or #3, depending on the user's answer.

              Console.WriteLine( "Do you want to accept this certificate anyway? [Y/N]" );

              int answer = Console.Read();
              if( ( answer == 'y' ) || ( answer == 'Y' ) )
              {
                e.Action = VerificationAction.Accept;
              }
            }
            else
            {
              // e.Action's default value is VerificationAction.Accept
              Console.WriteLine( "Valid certificate received from server." );
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          Private Shared Sub ImplicitSSLExample()
          Try
            Dim ftp As New FtpClient()
            'ftp.TraceWriter = Console.Out;

            ' Subscribe to the CertificateReceived event
            AddHandler ftp.CertificateReceived, AddressOf OnCertificateReceived

            ' Pick an authentication method
            Dim authenticationMethod As AuthenticationMethod = AuthenticationMethod.Ssl

            ' Pick verification flags. If unsure, pick 'None'.
            Dim verificationFlags As VerificationFlags = VerificationFlags.None

            ' Supply a client certificate to submit to the server. This example doesn't use one
            Dim clientCertificate As Certificate = Nothing

            ' Connect implicitly to the server using encryption. Notice the port number reserved for this
            ' This form always enables encryption for the data channel (for file transfers)
            ftp.Connect("localhost", 990, authenticationMethod, verificationFlags, clientCertificate)

            Try
              ' Login. The exchanged information will be encrypted
              ftp.Login("username", "password")

              ' Perform your file transfers 
            Finally
              ' Make sure we always disconnect
              ftp.Disconnect()

              RemoveHandler ftp.CertificateReceived, AddressOf OnCertificateReceived
            End Try
          Catch exception As Exception
            ' Output some information about it
            Console.WriteLine("-->{0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

            ' Fetch the inner exception
            exception = exception.InnerException

            ' While there is an exception
            Do While exception IsNot Nothing
              ' Output some information about it
              Console.WriteLine("-->Inner exception: {0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

              ' Fetch the inner exception
              exception = exception.InnerException
            Loop
          End Try
        End Sub

        Private Shared Sub OnCertificateReceived(ByVal sender As Object, ByVal e As CertificateReceivedEventArgs)
          ' The Status argument property tells you if the server certificate was accepted
          ' based on the VerificationFlags provided in the call to Connect().
          If e.Status <> VerificationStatus.ValidCertificate Then
            Console.WriteLine("The server certificate is invalid: {0}", e.Status.ToString())
            Console.WriteLine(e.ServerCertificate.ToString())

            ' You have three choices here:
            '
            '  1) Refuse the certificate by setting e.Action to VerificationAction.Reject,
            '      thus making the authentication fail. This is e.Action's default value
            '      when the server certificate isn't valid.
            '
            '  2) Set e.Flags to less restrictive criterion and ask the library to
            '      validate the certificate again by setting e.Action to
            '      VerificationAction.VerifyAgain.
            '
            '  3) Force the library to accept this certificate by setting e.Action to
            '      VerificationAction.Accept.
            '
            ' We'll do #1 or #3, depending on the user's answer.

            Console.WriteLine("Do you want to accept this certificate anyway? [Y/N]")

            Dim answer As Integer = Console.Read()
            If (answer = AscW("y"c)) OrElse (answer = AscW("Y"c)) Then
              e.Action = VerificationAction.Accept
            End If
          Else
            ' e.Action's default value is VerificationAction.Accept
            Console.WriteLine("Valid certificate received from server.")
          End If
        End Sub
      ```
    </TabItem>
  </Tabs>
</details>

<details>

  <summary>Example: Explicit SSL connection</summary>
  
  Here, an explicit SSL connection is made:

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          static void ExplicitSSLExample()
          {
            try
            {
              FtpClient ftp = new FtpClient();
              //ftp.TraceWriter = Console.Out;

              // Subscribe to the CertificateReceived event
              ftp.CertificateReceived += new CertificateReceivedEventHandler( OnCertificateReceived );

              // Connect to the server normally, unencrypted, at the usual ftp port
              ftp.Connect( "localhost", 21 );

              try
              {
                // Pick an authentication method
                AuthenticationMethod authenticationMethod = AuthenticationMethod.Ssl;

                // Pick verification flags. If unsure, pick 'None'.
                VerificationFlags verificationFlags = VerificationFlags.None;

                // Supply a client certificate to submit to the server. This example doesn't use one
                Certificate clientCertificate = null;

                // Decide if the data channel (for file transfers) will be encrypted or not
                DataChannelProtection dataChannelProtection = DataChannelProtection.Private;

                // Authenticate and encrypt the connection
                ftp.Authenticate( authenticationMethod, verificationFlags, clientCertificate, dataChannelProtection );

                // Login. The exchanged information will be encrypted
                ftp.Login( "username", "password" );

                /* Perform your file transfers */
              }
              finally
              {
                // Make sure we always disconnect
                ftp.Disconnect();

                ftp.CertificateReceived -= new CertificateReceivedEventHandler( OnCertificateReceived );
              }
            }
            catch( Exception exception )
            {
              // Output some information about it
              Console.WriteLine( "-->{0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

              // Fetch the inner exception
              exception = exception.InnerException;

              // While there is an exception
              while( exception != null )
              {
                // Output some information about it
                Console.WriteLine( "-->Inner exception: {0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

                // Fetch the inner exception
                exception = exception.InnerException;
              }
            }
          }

          static void OnCertificateReceived( object sender, CertificateReceivedEventArgs e )
          {
            // The Status argument property tells you if the server certificate was accepted
            // based on the VerificationFlags provided in the call to Connect().
            if( e.Status != VerificationStatus.ValidCertificate )
            {
              Console.WriteLine( "The server certificate is invalid: {0}", e.Status.ToString() );
              Console.WriteLine( e.ServerCertificate.ToString() );

              // You have three choices here:
              //
              //  1) Refuse the certificate by setting e.Action to VerificationAction.Reject,
              //      thus making the authentication fail. This is e.Action's default value
              //      when the server certificate isn't valid.
              //
              //  2) Set e.Flags to less restrictive criterion and ask the library to
              //      validate the certificate again by setting e.Action to
              //      VerificationAction.VerifyAgain.
              //
              //  3) Force the library to accept this certificate by setting e.Action to
              //      VerificationAction.Accept.
              //
              // We'll do #1 or #3, depending on the user's answer.

              Console.WriteLine( "Do you want to accept this certificate anyway? [Y/N]" );

              int answer = Console.Read();
              if( ( answer == 'y' ) || ( answer == 'Y' ) )
              {
                e.Action = VerificationAction.Accept;
              }
            }
            else
            {
              // e.Action's default value is VerificationAction.Accept
              Console.WriteLine( "Valid certificate received from server." );
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          Private Shared Sub ExplicitSSLExample()
          Try
            Dim ftp As New FtpClient()
            'ftp.TraceWriter = Console.Out;

            ' Subscribe to the CertificateReceived event
            AddHandler ftp.CertificateReceived, AddressOf OnCertificateReceived

            ' Connect to the server normally, unencrypted, at the usual ftp port
            ftp.Connect("localhost", 21)

            Try
              ' Pick an authentication method
              Dim authenticationMethod As AuthenticationMethod = AuthenticationMethod.Ssl

              ' Pick verification flags. If unsure, pick 'None'.
              Dim verificationFlags As VerificationFlags = VerificationFlags.None

              ' Supply a client certificate to submit to the server. This example doesn't use one
              Dim clientCertificate As Certificate = Nothing

              ' Decide if the data channel (for file transfers) will be encrypted or not
              Dim dataChannelProtection As DataChannelProtection = DataChannelProtection.Private

              ' Authenticate and encrypt the connection
              ftp.Authenticate(authenticationMethod, verificationFlags, clientCertificate, dataChannelProtection)

              ' Login. The exchanged information will be encrypted
              ftp.Login("username", "password")

              ' Perform your file transfers 
            Finally
              ' Make sure we always disconnect
              ftp.Disconnect()

              RemoveHandler ftp.CertificateReceived, AddressOf OnCertificateReceived
            End Try
          Catch exception As Exception
            ' Output some information about it
            Console.WriteLine("-->{0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

            ' Fetch the inner exception
            exception = exception.InnerException

            ' While there is an exception
            Do While exception IsNot Nothing
              ' Output some information about it
              Console.WriteLine("-->Inner exception: {0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

              ' Fetch the inner exception
              exception = exception.InnerException
            Loop
          End Try
        End Sub

        Private Shared Sub OnCertificateReceived(ByVal sender As Object, ByVal e As CertificateReceivedEventArgs)
          ' The Status argument property tells you if the server certificate was accepted
          ' based on the VerificationFlags provided in the call to Connect().
          If e.Status <> VerificationStatus.ValidCertificate Then
            Console.WriteLine("The server certificate is invalid: {0}", e.Status.ToString())
            Console.WriteLine(e.ServerCertificate.ToString())

            ' You have three choices here:
            '
            '  1) Refuse the certificate by setting e.Action to VerificationAction.Reject,
            '      thus making the authentication fail. This is e.Action's default value
            '      when the server certificate isn't valid.
            '
            '  2) Set e.Flags to less restrictive criterion and ask the library to
            '      validate the certificate again by setting e.Action to
            '      VerificationAction.VerifyAgain.
            '
            '  3) Force the library to accept this certificate by setting e.Action to
            '      VerificationAction.Accept.
            '
            ' We'll do #1 or #3, depending on the user's answer.

            Console.WriteLine("Do you want to accept this certificate anyway? [Y/N]")

            Dim answer As Integer = Console.Read()
            If (answer = AscW("y"c)) OrElse (answer = AscW("Y"c)) Then
              e.Action = VerificationAction.Accept
            End If
          Else
            ' e.Action's default value is VerificationAction.Accept
            Console.WriteLine("Valid certificate received from server.")
          End If
        End Sub
      ```
    </TabItem>
  </Tabs>
</details>

## Client Certificates

Some FTP servers are configured to require the client to supply a client certificate when connecting using SSL/TLS.  Unfortunately, there is no way to know the requirement before making a connection. The FTP server administrator must communicate this requirement to you. The administrator will also provide you with the certificate that must be sent to the server when connection.

The .NET framework exposes certificates using the %System.Security.Cryptography.X509Certificates.X509Certificate2% class. The FTP component wraps this class into the `Certificate` class. The class can load X509 certificate files encoded in the DER or Base64 encoding. Most certificate files are encrypted and require a password, often called the private key, to decode them.

The .NET framework also supports the PKCS #7 file format with the %System.Security.Cryptography.Pkcs.SignedCms% class. In that case, however, a certificate file might contain more than one certificate so care will need to be taken when handling such files.

<details>

  <summary>Example: Client certificate from an encrypted DER file</summary>
  
  The following example shows the use of the `CertificateRequired` Event to supply a client certificate when the server requires one.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          static void ClientCertificateExample()
          {
            try
            {
              FtpClient ftp = new FtpClient();
              //ftp.TraceWriter = Console.Out;

              // Subscribe to the CertificateReceived event
              ftp.CertificateReceived += new CertificateReceivedEventHandler( OnCertificateReceived );

              // Subscribe to the CertificateRequired event
              ftp.CertificateRequired += new CertificateRequiredEventHandler( OnCertificateRequired );

              // Connect to the server normally, unencrypted, at the usual ftp port
              ftp.Connect( "localhost", 21 );

              try
              {
                // Pick an authentication method
                AuthenticationMethod authenticationMethod = AuthenticationMethod.Ssl;

                // Pick verification flags. If unsure, pick 'None'.
                VerificationFlags verificationFlags = VerificationFlags.None;

                /* In this example, we will not provide a client certificate at Connect(). Instead,
                * we subscribe to the CertificateRequired event and if the FTP server asks us for
                * a certificate, we will provide one at that time. 
                * 
                * That way, if the server is not configured to expect a certificate, it 
                * won't receive one for no reason. */

                // The client certificate to submit to the server
                Certificate clientCertificate = null;

                // Decide if the data channel (for file transfers) will be encrypted or not
                DataChannelProtection dataChannelProtection = DataChannelProtection.Private;

                // Authenticate and encrypt the connection
                ftp.Authenticate( authenticationMethod, verificationFlags, clientCertificate, dataChannelProtection );

                // Login. The exchanged information will be encrypted
                ftp.Login( "username", "password" );

                /* Perform your file transfers */
              }
              finally
              {
                // Make sure we always disconnect
                ftp.Disconnect();

                ftp.CertificateRequired -= new CertificateRequiredEventHandler( OnCertificateRequired );
                ftp.CertificateReceived -= new CertificateReceivedEventHandler( OnCertificateReceived );
              }
            }
            catch( Exception exception )
            {
              // Output some information about it
              Console.WriteLine( "-->{0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

              // Fetch the inner exception
              exception = exception.InnerException;

              // While there is an exception
              while( exception != null )
              {
                // Output some information about it
                Console.WriteLine( "-->Inner exception: {0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

                // Fetch the inner exception
                exception = exception.InnerException;
              }
            }
          }

          static void OnCertificateRequired( object sender, CertificateRequiredEventArgs e )
          {
            try
            {
              /* The .NET framework exposes certificates using the X509Certificate2 class.
              * The FTP component wraps this class into the Certificate class.
              * The class can load X509 certificate files encoded in the DER or Base64 encoding.
              * Most certificate files are encrypted and require a password, often called
              * the private key, to decode them. */

              // Load a certificate file to submit to the server
              Certificate clientCertificate = new Certificate( @"D:\Xceed\MyX509Certificate.der", "certificate password" );

              e.Certificate = clientCertificate;
            }
            catch( System.Security.Cryptography.CryptographicException )
            {
              // Trigger failure by not providing a certificate
              e.Certificate = null;
            }
          }

          static void OnCertificateReceived( object sender, CertificateReceivedEventArgs e )
          {
            // Always accept the certificate
            e.Action = VerificationAction.Accept;
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          Private Shared Sub ClientCertificateExample()
            Try
              Dim ftp As New FtpClient()
              'ftp.TraceWriter = Console.Out;

              ' Subscribe to the CertificateReceived event
              AddHandler ftp.CertificateReceived, AddressOf OnCertificateReceived

              ' Subscribe to the CertificateRequired event
              AddHandler ftp.CertificateRequired, AddressOf OnCertificateRequired

              ' Connect to the server normally, unencrypted, at the usual ftp port
              ftp.Connect("localhost", 21)

              Try
                ' Pick an authentication method
                Dim authenticationMethod As AuthenticationMethod = AuthenticationMethod.Ssl

                ' Pick verification flags. If unsure, pick 'None'.
                Dim verificationFlags As VerificationFlags = VerificationFlags.None

      '           In this example, we will not provide a client certificate at Connect(). Instead,
      '           * we subscribe to the CertificateRequired event and if the FTP server asks us for
      '           * a certificate, we will provide one at that time. 
      '           * 
      '           * That way, if the server is not configured to expect a certificate, it 
      '           * won't receive one for no reason. 

                ' The client certificate to submit to the server
                Dim clientCertificate As Certificate = Nothing

                ' Decide if the data channel (for file transfers) will be encrypted or not
                Dim dataChannelProtection As DataChannelProtection = DataChannelProtection.Private

                ' Authenticate and encrypt the connection
                ftp.Authenticate(authenticationMethod, verificationFlags, clientCertificate, dataChannelProtection)

                ' Login. The exchanged information will be encrypted
                ftp.Login("username", "password")

                ' Perform your file transfers 
              Finally
                ' Make sure we always disconnect
                ftp.Disconnect()

                RemoveHandler ftp.CertificateRequired, AddressOf OnCertificateRequired
                RemoveHandler ftp.CertificateReceived, AddressOf OnCertificateReceived
              End Try
            Catch exception As Exception
              ' Output some information about it
              Console.WriteLine("-->{0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

              ' Fetch the inner exception
              exception = exception.InnerException

              ' While there is an exception
              Do While exception IsNot Nothing
                ' Output some information about it
                Console.WriteLine("-->Inner exception: {0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

                ' Fetch the inner exception
                exception = exception.InnerException
              Loop
            End Try
          End Sub

          Private Shared Sub OnCertificateRequired(ByVal sender As Object, ByVal e As CertificateRequiredEventArgs)
            Try
      '         The.NET framework exposes certificates using the X509Certificate2 class.
      '         * The FTP component wraps this class into the Certificate class.
      '         * The class can load X509 certificate files encoded in the DER or Base64 encoding.
      '         * Most certificate files are encrypted and require a password, often called
      '         * the private key, to decode them. 

              ' Load a certificate file to submit to the server
              Dim clientCertificate As New Certificate("D:\Xceed\MyX509Certificate.der", "certificate password")

              e.Certificate = clientCertificate
            Catch e1 As System.Security.Cryptography.CryptographicException
              ' Trigger failure by not providing a certificate
              e.Certificate = Nothing
            End Try
          End Sub

          Private Shared Sub OnCertificateReceived(ByVal sender As Object, ByVal e As CertificateReceivedEventArgs)
            ' Always accept the certificate
            e.Action = VerificationAction.Accept
          End Sub
      ```
    </TabItem>
  </Tabs>
</details>

<details>

  <summary>Example: Client certificate from a PKCS #7 file</summary>
  
  Finally, this example shows the usage of the `System.Security.Cryptography.Pkcs.SignedCms ` class to select a single certificate from a PKCS #7 file.

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          static void ClientCertificateExample()
          {
            try
            {
              // Load the certificate file into a byte array
              byte[] certificateBytes = File.ReadAllBytes( @"D:\Xceed\PKCS7Certificates.p7b" );

              // Create an object that can decode the certificate data
              System.Security.Cryptography.Pkcs.SignedCms cms = new System.Security.Cryptography.Pkcs.SignedCms();
              
              // Decode the certificates
              cms.Decode( certificateBytes );

              FtpClient ftp = new FtpClient();
              //ftp.TraceWriter = Console.Out;

              string host = "localhost";
              int port = 990;

              // Pick an authentication method
              AuthenticationMethod authenticationMethod = AuthenticationMethod.Ssl;

              // Pick verification flags. If unsure, pick 'None'.
              VerificationFlags verificationFlags = VerificationFlags.None;

              // The client certificate to submit to the server
              Certificate clientCertificate = null;

              // Subscribe to the CertificateReceived event
              ftp.CertificateReceived += new CertificateReceivedEventHandler( OnCertificateReceived );

              /* A PKCS #7 file can contain more than one certificate. The certificates are in the collection
              * specified in the cms.Certificates property.
              * 
              * If you know which certificate the FTP server is waiting for, simply supply it to
              * the Connect() method. If you do not know which is the correct one, you can try to connect
              * using each one in turn until the server accepts one. */
              
              // Go through each certificate in the collection
              foreach( System.Security.Cryptography.X509Certificates.X509Certificate2 x509certificate in cms.Certificates )
              {
                // Create a client certificate out of the current x509 certificate
                clientCertificate = new Certificate( x509certificate );

                try
                {
                  // Connect implicitly to the server using encryption.
                  // This form always enables encryption for the data channel (for file transfers)
                  ftp.Connect( host, port, authenticationMethod, verificationFlags, clientCertificate );
                }
                catch( FtpSslException )
                {
                  // An FtpSslException exception will be thrown if the client certificate is rejected
                }

                // If we connected successfully to the server
                if( ftp.Connected )
                {
                  // No need to try again
                  break;
                }
              }

              try
              {
                // Login. The exchanged information will be encrypted
                ftp.Login( "username", "password" );

                /* Perform your file transfers */
              }
              finally
              {
                // Make sure we always disconnect
                ftp.Disconnect();

                ftp.CertificateReceived -= new CertificateReceivedEventHandler( OnCertificateReceived );
              }
            }
            catch( Exception exception )
            {
              // Output some information about it
              Console.WriteLine( "-->{0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

              // Fetch the inner exception
              exception = exception.InnerException;

              // While there is an exception
              while( exception != null )
              {
                // Output some information about it
                Console.WriteLine( "-->Inner exception: {0}: {1}\n{2}", exception.GetType().Name, exception.Message, exception.StackTrace );

                // Fetch the inner exception
                exception = exception.InnerException;
              }
            }
          }

          static void OnCertificateReceived( object sender, CertificateReceivedEventArgs e )
          {
            // Always accept the certificate
            e.Action = VerificationAction.Accept;
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET      
          Private Shared Sub ClientCertificateExample()
            Try
              ' Load the certificate file into a byte array
              Dim certificateBytes() As Byte = File.ReadAllBytes("D:\Xceed\PKCS7Certificates.p7b")

              ' Create an object that can decode the certificate data
              Dim cms As New System.Security.Cryptography.Pkcs.SignedCms()

              ' Decode the certificates
              cms.Decode(certificateBytes)

              Dim ftp As New FtpClient()
              'ftp.TraceWriter = Console.Out;

              Dim host As String = "localhost"
              Dim port As Integer = 990

              ' Pick an authentication method
              Dim authenticationMethod As AuthenticationMethod = AuthenticationMethod.Ssl

              ' Pick verification flags. If unsure, pick 'None'.
              Dim verificationFlags As VerificationFlags = VerificationFlags.None

              ' The client certificate to submit to the server
              Dim clientCertificate As Certificate = Nothing

              ' Subscribe to the CertificateReceived event
              AddHandler ftp.CertificateReceived, AddressOf OnCertificateReceived

      '         A PKCS #7 file can contain more than one certificate. The certificates are in the collection
      '         * specified in the cms.Certificates property.
      '         * 
      '         * If you know which certificate the FTP server is waiting for, simply supply it to
      '         * the Connect() method. If you do not know which is the correct one, you can try to connect
      '         * using each one in turn until the server accepts one. 

              ' Go through each certificate in the collection
              For Each x509certificate As System.Security.Cryptography.X509Certificates.X509Certificate2 In cms.Certificates
                ' Create a client certificate out of the current x509 certificate
                clientCertificate = New Certificate(x509certificate)

                Try
                  ' Connect implicitly to the server using encryption.
                  ' This form always enables encryption for the data channel (for file transfers)
                  ftp.Connect(host, port, authenticationMethod, verificationFlags, clientCertificate)
                Catch e1 As FtpSslException
                  ' An FtpSslException exception will be thrown if the client certificate is rejected
                End Try

                ' If we connected successfully to the server
                If ftp.Connected Then
                  ' No need to try again
                  Exit For
                End If
              Next x509certificate

              Try
                ' Login. The exchanged information will be encrypted
                ftp.Login("username", "password")

                ' Perform your file transfers 
              Finally
                ' Make sure we always disconnect
                ftp.Disconnect()

                RemoveHandler ftp.CertificateReceived, AddressOf OnCertificateReceived
              End Try
            Catch exception As Exception
              ' Output some information about it
              Console.WriteLine("-->{0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

              ' Fetch the inner exception
              exception = exception.InnerException

              ' While there is an exception
              Do While exception IsNot Nothing
                ' Output some information about it
                Console.WriteLine("-->Inner exception: {0}: {1}" & Constants.vbLf & "{2}", exception.GetType().Name, exception.Message, exception.StackTrace)

                ' Fetch the inner exception
                exception = exception.InnerException
              Loop
            End Try
          End Sub

          Private Shared Sub OnCertificateReceived(ByVal sender As Object, ByVal e As CertificateReceivedEventArgs)
            ' Always accept the certificate
            e.Action = VerificationAction.Accept
          End Sub
      ```
    </TabItem>
  </Tabs>
</details>