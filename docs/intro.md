---
sidebar_position: 1
---
# Welcome to Xceed Words for .NET v3.0

## Components covered by this documentation
- Xceed Words for .NET

## Xceed Words for .NET

Xceed Words for .NET is a fast, lightweight way to create or manipulate Microsoft Word documents from your .NET applications, without requiring Word or Office to be installed.

With its easy to use API, Xceed Words for .NET lets your application create new Microsoft Word .docx documents, or modify existing ones. It gives you complete control over all content in a Word document, and lets you add or remove all commonly used element types, such as paragraphs, bulleted or numbered lists, images, tables, charts, headers and footers, sections, bookmarks, and more.

You also get complete control over the document’s properties, including margins, page size, line spacing, page numbering, text direction and alignment, indentation, and other properties. Quickly and easily set or modify any text’s formatting, fonts and font sizes, colors, boldness, underline, italics, strikethrough, highlighting, and more.  Search and replace text, add or remove password protection, join documents, copy documents, or apply templates – everything your application may need to do.  It even supports modifying many Word files in parallel for greater speed.

It’s also a great reporting tool. Xceed Words for .NET lets you create company reports that you first design with the familiar and rich editing capabilities of Microsoft Word instead of with a reporting tool’s custom editor. Use the designed document as a template that you programmatically customize before sending each report out.

You can also use Xceed Words for .NET to programmatically create invoices, add data to documents, perform mail merge functionality, and more.

## .NET 5+

As of v2.0, Xceed Words for .NET supports the .NET 5+ technology and can be used to create .NET 5+ applications. To do so, you simply need to use the .NET equivalent assemblies.

Know that, as of v3.0, all the assemblies which used to contain "NET5" in their name no longer do so; they are now named in the same way as their .NET Framework equivalent but are placed into their own folder. Therefore, the main assembly for Xceed Words for .NET will simply be called `Xceed.Words.NET.dll` and will be found in the `.NET5` folder.

> **Note:** Building .NET 6+ with .NET 5 assemblies might trigger warning windows, but these don't interfere with the compatibility of our products.

To use .NET 5+, you will also need 2 new DLLs, available on NuGet:
- `System.IO.Packaging`
- `System.Drawing.Common`

You can also install all the necessary DLLs by installing the NuGet package `Xceed.Products.Documents.Libraries.Full`.

When downloading the DLLs from NuGet, you will need to set the `licenseKey` in code. See the [Licensing](Licensing.html) topic for a code example.

If you do not have a license key, please e-mail us at [support@xceed.com](mailto:support@xceed.com), and we will be happy to provide you with a 15-day trial license key.

> **Note:** Conversion to PDF in .NET 5+ versions for Linux (Ubuntu) environments is not currently supported.

---

© Copyright Xceed Software Inc.

[Send Feedback](mailto:support@xceed.com?subject=Documentation%20Feedback:%20rootWelcome.html)
