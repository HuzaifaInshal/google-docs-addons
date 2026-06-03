# AccordionBlocks Pro — Google Docs Add-on

> Collapsible accordion sections for Google Docs — manage expand/collapse from a sidebar, wrap any existing content, and keep your documents clean and organized.

---

## Features

- **Two creation modes** — insert an empty accordion with a placeholder, or wrap any selected content in the doc
- **Sidebar-driven toggle** — expand and collapse any accordion from the Manage tab; the doc updates live
- **Styled header** — `▶ / ▼` arrow + title rendered as a dark banner row directly in the document
- **Collapse / Expand All** — one click to fold or unfold every accordion in the doc
- **Rename** — edit an accordion's title inline from the sidebar without touching the doc
- **Delete** — removes the header, all content, and the footer cleanly
- **Works with any content** — text, tables, images, headings, bullets — anything you can put in a Google Doc
- **Multiple independent accordions** per document, each tracked by a unique ID

---

## Files

| File                    | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `Code.gs`               | Backend — creates, toggles, renames, deletes, and lists accordions |
| `AccordionSidebar.html` | Sidebar UI — Create tab and Manage tab                             |
| `appsscript.json`       | Manifest — permissions and add-on registration                     |

---

## How It Works

Each accordion is made of three parts inserted directly into the Google Doc body:

```
[ Header paragraph ]   ← styled banner with ▶/▼ arrow, title, invisible ID marker
[ Content paragraphs ] ← anything you type or paste; styled with dark background
[ Footer paragraph ]   ← thin decorative line with invisible ID marker
```

Collapsing works by shrinking the content text to 1pt and matching its color to the background — making it invisible while preserving the paragraph structure. Expanding restores the font size and color. The doc content is never deleted during a toggle.

---

## Setup

Same one-time process as any Google Apps Script add-on.

**Step 1 — Open Apps Script**

Go to [script.google.com](https://script.google.com) → click **+ New project** → name it `AccordionBlocks Pro`.

**Step 2 — Show the manifest**

Click ⚙️ **Project Settings** → enable **"Show 'appsscript.json' manifest file in editor"** → return to the editor.

**Step 3 — Add all 3 files**

- **`Code.gs`** — Click the existing `Code.gs` tab, select all, delete, paste the contents of `Code.gs`.
- **`AccordionSidebar.html`** — Click **+** next to "Files" → **HTML** → name it exactly `AccordionSidebar` (capital A and S). Paste the contents of `AccordionSidebar.html`.
- **`appsscript.json`** — Click the `appsscript.json` tab, select all, replace with the contents of `appsscript.json`.

> The HTML file must be named exactly `AccordionSidebar` — case-sensitive.

**Step 4 — Authorize**

Press `Ctrl+S`. Click **▶ Run** → select `onOpen` → click Run. Follow the authorization prompts: **Review Permissions → your account → Advanced → Go to AccordionBlocks Pro (unsafe) → Allow**.

> The "unsafe" warning is standard for personal unverified scripts. It is safe to allow since you own the code.

**Step 5 — Open in Google Docs**

Open any Google Doc → **Extensions → AccordionBlocks Pro → Open Accordion Panel**. The sidebar opens on the right. Refresh the page if the menu doesn't appear immediately.

---

## How to Use

### Creating an accordion

**Mode 1 — Empty (with placeholder)**

1. Click inside your doc where you want the accordion to appear.
2. In the sidebar **Create tab**, select the **Empty** mode.
3. Type a title (e.g. `Installation Steps`).
4. Click **Insert Accordion**.
5. The accordion appears in your doc with a placeholder paragraph. Click into the placeholder and replace it with your actual content.

**Mode 2 — Wrap selection**

1. In your Google Doc, select the content you want to wrap (any paragraphs, tables, text blocks).
2. Switch to the sidebar **Create tab**, select the **Wrap Selection** mode.
3. Type a title.
4. Click **Insert Accordion**.
5. The selected content is wrapped with a header above and a footer below.

### Managing accordions

Switch to the **Manage tab** in the sidebar. The list shows every accordion in the doc with its current state (open/closed) and paragraph count.

| Action            | How                                                    |
| ----------------- | ------------------------------------------------------ |
| Expand / Collapse | Click **▼ Expand** or **▶ Collapse** on any card       |
| Expand all        | Click **▼ All** in the list header                     |
| Collapse all      | Click **▶ All** in the list header                     |
| Rename            | Click **✎ Rename** → type new title → press Enter or ✓ |
| Delete            | Click **✕ Delete** → confirm the dialog                |
| Refresh           | Click **↻** if the list seems out of sync              |

---

## Accordion Appearance in the Doc

```
┌──────────────────────────────────────────────────────┐
│  ▼   Installation Steps                              │  ← dark blue header
├──────────────────────────────────────────────────────┤
│                                                      │
│    Your content here — paragraphs, tables, images    │  ← dark content area
│                                                      │
├──────────────────────────────────────────────────────┤
│  ─────────────────────────────────────────────       │  ← thin footer line
└──────────────────────────────────────────────────────┘
```

When collapsed the header shows `▶` and the content area becomes invisible (paragraphs collapse to zero visible height).

---

## Notes

- Accordions are standard Google Docs paragraphs — they survive copy-paste, undo, and sharing.
- Collapsing does not delete content. It renders text invisible at 1pt size matching the background. Expanding fully restores it.
- Directly editing the header paragraph text in the doc may break the ID marker and make the sidebar unable to find the accordion. Rename via the sidebar instead.
- Collapsed content is technically still present in the doc (just invisible). It will appear in printed/PDF exports. Collapse is intended as a working/reading aid, not a publishing feature.
- For best results with Wrap Selection, select complete paragraphs rather than partial text within a single line.

---

## FAQ

**The Manage tab shows no accordions even though I created some.**
Click the **↻ refresh** button. If they still don't appear, the header paragraph may have been manually edited, breaking the ID marker. In that case the accordion will need to be deleted and recreated.

**Can I put a code block (from CodeBlocks Pro) inside an accordion?**
Yes — insert the code block first, then select it along with any other content, and use Wrap Selection mode to wrap it in an accordion.

**What happens if I undo after inserting?**
Google Docs undo will remove the inserted paragraphs from the doc, but the sidebar list may still show the accordion until you refresh. Always use the sidebar Delete button for clean removal.

**Can I have accordions inside accordions?**
Not supported in this version. Nested accordions would require more complex boundary tracking and are planned for a future release.

**Does this work in Google Docs on mobile?**
The sidebar only works on desktop web. Accordions already in the document will display correctly on mobile, though toggling isn't possible without the sidebar.

---

## License

Free to use, modify, and distribute for personal and internal team use.
