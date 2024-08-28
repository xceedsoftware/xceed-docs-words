---
sidebar_position: 1
title: Workbooks for .NET
---
# Welcome to Xceed Workbooks for NET v1.4

## Xceed Workbooks for .NET

With its easy-to-use API, Xceed Workbooks for .NET lets your application create or modify Microsoft Excel `.xlsx` documents and gives you complete control over the content of the documents. It lets you modify the content of cells and the size of columns and rows, create formatted tables, set and calculate basic formulas, load data from the web, add elements like pictures and hyperlinks, customize the appearance of your worksheets, style the content of cells, rows, or columns using different fonts, alignments, and formatting, as well as use some of the many other features of Microsoft Excel.

It’s also a great reporting tool. Indeed, Xceed Workbooks for .NET lets you create company reports that you first design with the familiar and rich editing capabilities of Microsoft Excel instead of with a reporting tool’s custom editor. You can then use the designed document as a template that you programmatically customize before sending each report out.

You can also use Xceed Workbooks for .NET to programmatically create invoices, add data to spreadsheets, and more.

## .NET 5+ Support

Xceed Workbooks for .NET supports the .NET 5+ technology and can be used to create .NET 5+ applications; to do so, you simply need to use the .NET equivalent assembly.

As of version 1.4, the assembly no longer contains "NET5" in its name; it is now named in the same way as its .NET Framework equivalent but is placed into its own folder. Therefore, the main assembly for Xceed Workbooks for .NET will simply be called `Xceed.Workbooks.NET.dll` and will be found in the `.NET5` folder.

:::caution
Note that building .NET 6 with the .NET 5 assembly might trigger warning windows, but these don't interfere with the compatibility of our products.
:::

To use .NET 5+, you will need a new DLL, available on NuGet: **System.IO.Packaging**.

You can also install all the necessary DLLs by installing the NuGet package **Xceed Workbooks.NET** or **Xceed.Products.Documents.Libraries.Full**.

When downloading the DLLs from NuGet, you will need to set the `licenseKey` in code. See the [Licensing](getting-started/licensing) topic for a code example.

If you do not have a `licenseKey`, please email us at [support@xceed.com](mailto:support@xceed.com) and we will be happy to provide you with a 15-day trial license key.
