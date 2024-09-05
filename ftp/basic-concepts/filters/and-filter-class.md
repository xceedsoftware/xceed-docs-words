import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AndFilter

The `AndFilter` class serves the same purpose as a logical-and operator. It states that the items must match all the filters regrouped within the `AndFilter` class in order to be processed.

## Demonstration
Process all the files in folder that contain the TXT extension **and** that are between 5k and 10k **size**.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter filter = new SizeFilter();

        filter.MaxSize = 10240;
        filter.MinSize = 5120; 

        AbstractFile[] files = myFolder.GetFiles( true,
                                                  new AndFilter( new NameFilter( "*.txt" ), 
                                                  filter ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim filter As New SizeFilter()

        filter.MaxSize = 10240
        filter.MinSize = 5120

        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                                        New AndFilter( New NameFilter( "*.txt" ), _
                                                        filter ) )
      ```
    </TabItem>
</Tabs>

Since the AndFilter is used by default when combining multiple filters, it is not necessary to create an instance of the AndFilter class. Therefore, we can omit the creation of the class. We can also omit creating a NameFilter class since we are using a basic string filter and the NameFilter class is constructed underneath.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter filter = new SizeFilter();

        filter.MaxSize = 10240;
        filter.MinSize = 5120; 

        AbstractFile[] files = myFolder.GetFiles( true, "*.txt", filter );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim filter As New SizeFilter()

        filter.MaxSize = 10240
        filter.MinSize = 5120 

        Dim files As AbstractFile() = myFolder.GetFiles( True, "*.txt", filter )
      ```
    </TabItem>
</Tabs>