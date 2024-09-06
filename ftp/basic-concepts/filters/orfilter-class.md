import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OrFilter

The `OrFilter` class serves the same purpose as a logical-or operator. It states the items must match at least one of the filters it regroups in order to be processed.

## Demonstration
This example processes all the files that have the TXT **or** the EXE extension.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( new OrFilter( new NameFilter( "*.txt" ), new NameFilter( "*.exe" ) ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( New OrFilter( New NameFilter( "*.txt" ), New NameFilter( "*.exe" ) ) )
      ```
    </TabItem>
</Tabs>

Since using a pipe (|) in the constructor of a NameFilter class accomplishes the same thing as regrouping multiple NameFilter classes within an OrFilter class, the following code would be simpler.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( "*.txt|*.exe" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( "*.txt|*.exe" )
      ```
    </TabItem>
</Tabs>

This example processes all the files that have the TXT extension or are greater than 10k in size. Again, we omit the creation of the NameFilter class around the name mask since it is already being created underneath.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter filter = new SizeFilter();

        filter.MinSize = 10240;
        AbstractFile[] files = myFolder.GetFiles( new OrFilter( "*.txt", filter ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim filter = new SizeFilter()

        filter.MinSize = 10240
        Dim files As AbstractFile() = myFolder.GetFiles( New OrFilter( "*.txt", filter ) )
      ```
    </TabItem>
</Tabs>