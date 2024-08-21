# Licensing

In order to use the controls provided by the Xceed Document Libraries in your application, the LicenseKey property of the Licenser class must be set with a valid license key before any other method of the component is called. If you use an invalid or expired license key, fail to license the control altogether, or license it in the wrong place in your code, an exception will be thrown at runtime (see **License Exception** section below).

A valid license key can be a registered license key, which is provided to you when you purchase the product(s), or a non-expired trial license key if you are evaluating the component.

## Setting the LicenseKey Property

We recommend that you set the LicenseKey property in the main entry point of the application. For example, C# users can set the LicenseKey property in the static main function. VB.NET users can set the LicenseKey property in the constructor of the main form or in the "Sub Main" procedure.

*Note that the key begins with "WDN" for Words for .NET.*

### C#

```csharp
static void Main( string[] args )
{
    Xceed.Words.NET.Licenser.LicenseKey = "WDNXX-XXXXX-XXXXX-XXXX";
    Console.WriteLine( "Hello World!" );
}
```

### VB.NET

```vbnet
Public Shared Sub Main(ByVal args As String())
    Xceed.Words.NET.Licenser.LicenseKey = "WDNXX-XXXXX-XXXXX-XXXX"
    Console.WriteLine("Hello World!")
End Sub
```

## License Exception

If an invalid or expired license key is used, or if the **LicenseKey** property is omitted or set in the wrong place, an exception will be thrown at runtime. Depending on the Visual Studio exception debugging settings and the browser in which the application is run, the exception may be displayed in different ways.

> **Tip:** If something goes wrong, the first thing to verify is whether the **LicenseKey** property has been set to a valid license key.

---