# Replacing Text

The following example demonstrates how to replace text in a Document.

:::info
The document contains tags that look like **\<GAME_TIME\>**  
These tags will be replaced by the corresponding string.
:::

```csharp
private static Dictionary<string, string> _replacePatterns = new Dictionary<string, string>()
{
    { "OPPONENT", "Atlanta Knight" },
    { "GAME_TIME", "7:30pm" },
    { "GAME_NUMBER", "161" },
    { "DATE", "October 18 2022" },
};

static void Main(string[] args)
{
    // Load a document.
    using (var document = DocX.Load("ReplaceText.docx"))
    {
        // Check if all the replace patterns are used in the loaded document.
        if (document.FindUniqueByPattern(@"<[\w \=]{4,}>", RegexOptions.IgnoreCase).Count > 0)
        {
            // Do the replacement of all the found tags and with green bold strings.
            var replaceTextOptions = new FunctionReplaceTextOptions()
            {
                FindPattern = "<(.*?)>",
                RegexMatchHandler = Program.ReplaceFunc,
                RegExOptions = RegexOptions.IgnoreCase,
                NewFormatting = new Formatting() { Bold = true, FontColor = System.Drawing.Color.Green }
            };
            document.ReplaceText(replaceTextOptions);
            // Save this document to disk.
            document.SaveAs("ReplacedText.docx");
        }
    }
}

private static string ReplaceFunc(string findStr)
{
    if (_replacePatterns.ContainsKey(findStr))
    {
        return _replacePatterns[findStr];
    }
    return findStr;
}
```