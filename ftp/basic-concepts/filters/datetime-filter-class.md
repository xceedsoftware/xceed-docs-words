import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DateTimeFilter

The `DateTimeFilter` class can be used to filter files and folder according to their dates. By default, if a specific type of date is not specified (last accessed, creation, etc.), the last write date is consulted.

## Demonstration
Process all **files** that have a **last write** date between January 1st 1999 and January 1st 2001.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true,
                                    new DateTimeFilter( new System.DateTime( 1999, 01, 01 ),
                                    new System.DateTime( 2001, 01, 01 ) ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                      New DateTimeFilter( New System.DateTime( 1999, 01, 01 ), _
                                      New System.DateTime( 2001, 01, 01 ) ) )
      ```
    </TabItem>
</Tabs>

Process all **files** that have a **last accessed** date between January 1st 1999 and January 1st 2001.

<Tabs>
    <TabItem value="csharp" label="C#" default>
      ```csharp
        AbstractFile[] files = myFolder.GetFiles( true,
                                          new DateTimeFilter( new System.DateTime( 1999, 01, 01 ),
                                          new System.DateTime( 2001, 01, 01 ),
                                          DateTimeFilter. ApplicableDateTimes.LastAccess ) );
      ```
    </TabItem>
    <TabItem value="vb.net" label="Visual Basic .NET">
      ```vb.NET
        Dim files As AbstractFile() = myFolder.GetFiles( True, _
                                   New DateTimeFilter( New System.DateTime( 1999, 01, 01 ), _
                                   New System.DateTime( 2001, 01, 01 ), _
                                   DateTimeFilter. ApplicableDateTimes.LastAccess ) )
      ```
    </TabItem>
</Tabs>

## Things you should consider
- Do you only want to target specific types of folder items? Use the `FilterScope` enumeration in the constructor of the `DateTimeFilter` class. 

- Do you want to filter according to a specific type of date? Use the `ApplicableDateTimes` enumeration in the constructor of the `DateTimeFilter` class.

 