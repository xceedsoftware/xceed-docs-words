import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How To Handle a PKCS #7 Formatted Client Certificate

Here is an example on how to handle a PKCS #7 formatted client certificate when making an **SSL** connection.

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