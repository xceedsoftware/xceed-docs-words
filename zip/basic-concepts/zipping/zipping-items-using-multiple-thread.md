import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Zipping items using multiple threads

Starting with version 6.1, it is possible to enable the use of multiple threads when zipping with the Deflate or Deflate64 compression methods.

Multiple threads must be explicitly enabled. Support is not active by default because of the large resources used. By default, the number of threads used will be the number of processors on the machine. A maximum of 32 threads can be specified.

Multi-threading works by zipping multiple different files at the same time. The zipping order is not guaranteed to be maintained. The engine does not split single files into different threads. The threads are assigned on a per-file basis. This keeps the compression ratio as high as it can be.

The Xceed.Zip.ZipMultiThreadManager class activates and controls multi threading. Once an instance of the class is assigned to the ZipArchive.MultiThreadManager property, multi threading can be used for zipping. Setting the property to null disables the use of multi threading for the next operations.

The ZipMultiThreadManager object is by default passive. It performs its duties of assigning data to be zipped to running threads and writing zip headers to finished items only when ZipArchive is running. In most scenarios, this is sufficient as shown in the typical usage example below. However, in the scenario where files or folders will be queued for zipping and the application will not call ZipArchive to wait for the operation to complete or add new items for zipping for a significant amount of time, the ZipMultiThreadManager has an option to make itself run automatically in the background. It is not enabled by default.

## Typical usage example

:::note
Multi-threading has limitations. It is only active when Deflate or Deflate64 is used. Each thread uses, by default, 32MB of memory for buffering.

For small zipping operations, where there are less files to zip than the number of threads, there will be no performance gain. The best performance gains come from scenarios where a large number of small to medium-sized files are zipped as this saturates the CPU cores. Because the threads are assigned at the file level, a scenario where a single very large file is zipped would not see a performance gain.
:::

## Demonstration

This example demonstrates how to copy a file located in memory to a zip file.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void ZipMultiThread()
      {
        AbstractFile zipFile = new DiskFile( "ZipMultiThread1.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        ZipArchive zip = new ZipArchive( zipFile );

        // Create the multi-thread manager
        ZipMultiThreadManager zipMultiThreadManager = new ZipMultiThreadManager();

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        /* Having the use of multiple threads doesn't change typical zipping scenarios
        * It is still highly desirable to batch zipping operations. In fact it is even more important
        * when multiple threads are enabled as more items can be queued at the same time. */
        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          // Select a source folder
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          
          // Queue the files in the folder for zipping
          sourceFolder.CopyFilesTo( zip, true, true );

          /* Without a ZipMultiThreadManager object assigned to the ZipArchive, CopyFilesTo() would not return
          * until all the source items data is compressed.
          * 
          * Here, CopyFilesTo() will return immediately and the files and folders will instead be queued for zipping
          * different threads will take charge of different files at the same time and compress the data. */

          // Select a source file
          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );

          // Queue the file for zipping
          sourceFile.CopyTo( zip, true );

          /* The same effect happens with CopyTo() it will return immediately and the file will be queued for zipping. */

          /* Here, as the batch operation completes, the zip archive will wait for all the queued items
            to complete zipping before returning. */
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub ZipMultiThread()
      Dim zipFile As AbstractFile = New DiskFile("ZipMultiThread1.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Create the multi-thread manager
      Dim zipMultiThreadManager As New ZipMultiThreadManager()

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      ' Having the use of multiple threads doesn't change typical zipping scenarios
      ' It is still highly desirable to batch zipping operations. In fact it is even more important
      ' when multiple threads are enabled as more items can be queued at the same time. 
      Using batch As New AutoBatchUpdate(zip)
        ' Select a source folder
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")

        ' Queue the files in the folder for zipping
        sourceFolder.CopyFilesTo(zip, True, True)

        ' Without a ZipMultiThreadManager object assigned to the ZipArchive, CopyFilesTo() would not return
        ' until all the source items data is compressed.
        '
        ' Here, CopyFilesTo() will return immediately and the files and folders will instead be queued for zipping
        ' different threads will take charge of different files at the same time and compress the data. 

        ' Select a source file
        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")

        ' Queue the file for zipping
        sourceFile.CopyTo(zip, True)

        ' The same effect happens with CopyTo() it will return immediately and the file will be queued for zipping. 

        ' Here, as the batch operation completes, the zip archive will wait for all the queued items
        ' to complete zipping before returning. 
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## Running ZipMultiThreadManager in the background

The ZipMultiThreadManager constructor takes a Boolean parameter that specifies if the manager should run itself periodically (currently every 500ms). By default, the value if false. It is not currently possible to change the value after the object has been created.

It is generally not necessary to enable background running of the manager as typical code patterns will make the manager run often enough. There is also a slight performance penalty if the option is enable without a real need. However, in scenarios where an application will queue items for zipping and then start a lengthy unrelated task, the manager will not have an opportunity to run. Then enabling background running becomes desirable and will dramatically improve performance.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void ZipMultiThread()
      {
        AbstractFile zipFile = new DiskFile( "ZipMultiThread4.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        ZipArchive zip = new ZipArchive( zipFile );

        // Create the multi-thread manager making it run periodically
        ZipMultiThreadManager zipMultiThreadManager = new ZipMultiThreadManager( true );

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        /* Having the use of multiple threads doesn't change typical zipping scenarios
        * It is still highly desirable to batch zipping operations. In fact it is even more important
        * when multiple threads are enabled as more items can be queued at the same time. */
        IDisposable batch = new AutoBatchUpdate( zip );

        try
        {
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          sourceFolder.CopyFilesTo( zip, true, true );

          /* Let's assume the application will now perform a very length operation. Because ZipMultiThreadManager
          * is by default passive, it would not run during this time and the compression would stall because
          * no new files will be assigned to the threads.
          * 
          * But since we created our ZipMultiThreadManager instance with the runPeriodically parameter to 'true',
          * the manager will run itself in a separate thread and keep the worker threads busy. */

          // Perform a lengthy operation
          System.Threading.Thread.Sleep( 5 * 1000 );

          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );
          sourceFile.CopyTo( zip, true );
        }
        finally
        {
          /* Here, as the batch operation completes, the zip archive will wait for all the queued items
            to complete zipping before returning. */
          batch.Dispose();
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub ZipMultiThread()
      Dim zipFile As AbstractFile = New DiskFile("ZipMultiThread4.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Create the multi-thread manager making it run periodically
      Dim zipMultiThreadManager As New ZipMultiThreadManager(True)

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      ' Having the use of multiple threads doesn't change typical zipping scenarios
      ' It is still highly desirable to batch zipping operations. In fact it is even more important
      ' when multiple threads are enabled as more items can be queued at the same time. 
      Dim batch As IDisposable = New AutoBatchUpdate(zip)

      Try
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")
        sourceFolder.CopyFilesTo(zip, True, True)

        ' Let's assume the application will now perform a very length operation. Because ZipMultiThreadManager
        ' is by default passive, it would not run during this time and the compression would stall because
        ' no new files will be assigned to the threads.
        ' 
        ' But since we created our ZipMultiThreadManager instance with the runPeriodically parameter to 'true',
        ' the manager will run itself in a separate thread and keep the worker threads busy. 

        ' Perform a lengthy operation
        System.Threading.Thread.Sleep(5 * 1000)

        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")
        sourceFile.CopyTo(zip, True)
      Finally
        ' Here, as the batch operation completes, the zip archive will wait for all the queued items
        ' to complete zipping before returning. 
        batch.Dispose()
      End Try
    End Sub
    ```
  </TabItem>
</Tabs>

## One multi-thread manager object used over multiple zip archives sequentially

In this example, the multi-thread manager object is used by multiple zip archives sequentially. This means that the multiple threads are only created once, saving some contiguous memory.

Sharing the manager object between archives does not mean that they will share data. The manager is just the tool that owns the background threads and coordinates the compression workloads assigned to it.

The ZipMultiThreadManager class is not meant to be used by multiple threads at the same time. Such usage will result in undefined behavior.

The example also shows you can choose which zipping operation will use threads.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void ZipMultiThread()
      {
        // Create the multi-thread manager
        // Using 0 as a parameter asks to use the maximum number of processors on the machine
        ZipMultiThreadManager zipMultiThreadManager = new ZipMultiThreadManager( 0 );

        AbstractFile zipFile;
        ZipArchive zip;

        zipFile = new DiskFile( "ZipMultiThread2_1.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        zip = new ZipArchive( zipFile );

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          sourceFolder.CopyFilesTo( zip, true, true );

          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );
          sourceFile.CopyTo( zip, true );
        }

        /* Now, let's create another zip file */

        zipFile = new DiskFile( "ZipMultiThread2_2.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        zip = new ZipArchive( zipFile );

        /* Notice how the multi-thread manager can be shared between multiple zip archives. */

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          sourceFolder.CopyFilesTo( zip, true, true );

          AbstractFile sourceFile = new DiskFile( @"SomeOtherFile.dat" );
          sourceFile.CopyTo( zip, true );
        }

        /* Let's create yet another zip file */

        zipFile = new DiskFile( "ZipMultiThread2_3.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        zip = new ZipArchive( zipFile );

        /* Notice how the multi-thread manager can be shared between multiple zip archives. */

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          sourceFolder.CopyFilesTo( zip, true, true );

          // Don't use multiple threads for the following operation
          zip.MultiThreadManager = null;

          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );
          sourceFile.CopyTo( zip, true );

          // Use multiple threads again
          zip.MultiThreadManager = zipMultiThreadManager;

          sourceFile = new DiskFile( @"SomeOtherFile.dat" );
          sourceFile.CopyTo( zip, true );
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub ZipMultiThread()
      ' Create the multi-thread manager
      ' Using 0 as a parameter asks to use the maximum number of processors on the machine
      Dim zipMultiThreadManager As New ZipMultiThreadManager(0)

      Dim zipFile As AbstractFile
      Dim zip As ZipArchive

      zipFile = New DiskFile("ZipMultiThread2_1.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      zip = New ZipArchive(zipFile)

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      Using batch As New AutoBatchUpdate(zip)
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")
        sourceFolder.CopyFilesTo(zip, True, True)

        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")
        sourceFile.CopyTo(zip, True)
      End Using

      ' Now, let's create another zip file 

      zipFile = New DiskFile("ZipMultiThread2_2.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      zip = New ZipArchive(zipFile)

      ' Notice how the multi-thread manager can be shared between multiple zip archives. 

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      Using batch As New AutoBatchUpdate(zip)
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")
        sourceFolder.CopyFilesTo(zip, True, True)

        Dim sourceFile As AbstractFile = New DiskFile("SomeOtherFile.dat")
        sourceFile.CopyTo(zip, True)
      End Using

      ' Let's create yet another zip file 

      zipFile = New DiskFile("ZipMultiThread2_3.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      zip = New ZipArchive(zipFile)

      ' Notice how the multi-thread manager can be shared between multiple zip archives. 

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      Using batch As New AutoBatchUpdate(zip)
        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")
        sourceFolder.CopyFilesTo(zip, True, True)

        ' Don't use multiple threads for the following operation
        zip.MultiThreadManager = Nothing

        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")
        sourceFile.CopyTo(zip, True)

        ' Use multiple threads again
        zip.MultiThreadManager = zipMultiThreadManager

        sourceFile = New DiskFile("SomeOtherFile.dat")
        sourceFile.CopyTo(zip, True)
      End Using
    End Sub
    ```
  </TabItem>
</Tabs>

## FileSystem progression events in a multi-thread context

Events from the FileSystemEvents class are triggered when a zipping operation is performed under the ZipMultiThreadManager similar to single-threaded operation, with some differences.

The ItemProgression event is triggered when an item is about to start to be compressed by the ZipMultiThreadManager.

The ItemCompletion event is triggered when an item has completed the zipping process. You will get the event even if there is an exception and the chosen action is to 'ignore' the item and proceed with the next one.

The ItemException event will be triggered if an exception occurs during processing. Even with the ZipMultiThreadManager, it is possible to Abort, Retry or Ignore the operation.

The ByteProgression event is triggered as needed during zipping. An application can depend on getting a consistent trigger at 0% completion and at 100% completion.

The ItemProgression, ItemCompletion and ItemException events will only be triggered from the main thread. Never from background threads. So the event handler code for these events does not need to be thread-safe.

The ByteProgression event will be triggered from both background threads (during compression) and the main thread (the first 0% completion and last 100% completion call). So the code in the event handler might be executed by several different threads at the same time for different items. Therefore, the ByteProgression event handler code might need to be thread-safe.

The progression events will correctly compute the progression numbers and percentages for both the 'current file' and 'all files. This includes the ByteProgression event. The 'Processed' value for the 'all files' tracking remains coherent even when multiple threads report byte progress at the same time.

### UserData

If the value of the UserData property is changed in one of the event handlers, the value will be propagated to the other event handlers regardless of the item, just like the single-threaded execution. Except for the ByteProgression event. For this event, each item has its own UserData value. It is initialized with the current value of the session's UserData just after the ItemProgression event is triggered for the item. After that, the UserData value included in the ByteProgression event handler for that item is independent. It may be changed in the event handler and it will be remembered, but only for the ByteProgression event for the item. It will not propagate to the other events.

Because of this, it is safe to change the value of the UserData property in the ByteProgression event handler without using thread synchronization (like a lock() block for example).

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public static void ZipMultiThread()
      {
        AbstractFile zipFile = new DiskFile( "ZipMultiThread3.zip" );

        // Delete any existing zip file
        if( zipFile.Exists )
          zipFile.Delete();

        // Create a logical zip archive around the zip file
        ZipArchive zip = new ZipArchive( zipFile );

        // Create the multi-thread manager
        ZipMultiThreadManager zipMultiThreadManager = new ZipMultiThreadManager();

        // Assign the multi-thread manager to the archive so its operations use multiple threads
        zip.MultiThreadManager = zipMultiThreadManager;

        // Create a FileSystemEvents object
        FileSystemEvents events = new FileSystemEvents();
        object userData = null;

        // Subscribe to progression and exception events
        events.ByteProgression += new ByteProgressionEventHandler( OnByteProgression );
        events.ItemProgression += new ItemProgressionEventHandler( OnItemProgression );
        events.ItemException += new ItemExceptionEventHandler( OnItemException );
        events.ItemCompletion += new ItemProgressionEventHandler( OnItemCompletion );

        using( AutoBatchUpdate batch = new AutoBatchUpdate( zip ) )
        {
          /* Perform some zip operations using the events object to track progress */

          AbstractFolder sourceFolder = new DiskFolder( @"D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\" );
          sourceFolder.CopyFilesTo( events, userData, zip, true, true );

          AbstractFile sourceFile = new DiskFile( @"SomeFile.dat" );
          sourceFile.CopyTo( events, userData, zip, true );
        }
      }

      static void OnItemProgression( object sender, ItemProgressionEventArgs e )
      {
        Console.WriteLine( "Item Progression: {0} / {1}. {2}%", e.CurrentItem, e.TargetItem, e.AllItems.Percent );
      }

      static void OnItemCompletion( object sender, ItemProgressionEventArgs e )
      {
        Console.WriteLine( "Completion: {0} / {1}. {2}%", e.CurrentItem, e.TargetItem, e.AllItems.Percent );
      }

      static void OnByteProgression( object sender, ByteProgressionEventArgs e )
      {
        /* This code can be called by multiple threads at the same time and for different files */

        Console.WriteLine( "Byte Progression: {0} / {1}. {2}% / {3}%", e.CurrentItem, e.TargetItem, e.CurrentFileBytes.Percent, e.AllFilesBytes.Percent );

        /* OPTIONAL: It is safe to change the value of UserData without a lock() block. The component keeps it independent for each file */
        //e.UserData = 13;
      }

      static void OnItemException( object sender, ItemExceptionEventArgs e )
      {
        Console.WriteLine( "Exception: {0} / {1}", e.CurrentItem, e.TargetItem );

        e.Action = ItemExceptionAction.Ignore;
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Shared Sub ZipMultiThread()
      Dim zipFile As AbstractFile = New DiskFile("ZipMultiThread3.zip")

      ' Delete any existing zip file
      If zipFile.Exists Then
        zipFile.Delete()
      End If

      ' Create a logical zip archive around the zip file
      Dim zip As New ZipArchive(zipFile)

      ' Create the multi-thread manager
      Dim zipMultiThreadManager As New ZipMultiThreadManager()

      ' Assign the multi-thread manager to the archive so its operations use multiple threads
      zip.MultiThreadManager = zipMultiThreadManager

      ' Create a FileSystemEvents object
      Dim events As New FileSystemEvents()
      Dim userData As Object = Nothing

      ' Subscribe to progression and exception events
      AddHandler events.ByteProgression, AddressOf OnByteProgression
      AddHandler events.ItemProgression, AddressOf OnItemProgression
      AddHandler events.ItemException, AddressOf OnItemException
      AddHandler events.ItemCompletion, AddressOf OnItemCompletion

      Using batch As New AutoBatchUpdate(zip)
        ' Perform some zip operations using the events object to track progress 

        Dim sourceFolder As AbstractFolder = New DiskFolder("D:\Components\NET40\FileSystem\Dev\Trunk\Tests\UnitTesting\Xceed.Zip.Tests\Data\")
        sourceFolder.CopyFilesTo(events, userData, zip, True, True)

        Dim sourceFile As AbstractFile = New DiskFile("SomeFile.dat")
        sourceFile.CopyTo(events, userData, zip, True)
      End Using
    End Sub

    Private Shared Sub OnItemProgression(ByVal sender As Object, ByVal e As ItemProgressionEventArgs)
      Console.WriteLine("Item Progression: {0} / {1}. {2}%", e.CurrentItem, e.TargetItem, e.AllItems.Percent)
    End Sub

    Private Shared Sub OnItemCompletion(ByVal sender As Object, ByVal e As ItemProgressionEventArgs)
      Console.WriteLine("Completion: {0} / {1}. {2}%", e.CurrentItem, e.TargetItem, e.AllItems.Percent)
    End Sub

    Private Shared Sub OnByteProgression(ByVal sender As Object, ByVal e As ByteProgressionEventArgs)
      ' This code can be called by multiple threads at the same time and for different files 

      Console.WriteLine("Byte Progression: {0} / {1}. {2}% / {3}%", e.CurrentItem, e.TargetItem, e.CurrentFileBytes.Percent, e.AllFilesBytes.Percent)

      ' OPTIONAL: It is safe to change the value of UserData without a lock() block. The component keeps it independent for each file 
      'e.UserData = 13;
    End Sub

    Private Shared Sub OnItemException(ByVal sender As Object, ByVal e As ItemExceptionEventArgs)
      Console.WriteLine("Exception: {0} / {1}", e.CurrentItem, e.TargetItem)

      e.Action = ItemExceptionAction.Ignore
    End Sub
    ```
  </TabItem>
</Tabs>

