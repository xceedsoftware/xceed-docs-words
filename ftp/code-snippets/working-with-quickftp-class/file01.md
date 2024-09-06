import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to receive items from an FTP server

This topic demonstrates how to receive items from an FTP server using the static Receive method of the `QuickFtp` class.

## Receive method

The Receive method has various overloads that can be used to receive files from a server. Some only require that you specify the hostname, the local destination folder, and the files to receive, while others provide options such as a using username and password, port numbers, authentication, whether to replace existing files, preserve paths, proxies, passive transfers, synchronizing objects, etc. For details on the other overloads, see the reference documentation.

## Demonstration
In the following example, we specify the hostname, a port number, a username and a password, the local destination folder, various delegates for handling events, and the file to receive. For more details on how to work with receiving certificates, see Xceed's Snippet Explorer.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using Xceed.Ftp;

          // If your trial period has expired, you must purchase a registered license key,
          // uncomment the appropriate line of code below, and insert your registered license key.
          // For more information, jump to the How the 45-day trial works and the
          // How to license the component once you purchase topics.
          // For Xceed Ftp for .NET:
          //Xceed.Ftp.Licenser.LicenseKey = "FTNXX-XXXXX-XXXXX-XXXX";

          // For Xceed Ftp for .NET Compact Framework:
          // Xceed.Ftp.Licenser.LicenseKey = "FTCXX-XXXXX-XXXXX-XXXX";

          // Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.
          QuickFtp.Receive( "localhost", 21, "username", "password", 
                            AuthenticationMethod.None, VerificationFlags.None,
                            null, DataChannelProtection.Clear, false,
                            @"d:\", true, true, true, null,
                            new QuickFtp.CertificateReceivedCallback( this.OnCertificateReceived ),
                            new QuickFtp.CertificateRequiredCallback( this.OnCertificateRequired ),
                            new QuickFtp.ByteProgressionCallback( this.OnByteProgression ),
                            new QuickFtp.ItemProgressionCallback( this.OnItemProgression ),
                            null,  @"\test\test.txt\");

          public void OnCertificateReceived(  Certificate serverCertificate,
                                              VerificationAction verificationAction,
                                              VerificationFlags verificationFlags,
                                              VerificationStatus verificationStatus )
          {
            //Do stuff
          }

          public void OnCertificateRequired( Certificate certificate )
          { 
            // Set your certificate here
          }

          public void OnByteProgression( string currentItemName,
                                        long currentItemsByteProcessed,
                                        long currentItemTotalBytes,
                                        byte currentItemPercent,
                                        long allItemsByteProcessed,
                                        long allItemsTotalBytes,
                                        byte allItemsPercent,
                                        object userParams)
          {
            //Do stuff
          }

          public void OnItemProgression( string currentItemName,
                                        long itemProcessed,
                                        long totalItemCount,
                                        byte totalItemPercent,
                                        ref bool abort,
                                        object userParams)
          {
            //Do stuff
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.Ftp

        ' If your trial period has expired, you must purchase a registered license key,
        ' uncomment the appropriate line of code below, and insert your registered license key.
        ' For more information, jump to the How the 45-day trial works and the
        ' How to license the component once you purchase topics.
        ' For Xceed Ftp for .NET:
        'Xceed.Ftp.Licenser.LicenseKey = "FTPXX-XXXXX-XXXXX-XXXX"

        ' For Xceed Ftp for .NET Compact Framework:
        'Xceed.Ftp.Licenser.LicenseKey = "FTCXX-XXXXX-XXXXX-XXXX"

        ' Note: Pathnames must be modified for code snippets to work under the .NET Compact Framework.

        QuickFtp.Receive("localhost", 21, "username", "password", _ 
                        AuthenticationMethod.None, VerificationFlags.None, Nothing, _ 
                        DataChannelProtection.Clear, False, "d:\", True, True, True, Nothing, _ 
                        New QuickFtp.CertificateReceivedCallback(Me.OnCertificateReceived), _ 
                        New QuickFtp.CertificateRequiredCallback(Me.OnCertificateRequired), _ 
                        New QuickFtp.ByteProgressionCallback(Me.OnByteProgression), _ 
                        New QuickFtp.ItemProgressionCallback(Me.OnItemProgression), _
                        Nothing, "\test\test.txt\")

        Public Sub OnCertificateReceived(ByVal serverCertificate As Certificate, _ 
                                        ByVal verificationAction As VerificationAction, _
                                        ByVal verificationFlags As VerificationFlags, _ 
                                        ByVal verificationStatus As VerificationStatus) 
          'Do stuff
        End Sub

        Public Sub OnCertificateRequired(ByVal certificate As Certificate) 
          ' Set your certificate here
        End Sub

        Public Sub OnByteProgression(ByVal currentItemName As String, _
                                    ByVal currentItemsByteProcessed As Long, _ 
                                    ByVal currentItemTotalBytes As Long, _
                                    ByVal currentItemPercent As Byte, _ 
                                    ByVal allItemsByteProcessed As Long, _
                                    ByVal allItemsTotalBytes As Long, _ 
                                    ByVal allItemsPercent As Byte, _
                                    ByVal userParams As Object) 
          'Do stuff
        End Sub

        Public Sub OnItemProgression(ByVal currentItemName As String, _
                                    ByVal itemProcessed As Long, _
                                    ByVal totalItemCount As Long, _
                                    ByVal totalItemPercent As Byte, _
                                    ByRef abort As Boolean, _ 
                                    ByVal userParams As Object) 
          'Do stuff
        End Sub
      ```
    </TabItem>
</Tabs>

## Things you should consider
The main questions you should ask yourself when receiving files from an FTP server are:

- Do you want to do more complex FTP operations? Use the `FileSystem`-based classes defined within the `Xceed.Ftp` namespace.