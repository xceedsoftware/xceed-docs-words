import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How To Send a Client Certificate

Here is an example on how to send a client certificate when making a **SSL** connection.

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