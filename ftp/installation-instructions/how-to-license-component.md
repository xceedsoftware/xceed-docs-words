import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to license the component

If you have a registered license key (available through subscriptions), here is how the licensing process works:

1. Receive your registered license key at the email address used during the purchase.
2. Set the `Licenser.LicenseKey` property with this license key. See the **LicenseKey property** section below for details.
3. Compile your application and deploy it.

If you do not have a registered license key, please contact Xceed at [sales@xceed.com](mailto:sales@xceed.com) to purchase a subscription or to have your license key resent to you if you have lost it.

If you have an active subscription, you will be sent new license keys for every major, minor, or service release. Making sure you have an active subscription ensures that you can use the new features and bug fixes of the latest versions, and also receive priority support. Once your subscription expires, your license keys will still work, but will not unlock features and bug fixes in versions released after the version to which your latest registered license key corresponds.

## LicenseKey property

The **LicenseKey** property of the **Licenser** class must be set with a valid license key, before any other method of your Xceed component is called. If you use an invalid or expired license key, fail to license the control with a registered license key after the trial period, or license it in the wrong place in your code, an exception will be thrown at runtime.

We recommend that you set the LicenseKey property in the _main_ entry point of the application. For example, C# users can set the `LicenseKey` property in the static main function. VB.NET users can set the `LicenseKey` property in the constructor of the main form or in the "Sub Main" procedure.

If no entry point is available, it is recommended that you set the LicenseKey property in a static constructor of a class that will be accessed systematically before any of the library's classes are instantiated, or you can simply set the LicenseKey property immediately BEFORE you instantiate a class.

Xceed's .NET products are currently distributed for both .NET 4 and .NET 3.5; the product version numbers for these builds are different. However, only keys whose prefix contains .NET 4.0 build version numbers are distributed, which can be used to unlock both the .NET 4 and the corresponding .NET 3.5 version of the product.

When a new version of the product is released and you receive a new license key during your subscription, download and install the new version and be sure to use the new license key instead.

:::note
The keys you are sent must be used in their entirety: you cannot simply exchange "ZIN" for "FTN", for example, and use the rest of your "XX-XXXXX-XXXXX-XXXX" license key.
:::

## Zip and Compression capabilities

To use the Zip capabilities, set the `LicenseKey` property as follows (using your own valid license key); note that the key begins with "ZIN". Older keys may begin with "SFN". Xamarin keys begin with "ZXA".

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Zip.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Xceed.Zip.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
</Tabs>

Setting the `LicenseKey` property of the `Licenser` class in the `Xceed.Zip` namespace will also automatically register the classes in the `Xceed.FileSystem` and `Xceed.Compression` namespaces.

:::note
The classes in the `Xceed.Compression.Formats` namespace are not automatically registered. This is because they are not used by the Zip functionality. See below to learn how to activate them.
:::

#### Compression.Formats
To use the classes under the `Xceed.Compression.Formats` namespace (like `XceedXCompressedStream` or `GZipCompressedStream`), set the **LicenseKey** property of the Licenser class contained within the namespace:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Compression.Formats.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Xceed.Compression.Formats.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX"
    ```
  </TabItem>
</Tabs>

#### Compression only
The same applies if you are only using the classes contained within the Xceed.Compression namespace

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Compression.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Xceed.Compression.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX"
    ```
  </TabItem>
</Tabs>

#### Tar & GZip

To use the Tar and GZip capabilities, the classes in the Xceed.Tar and Xceed.GZip namespace, set the LicenseKey of the Licenser class using the Zip key. Note that by setting the LicenseKey property on Tar, you also automatically unlock the GZip capabilities:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.Tar.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Xceed.Tar.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX"
    ```
  </TabItem>
</Tabs>

If you only wish to use the GZip capabilities, set the LicenseKey property as follows:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      Xceed.GZip.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX";
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.net
      Xceed.GZip.Licenser.LicenseKey = "ZINXX-XXXXX-XXXXX-XXXX"
    ```
  </TabItem>
</Tabs>