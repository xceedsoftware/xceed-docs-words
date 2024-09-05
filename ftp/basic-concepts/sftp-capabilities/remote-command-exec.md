import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remote Command Execution

## Description
The SSH protocol allows for the remote execution of commands on the server. This is done using a SSH logical channel. Many SSH features like SFtp and remote command execution are implemented over such channels. Every channel is multiplexed into a single encrypted SSH connection.

As such, a remote command execution can be issued while a SFtp session is performing work since a new channel will be created to issue the command.

Remote command execution works by the client sending a message that requests the server start the execution of a given command string. The 'command' string may contain a path and arguments. It is also possible to pass environment variables to the server before the command is executed.

It should be noted that servers will take normal precautions to prevent the execution of unauthorized commands. At the very least, this means that the right to execute a command, and which commands are allowed will depend on the user that is authenticated on the SSH connection. These rights are determined by the server's administrator and cannot be computed on the client side.

:::note
If a user doesn't have the rights to execute a command, an exception will be thrown but the SSH connection will not be closed. Other channels (like SFtp sessions) will continue to proceed without issue.
:::

## Usage
A remote command is executed using the `Xceed.SSH.Client.ExecuteCommandSession` Class. Its constructor needs to be supplied a SSHClient object that is connected and authenticated. Then, the Connect() method can be called, specifying the command to execute and, optionally, environment variables to set on the server before the command is executed.

:::note
The `ExecuteCommandSession` class is ony available with the Xceed SFtp for .NET that is compiled for .NET 4.0 and later. The class is available with Xceed SFtp for Xamarin, all versions.
:::

The `Connect()` method returns immediately if the server accepts the command. If not, a SSHChannelRequestFailedException is thrown. The command is run on the server while control continues normall on the client side. The server might send standard output and/or standard error text output to the client. It is possible to catch that data with a Stream object using the GetOutputStream() and GetErrorStream() methods. It is also possible to send text to the command's standard input using a stream with the GetInputStream() method. With all these streams, it is often useful to wrap them around a `System.Text.StreamReader` or `System.Text.StreamWriter` object to read and write text lines. See the examples below for details.

The `ExecuteCommandSession` class contains a CommandCompleted Event event that will be triggered when the command has completed on the server. At that point, the channel will have been closed but the possible exit status or exit signal (not all servers supply these values) will still be available to be read.

Another way to watch for the completion of the command is to wait on the SessionCompletedWaitHandle.

## Examples

<details>

  <summary>Execute and wait for result</summary>

  The simplest way to use the `ExecuteCommandSession` class is to start the command and wait for the command to complete.
  
  <Tabs>
      <TabItem value="csharp" label="C#" default>
        ```csharp
          using System.IO;
          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            public class ExecuteCommandSession3
            {
              public void Example()
              {
                string host = "localhost";
                string username = "normal1";
                string password = "normal1";

                SSHClient ssh = new SSHClient();

                // Connect to the host
                ssh.Connect( host );

                try
                {
                  // Log in
                  ssh.Authenticate( username, password );

                  // The remote command to execute
                  string command = "dir";

                  // Create a session that will execute a remote command
                  using( ExecuteCommandSession executeCommandSession = new ExecuteCommandSession( ssh ) )
                  {
                    // Execute the command on the remote server, waiting until it completes
                    Nullable<int> exitStatus = executeCommandSession.ExecuteCommand( command );

                    /* Some servers will return exit information like the return code and the 'signal'
                      if the command fails. */

                    Console.WriteLine( "Command exited with status {0}", exitStatus.HasValue ? exitStatus.ToString() : "(null)" );

                    SSHChannelExitSignal exitSignal = executeCommandSession.ExitSignal;
                    if( exitSignal != null )
                    {
                      Console.WriteLine( "Command exited with signal {0}: {1}", exitSignal.SignalName, exitSignal.ErrorMessage );
                    }
                  }
                }
                catch( SSHChannelRequestFailedException )
                {
                  /* This exception is thrown by ExecuteCommandSession.Connect(). The most common
                  * cause is the authenticated user does not have the rights to execute commands
                  * on the server. */
                }
                finally
                {
                  // Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect();
                }
              }
            }
          }
        ```
      </TabItem>
      <TabItem value="vb.net" label="Visual Basic .NET">
        ```vb.NET
          Imports System.IO
          Imports Xceed.SSH.Client
          Imports Xceed.SSH.Core
          Imports Xceed.SSH.Protocols
          Imports Xceed.FileSystem

          Namespace DocumentationExamples.SSH
            Public Class ExecuteCommandSession3
              Public Sub Example()
                Dim host As String = "localhost"
                Dim username As String = "normal1"
                Dim password As String = "normal1"

                Dim ssh As New SSHClient()

                ' Connect to the host
                ssh.Connect(host)

                Try
                  ' Log in
                  ssh.Authenticate(username, password)

                  ' The remote command to execute
                  Dim command As String = "dir"

                  ' Create a session that will execute a remote command
                  Using executeCommandSession As New ExecuteCommandSession(ssh)
                    ' Execute the command on the remote server, waiting until it completes
                    Dim exitStatus As Nullable(Of Integer) = executeCommandSession.ExecuteCommand(command)

          '           Some servers will return exit information like the return code and the 'signal'
          '             if the command fails. 

                    Console.WriteLine("Command exited with status {0}",If(exitStatus.HasValue, exitStatus.ToString(), "(null)"))

                    Dim exitSignal As SSHChannelExitSignal = executeCommandSession.ExitSignal
                    If exitSignal IsNot Nothing Then
                      Console.WriteLine("Command exited with signal {0}: {1}", exitSignal.SignalName, exitSignal.ErrorMessage)
                    End If
                  End Using
                Catch e1 As SSHChannelRequestFailedException
          '         This exception is thrown by ExecuteCommandSession.Connect(). The most common
          '         * cause is the authenticated user does not have the rights to execute commands
          '         * on the server. 
                Finally
                  ' Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect()
                End Try
              End Sub
            End Class
          End Namespace
        ```
      </TabItem>
  </Tabs>

</details>


<details>

  <summary>Fire-and-forget</summary>

  The `ExecuteCommandSession` class can also be used in a fire-and-forget manner.
  
  <Tabs>
      <TabItem value="csharp" label="C#" default>
        ```csharp
          using System.IO;
          using System.Threading.Tasks;

          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            public class ExecuteCommandSession4
            {
              public void Example()
              {
                string host = "localhost";
                string username = "normal1";
                string password = "normal1";

                // The remote command to execute
                string command = "dir";

                SSHClient ssh = new SSHClient();

                // Connect to the host
                ssh.Connect( host );

                try
                {
                  // Log in
                  ssh.Authenticate( username, password );

                  Task<Nullable<int>> task = this.ExecuteRemoteCommandAsync( ssh, command );

                  /* TODO: Perform other business that does not require the result of the remote command */

                  /* Now that we need the result from the remote command, we will wait for it */
                  Nullable<int> exitStatus = task.Result;
                  Console.WriteLine( "Command exited with status {0}", exitStatus.HasValue ? exitStatus.ToString() : "(null)" );
                }
                finally
                {
                  // Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect();
                }
              }

              private async Task<Nullable<int>> ExecuteRemoteCommandAsync( SSHClient ssh, string command )
              {
                Task<Nullable<int>> executeCommandTask;
                Nullable<int> exitStatus;

                ExecuteCommandSession executeCommandSession = null;

                // Create a session that will execute a remote command
                executeCommandSession = new ExecuteCommandSession( ssh );

                try
                {
                  // Start executing the specified command on the remote server
                  executeCommandTask = executeCommandSession.ExecuteCommandAsync( command );
                }
                catch( SSHChannelRequestFailedException )
                {
                  /* This exception is thrown by ExecuteCommandSession.Connect(). The most common
                    * cause is the authenticated user does not have the rights to execute commands
                    * on the server. */

                  /* The 'CommandCompleted' event is not triggered when the request to launch the command fails */

                  // Dispose of the session to free resources
                  executeCommandSession.Dispose();

                  // Rethrow the exception
                  throw;
                }

                // Wait for the remote command to complete while allowing the calling method to continue execution
                exitStatus = await executeCommandTask;

                /* This code will be executed in a background thread from ThreadPool */

                // Dispose of the session to free resources
                executeCommandSession.Dispose();

                return exitStatus;
              }
            }
          }
        ```
      </TabItem>
      <TabItem value="vb.net" label="Visual Basic .NET">
        ```vb.NET
          Imports System.IO
          Imports System.Threading.Tasks

          Imports Xceed.SSH.Client
          Imports Xceed.SSH.Core
          Imports Xceed.SSH.Protocols
          Imports Xceed.FileSystem

          Namespace DocumentationExamples.SSH
            Public Class ExecuteCommandSession4
              Public Sub Example()
                Dim host As String = "localhost"
                Dim username As String = "normal1"
                Dim password As String = "normal1"

                ' The remote command to execute
                Dim command As String = "dir"

                Dim ssh As New SSHClient()

                ' Connect to the host
                ssh.Connect(host)

                Try
                  ' Log in
                  ssh.Authenticate(username, password)

                  Dim task As Task(Of Nullable(Of Integer)) = Me.ExecuteRemoteCommandAsync(ssh, command)

                  ' TODO: Perform other business that does not require the result of the remote command 

                  ' Now that we need the result from the remote command, we will wait for it 
                  Dim exitStatus As Nullable(Of Integer) = task.Result
                  Console.WriteLine("Command exited with status {0}",If(exitStatus.HasValue, exitStatus.ToString(), "(null)"))
                Finally
                  ' Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect()
                End Try
              End Sub

              Private async Function ExecuteRemoteCommandAsync(ByVal ssh As SSHClient, ByVal command As String) As Task(Of Nullable(Of Integer))
                Dim executeCommandTask As Task(Of Nullable(Of Integer))
                Dim exitStatus As Nullable(Of Integer)

                Dim executeCommandSession As ExecuteCommandSession = Nothing

                ' Create a session that will execute a remote command
                executeCommandSession = New ExecuteCommandSession(ssh)

                Try
                  ' Start executing the specified command on the remote server
                  executeCommandTask = executeCommandSession.ExecuteCommandAsync(command)
                Catch e1 As SSHChannelRequestFailedException
          '         This exception is thrown by ExecuteCommandSession.Connect(). The most common
          '          * cause is the authenticated user does not have the rights to execute commands
          '          * on the server. 

                  ' The 'CommandCompleted' event is not triggered when the request to launch the command fails 

                  ' Dispose of the session to free resources
                  executeCommandSession.Dispose()

                  ' Rethrow the exception
                  Throw
                End Try

                ' Wait for the remote command to complete while allowing the calling method to continue execution
                exitStatus = await executeCommandTask

                ' This code will be executed in a background thread from ThreadPool 

                ' Dispose of the session to free resources
                executeCommandSession.Dispose()

                Return exitStatus
              End Function
            End Class
          End Namespace
        ```
      </TabItem>
  </Tabs>

</details>

<details>

  <summary>Capture command output</summary>

  The output of the command can be captured. Here a technique using asynchronous reading is used in order to read output and error text at the same time.

  Also shown in this example is how to pass environment variables to the server.
  
  <Tabs>
      <TabItem value="csharp" label="C#" default>
        ```csharp
          using System.Collections.Generic;
          using System.IO;
          using System.Threading;
          using System.Threading.Tasks;

          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            public class ExecuteCommandSession1
            {
              public void Example()
              {
                string host = "localhost";
                string username = "normal1";
                string password = "normal1";

                SSHClient ssh = new SSHClient();

                // Connect to the host
                ssh.Connect( host );

                try
                {
                  // Log in
                  ssh.Authenticate( username, password );

                  // The remote command to execute
                  string command = "dir *.*";

                  // Some environment variables
                  KeyValuePair<string, string> environmentVariable = new KeyValuePair<string, string>( "MYVARIABLE", "MYVALUE" );

                  // Create a session that will execute a remote command
                  using( ExecuteCommandSession executeCommandSession = new ExecuteCommandSession( ssh ) )
                  {
                    Stream commandOutputStream = null;
                    Stream commandErrorStream = null;

                    try
                    {
                      /* We obtain the output and error streams BEFORE starting the command so that we don't
                        miss any output. */

                      /* If the CommandOutputStream or the CommandErrorStream object is not taken,
                        the component silently discards the incoming data. This might be desirable if
                        the output and/or error text is not needed. */

                      // Get the command's output stream (standard output)
                      commandOutputStream = executeCommandSession.GetOutputStream();

                      // Get the command's error stream (standard error)
                      commandErrorStream = executeCommandSession.GetErrorStream();

                      /* Now that we are setup the way we want, we can safely start the remote command */

                      // Start executing the specified command on the remote server passing the supplied environment variables to the server
                      executeCommandSession.Connect( command, environmentVariable );

                      /* Notice how we wrap the streams with StreamReader objects only after starting the command.
                        This guards against the possibility of the StreamReader object calling Stream.Read() before
                        we've started the command. */

                      // Wrap a stream reader around the output stream
                      System.IO.StreamReader outputReader = new System.IO.StreamReader( commandOutputStream );

                      // Wrap a stream reader around the error stream
                      System.IO.StreamReader errorReader = new System.IO.StreamReader( commandErrorStream );

                      // Read a line from the output and error at the same time
                      Task<string> readOutputLineTask = outputReader.ReadLineAsync();
                      Task<string> readErrorLineTask = errorReader.ReadLineAsync();

                      string line;

                      // While either the output or error streams haven't reached end-of-file
                      while( readOutputLineTask != null || readErrorLineTask != null )
                      {
                        // If reading an output line has completed
                        if( readOutputLineTask != null && readOutputLineTask.IsCompleted )
                        {
                          // Get the line
                          line = readOutputLineTask.Result;

                          // If we have a line
                          if( line != null )
                          {
                            // Output it to the console
                            Console.WriteLine( line );

                            // Read another line
                            readOutputLineTask = outputReader.ReadLineAsync();
                          }
                          else
                          {
                            /* We've reached end-of-file. We don't want to read again */
                            readOutputLineTask = null;
                          }
                        }

                        // If reading an error line has completed
                        if( readErrorLineTask != null && readErrorLineTask.IsCompleted )
                        {
                          // Get the line
                          line = readErrorLineTask.Result;

                          // If we have a line
                          if( line != null )
                          {
                            // Output it to the console
                            Console.WriteLine( line );

                            // Read another line
                            readErrorLineTask = errorReader.ReadLineAsync();
                          }
                          else
                          {
                            /* We've reached end-of-file. We don't want to read again */
                            readErrorLineTask = null;
                          }
                        }
                      }

                      /* Because we've processed the output stream until end-of-file, we are sure that
                        the command has completed. No need to wait. 

                        However, if accessing the exit status or possible exit signal of the command
                        is important to the application, it is best to wait until the command has signaled it
                        has completed. At that point, the exit information will have been received. */

                      // Wait until the command has completed
                      executeCommandSession.SessionCompletedWaitHandle.WaitOne();

                      /* Some servers will return exit information like the return code and the 'signal'
                        if the command fails. */

                      Nullable<int> exitStatus = executeCommandSession.ExitStatus;
                      Console.WriteLine( "Command exited with status {0}", exitStatus.HasValue ? exitStatus.ToString() : "(null)" );

                      SSHChannelExitSignal exitSignal = executeCommandSession.ExitSignal;
                      if( exitSignal != null )
                      {
                        Console.WriteLine( "Command exited with signal {0}: {1}", exitSignal.SignalName, exitSignal.ErrorMessage );
                      }
                    }
                    catch( SSHChannelRequestFailedException )
                    {
                      /* This exception is thrown by ExecuteCommandSession.Connect(). The most common
                      * cause is the authenticated user does not have the rights to execute commands
                      * on the server. */
                    }
                    finally
                    {
                      if( commandOutputStream != null )
                      {
                        commandOutputStream.Close();
                        commandOutputStream = null;
                      }

                      if( commandErrorStream != null )
                      {
                        commandErrorStream.Close();
                        commandErrorStream = null;
                      }
                    }
                  }

                }
                finally
                {
                  // Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect();
                }
              }
            }
          }
        ```
      </TabItem>
      <TabItem value="vb.net" label="Visual Basic .NET">
        ```vb.NET
          Imports System.Collections.Generic
          Imports System.IO
          Imports System.Threading
          Imports System.Threading.Tasks

          Imports Xceed.SSH.Client
          Imports Xceed.SSH.Core
          Imports Xceed.SSH.Protocols
          Imports Xceed.FileSystem

          Namespace DocumentationExamples.SSH
            Public Class ExecuteCommandSession1
              Public Sub Example()
                Dim host As String = "localhost"
                Dim username As String = "normal1"
                Dim password As String = "normal1"

                Dim ssh As New SSHClient()

                ' Connect to the host
                ssh.Connect(host)

                Try
                  ' Log in
                  ssh.Authenticate(username, password)

                  ' The remote command to execute
                  Dim command As String = "dir *.*"

                  ' Some environment variables
                  Dim environmentVariable As KeyValuePair(Of String, String) = New KeyValuePair(Of String, String)("MYVARIABLE", "MYVALUE")

                  ' Create a session that will execute a remote command
                  Using executeCommandSession As New ExecuteCommandSession(ssh)
                    Dim commandOutputStream As Stream = Nothing
                    Dim commandErrorStream As Stream = Nothing

                    Try
          '             We obtain the output and error streams BEFORE starting the command so that we don't
          '               miss any output. 

          '             If the CommandOutputStream or the CommandErrorStream object is not taken,
          '               the component silently discards the incoming data. This might be desirable if
          '               the output and/or error text is not needed. 

                      ' Get the command's output stream (standard output)
                      commandOutputStream = executeCommandSession.GetOutputStream()

                      ' Get the command's error stream (standard error)
                      commandErrorStream = executeCommandSession.GetErrorStream()

                      ' Now that we are setup the way we want, we can safely start the remote command 

                      ' Start executing the specified command on the remote server passing the supplied environment variables to the server
                      executeCommandSession.Connect(command, environmentVariable)

          '             Notice how we wrap the streams with StreamReader objects only after starting the command.
          '               This guards against the possibility of the StreamReader object calling Stream.Read() before
          '               we've started the command. 

                      ' Wrap a stream reader around the output stream
                      Dim outputReader As New System.IO.StreamReader(commandOutputStream)

                      ' Wrap a stream reader around the error stream
                      Dim errorReader As New System.IO.StreamReader(commandErrorStream)

                      ' Read a line from the output and error at the same time
                      Dim readOutputLineTask As Task(Of String) = outputReader.ReadLineAsync()
                      Dim readErrorLineTask As Task(Of String) = errorReader.ReadLineAsync()

                      Dim line As String

                      ' While either the output or error streams haven't reached end-of-file
                      Do While readOutputLineTask IsNot Nothing OrElse readErrorLineTask IsNot Nothing
                        ' If reading an output line has completed
                        If readOutputLineTask IsNot Nothing AndAlso readOutputLineTask.IsCompleted Then
                          ' Get the line
                          line = readOutputLineTask.Result

                          ' If we have a line
                          If line IsNot Nothing Then
                            ' Output it to the console
                            Console.WriteLine(line)

                            ' Read another line
                            readOutputLineTask = outputReader.ReadLineAsync()
                          Else
                            ' We've reached end-of-file. We don't want to read again 
                            readOutputLineTask = Nothing
                          End If
                        End If

                        ' If reading an error line has completed
                        If readErrorLineTask IsNot Nothing AndAlso readErrorLineTask.IsCompleted Then
                          ' Get the line
                          line = readErrorLineTask.Result

                          ' If we have a line
                          If line IsNot Nothing Then
                            ' Output it to the console
                            Console.WriteLine(line)

                            ' Read another line
                            readErrorLineTask = errorReader.ReadLineAsync()
                          Else
                            ' We've reached end-of-file. We don't want to read again 
                            readErrorLineTask = Nothing
                          End If
                        End If
                      Loop

          '             Because we've processed the output stream until end-of-file, we are sure that
          '              the command has completed. No need to wait. 
          '
          '               However, if accessing the exit status or possible exit signal of the command
          '               is important to the application, it is best to wait until the command has signaled it
          '               has completed. At that point, the exit information will have been received. 

                      ' Wait until the command has completed
                      executeCommandSession.SessionCompletedWaitHandle.WaitOne()

          '             Some servers will return exit information like the return code and the 'signal'
          '              if the command fails. 

                      Dim exitStatus As Nullable(Of Integer) = executeCommandSession.ExitStatus
                      Console.WriteLine("Command exited with status {0}",If(exitStatus.HasValue, exitStatus.ToString(), "(null)"))

                      Dim exitSignal As SSHChannelExitSignal = executeCommandSession.ExitSignal
                      If exitSignal IsNot Nothing Then
                        Console.WriteLine("Command exited with signal {0}: {1}", exitSignal.SignalName, exitSignal.ErrorMessage)
                      End If
                    Catch e1 As SSHChannelRequestFailedException
          '             This exception is thrown by ExecuteCommandSession.Connect(). The most common
          '             * cause is the authenticated user does not have the rights to execute commands
          '             * on the server. 
                    Finally
                      If commandOutputStream IsNot Nothing Then
                        commandOutputStream.Close()
                        commandOutputStream = Nothing
                      End If

                      If commandErrorStream IsNot Nothing Then
                        commandErrorStream.Close()
                        commandErrorStream = Nothing
                      End If
                    End Try
                  End Using

                Finally
                  ' Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect()
                End Try
              End Sub
            End Class
          End Namespace
        ```
      </TabItem>
  </Tabs>

</details>

<details>

  <summary>Send data to standard input</summary>

  The output of the command can be captured. Here a technique using asynchronous reading is used in order to read output and error text at the same time.
  
  <Tabs>
      <TabItem value="csharp" label="C#" default>
        ```csharp
          using System.IO;
          using Xceed.SSH.Client;
          using Xceed.SSH.Core;
          using Xceed.SSH.Protocols;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            public class ExecuteCommandSession2
            {
              public void Example()
              {
                string host = "localhost";
                string username = "normal1";
                string password = "normal1";

                SSHClient ssh = new SSHClient();

                // Connect to the host
                ssh.Connect( host );

                try
                {
                  // Log in
                  ssh.Authenticate( username, password );

                  // The remote command to execute
                  string command = "copy Test.txt BackTest.txt /-Y";

                  // Create a session that will execute a remote command
                  using( ExecuteCommandSession executeCommandSession = new ExecuteCommandSession( ssh ) )
                  {
                    // Get the command's output stream (standard output/stdout)
                    Stream commandOutputStream = executeCommandSession.GetOutputStream();

                    // Start executing the specified command on the remote server
                    executeCommandSession.Connect( command );

                    // Wrap the output stream into a stream reader
                    System.IO.StreamReader reader = new System.IO.StreamReader( commandOutputStream );

                    string line;

                    /* We expect to receive the text

                      Overwrite BackTest.txt? (Yes/No/All):

                      and then the remote console will wait for input. We can't call ReadLine() to get
                      the question since it does not contain a newline, we would wait forever.

                      Since we know what we're going to receive, we'll just go-ahead and send the response immediately. */

                    // Get the command's input stream (standard input/stdin)
                    Stream commandInputStream = executeCommandSession.GetInputStream();

                    // Wrap the input stream into a stream writer
                    StreamWriter writer = new StreamWriter( commandInputStream );

                    // Answer the overwrite query
                    writer.WriteLine( "y" );
                    writer.Flush();

                    // Read the next lines until we reach end-of-file
                    while( ( line = reader.ReadLine() ) != null )
                    {
                      // Output the line
                      Console.WriteLine( line );
                    }
                  }
                }
                catch( SSHChannelRequestFailedException )
                {
                  /* This exception is thrown by ExecuteCommandSession.Connect(). The most common
                  * cause is the authenticated user does not have the rights to execute commands
                  * on the server. */
                  }
                finally
                {
                  // Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect();
                }
              }
            }
          }
        ```
      </TabItem>
      <TabItem value="vb.net" label="Visual Basic .NET">
        ```vb.NET
          Imports System.IO
          Imports Xceed.SSH.Client
          Imports Xceed.SSH.Core
          Imports Xceed.SSH.Protocols
          Imports Xceed.FileSystem

          Namespace DocumentationExamples.SSH
            Public Class ExecuteCommandSession2
              Public Sub Example()
                Dim host As String = "localhost"
                Dim username As String = "normal1"
                Dim password As String = "normal1"

                Dim ssh As New SSHClient()

                ' Connect to the host
                ssh.Connect(host)

                Try
                  ' Log in
                  ssh.Authenticate(username, password)

                  ' The remote command to execute
                  Dim command As String = "copy Test.txt BackTest.txt /-Y"

                  ' Create a session that will execute a remote command
                  Using executeCommandSession As New ExecuteCommandSession(ssh)
                    ' Get the command's output stream (standard output/stdout)
                    Dim commandOutputStream As Stream = executeCommandSession.GetOutputStream()

                    ' Start executing the specified command on the remote server
                    executeCommandSession.Connect(command)

                    ' Wrap the output stream into a stream reader
                    Dim reader As New System.IO.StreamReader(commandOutputStream)

                    Dim line As String

          '           We expect to receive the text
          '
          '             Overwrite BackTest.txt? (Yes/No/All):
          '
          '             and then the remote console will wait for input. We can't call ReadLine() to get
          '             the question since it does not contain a newline, we would wait forever.
          '
          '             Since we know what we're going to receive, we'll just go-ahead and send the response immediately. 

                    ' Get the command's input stream (standard input/stdin)
                    Dim commandInputStream As Stream = executeCommandSession.GetInputStream()

                    ' Wrap the input stream into a stream writer
                    Dim writer As New StreamWriter(commandInputStream)

                    ' Answer the overwrite query
                    writer.WriteLine("y")
                    writer.Flush()

                    ' Read the next lines until we reach end-of-file
                    line = reader.ReadLine()
                    Do While line IsNot Nothing
                      ' Output the line
                      Console.WriteLine(line)
                      line = reader.ReadLine()
                    Loop
                  End Using
                Catch e1 As SSHChannelRequestFailedException
          '         This exception is thrown by ExecuteCommandSession.Connect(). The most common
          '         * cause is the authenticated user does not have the rights to execute commands
          '         * on the server. 
                Finally
                  ' Always make sure to disconnect from the server when the connection is no longer needed
                  ssh.Disconnect()
                End Try
              End Sub
            End Class
          End Namespace
        ```
      </TabItem>
  </Tabs>

</details>