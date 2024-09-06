import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NotFilter

The `NotFilter` class serves to negate filters. It states that in order for the items to be processed they must not match the encompassed filters.

## Demonstration
Process all the files that do **not** have the TXT extension. We will omit the creation of the `NameFilter` class around the name mask since it is being created underneath.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, NotFilter( "*.txt" ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, NotFilter( "*.txt" ) ) 
      ```
    </TabItem>
</Tabs>