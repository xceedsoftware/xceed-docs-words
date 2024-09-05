import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AttributeFilter

The `AttributeFilter` class can be used to filter files and folders according to their attributes. The attributes are specified by using the `FileAttributes` enumeration.

## Demonstration
Process all files that have the read-only attribute.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, 
                                    new AttributeFilter( System.IO.FileAttributes.ReadOnly ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                           New AttributeFilter( System.IO.FileAttributes.ReadOnly ) )
      ```
    </TabItem>
</Tabs>

Process all files that have both the read-only and the hidden attribute.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true,
                              new AttributeFilter( System.IO.FileAttributes.ReadOnly ), 
                              new AttributeFilter( System.IO.FileAttributes.Hidden ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                     New AttributeFilter( System.IO.FileAttributes.ReadOnly ), _
                                     New AttributeFilter( System.IO.FileAttributes.Hidden ) )
      ```
    </TabItem>
</Tabs>

Process all files that have either the read-only or hidden attribute.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true,
            new AttributeFilter( System.IO.FileAttributes.ReadOnly|System.IO.FileAttributes.Hidden ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, _ 
             New AttributeFilter( System.IO.FileAttributes.ReadOnly|System.IO.FileAttributes.Hidden ) )
      ```
    </TabItem>
</Tabs>

The pipe (|) used in the constructor of the `AttributeFilter` class serves the same purpose as an `OrFilter` class.

## Things you should consider
- Do you only want to target specific types of folder items? Use the `FilterScope` enumeration in the constructor of the `AttributeFilter` class.