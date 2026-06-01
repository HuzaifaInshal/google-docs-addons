# CodeBlocks Pro — Google Docs Add-on

> Syntax-highlighted, beautifully styled code blocks — inserted directly into your Google Docs with one click.

---

## Features

- **11 languages** — JavaScript, TypeScript, Python, SQL, HTML, CSS, Java, Go, Rust, Bash/Shell, JSON
- **5 dark themes** — One Dark, Dracula, GitHub Dark, Monokai, Solarized Dark
- Toggle **line numbers** and **language header bar** on or off
- **Font size control** — adjustable from 8pt to 18pt
- **Tab key support** inside the code editor
- Inserts directly **at your cursor position** in the doc

---

## Files

| File              | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `Code.gs`         | Backend logic — tokenizer, syntax highlighter, document insertion |
| `Sidebar.html`    | Sidebar UI — dark-themed panel with all controls                  |
| `appsscript.json` | Manifest — permissions and add-on registration                    |

---

## Setup

You only need to do this once. After that the add-on is available in every Google Doc.

**Step 1 — Open Google Apps Script**

Go to [script.google.com](https://script.google.com) and click **+ New project**. Name it `CodeBlocks Pro`.

**Step 2 — Show the manifest file**

Click the ⚙️ **Project Settings** icon in the left sidebar. Check **"Show 'appsscript.json' manifest file in editor"**. Return to the editor (`</>` icon).

**Step 3 — Add all 3 files**

- **`Code.gs`** — Click the existing `Code.gs` tab, select all, delete it, and paste the contents of `Code.gs`.
- **`Sidebar.html`** — Click **+** next to "Files" → choose **HTML** → name it exactly `Sidebar` (capital S, no extension). Paste the contents of `Sidebar.html`.
- **`appsscript.json`** — Click the `appsscript.json` tab, select all, and replace with the contents of `appsscript.json`.

> File names are case-sensitive. The HTML file must be named `Sidebar` exactly, or the panel won't open.

**Step 4 — Authorize**

Press `Ctrl+S` to save. Click **▶ Run**, select `onOpen` from the function dropdown, and click **Run**. Google will ask for authorization — click **"Review Permissions"** → choose your account → **"Advanced"** → **"Go to CodeBlocks Pro (unsafe)"** → **"Allow"**.

> The "unsafe" warning is standard for unverified personal scripts. Since you wrote the code yourself, it is completely safe to allow.

**Step 5 — Open in Google Docs**

Open any Google Doc. Click **Extensions → CodeBlocks Pro → Open CodeBlocks Panel**. The sidebar opens on the right. If you don't see it straight away, refresh the page once.

---

## How to Use

1. Place your cursor in the document where you want the code block inserted.
2. Open the panel via **Extensions → CodeBlocks Pro → Open CodeBlocks Panel**.
3. Pick a **language** and **theme** from the dropdowns (or click the colored dots to switch themes quickly).
4. Toggle line numbers and the language header bar as needed. Adjust font size with the `+` / `−` buttons.
5. Paste or type your code in the editor. Use `Tab` for indentation.
6. Click **Insert Code Block**. The block appears in your doc within a few seconds.

You can insert as many blocks as you like per session — just change the settings and hit Insert again for each one.

---

## Themes

| Theme          | Background |
| -------------- | ---------- |
| One Dark       | `#282c34`  |
| Dracula        | `#282a36`  |
| GitHub Dark    | `#0d1117`  |
| Monokai        | `#272822`  |
| Solarized Dark | `#002b36`  |

---

## Languages & Token Types

Each language has its own dedicated tokenizer that recognizes:

- Keywords (`const`, `def`, `SELECT`, `fn`, …)
- Types and built-ins (`string`, `Promise`, `VARCHAR`, …)
- Function calls
- String literals (single, double, template)
- Numeric literals
- Line and block comments
- Operators and punctuation

| Language                | Comment Style | String Styles   |
| ----------------------- | ------------- | --------------- |
| JavaScript / TypeScript | `//` `/* */`  | `"` `'` `` ` `` |
| Python                  | `#`           | `"` `'`         |
| SQL                     | `--`          | `"` `'`         |
| HTML                    | `<!-- -->`    | `"` `'`         |
| CSS                     | `/* */`       | `"` `'`         |
| Java                    | `//` `/* */`  | `"` `'`         |
| Go                      | `//` `/* */`  | `"` `'` `` ` `` |
| Rust                    | `//` `/* */`  | `"` `'`         |
| Bash / Shell            | `#`           | `"` `'`         |
| JSON                    | —             | `"`             |

---

## Options Reference

| Option          | Default    | Description                                         |
| --------------- | ---------- | --------------------------------------------------- |
| Language        | JavaScript | Determines the tokenizer and header badge           |
| Theme           | One Dark   | Color scheme applied to the inserted block          |
| Line numbers    | On         | Prepends a padded line number to each row           |
| Language header | On         | Adds a styled header bar showing the language name  |
| Font size       | 11pt       | Size of the `Courier New` monospace text in the doc |

---

## Notes

- Code blocks are standard Google Docs paragraphs with text formatting applied — they are fully editable and deletable like any other content.
- Editing code text directly after insertion removes syntax colors. To update a block, delete it and re-insert from the panel.
- Blocks export correctly to PDF via **File → Download → PDF**.
- The sidebar only works in the Google Docs web interface on desktop. Inserted blocks display correctly on mobile.
- Insertion time scales with line count — a 50-line block typically takes 3–6 seconds.

---

## FAQ

**Why does Google warn about an "unsafe" app during setup?**
This is shown for any personal Apps Script that hasn't gone through Google's paid verification process. It does not mean the code is harmful — it means it's unverified. Since you're running your own script, it is safe to allow.

**The Extensions menu doesn't show CodeBlocks Pro.**
Hard-refresh the Google Doc (`Ctrl+Shift+R`). If it still doesn't appear, go to script.google.com, open your project, and manually run `onOpen` from the ▶ Run menu.

**Can I share this with my team?**
Yes — send teammates the 3 files and have each person follow the setup steps in their own Apps Script project. For organization-wide deployment, you can publish it as a private Google Workspace Marketplace add-on.

**Can I add more languages?**
Yes. In `Code.gs`, add a new entry to the `LANGUAGES` object with `name`, `icon`, `keywords`, and `types` arrays, then add the corresponding `<option>` in `Sidebar.html` and a badge entry in the `LANG_ICONS` map in the `<script>` section.

---

## License

Free to use, modify, and distribute for personal and internal team use.
