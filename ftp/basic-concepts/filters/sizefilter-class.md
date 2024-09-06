import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SizeFilter

The `SizeFilter` class can be used to filter files according to their size.

## Demonstration
Retrieve all the files in a folder that are between 5k and 10k in **size**.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter filter = new SizeFilter();

        filter.MaxSize = 10240;
        filter.MinSize = 5120; 

        AbstractFile[] files = myFolder.GetFiles( true, filter );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim filter As New SizeFilter()

        filter.MaxSize = 10240
        filter.MinSize = 5120 

        Dim files As AbstractFile() = myFolder.GetFiles( True, filter )
      ```
    </TabItem>
</Tabs>