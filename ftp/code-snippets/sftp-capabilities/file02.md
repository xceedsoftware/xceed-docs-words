import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Performing a manual upload

The upload mechanism in SFtp is provided by the SFtpFile.CopyTo method. The method

1. Validates the supplied parameters by checking for null for example.
2. Makes sure the upload makes sense by making sure the source exists, isn't the same as the destination, and other checks.
3. Performs the upload by copying the data from the source to the destination.
4. Applies the properties like dates, file attributes from the source file to the destination file.

In some scenarios, not all of these steps are desirable. For example, some SFtp servers remove files as soon as they are uploaded. This can cause problems with the last step of the upload procedure as the destination file might have disappeared before the properties can be applied.

In these cases, it might be best to avoid using the CopyTo method and perform uploads manually. This allows an application to focus on the data upload only and avoid operations the server cannot handle.

A manual upload is performed by opening streams for both the source and destination files and copying data read from the source stream to the destination stream in a loop until there is no more data to read. The amount of data read from the source in each iteration can be carefully chosen with the ComputeStreamBufferSize Method to generate the least overhead.

The following example shows how this can be done.


<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
          using System;
          using System.IO;

          using Xceed.SSH.Client;
          using Xceed.SSH.Protocols;
          using Xceed.SSH.Core;
          using Xceed.FileSystem;

          namespace DocumentationExamples.SSH
          {
            public class ManualCopyTo
            {
              public static void Example()
              {
                string host = "sftptest.dreamhosters.com";
                string username = "snippet_sftp";
                string password = "9MNfGgSx";

                using( SSHClient ssh = new SSHClient() )
                {
                  ssh.Connect( host );
                  ssh.Authenticate( username, password );

                  // Start a SFtp session from the SSH client
                  using( SFtpSession sftp = new SFtpSession( ssh ) )
                  {
                    // Select a local file
                    AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );

                    // Select a remote destination folder
                    AbstractFolder destinationFolder = new SFtpFolder( sftp, "SomeFolder" );

                    // Select the destination file in the destination folder using the name of the source file
                    AbstractFile destinationFile = destinationFolder.GetFile( sourceFile.Name );

                    if( !sourceFile.Exists )
                      throw new InvalidOperationException( "Source file does not exist." );

                    if( sourceFile.IsSameAs( destinationFile ) )
                      throw new InvalidOperationException( "Cannot copy a file unto itself." );

                    // Open the source file for reading
                    using( Stream sourceStream = sourceFile.OpenRead() )
                    {
                      Stream destinationStream = null;

                      try
                      {
                        // If the destination file already exists
                        if( destinationFile.Exists )
                        {
                          // Open it for writing, overwriting its previous contents
                          destinationStream = destinationFile.OpenWrite( true );
                        }
                        else
                        {
                          // Create it and open it for writing in one operation
                          destinationStream = destinationFile.CreateWrite();
                        }

                        /* SSH has an overhead and several rules that define a maximum logical packet
                        size.
                        
                        We are free to use any reasonable buffer size we want and it will work.
                        However, using a value too small will generate more overhead than needed.
                        Using a value too large will force the component to split the data into
                        several packets and increase overhead as well.
                          
                        SFtpSession has a method that computes the optimal buffer size for the
                        SFtp stream. It takes into account the effective overhead packets will have
                        and computes a value that will make it so that every call to Stream.Write()
                        will end up creating the biggest SSH packet allowed by the server that does
                        not generate extra overhead.
                          
                        This provides the best throughput in a file transfer. */
                        int bufferSize = sftp.ComputeStreamBufferSize( destinationStream );

                        // Create a buffer for the streams
                        byte[] buffer = new byte[ bufferSize ];
                        int read;

                        // While we have data to read from the source stream
                        while( ( read = sourceStream.Read( buffer, 0, bufferSize ) ) > 0 )
                        {
                          // Write the data to the destination stream
                          destinationStream.Write( buffer, 0, read );
                        }
                      }
                      finally
                      {
                        // If we have a destination stream
                          if( destinationStream != null )
                        {
                          // Close it
                          destinationStream.Close();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Imports Microsoft.VisualBasic
        Imports System
        Imports System.IO

        Imports Xceed.SSH.Client
        Imports Xceed.SSH.Protocols
        Imports Xceed.SSH.Core
        Imports Xceed.FileSystem

        Namespace DocumentationExamples.SSH
          Public Class ManualCopyTo
            Public Shared Sub Example()
              Dim host As String = "sftptest.dreamhosters.com"
              Dim username As String = "snippet_sftp"
              Dim password As String = "9MNfGgSx"

              Using ssh As New SSHClient()
                ssh.Connect(host)
                ssh.Authenticate(username, password)

                ' Start a SFtp session from the SSH client
                Using sftp As New SFtpSession(ssh)
                  ' Select a local file
                  Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")

                  ' Select a remote destination folder
                  Dim destinationFolder As AbstractFolder = New SFtpFolder(sftp, "SomeFolder")

                  ' Select the destination file in the destination folder using the name of the source file
                  Dim destinationFile As AbstractFile = destinationFolder.GetFile(sourceFile.Name)

                  If (Not sourceFile.Exists) Then
                    Throw New InvalidOperationException("Source file does not exist.")
                  End If

                  If sourceFile.IsSameAs(destinationFile) Then
                    Throw New InvalidOperationException("Cannot copy a file unto itself.")
                  End If

                  ' Open the source file for reading
                  Using sourceStream As Stream = sourceFile.OpenRead()
                    Dim destinationStream As Stream = Nothing

                    Try
                      ' If the destination file already exists
                      If destinationFile.Exists Then
                        ' Open it for writing, overwriting its previous contents
                        destinationStream = destinationFile.OpenWrite(True)
                      Else
                        ' Create it and open it for writing in one operation
                        destinationStream = destinationFile.CreateWrite()
                      End If

        '               SSH has an overhead and several rules that define a maximum logical packet
        '               size.
        '               
        '               We are free to use any reasonable buffer size we want and it will work.
        '               However, using a value too small will generate more overhead than needed.
        '               Using a value too large will force the component to split the data into
        '               several packets and increase overhead as well.
        '                
        '               SFtpSession has a method that computes the optimal buffer size for the
        '               SFtp stream. It takes into account the effective overhead packets will have
        '               and computes a value that will make it so that every call to Stream.Write()
        '               will end up creating the biggest SSH packet allowed by the server that does
        '               not generate extra overhead.
        '                
        '               This provides the best throughput in a file transfer. 
                      Dim bufferSize As Integer = sftp.ComputeStreamBufferSize(destinationStream)

                      ' Create a buffer for the streams
                      Dim buffer(bufferSize - 1) As Byte
                      Dim read As Integer

                      ' While we have data to read from the source stream
                      read = sourceStream.Read(buffer, 0, bufferSize)
                      Do While read > 0
                        ' Write the data to the destination stream
                        destinationStream.Write(buffer, 0, read)
                        read = sourceStream.Read(buffer, 0, bufferSize)
                      Loop
                    Finally
                      ' If we have a destination stream
                      If destinationStream IsNot Nothing Then
                        ' Close it
                        destinationStream.Close()
                      End If
                    End Try
                  End Using
                End Using
              End Using
            End Sub
          End Class
        End Namespace
      ```
    </TabItem>
</Tabs>