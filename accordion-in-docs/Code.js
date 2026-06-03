// ============================================================
//  AccordionBlocks Pro — Google Docs Add-on
//  File: Code.gs  (Apps Script backend)
// ============================================================

// ── MARKERS ──────────────────────────────────────────────────
// Every accordion is identified by invisible marker text
// embedded into named bookmarks + paragraph text attributes.
// Format:
//   ACCORDION_START:{id}:{title}:{state}   → header paragraph
//   ACCORDION_END:{id}                     → footer paragraph
//
// "state" is either "open" or "closed".
// Content paragraphs between START and END belong to the accordion.
// ─────────────────────────────────────────────────────────────

var MARKER_START = "%%ACCORDION_START%%";
var MARKER_END = "%%ACCORDION_END%%";
var PLACEHOLDER = "✏️  Add your content here — text, tables, images, anything.";

// ── THEME ─────────────────────────────────────────────────────
var THEME = {
  headerBg: "#1e2433",
  headerBgOpen: "#1a2d4a",
  headerText: "#e2e8f0",
  headerAccent: "#4f8ef7",
  arrowClosed: "▶",
  arrowOpen: "▼",
  endBg: "#111827",
  endText: "#2a3244",
  placeholderBg: "#0f172a",
  contentBg: "#0f172a",
};

// ─────────────────────────────────────────────────────────────
//  MENU
// ─────────────────────────────────────────────────────────────

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Open Accordion Panel", "showSidebar")
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("AccordionSidebar")
    .setTitle("AccordionBlocks Pro")
    .setWidth(320);
  DocumentApp.getUi().showSidebar(html);
}

// ─────────────────────────────────────────────────────────────
//  CREATE — Mode A: Insert empty accordion with placeholder
// ─────────────────────────────────────────────────────────────

function createEmptyAccordion(title) {
  try {
    var id = generateId();
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var cursor = doc.getCursor();

    var idx = getInsertionIndex(body, cursor);

    // Spacing before
    body.insertParagraph(idx, "").setSpacingBefore(8).setSpacingAfter(0);
    idx++;

    // Header
    insertHeader(body, idx, id, title, "open");
    idx++;

    // Placeholder content paragraph
    var ph = body.insertParagraph(idx, PLACEHOLDER);
    styleContentParagraph(ph, true);
    idx++;

    // Footer
    insertFooter(body, idx, id);
    idx++;

    // Spacing after
    body.insertParagraph(idx, "").setSpacingBefore(0).setSpacingAfter(8);

    return { success: true, id: id, title: title, state: "open" };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  CREATE — Mode B: Wrap selected content
// ─────────────────────────────────────────────────────────────

function wrapSelectionAsAccordion(title) {
  try {
    var id = generateId();
    var doc = DocumentApp.getActiveDocument();
    var sel = doc.getSelection();

    if (!sel) {
      return {
        success: false,
        error:
          "No text selected. Please select some content in the document first, then click Wrap Selection.",
      };
    }

    var body = doc.getBody();
    var elements = sel.getRangeElements();

    if (!elements || elements.length === 0) {
      return { success: false, error: "Selection is empty." };
    }

    // Find the outermost paragraph indices of the selection
    var firstPara = getTopLevelParagraph(body, elements[0].getElement());
    var lastPara = getTopLevelParagraph(
      body,
      elements[elements.length - 1].getElement(),
    );

    if (!firstPara || !lastPara) {
      return {
        success: false,
        error:
          "Could not determine selection boundaries. Try selecting full paragraphs.",
      };
    }

    var firstIdx = body.getChildIndex(firstPara);
    var lastIdx = body.getChildIndex(lastPara);

    // Style existing content paragraphs as accordion content
    for (var i = firstIdx; i <= lastIdx; i++) {
      var child = body.getChild(i);
      if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
        styleContentParagraph(child.asParagraph(), false);
      }
    }

    // Insert footer AFTER last selected element
    insertFooter(body, lastIdx + 1, id);

    // Insert header BEFORE first selected element
    insertHeader(body, firstIdx, id, title, "open");

    // Spacing
    body.insertParagraph(firstIdx, "").setSpacingBefore(8).setSpacingAfter(0);
    body
      .insertParagraph(lastIdx + 4, "")
      .setSpacingBefore(0)
      .setSpacingAfter(8);

    return { success: true, id: id, title: title, state: "open" };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  TOGGLE — open ↔ closed
// ─────────────────────────────────────────────────────────────

function toggleAccordion(id) {
  try {
    var result = findAccordionById(id);
    if (!result)
      return {
        success: false,
        error: "Accordion not found. It may have been manually deleted.",
      };

    var body = result.body;
    var headerIdx = result.headerIdx;
    var footerIdx = result.footerIdx;
    var currentState = result.state;
    var title = result.title;
    var newState = currentState === "open" ? "closed" : "open";

    // Update header paragraph
    var header = body.getChild(headerIdx).asParagraph();
    rewriteHeader(header, id, title, newState);

    // Show/hide content paragraphs between header and footer
    for (var i = headerIdx + 1; i < footerIdx; i++) {
      var child = body.getChild(i);
      toggleParagraphVisibility(child, newState === "open");
    }

    return { success: true, id: id, newState: newState };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  DELETE accordion (removes header, content, footer)
// ─────────────────────────────────────────────────────────────

function deleteAccordion(id) {
  try {
    var result = findAccordionById(id);
    if (!result) return { success: false, error: "Accordion not found." };

    var body = result.body;
    var headerIdx = result.headerIdx;
    var footerIdx = result.footerIdx;

    // Remove from bottom up to preserve indices
    for (var i = footerIdx; i >= headerIdx; i--) {
      var child = body.getChild(i);
      if (body.getNumChildren() > 1) {
        child.removeFromParent();
      }
    }

    // Clean up spacing paragraphs immediately before/after if empty
    var newCount = body.getNumChildren();
    // After deletion headerIdx-1 might be a blank spacer
    if (headerIdx > 0 && headerIdx - 1 < newCount) {
      var before = body.getChild(headerIdx - 1);
      if (
        before.getType() === DocumentApp.ElementType.PARAGRAPH &&
        before.asParagraph().getText().trim() === ""
      ) {
        before.removeFromParent();
      }
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  RENAME accordion title
// ─────────────────────────────────────────────────────────────

function renameAccordion(id, newTitle) {
  try {
    var result = findAccordionById(id);
    if (!result) return { success: false, error: "Accordion not found." };

    var header = result.body.getChild(result.headerIdx).asParagraph();
    rewriteHeader(header, id, newTitle, result.state);

    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  LIST all accordions in document
// ─────────────────────────────────────────────────────────────

function listAccordions() {
  try {
    var body = DocumentApp.getActiveDocument().getBody();
    var count = body.getNumChildren();
    var list = [];

    for (var i = 0; i < count; i++) {
      var child = body.getChild(i);
      if (child.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
      var text = child.asParagraph().getText();
      if (text.indexOf(MARKER_START) === -1) continue;

      var parsed = parseMarker(text);
      if (!parsed) continue;

      // Count visible content lines between this header and its footer
      var footerIdx = findFooterIndex(body, parsed.id, i + 1);
      var lineCount = footerIdx > 0 ? footerIdx - i - 1 : 0;

      list.push({
        id: parsed.id,
        title: parsed.title,
        state: parsed.state,
        lineCount: lineCount,
        index: i,
      });
    }

    return { success: true, accordions: list };
  } catch (e) {
    return { success: false, error: e.toString(), accordions: [] };
  }
}

// ─────────────────────────────────────────────────────────────
//  COLLAPSE ALL / EXPAND ALL
// ─────────────────────────────────────────────────────────────

function collapseAll() {
  try {
    var listed = listAccordions();
    if (!listed.success) return listed;
    for (var i = 0; i < listed.accordions.length; i++) {
      var acc = listed.accordions[i];
      if (acc.state === "open") toggleAccordion(acc.id);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

function expandAll() {
  try {
    var listed = listAccordions();
    if (!listed.success) return listed;
    for (var i = 0; i < listed.accordions.length; i++) {
      var acc = listed.accordions[i];
      if (acc.state === "closed") toggleAccordion(acc.id);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ─────────────────────────────────────────────────────────────
//  HELPERS — DOM
// ─────────────────────────────────────────────────────────────

function insertHeader(body, idx, id, title, state) {
  var arrow = state === "open" ? THEME.arrowOpen : THEME.arrowClosed;
  var marker = buildMarker(id, title, state);
  var displayText = "  " + arrow + "   " + title + "   " + marker;

  var para = body.insertParagraph(idx, "");
  para.setSpacingBefore(0).setSpacingAfter(0).setLineSpacing(1);
  para.setAttributes({
    [DocumentApp.Attribute.BACKGROUND_COLOR]:
      state === "open" ? THEME.headerBgOpen : THEME.headerBg,
    [DocumentApp.Attribute.SPACING_BEFORE]: 0,
    [DocumentApp.Attribute.SPACING_AFTER]: 0,
    [DocumentApp.Attribute.LINE_SPACING]: 1,
  });

  // Arrow segment
  var arrowRun = para.appendText("  " + arrow + "  ");
  arrowRun
    .setFontFamily("Arial")
    .setFontSize(13)
    .setForegroundColor(THEME.headerAccent)
    .setBold(true)
    .setItalic(false);

  // Title segment
  var titleRun = para.appendText(" " + title + "  ");
  titleRun
    .setFontFamily("Arial")
    .setFontSize(12)
    .setForegroundColor(THEME.headerText)
    .setBold(true)
    .setItalic(false);

  // Invisible marker (tiny, same color as bg)
  var markerRun = para.appendText(marker);
  markerRun
    .setFontFamily("Arial")
    .setFontSize(1)
    .setForegroundColor(state === "open" ? THEME.headerBgOpen : THEME.headerBg)
    .setBold(false);

  return para;
}

function rewriteHeader(para, id, title, state) {
  para.clear();
  var arrow = state === "open" ? THEME.arrowOpen : THEME.arrowClosed;
  var marker = buildMarker(id, title, state);
  var bgColor = state === "open" ? THEME.headerBgOpen : THEME.headerBg;

  para.setAttributes({
    [DocumentApp.Attribute.BACKGROUND_COLOR]: bgColor,
    [DocumentApp.Attribute.SPACING_BEFORE]: 0,
    [DocumentApp.Attribute.SPACING_AFTER]: 0,
    [DocumentApp.Attribute.LINE_SPACING]: 1,
  });

  var arrowRun = para.appendText("  " + arrow + "  ");
  arrowRun
    .setFontFamily("Arial")
    .setFontSize(13)
    .setForegroundColor(THEME.headerAccent)
    .setBold(true)
    .setItalic(false);

  var titleRun = para.appendText(" " + title + "  ");
  titleRun
    .setFontFamily("Arial")
    .setFontSize(12)
    .setForegroundColor(THEME.headerText)
    .setBold(true)
    .setItalic(false);

  var markerRun = para.appendText(marker);
  markerRun
    .setFontFamily("Arial")
    .setFontSize(1)
    .setForegroundColor(bgColor)
    .setBold(false);
}

function insertFooter(body, idx, id) {
  var marker = MARKER_END + ":" + id;
  var para = body.insertParagraph(idx, "");
  para.setAttributes({
    [DocumentApp.Attribute.BACKGROUND_COLOR]: THEME.endBg,
    [DocumentApp.Attribute.SPACING_BEFORE]: 0,
    [DocumentApp.Attribute.SPACING_AFTER]: 0,
    [DocumentApp.Attribute.LINE_SPACING]: 1,
  });

  // Thin decorative line
  var lineRun = para.appendText("  ─────────────────────────────────────  ");
  lineRun
    .setFontFamily("Arial")
    .setFontSize(7)
    .setForegroundColor("#2a3244")
    .setBold(false)
    .setItalic(false);

  // Invisible marker
  var markerRun = para.appendText(marker);
  markerRun
    .setFontFamily("Arial")
    .setFontSize(1)
    .setForegroundColor(THEME.endBg)
    .setBold(false);

  return para;
}

function styleContentParagraph(para, isPlaceholder) {
  para.setAttributes({
    [DocumentApp.Attribute.BACKGROUND_COLOR]: THEME.contentBg,
    [DocumentApp.Attribute.SPACING_BEFORE]: 2,
    [DocumentApp.Attribute.SPACING_AFTER]: 2,
    [DocumentApp.Attribute.LINE_SPACING]: 1.4,
    [DocumentApp.Attribute.INDENT_START]: 20,
    [DocumentApp.Attribute.INDENT_END]: 10,
  });
  if (isPlaceholder) {
    var text = para.editAsText();
    text
      .setFontFamily("Arial")
      .setFontSize(11)
      .setForegroundColor("#4e6077")
      .setBold(false)
      .setItalic(true);
  }
}

function toggleParagraphVisibility(child, visible) {
  // Google Docs doesn't support true hidden text in body paragraphs,
  // so we simulate "collapsed" by making the text color match the background
  // (invisible to readers) and shrinking font to 1pt.
  if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
    var para = child.asParagraph();
    var text = para.editAsText();
    if (!visible) {
      // Save original size in a marker comment — not possible cleanly,
      // so we use font-size 1 + color match bg as the collapse trick
      para.setAttributes({
        [DocumentApp.Attribute.SPACING_BEFORE]: 0,
        [DocumentApp.Attribute.SPACING_AFTER]: 0,
        [DocumentApp.Attribute.LINE_SPACING]: 1,
      });
      text.setFontSize(1).setForegroundColor(THEME.contentBg);
    } else {
      para.setAttributes({
        [DocumentApp.Attribute.BACKGROUND_COLOR]: THEME.contentBg,
        [DocumentApp.Attribute.SPACING_BEFORE]: 2,
        [DocumentApp.Attribute.SPACING_AFTER]: 2,
        [DocumentApp.Attribute.LINE_SPACING]: 1.4,
      });
      text.setFontSize(11).setForegroundColor("#c9d8ee");
    }
  }
}

// ─────────────────────────────────────────────────────────────
//  HELPERS — Search
// ─────────────────────────────────────────────────────────────

function findAccordionById(id) {
  var body = DocumentApp.getActiveDocument().getBody();
  var count = body.getNumChildren();
  var headerIdx = -1;
  var footerIdx = -1;
  var state = "open";
  var title = "";

  for (var i = 0; i < count; i++) {
    var child = body.getChild(i);
    if (child.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    var text = child.asParagraph().getText();

    if (headerIdx === -1 && text.indexOf(MARKER_START + ":" + id) !== -1) {
      headerIdx = i;
      var parsed = parseMarker(text);
      if (parsed) {
        state = parsed.state;
        title = parsed.title;
      }
    }
    if (text.indexOf(MARKER_END + ":" + id) !== -1) {
      footerIdx = i;
      break;
    }
  }

  if (headerIdx === -1 || footerIdx === -1) return null;
  return {
    body: body,
    headerIdx: headerIdx,
    footerIdx: footerIdx,
    state: state,
    title: title,
  };
}

function findFooterIndex(body, id, startFrom) {
  var count = body.getNumChildren();
  for (var i = startFrom; i < count; i++) {
    var child = body.getChild(i);
    if (child.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    if (
      child
        .asParagraph()
        .getText()
        .indexOf(MARKER_END + ":" + id) !== -1
    )
      return i;
  }
  return -1;
}

function getTopLevelParagraph(body, element) {
  var el = element;
  while (
    el &&
    el.getParent() &&
    el.getParent().getType() !== DocumentApp.ElementType.BODY_SECTION
  ) {
    el = el.getParent();
  }
  // Verify it's a direct child of body
  try {
    body.getChildIndex(el);
    return el;
  } catch (e) {
    return null;
  }
}

function getInsertionIndex(body, cursor) {
  try {
    if (cursor) {
      var el = cursor.getElement();
      var parent = el;
      while (
        parent &&
        parent.getParent() &&
        parent.getParent().getType() !== DocumentApp.ElementType.BODY_SECTION
      ) {
        parent = parent.getParent();
      }
      if (parent) return body.getChildIndex(parent) + 1;
    }
  } catch (e) {}
  return body.getNumChildren();
}

// ─────────────────────────────────────────────────────────────
//  HELPERS — Markers
// ─────────────────────────────────────────────────────────────

function buildMarker(id, title, state) {
  // Sanitize title — remove any %% sequences
  var safeTitle = title.replace(/%%/g, "--");
  return MARKER_START + ":" + id + ":" + safeTitle + ":" + state;
}

function parseMarker(text) {
  var idx = text.indexOf(MARKER_START + ":");
  if (idx === -1) return null;
  var rest = text.slice(idx + MARKER_START.length + 1);
  var parts = rest.split(":");
  if (parts.length < 3) return null;
  return {
    id: parts[0],
    title: parts[1],
    state: parts[2] || "open",
  };
}

function generateId() {
  return (
    "acc_" +
    Math.random().toString(36).slice(2, 10) +
    "_" +
    Date.now().toString(36)
  );
}
