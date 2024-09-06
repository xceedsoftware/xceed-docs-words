import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How To Make An Explicit Secure Connection

Here is an example on how to make an explicit **SSL** connection.

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