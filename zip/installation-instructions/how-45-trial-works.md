# How the 45-day trial works

Xceed’s .NET components can be used **without** a license key for a 45-day trial period. During this time, the components are fully functional. However, trial period reminder notices will be displayed for the duration of the trial or until a registered license key is set in your code.

The trial period for Xceed’s components begins at the time of installation. Once the trial period has ended, a registered license key is needed to continue using them (see the [How to license a component once you purchase](how-to-license-component) page for details). If you attempt to use a component after the trial period without a registered license key, an exception will be thrown and you will not be able to use it.

## Using Xceed’s .NET components during the trial period

All you need to do is the following:

1. Install the components using the _Xceed Installer_ application. There is no need to set a license key.
2. Try the components for up to 45 days.
3. Purchase a license to continue using them or to deploy your application.

## Deploying to another machine for testing purposes

If you wish to temporarily deploy an application to another machine for testing purposes during the trial period, follow these steps:

1. Get a temporary license key from the _Xceed Component Licenser_ application, which is normally found under the _Xceed Components_ folder in the _Start Menu_.
2. Set the component’s `Licenser.LicenseKey` property with this temporary license key. For detailed instructions, see the **LicenseKey** property section on the [How to license the component](how-to-license-component) page.
3. Compile your application and deploy it to the test machine.

