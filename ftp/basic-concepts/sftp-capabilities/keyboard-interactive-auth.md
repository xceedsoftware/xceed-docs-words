import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keyboard Interactive Authentication

SSHClient supports keyboard interactive authentication as defined by RFC 4256. Depending on the requirements of the SSH server, it can be used instead of password authentication.

Keyboard interactive is a general purpose authentication method, suitable for interactive authentications where the authentication data is entered via a keyboard or equivalent alphanumeric input device. The major goal of this method is to allow the SSH client to support a whole class of authentication mechanisms without knowing the specifics of the actual authentication mechanisms.

In practical terms, with keyboard interactive authentication, the SSH server sends text prompts to the client. These prompts must be given a text answer to. The client sends the responses back to the server. If accepted, more prompts can be sent to the client for response or the authentication can be declared successful or failed.

The text prompts are arbitrary strings. There are no standard or predefined texts. The server decides the content of the prompts and what the required response is. As such, the SSHClient class cannot parse or process the prompts it receives as part of keyboard interactive authentication. Your application must process the prompts and supply responses programmatically or display the prompts to the end-user for them to type the responses.

To authenticate with keyboard interactive, call Authenticate with a userName and a KeyBoardInteractiveAuthenticationHandler delegate.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        ssh.Authenticate( "user name", myHandler );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        ssh.Authenticate("user name", myHandler)
      ```
    </TabItem>
</Tabs>

The delegate KeyBoardInteractiveAuthenticationHandler is a callback method that will be invoked as part of keyboard interactive authentication. It is defined as follows:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        public delegate void KeyBoardInteractiveAuthenticationHandler(
            string userName,
            string name,
            string instruction,
            string languageTag,
            KeyboardInteractiveRequest[] requests );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Public Delegate Sub KeyBoardInteractiveAuthenticationHandler(ByVal userName As String, ByVal name As String, ByVal instruction As String, ByVal languageTag As String, ByVal requests() As KeyboardInteractiveRequest)
      ```
    </TabItem>
</Tabs>

Where:

  *userName* is the user name that was specified in the call to the Authenticate method.

  *name* is a server-supplied string that may indicate a logical name for the series of requests. It can be an empty string, but it will not be null.

  *instruction* is a server-supplied string that may indicate instructions on how to respond to the series of requests. It can be an empty string, but it will not be null.

  *languageTag* is a string that specifies the language of the messages. In most cases, this parameter will be an empty string, and the language will be English.

  *requests* is an array of KeyboardInteractiveRequest objects that specify the information prompts and their responses. The array will not be null. Each element in the array represents a prompt that must be answered. The response for each element is prefilled with an empty string. It is possible that the array will be empty, but it will not be null.

`KeyboardInteractiveRequest` is a simple class that holds the following properties:

  *Prompt* is the server-supplied string that specifies what information is required. For example, it could be something like "Password:". There are no pre-defined prompt strings. The server can supply any text it wants here.

  *Echo* is a boolean value that specifies whether the response to the prompt should be echoed to the screen. In general, this value will be false when the prompt refers to sensitive information like passwords and true otherwise.

  *Response* is the string that will contain the response to the prompt. Your handler will set the this property's value. The string will then be sent back to the server for authentication. The response can be set to an empty string. If the property is set to null, an empty string will be sent back to the server.

Each request in the requests array represents a prompt. If the prompts are presented to an end-user, each prompt should be displayed to the user one by one and in order. The requests array will typically contain one prompt but it might contain more. The KeyBoardInteractiveAuthenticationHandler might be called again with more prompts. There is no predefined limit on the number of prompts that may be asked.

The KeyBoardInteractiveAuthenticationHandler will be invoked by the component on the same thread that Authenticate() was called on. Authenticate() will therefore block while it waits for the KeyBoardInteractiveAuthenticationHandler to return. The component does not impose any timeout on how long control can stay in the handler. However, be aware that some SSH servers enforce a limit on how long authentication takes. For example, the default limit on the OpenSSH server is 120 seconds.

## How to implement KeyBoardInteractiveAuthenticationHandler
If you are certain of the contents and formatting of the prompts you will receive from the server, you may implement a KeyBoardInteractiveAuthenticationHandler method that processes and answers the prompts automatically.

Consider this example for OpenSSH servers that use the ChallengeResponseAuthentication option:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        public static void KeyBoardInteractiveAuthenticationHandlerLinuxPAM( string userName, string name, string instruction, string languageTag, KeyboardInteractiveRequest[] requests )
        {
          // If we have a request
          if( requests.Length > 0 )
          {
            // If the first request is the string 'Password: '
            if( StringComparer.OrdinalIgnoreCase.Compare( requests[ 0 ].Prompt, "Password: " ) == 0 )
            {
              // Supply our password as the response
              requests[ 0 ].Response = "<your password>";
            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Public Shared Sub KeyBoardInteractiveAuthenticationHandlerLinuxPAM(ByVal userName As String, ByVal name As String, ByVal instruction As String, ByVal languageTag As String, ByVal requests() As KeyboardInteractiveRequest)
          ' If we have a request
          If requests.Length > 0 Then
            ' If the first request is the string 'Password: '
            If StringComparer.OrdinalIgnoreCase.Compare(requests(0).Prompt, "Password: ") = 0 Then
              ' Supply our password as the response
              requests(0).Response = "<your password>"
            End If
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

Another way to approach this authentication is to display the prompts to the console and accept input for the answers.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        public static void KeyBoardInteractiveAuthenticationHandlerConsole( string userName, string name, string instruction, string languageTag, KeyboardInteractiveRequest[] requests )
        {
          // If the name is non-empty
          if( !String.IsNullOrEmpty( name ) )
          {
            // Display it
            Console.WriteLine( name );
          }

          // If the instruction is non-empty
          if( !String.IsNullOrEmpty( instruction ) )
          {
            // Display it
            Console.WriteLine( instruction );
          }

          // If we have a request
          if( requests.Length > 0 )
          {
            // Go through each request in order
            foreach( KeyboardInteractiveRequest request in requests )
            {
              // Display the prompt
              Console.Write( request.Prompt );

              // If we can display the response as it is being typed
              if( request.Echo )
              {
                // Read the next line of text from the console
                request.Response = Console.ReadLine();
              }
              // We can't display the response
              else
              {
                StringBuilder response = new StringBuilder();

                // Read a key without displaying it
                ConsoleKeyInfo keyInfo = Console.ReadKey( true );

                // Until <Enter> is pressed
                while( keyInfo.Key != ConsoleKey.Enter )
                {
                  // Add it to the response
                  response.Append( keyInfo.KeyChar );

                  // Read a key without displaying it
                  keyInfo = Console.ReadKey( true );
                }

                // Store the response string in the request
                request.Response = response.ToString();
              }
            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Public Shared Sub KeyBoardInteractiveAuthenticationHandlerConsole(ByVal userName As String, ByVal name As String, ByVal instruction As String, ByVal languageTag As String, ByVal requests() As KeyboardInteractiveRequest)
          ' If the name is non-empty
          If (Not String.IsNullOrEmpty(name)) Then
            ' Display it
            Console.WriteLine(name)
          End If

          ' If the instruction is non-empty
          If (Not String.IsNullOrEmpty(instruction)) Then
            ' Display it
            Console.WriteLine(instruction)
          End If

          ' If we have a request
          If requests.Length > 0 Then
            ' Go through each request in order
            For Each request As KeyboardInteractiveRequest In requests
              ' Display the prompt
              Console.Write(request.Prompt)

              ' If we can display the response as it is being typed
              If request.Echo Then
                ' Read the next line of text from the console
                request.Response = Console.ReadLine()
                ' We can't display the response
              Else
                Dim response As New StringBuilder()

                ' Read a key without displaying it
                Dim keyInfo As ConsoleKeyInfo = Console.ReadKey(True)

                ' Until <Enter> is pressed
                Do While keyInfo.Key <> ConsoleKey.Enter
                  ' Add it to the response
                  response.Append(keyInfo.KeyChar)

                  ' Read a key without displaying it
                  keyInfo = Console.ReadKey(True)
                Loop

                ' Store the response string in the request
                request.Response = response.ToString()
              End If
            Next request
          End If
        End Sub
      ```
    </TabItem>
</Tabs>

Here's an example that puts it all together, with the exceptions that Authenticate can throw when called for the keyboard interactive method.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        static void Example()
        {
          string host = "<host>";
          string username = "<username>";

          using( SSHClient ssh = new SSHClient() )
          {
            ssh.Connect( host );

            KeyBoardInteractiveAuthenticationHandler consoleHandler = new KeyBoardInteractiveAuthenticationHandler( KeyBoardInteractiveAuthenticationHandlerConsole );

            bool retry = false;

            do
            {
              try
              {
                // Authenticate with the keyboard interactive method
                ssh.Authenticate( username, consoleHandler );
              }
              // Authentication was successful but more authentication is required by the server
              catch( SSHAuthenticationPartialSuccessException e )
              {
                // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString();

                throw;
              }
              // The server rejected one of the keyboard response the user typed. Authentication has failed
              catch( SSHIncorrectResponseException e )
              {
                SSHAuthenticationFailedException authenticationFailedException = e.InnerException as SSHAuthenticationFailedException;

                if( authenticationFailedException != null )
                {
                  // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  authenticationFailedException.AuthenticationsThatCanContinue.ToString();
                }

                /* TODO: Decide if it is wise to retry the keyboard interactive method, how many times, etc */
                retry = true;

                if( !retry )
                {
                  throw;
                }
              }
              catch( SSHUnsupportedAuthenticationMethodException e )
              {
                // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString();

                throw;
              }
              catch( SSHAuthenticationFailedException e )
              {
                // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString();

                throw;
              }
            }
            while( retry );

            /* TODO: Perform SSH/SFtp operations */
            using( SFtpSession sftp = new SFtpSession( ssh ) )
            {

            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Private Shared Sub Example()
          Dim host As String = "<host>"
          Dim username As String = "<username>"

          Using ssh As New SSHClient()
            ssh.Connect(host)

            Dim consoleHandler As New KeyBoardInteractiveAuthenticationHandler(AddressOf KeyBoardInteractiveAuthenticationHandlerConsole)

            Dim retry As Boolean = False

            Do
              Try
                ' Authenticate with the keyboard interactive method
                ssh.Authenticate(username, consoleHandler)
                ' Authentication was successful but more authentication is required by the server
              Catch e As SSHAuthenticationPartialSuccessException
                ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString()

                Throw
                ' The server rejected one of the keyboard response the user typed. Authentication has failed
              Catch e As SSHIncorrectResponseException
                Dim authenticationFailedException As SSHAuthenticationFailedException = TryCast(e.InnerException, SSHAuthenticationFailedException)

                If authenticationFailedException IsNot Nothing Then
                  ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  authenticationFailedException.AuthenticationsThatCanContinue.ToString()
                End If

                ' TODO: Decide if it is wise to retry the keyboard interactive method, how many times, etc 
                retry = True

                If (Not retry) Then
                  Throw
                End If
              Catch e As SSHUnsupportedAuthenticationMethodException
                ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString()

                Throw
              Catch e As SSHAuthenticationFailedException
                ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                e.AuthenticationsThatCanContinue.ToString()

                Throw
              End Try
            Loop While retry

            ' TODO: Perform SSH/SFtp operations 
            Using sftp As New SFtpSession(ssh)

            End Using
          End Using
        End Sub
      ```
    </TabItem>
</Tabs>

Some servers require multiple authentications be used to log in. Here is an example that chains different authentications one after the other.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        static void ChainingExample()
        {
          string host = "<host>";
          string username = "<username>";
          string password = "<password>";

          using( SSHClient ssh = new SSHClient() )
          {
            ssh.Connect( host );

            bool needsMoreAuthentication = false;

            try
            {
              // Authenticate with the username/password method
              ssh.Authenticate( username, password );
            }
            // Authentication was successful but more authentication is required by the server
            catch( SSHAuthenticationPartialSuccessException e )
            {
              /* We have successfully authenticated with username/password, but the server needs us
              * to use additional authentication methods */
              needsMoreAuthentication = true;

              // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString();
            }
            catch( SSHUnsupportedAuthenticationMethodException e )
            {
              /* The server doesn't support this authentication. We will use additional authentication
                * methods we support */
              needsMoreAuthentication = true;

              // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString();
            }
            catch( SSHAuthenticationFailedException e )
            {
              // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString();

              throw;
            }

            // If we need to perform more authentication
            if( needsMoreAuthentication )
            {
              /* We will use the other authentication method we have */

              KeyBoardInteractiveAuthenticationHandler consoleHandler = new KeyBoardInteractiveAuthenticationHandler( KeyBoardInteractiveAuthenticationHandlerConsole );

              bool retry = false;

              do
              {
                try
                {
                  // Authenticate with the keyboard interactive method
                  ssh.Authenticate( username, consoleHandler );

                  // If we reach here, we have used all our authentication methods and they have been successful
                  needsMoreAuthentication = false;
                }
                // Authentication was successful but more authentication is required by the server
                catch( SSHAuthenticationPartialSuccessException e )
                {
                  /* At this point, we are out of authentication methods... */

                  throw new Exception( "Can't authenticate. Used up all authentication methods we support.", e );
                }
                // The server rejected one of the keyboard response the user typed. Authentication has failed
                catch( SSHIncorrectResponseException e )
                {
                  SSHAuthenticationFailedException authenticationFailedException = e.InnerException as SSHAuthenticationFailedException;

                  if( authenticationFailedException != null )
                  {
                    // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                    authenticationFailedException.AuthenticationsThatCanContinue.ToString();
                  }

                  /* TODO: Decide if it is wise to retry the keyboard interactive method, how many times, etc */
                  retry = true;

                  if( !retry )
                  {
                    throw;
                  }
                }
                catch( SSHUnsupportedAuthenticationMethodException e )
                {
                  // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  e.AuthenticationsThatCanContinue.ToString();

                  /* At this point, we are out of authentication methods... */

                  throw new Exception( "Can't authenticate. Used up all authentication methods we support.", e );
                }
                catch( SSHAuthenticationFailedException e )
                {
                  // The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  e.AuthenticationsThatCanContinue.ToString();

                  throw;
                }
              }
              while( retry );
            }

            /* TODO: Perform SSH/SFtp operations */
            using( SFtpSession sftp = new SFtpSession( ssh ) )
            {

            }
          }
        }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Private Shared Sub ChainingExample()
          Dim host As String = "<host>"
          Dim username As String = "<username>"
          Dim password As String = "<password>"

          Using ssh As New SSHClient()
            ssh.Connect(host)

            Dim needsMoreAuthentication As Boolean = False

            Try
              ' Authenticate with the username/password method
              ssh.Authenticate(username, password)
              ' Authentication was successful but more authentication is required by the server
            Catch e As SSHAuthenticationPartialSuccessException
              '           We have successfully authenticated with username/password, but the server needs us
              '           * to use additional authentication methods 
              needsMoreAuthentication = True

              ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString()
            Catch e As SSHUnsupportedAuthenticationMethodException
              '           The server doesn't support this authentication. We will use additional authentication
              '            * methods we support 
              needsMoreAuthentication = True

              ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString()
            Catch e As SSHAuthenticationFailedException
              ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
              e.AuthenticationsThatCanContinue.ToString()

              Throw
            End Try

            ' If we need to perform more authentication
            If needsMoreAuthentication Then
              ' We will use the other authentication method we have 

              Dim consoleHandler As New KeyBoardInteractiveAuthenticationHandler(AddressOf KeyBoardInteractiveAuthenticationHandlerConsole)

              Dim retry As Boolean = False

              Do
                Try
                  ' Authenticate with the keyboard interactive method
                  ssh.Authenticate(username, consoleHandler)

                  ' If we reach here, we have used all our authentication methods and they have been successful
                  needsMoreAuthentication = False
                  ' Authentication was successful but more authentication is required by the server
                Catch e As SSHAuthenticationPartialSuccessException
                  ' At this point, we are out of authentication methods... 

                  Throw New Exception("Can't authenticate. Used up all authentication methods we support.", e)
                  ' The server rejected one of the keyboard response the user typed. Authentication has failed
                Catch e As SSHIncorrectResponseException
                  Dim authenticationFailedException As SSHAuthenticationFailedException = TryCast(e.InnerException, SSHAuthenticationFailedException)

                  If authenticationFailedException IsNot Nothing Then
                    ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                    authenticationFailedException.AuthenticationsThatCanContinue.ToString()
                  End If

                  ' TODO: Decide if it is wise to retry the keyboard interactive method, how many times, etc 
                  retry = True

                  If (Not retry) Then
                    Throw
                  End If
                Catch e As SSHUnsupportedAuthenticationMethodException
                  ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  e.AuthenticationsThatCanContinue.ToString()

                  ' At this point, we are out of authentication methods... 

                  Throw New Exception("Can't authenticate. Used up all authentication methods we support.", e)
                Catch e As SSHAuthenticationFailedException
                  ' The 'AuthenticationsThatCanContinue' property specifies the authentications methods that can be tried
                  e.AuthenticationsThatCanContinue.ToString()

                  Throw
                End Try
              Loop While retry
            End If

            ' TODO: Perform SSH/SFtp operations 
            Using sftp As New SFtpSession(ssh)

            End Using
          End Using
        End Sub
      ```
    </TabItem>
</Tabs>