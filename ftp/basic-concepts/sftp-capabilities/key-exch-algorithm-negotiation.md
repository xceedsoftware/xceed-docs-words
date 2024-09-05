import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Key exchange and algorithm negotiation

## Key exchange description
A SSH connection implies the use of several algorithms that, together, make the connection secure. There are several encryption, data integrity, key exchange, public key and compression algorithms to choose from. These choices are made between the client (Xceed SFtp for .NET) and the server during a phase called key exchange. Key exchange occurs immediately after a connection with the server is made. It also occurs during a session at regular intervals determined by the server.

An encryption algorithm and a key is negotiated during the key exchange. When encryption is in effect, all data, including meta-data like packet lengths and padding fields will be encrypted with the given algorithm.

Data integrity is protected by including with each packet a message authentication code (MAC) that is computed from a shared secret, packet sequence number, and the contents of the packet.

The key exchange method specifies how one-time session keys are generated for encryption and for authentication, and how the server authentication is done.

A public key algorithm is used to provide a way to format, sign/encrypt, and encode the keys and certificates exchanged between the client and the server.

Packet data can optionally be compressed by the SSH protocol. Please note that at this time, compression is not supported by the component.

A list of all the algorithms supported by the component can be found in the technical overview section of the [SFtp Capabilities](/ftp/basic-concepts/ftp-capabilities/overview) page.

Key exchange is performed automatically and generally does not require input from the application with one exception that will be covered below.

## Algorithm negotiation
With so many algorithms to chose from, the client and server decide together on which to use using a simple ordered list system. For each algorithm category, the client and server exchange a list of algorithms they support and want to use in order of preference. The chosen algorithm will be the first one that appear in both lists.

As an example, consider the following encryption algorithm lists. The client's list:

aes128-cbc, aes256-cbc, aes128-ctr, 3des-cbc, arcfour256, none 
The server's list:

aes128-ctr, aes256-ctr, aes192-ctr
The first common algorithm is aes128-ctr and so that is the one that will be used for encryption. If no common algorithms are found, negotiation fails and both parties will disconnect.

## Algorithm negotiation properties and methods
The technical overview section of the [SFtp Capabilities](/ftp/basic-concepts/ftp-capabilities/overview) page lists the algorithms the component supports and the order of preference in which they will be listed.

It is possible to alter the order of the algorithms that the client will expose or to remove algorithms altogether The SSHClient class contains properties that return SSHAlgorithmList objects. They encapsulate the lists and allow them to be manipulated.

<details>

  <summary>Algorithm list manipulation example</summary>

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.SSH.Client;
        using Xceed.SSH.Core;

        namespace DocumentationExamples.SSH
        {
          public static class SSHAlgorithmList1
          {
            public static void Example()
            {
              string host = "yourhost.org";
              string username = "your username";
              string password = "your password";

              SSHClient ssh = new SSHClient();

              // Get the encryption algorithm list that affect both client-to-server and server-to-client
              SSHAlgorithmList encryptionAlgorithms = ssh.EncryptionAlgorithmList;

              // Re-order the different AES Ctr algorithms to the front of the list
              encryptionAlgorithms.MoveToFirst( SSHEncryptionMethods.AES128CtrEncryption );
              encryptionAlgorithms.MoveToFirst( SSHEncryptionMethods.AES192CtrEncryption );
              encryptionAlgorithms.MoveToFirst( SSHEncryptionMethods.AES256CtrEncryption );

              // Remove the AES128CtrEncryption from the list
              encryptionAlgorithms.Remove( SSHEncryptionMethods.AES128CtrEncryption );

              // Display the list of algorithms
              Console.WriteLine( encryptionAlgorithms );


              // Get the key exchange algorithm list
              SSHAlgorithmList keyExchangeAlgorithms = ssh.KeyExchangeAlgorithmList;

              /* DiffieHellmanGroupExchangeSHA256 is already part of the list. But that's ok. The AddFirst()
                method gracefully handles duplicates and will move the string to its new location in the list. */

              // Move DiffieHellmanGroupExchangeSHA256 to the head of the list
              keyExchangeAlgorithms.AddFirst( SSHKeyExchangeMethods.DiffieHellmanGroupExchangeSHA256 );

              // Display the list of algorithms
              Console.WriteLine( keyExchangeAlgorithms );


              SSHAlgorithmList dataIntegrityAlgorithms = ssh.DataIntegrityAlgorithmList;
              dataIntegrityAlgorithms.Remove( SSHDataIntegrityMethods.NoDataIntegrity );


              SSHAlgorithmList publicKeyAlgorithms = ssh.PublicKeyAlgorithmList;
              publicKeyAlgorithms.Remove( SSHPublicKeyMethods.SshDssPublicKeyAlgorithm );

              /* When the algorithm lists have been arranged to the application's satisfaction,
                the connection can be made. If the lists are modified after connection, it will 
                take effect in the next key-exchange or the next connection. */

              ssh.Connect( host );
              ssh.Authenticate( username, password );

              /* ... */

              ssh.Disconnect();
            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.SSH.Client
        Imports Xceed.SSH.Core

        Namespace DocumentationExamples.SSH
          Public NotInheritable Class SSHAlgorithmList1
            Private Sub New()
            End Sub
            Public Shared Sub Example()
              Dim host As String = "yourhost.org"
              Dim username As String = "your username"
              Dim password As String = "your password"

              Dim ssh As New SSHClient()

              ' Get the encryption algorithm list that affect both client-to-server and server-to-client
              Dim encryptionAlgorithms As SSHAlgorithmList = ssh.EncryptionAlgorithmList

              ' Re-order the different AES Ctr algorithms to the front of the list
              encryptionAlgorithms.MoveToFirst(SSHEncryptionMethods.AES128CtrEncryption)
              encryptionAlgorithms.MoveToFirst(SSHEncryptionMethods.AES192CtrEncryption)
              encryptionAlgorithms.MoveToFirst(SSHEncryptionMethods.AES256CtrEncryption)

              ' Remove the AES128CtrEncryption from the list
              encryptionAlgorithms.Remove(SSHEncryptionMethods.AES128CtrEncryption)

              ' Display the list of algorithms
              Console.WriteLine(encryptionAlgorithms)


              ' Get the key exchange algorithm list
              Dim keyExchangeAlgorithms As SSHAlgorithmList = ssh.KeyExchangeAlgorithmList

        '       DiffieHellmanGroupExchangeSHA256 is already part of the list. But that's ok. The AddFirst()
        '         method gracefully handles duplicates and will move the string to its new location in the list. 

              ' Move DiffieHellmanGroupExchangeSHA256 to the head of the list
              keyExchangeAlgorithms.AddFirst(SSHKeyExchangeMethods.DiffieHellmanGroupExchangeSHA256)

              ' Display the list of algorithms
              Console.WriteLine(keyExchangeAlgorithms)


              Dim dataIntegrityAlgorithms As SSHAlgorithmList = ssh.DataIntegrityAlgorithmList
              dataIntegrityAlgorithms.Remove(SSHDataIntegrityMethods.NoDataIntegrity)


              Dim publicKeyAlgorithms As SSHAlgorithmList = ssh.PublicKeyAlgorithmList
              publicKeyAlgorithms.Remove(SSHPublicKeyMethods.SshDssPublicKeyAlgorithm)

        '       When the algorithm lists have been arranged to the application's satisfaction,
        '         the connection can be made. If the lists are modified after connection, it will 
        '         take effect in the next key-exchange or the next connection. 

              ssh.Connect(host)
              ssh.Authenticate(username, password)

              '... 

              ssh.Disconnect()
            End Sub
          End Class
        End Namespace
      ```
    </TabItem>
  </Tabs>
</details>

## AlgorithmsNegotiated event
The SSHClient class has a AlgorithmsNegotiated event. It is triggered after the algorithms lists have been exchanged between the server and the client and the objects that represent the negotiated algorithms have been constructed. It is an ideal place to set options for those algorithms that have them as the example below will demonstrate.

:::note
Is most situations, it is not necessary to handle the AlgorithmsNegotiated event as the default behavior is adequate. Applications should only use the event in advanced scenarios or when a specific options needs to be set for an algorithm object.
:::

<details>

  <summary>Algorithms negotiated event example</summary>

  <Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        using Xceed.SSH.Client;
        using Xceed.SSH.Protocols;

        namespace DocumentationExamples.SSH
        {
          public static class DiffieHellmanGroupKeyExchange1
          {
            public static void Example()
            {
              string host = "yourhost.org";
              string username = "your username";
              string password = "your password";

              SSHClient ssh = new SSHClient();

              /* Subscribe to the AlgorithmsNegotiated so that we can set custom options on the chosen
                algorithms during key exchange */
              ssh.AlgorithmsNegotiated += OnAlgorithmsNegotiated;

              ssh.Connect( host );
              ssh.Authenticate( username, password );

              ssh.Disconnect();
              ssh.Dispose();
            }

            private static void OnAlgorithmsNegotiated( object sender, AlgorithmsNegotiatedEventArgs e )
            {
              // Express the key exchange algorithm interface as a Diffie-Hellman Group Key Exchange object
              DiffieHellmanGroupKeyExchange diffieHellmanGroupKeyExchange = e.KeyExchangeAlgorithm as DiffieHellmanGroupKeyExchange;

              /* By expressing the key exchange interface as the DiffieHellmanGroupKeyExchange base class, 
                we don't have to have code specific to the SHA1 and SHA256 variant of the algorithm.
                Both will be covered. */

              // If we are using a Diffie-Hellman Group Key Exchange (SHA1 or SHA256) for this key exchange
              if( diffieHellmanGroupKeyExchange != null )
              {
                // Force the usage of a custom preferred group size
                diffieHellmanGroupKeyExchange.PreferredGroupSize = 3072;
              }
            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Xceed.SSH.Client
        Imports Xceed.SSH.Protocols

        Namespace DocumentationExamples.SSH
          Public NotInheritable Class DiffieHellmanGroupKeyExchange1
            Private Sub New()
            End Sub
            Public Shared Sub Example()
              Dim host As String = "yourhost.org"
              Dim username As String = "your username"
              Dim password As String = "your password"

              Dim ssh As New SSHClient()

        '       Subscribe to the AlgorithmsNegotiated so that we can set custom options on the chosen
        '         algorithms during key exchange 
              AddHandler ssh.AlgorithmsNegotiated, AddressOf OnAlgorithmsNegotiated

              ssh.Connect(host)
              ssh.Authenticate(username, password)

              ssh.Disconnect()
              ssh.Dispose()
            End Sub

            Private Shared Sub OnAlgorithmsNegotiated(ByVal sender As Object, ByVal e As AlgorithmsNegotiatedEventArgs)
              ' Express the key exchange algorithm interface as a Diffie-Hellman Group Key Exchange object
              Dim diffieHellmanGroupKeyExchange As DiffieHellmanGroupKeyExchange = TryCast(e.KeyExchangeAlgorithm, DiffieHellmanGroupKeyExchange)

        '       By expressing the key exchange interface as the DiffieHellmanGroupKeyExchange base class,
        '         we don't have to have code specific to the SHA1 and SHA256 variant of the algorithm.
        '         Both will be covered. 

              ' If we are using a Diffie-Hellman Group Key Exchange (SHA1 or SHA256) for this key exchange
              If diffieHellmanGroupKeyExchange IsNot Nothing Then
                ' Force the usage of a custom preferred group size
                diffieHellmanGroupKeyExchange.PreferredGroupSize = 3072
              End If
            End Sub
          End Class
        End Namespace
      ```
    </TabItem>
  </Tabs>
</details>