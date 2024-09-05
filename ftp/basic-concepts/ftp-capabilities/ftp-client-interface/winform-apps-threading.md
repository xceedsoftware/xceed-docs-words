import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WinForms applications and threading

Xceed FTP for .NET is a highly multi-threaded library that uses asynchronous operations on sockets and network streams to allow fast and fluent execution. This results in most events being called from a different thread than the one that called the initiating method.  
When building a GUI application using System.Windows.Forms, you must always make sure to access UI elements (controls and forms) from the main thread since all those controls have thread-affinity for the main STA thread. This is done using Control.Invoke or Control.BeginInvoke. 

The FtpClient class now uses a BackgroundWorker that executes commands on another thread. Consequently, calls to methods on an FtpClient object will not block the UI, provided that you set the FtpClient object's SynchronizingProperty to your form (or any other control that implements the ISynchronizeInvoke interface) to ensure that that events will be sent to the SynchronizingObjects thread. It is recommended that the FtpClient class be used instead of AsyncFtpClient in order to simplify your code.

In this example, we use  FtpClient to connect and login anonymously to the specified hostname, then disconnect. By setting the FtpClient object's `SynchronizingObject` property, the UI remains responsive. If the SynchronizingObject property is **not** set, the UI will freeze as each methd call is made.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using Xceed.Ftp;

        // Always start with an instance of FtpClient.
        FtpClient client = new FtpClient();

        // When using FtpClient, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property.
        client.SynchronizingObject = this;

        // Start connecting.
        client.Connect("localhost");

        // Now that we are connected, we can log in.
        client.Login();

        // And finally, we disconnect.
        client.Disconnect();
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      ' Always start with an instance of FtpClient.
      Dim client As New FtpClient()

      ' When using FtpClient, you can instruct
      ' the library to automatically redirect events on the main UI thread
      ' by setting the SynchronizingObject property.
      client.SynchronizingObject = Me

      ' Start connecting.
      client.Connect("localhost")

      ' Now that we are connected, we can log in.
      client.Login()

      ' And finally, we disconnect.
      client.Disconnect()
    ```
  </TabItem>
</Tabs>

## Callbacks versus waiting for completion (using AsyncFtpClient)

:::note
AsyncFtpClient's methods now call the corresponding synchronous methods on a background thread. For this reason, the `AsyncFtpClient` class is now considered obsolete. It is therefore recommended to use `FtpClient` and assign a `SynchronizingObject` to its `SynchronizingObject` property to improve code readability. The following is presented primarily for completeness
:::

If the `AsyncFtpClient` class is used in a GUI application, call the asynchronous methods (those that start with "Begin"), provide callbacks and call the corresponding "End" method in them, or manually pump messages while waiting for completion and then call the corresponding "End" method. 

If you do not want to have to call Control.Invoke to update the UI in the callbacks, you can set the AsyncFtpClient's `SynchronizingObject` property to your form (or any other control that implements the ISynchronizeInvoke interface) to automatically do it for you. However, in order for the `SynchronizingObject` to work, your application must be pumping messages, either explicitly while waiting for completion (Application.DoEvents), or by not calling any blocking methods and returning control to your application's main loop (Application.Run in Main).

When calling an asynchronous method, you have the option of using a callback or waiting for the method to complete before calling the next asynchronous method. Code that uses callbacks is efficient, but you always need to know what operation must be done next since it is a cascading series of operations that must be correctly ordered and managed. If you don't mind pumping messages explicitly, waiting for the method call to complete is an alternative that can prove useful and results in easier-to-read code. 

In this example, we will use callbacks to simply connect and login anonymously to the specified hostname, then disconnect. An example that demonstrates how to wait for completion is also available further below.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using Xceed.Ftp;
  
        // Always start with an instance of AsyncFtpClient.
        AsyncFtpClient client = new AsyncFtpClient();
        
        // When using AsyncFtpClient and async method calls, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property. But remember: this
        // works if your main thread pumps messages!
        client.SynchronizingObject = form1;
        
        // Start connecting asynchronously.
        client.BeginConnect( "ftp.winzip.com", new AsyncCallback( this.ConnectCompleted ), client );
        
        // Normally, you will want to make that method return so your
        // application continues pumping messages. But for the sake of this
        // sample, we want to avoid returning and running the second example
        // before this one completes. Let's pump messages until disconnected.
        while(  client.State != FtpClientState.NotConnected )
        Application.DoEvents();
        
        private void ConnectCompleted( IAsyncResult result )
        {
          AsyncFtpClient client = ( AsyncFtpClient )result.AsyncState;
                  
          // All Begin calls must be matched by its End call.
          client.EndConnect( result );
                
          // Now that we are connected, let's login anonymously, but again
          // using the async method call.
          client.BeginLogin( new AsyncCallback( this.LoginCompleted ), client );
        }
        
        private void LoginCompleted( IAsyncResult result )
        {
          AsyncFtpClient client = ( AsyncFtpClient )result.AsyncState;
            
          // All Begin calls must be matched by its End call.
          client.EndLogin( result );
                
          // Finally, we disconnect asynchronously. You can see that if you
          // wish to perform more operations, a cascading series of async
          // calls can get out of hands.
          client.BeginDisconnect( new AsyncCallback( this.DisconnectCompleted ), client );
        }
        
        private void DisconnectCompleted( IAsyncResult result )
        {
          AsyncFtpClient client = ( AsyncFtpClient )result.AsyncState;
            
          // All Begin calls must be matched by its End call.
          client.EndDisconnect( result );
        }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Imports Xceed.Ftp

      ' Always start with an instance of AsyncFtpClient.
      Dim client As New AsyncFtpClient()

      ' When using AsyncFtpClient and async method calls, you can instruct
      ' the library to automatically redirect events on the main UI thread
      ' by setting the SynchronizingObject property. But remember: this
      ' works if your main thread pumps messages!
      client.SynchronizingObject = Form1

      ' Start connecting asynchronously.
      client.BeginConnect( "ftp.winzip.com", New AsyncCallback( AddressOf Me.ConnectCompleted ), client )

      ' Normally, you will want to make that method return so your
      ' application continues pumping messages. But for the sake of this
      ' sample, we want to avoid returning and running the second example
      ' before this one completes. Let's pump messages until disconnected.
      While client.State <> FtpClientState.NotConnected
        Application.DoEvents()
      End While

      Private Sub ConnectCompleted(ByVal result As IAsyncResult)
        Dim client As AsyncFtpClient = result.AsyncState

        ' All Begin calls must be matched by its End call.
        client.EndConnect(result)

        ' Now that we are connected, let's login anonymously, but again
        ' using the async method call.
        client.BeginLogin(New AsyncCallback(AddressOf Me.LoginCompleted), client)
      End Sub

      Private Sub LoginCompleted(ByVal result As IAsyncResult)
        Dim client As AsyncFtpClient = result.AsyncState

        ' All Begin calls must be matched by its End call.
        client.EndLogin(result)

        ' Finally, we disconnect asynchronously. You can see that if you
        ' wish to perform more operations, a cascading series of async
        ' calls can get out of hands.
        client.BeginDisconnect(New AsyncCallback(AddressOf Me.DisconnectCompleted), client)
      End Sub

      Private Sub DisconnectCompleted(ByVal result As IAsyncResult)
        Dim client As AsyncFtpClient = result.AsyncState

        ' All Begin calls must be matched by its End call.
        client.EndDisconnect(result)
      End Sub
    ```
  </TabItem>
</Tabs>

The next example also demonstrates how to connect, login and disconnect; however, rather than using callbacks, each method will wait for the prior method to complete before executing.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
        using Xceed.Ftp;
 
        // Always start with an instance of AsyncFtpClient.
        AsyncFtpClient client = new AsyncFtpClient();
        
        // When using AsyncFtpClient and async method calls, you can instruct
        // the library to automatically redirect events on the main UI thread
        // by setting the SynchronizingObject property. But remember: this
        // works if your main thread pumps messages!
        client.SynchronizingObject = form1;
        
        // Start connecting asynchronously. No need for a callback!
        IAsyncResult result = client.BeginConnect( "ftp.winzip.com", null, null );
                
        // Wait for that async result to complete, making sure to pump messages.
        while( !result.IsCompleted )
          Application.DoEvents();
        
        // Complete the connection. All "Begin" calls must be matched
        // by their matching "End" method call.
        client.EndConnect( result );
        
        // Now that we are connected, we can login.
        result = client.BeginLogin( null, null );
                
        while( !result.IsCompleted )
          Application.DoEvents();
        
        client.EndLogin( result );
        
        // And finally, we disconnect.
        result = client.BeginDisconnect( null, null );
                
        while( !result.IsCompleted )
          Application.DoEvents();
                
        client.EndDisconnect( result );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      using Xceed.Ftp;
 
      // Always start with an instance of AsyncFtpClient.
      AsyncFtpClient client = new AsyncFtpClient();
      
      // When using AsyncFtpClient and async method calls, you can instruct
      // the library to automatically redirect events on the main UI thread
      // by setting the SynchronizingObject property. But remember: this
      // works if your main thread pumps messages!
      client.SynchronizingObject = form1;
      
      // Start connecting asynchronously. No need for a callback!
      IAsyncResult result = client.BeginConnect( "ftp.winzip.com", null, null );
              
      // Wait for that async result to complete, making sure to pump messages.
      while( !result.IsCompleted )
        Application.DoEvents();
      
      // Complete the connection. All "Begin" calls must be matched
      // by their matching "End" method call.
      client.EndConnect( result );
      
      // Now that we are connected, we can login.
      result = client.BeginLogin( null, null );
              
      while( !result.IsCompleted )
        Application.DoEvents();
      
      client.EndLogin( result );
      
      // And finally, we disconnect.
      result = client.BeginDisconnect( null, null );
              
      while( !result.IsCompleted )
        Application.DoEvents();
              
      client.EndDisconnect( result );
    ```
  </TabItem>
</Tabs>