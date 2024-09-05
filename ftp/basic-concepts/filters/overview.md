import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Filters

You can target specific files and folders to process using either basic filters or `Filter` classes.  

## Basic filters
A basic filter is a filter that is constructed from a string or a filter built using a file attribute. The most common example of a basic filter would be a name mask on a group of files. 

For example, if you wanted to process only the TXT files found in a folder, you could simply use "*.txt" as a filter without needing to create a Filter class around the string.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, "*.txt" );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, "*.txt" )
      ```
    </TabItem>
</Tabs>

You could also process all files that have the read-only attribute without creating a filter class:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, System.IO.FileAttributes.ReadOnly );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, System.IO.FileAttributes.ReadOnly )
      ```
    </TabItem>
</Tabs>

## Filter class
The Xceed.FileSystem namespace regroups seven Filter classes: the `AttributeFilter` class which filters files and folders according to their attributes,  the `DateTimeFilter` class which filters files and folders according to their dates and times, the `NameFilter` class which filters files and folders according to their names and the `SizeFilter` class which filters files according to their size. It also regroups three logical Filter classes: the `AndFilter` class which allows logical-and operations, the `NotFilter` class which serves to negate filters and the `OrFilter` class which allows logical-or operations. All of these classes derive from the base Filter class. 

If we revisit the basic filter example and want to process only the TXT files found in a folder, but this time using a Filter class, you would need to create an instance of the NameFilter class and pass it the name mask in it's constructor. This is the same thing that happens underneath when using basic filters.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, new NameFilter( "*.txt" ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, New NameFilter( "*.txt" ) )
      ```
    </TabItem>
</Tabs>

When using the AttributeFilter, the DateTimeFilter and the NameFilter classes, it is also possible to specify if the filters will apply to files, folders or both. This is done by using the FilterScope enumeration in the constructor of the Filter class.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true, new NameFilter( "doc*", FilterScope.File ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, New NameFilter( "doc*", FilterScope.File ) )
      ```
    </TabItem>
</Tabs>

It is also possible to derive from the base Filter class to create customized Filter classes if needed.

## Logical filters
The `AndFilter`, `NotFilter` and `OrFilter` classes are used to create custom logic operations around multiple filters. When more than one filter is used, they are combined by default with an `AndFilter`. This means that for an item to be processed, it must match all of the filters provided. 

For example, if we wanted to process all files that have the TXT **or** the EXE extension **and** that have a **size** greater than 5k, the following code could be used:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter sizeFilter = new SizeFilter();
        sizeFilter.MinSize = 5120;

        AbstractFile[] files = myFolder.GetFiles( true,
                                      new AndFilter( new NameFilter( "*.txt|*.exe" ), sizeFilter ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim sizeFilter As New SizeFilter()
        sizeFilter.MinSize = 5120

        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                        New AndFilter( New NameFilter( "*.txt|*.exe" ), sizeFilter ) )
      ```
    </TabItem>
</Tabs>

The pipe (|) used in the constructor of the NameFilter class serves the same purpose as an OrFilter class.

Since the AndFilter class is used by default, the creation of a new AndFilter class around the NameFilter and the SizeFilter can be omitted:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter sizeFilter = new SizeFilter();
        sizeFilter.MinSize = 5120;

        AbstractFile[] files = myFolder.GetFiles( true, new NameFilter( "*.txt|*.exe" ), sizeFilter );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim sizeFilter As new SizeFilter()
        sizeFilter.MinSize = 5120

        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                                        New NameFilter( "*.txt|*.exe" ), sizeFilter )
      ```
    </TabItem>
</Tabs>

Since the NameFilter class is used by default when using a basic string filter, the creation of a new NameFilter class around the string can be omitted:

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        SizeFilter sizeFilter = new SizeFilter();
        sizeFilter.MinSize = 5120;

        AbstractFile[] files = myFolder.GetFiles( true, "*.txt|*.exe", sizeFilter );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim sizeFilter As New SizeFilter()
        sizeFilter.MinSize = 5120

        Dim files As AbstractFile() = myFolder.GetFiles( True, "*.txt|*.exe", sizeFilter )
      ```
    </TabItem>
</Tabs>