import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using alternative AES implementations

The WinZip AES encryption method is implemented using a core AES encryption algorithm implementation provided by the .NET framework, along with data formatting that follows a specification first introduced by the WinZip company, hence the name WinZip AES.

Several implementations of the AES encryption algorithm have been added to the .NET framework, all based on the System.Security.Cryptography.SymmetricAlgorithm abstract class.

By default, Xceed Zip for .NET uses the System.Security.Cryptography.RijndaelManaged class. But other implementations are available and can be used by the developer. All implementations will perform the same task and provide the same result. The only difference might be speed in some very specific scenarios.

In most if not all cases, RijndaelManaged is adequate. Our tests have shown that with the average modern CPU, the default RijndaelManaged is as fast as the other implementations. It is therefore recommended that applications should use the default implementation unless they have a very specific speed requirement, as well as very limited installation needs, as the alternative AES implementations require specific versions of Windows. 

:::note
Xceed does not provide support for problems that occur when the AesAlgorithmManager property (see below) is used.

Alternative AES implementations are not supported by the Compact Framework versions of Xceed Zip for .NET and Xceed Real-Time Zip, nor by Xceed Real-Time Zip for Silverilght.
:::


| Class Name            | Minimum Requirements |  Notes |
|--------------------|--------------------------------------------------------|-------------------------|
| System.Security.Cryptography.RijndaelManaged   | .NET Framework 2.0 and up.|Works in all .NET framework versions. Always safe to use. Adequate speed. Does not require special privileges. Used by Xceed Zip for .NET by default. |
| System.Security.Cryptography.AesManaged   | .NET Framework 3.5 and up. Windows XP SP2 and later.|May be faster than RijndaelManaged. Won't work if the Windows security policy setting for Federal Information Processing Standards (FIPS)-compliant algorithms is enabled on the target machine. Has HostProtection attribute set to MayLeakOnAbort.|
| System.Security.Cryptography.AesCryptoServiceProvider | .NET Framework 3.5 and up. Windows XP SP2 and later.   | Uses Cryptographic Application Programming Interfaces (CAPI) of Windows as implementation. May be faster than RijndaelManaged. Has HostProtection attribute set to MayLeakOnAbort. |
|AesCng|	Windows Vista and later.| Uses Windows Cryptography API: Next Generation (CNG) as implementation. Not part of the .NET framework. Requires a custom implementation of SymmetricAlgorithm that will call Windows. See the "CLR Security" project at http://clrsecurity.codeplex.com/ for an example implementation. May be faster than RijndaelManaged, especially on new CPUs that implement Intel® Advanced Encryption Standard Instructions (AES-NI).|

To use an alternative AES implementation with Xceed Zip for .NET, you must create a class that implements the Xceed.Zip.IAesAlgorithmManager interface. An instance of that class must then be set to the ZipArchive.AesAlgorithmManager property, or to the ZipWriter.AesAlgorithmManager or ZipReader.AesAlgorithmManager.

:::note
This design was chosen so that the Xceed components never directly reference classes that are not part of at least .NET 2.0 or require specific versions of Windows.
:::

The Xceed.Zip.IAesAlgorithmManager interface exists only to allow the component to create instances of the SymmetricAlgorithm class as needed. The following example shows how an implementation of IAesAlgorithmManager would use .NET's AesCryptoServiceProvider.

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
      public class AesManagedManager : IAesAlgorithmManager
      {
        public SymmetricAlgorithm CreateAesAlgorithm()
        {
          return new System.Security.Cryptography.AesCryptoServiceProvider();
        }
      }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
      Public Class AesManagedManager
        Implements IAesAlgorithmManager
        Public Function CreateAesAlgorithm() As SymmetricAlgorithm
          Return New System.Security.Cryptography.AesCryptoServiceProvider()
        End Function
      End Class
    ```
  </TabItem>
</Tabs>

Using a custom implementation of SymmetricAlgorithm is just as simple. The next example uses the implementation from the "CLR Security" project. After adding the project's Security.Cryptography.dll to your application's references, the IAesAlgorithmManager implementation would be as follows:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
    public class AesCngManager : IAesAlgorithmManager
    {
      public SymmetricAlgorithm CreateAesAlgorithm()
      {
        return new Security.Cryptography.AesCng();
      }
    }
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
Public Class AesCngManager
  Implements IAesAlgorithmManager
  Public Function CreateAesAlgorithm() As SymmetricAlgorithm
    Return New Security.Cryptography.AesCng()
  End Function
End Class
    ```
  </TabItem>
</Tabs>

Then, an instance of your class is given to the component for use when zipping/unzipping circumstances require it:

<Tabs>
  <TabItem value="csharp" label="C#" default>
    ```csharp
IAesAlgorithmManager aesManager = new AesManagedManager();
ZipArchive.AesAlgorithmManager = aesManager;
ZipReader.AesAlgorithmManager = aesManager;
ZipWriter.AesAlgorithmManager = aesManager;
    ```
  </TabItem>
  <TabItem value="vb.net" label="Visual Basic .NET">
    ```vb.NET
Dim aesManager As IAesAlgorithmManager = New AesManagedManager()
ZipArchive.AesAlgorithmManager = aesManager
ZipReader.AesAlgorithmManager = aesManager
ZipWriter.AesAlgorithmManager = aesManager
    ```
  </TabItem>
</Tabs>

Setting the value of AesAlgorithmManager to null (Nothing in Visual Basic), the default value, causes the component to use the RijndaelManaged implementation of AES.

:::warning
The SymmetricAlgorithm instance that IAesAlgorithmManager produces must implement the AES algorithm correctly. The component has no way to check this. Faulty implementations will produce corrupted zip files and undefined behavior in your application.

The SymmetricAlgorithm instance that IAesAlgorithmManager produces must allow the SymmetricAlgorithm.BlockSize property to be set to 128, the SymmetricAlgorithm.Mode property to be set to CipherMode.ECB, and the SymmetricAlgorithm.CreateEncryptor() method to be called successfully. Failure to meet these requirements will produce corrupted zip files and undefined behavior in your application.
:::

The component will call **Dispose** on the SymmetricAlgorithm instance when it is no longer needed. This includes error conditions.