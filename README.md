# 📦 Instagram ZIP Analyzer

A simple, privacy-friendly web tool that analyzes **Instagram data ZIP files** and shows useful insights like blocked accounts, users who don’t follow you back, hidden stories, pending requests, and more — all **locally in your browser**.

> 🔒 No login • No API • No data upload • 100% client-side

---

## 🚀 Features

- 📂 Upload Instagram **ZIP data export**
- 🚫 View **Blocked accounts**
- 👤 Find **IDs that don’t follow you back**
- 👁️ See **Hide story from** list
- ⏳ Check **Pending follow requests**
- ❌ View **Removed suggestions**
- 🔒 See **Restricted accounts**
- 🔗 Clickable usernames (open Instagram profiles)
- ⚡ Fast processing using **JSZip**
- 🛡️ Works completely **offline**

---

## 🧠 How It Works

1. You download your Instagram data as a ZIP file  
2. Upload the ZIP into this tool  
3. The app parses Instagram’s HTML files
4. Extracts usernames from different sections
5. Displays them in a clean, organized UI

All processing happens **inside your browser** — your data never leaves your device.

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (modern, responsive UI)
- **Vanilla JavaScript**
- **JSZip** (for reading ZIP files)
- **DOMParser** (HTML parsing)

---

## 📂 Supported Instagram Files

The tool reads the following files from the ZIP:

