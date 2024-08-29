import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# QuickZip class

This topic briefly presents some of the simpler overloads of the static methods of the QuickZip class; for a complete list, see the class's in the reference documentation. Also, see the appropriate topics under Task-Based Help for more complete examples.

## The methods
Only the simpler overloads of the QuickZip class are presented here. Other overloads let you specify whether files should be replaced, added recursively, and have their paths preserved, and let you perform split/span and use encryption.

The Zip method compresses files into a Zip archive. The following recursively adds files named "file.txt" to an archive called "test.zip". 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickZip.Zip( @"d:\test.zip", @"d:\file.txt" ); 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickZip.Zip( "d:\test.zip", "d:\file.txt" )
    ```
  </TabItem>
</Tabs>

The `Unzip` method let you extract files from a Zip archive. The following version specifies the name of the archive and where to extract, boolean values indicating whether to replacing existing files, extract recursively, and preserve paths, and a file mask: 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickZip.Unzip( @"d:\test.zip", @"d:\", true, true, false, "*" ); 
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickZip.Unzip( "d:\test.zip", "d:\", False, "*" )
    ```
  </TabItem>
</Tabs>

The `GetZipContents` method returns `QuickZipItem` objects that describe the contents of the zip archive in terms of the items' size and naem, their compressed size, method, and ratio, etc. 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickZipItem[] items = QuickZip.GetZipContents( @"c:\test.zip", "*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      items = QuickZip.GetZipContents( "c:\test.zip", "*" )
    ```
  </TabItem>
</Tabs>

Finally, the `Remove` static method lets you remove items from a Zip archive. The following specifies the zip archive and a file mask: 

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      QuickZip.Remove( @"d:\test\files.zip", "old*" );
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      QuickZip.Remove( "d:\test\files.zip", "old*" )
    ```
  </TabItem>
</Tabs>

## Remarks
Overloads which do not have a recursive parameter automatically perform their operation recursively.