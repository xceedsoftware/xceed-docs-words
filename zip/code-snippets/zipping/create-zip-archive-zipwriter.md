import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a Zip archive using ZipWriter

The following example demonstrates how to create a Zip archive locally using the files in a test directory.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      using System.IO;
      using Xceed.Zip.ReaderWriter;
      //The target Zip archive
      using (FileStream fileStream1 = new FileStream(@"d:\testOutput\test.zip",
        FileMode.Create, FileAccess.Write))
      {
        //Create the ZipWriter object around the stream.
        Xceed.Zip.ReaderWriter.ZipWriter zipWriter1 =
          new Xceed.Zip.ReaderWriter.ZipWriter(fileStream1);
        //The source directory.
        DirectoryInfo directoryInfo = new DirectoryInfo(@"d:\test\");
        if (directoryInfo.Exists)
        {
          //Get files in the current directory and all subdirectories.
          FileInfo[] files = directoryInfo.GetFiles("*.*",
            SearchOption.AllDirectories);
          foreach (FileInfo file in files)
          {
            //Create ZipItemLocalHeader for current item and write to archive.
            ZipItemLocalHeader zipItemLocalHeader1 = new ZipItemLocalHeader
              (file.Name);
            zipWriter1.WriteItemLocalHeader(zipItemLocalHeader1);
            byte[] buffer = new byte[1024];
            int read = 0;
            using (FileStream fs = file.OpenRead())
            {
              //Read the current item's data
              while ((read = fs.Read(buffer, 0, buffer.Length)) != 0)
              {
                //Write the current item's data to the Zip archive
                zipWriter1.WriteItemData(buffer, 0, read);
                Console.WriteLine("Writing {0}. {1} bytes written.",
                  zipItemLocalHeader1.FileName, read);
              }
            }
          }
          //Close the Zip archive. Writes the archive's central header.
          zipWriter1.CloseZipFile();
          Console.WriteLine("Zip archive created.");
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
       Imports System.IO
        Imports Xceed.Zip.ReaderWriter
        'The target Zip archive
        Using fileStream1 As New FileStream("d:\testOutput\test.zip",
          FileMode.Create, FileAccess.Write)

          'Create the ZipWriter object around the stream.
          Dim zipWriter1 As New Xceed.Zip.ReaderWriter.ZipWriter(fileStream1)
          'The source directory
          Dim directoryInfo As New DirectoryInfo("d:\test\")
          If directoryInfo.Exists Then

            'Get files in the current directory and all subdirectories.
            Dim files As FileInfo() = directoryInfo.GetFiles("*.*",
              SearchOption.AllDirectories)

            For Each file As FileInfo In files
              'Create ZipItemLocalHeader for current item and write to archive.
              Dim zipItemLocalHeader1 As New ZipItemLocalHeader(file.Name)
              zipWriter1.WriteItemLocalHeader(zipItemLocalHeader1)
              Dim buffer As Byte() = New Byte(1023){}
              Dim read As Integer = 0
              Using fs As FileStream = file.OpenRead()
                'Read the current item's data
                read = fs.Read(buffer, 0, buffer.Length)
                Do While (read <> 0)
                  'Write the current item's data to the Zip archive
                  zipWriter1.WriteItemData(buffer, 0, read)
                  Console.WriteLine("Writing {0}. {1} bytes written.", zipItemLocalHeader1.FileName, read)
                  read = fs.Read(buffer, 0, buffer.Length)
                Loop
              End Using
            Next file
            'Close the Zip archive. Writes the archive's central header.
            zipWriter1.CloseZipFile()
            Console.WriteLine("Zip archive created.")
          End If
        End Using
    ```
  </TabItem>
</Tabs>