// ============================================================
//  CodeBlocks Pro — Google Docs Add-on
//  File: Code.gs  (Apps Script backend)
// ============================================================

/**
 * Runs when the add-on is installed.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Creates the Add-ons menu in Google Docs.
 */
function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Open CodeBlocks Panel", "showSidebar")
    .addToUi();
}

/**
 * Opens the sidebar.
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar")
    .setTitle("CodeBlocks Pro")
    .setWidth(320);
  DocumentApp.getUi().showSidebar(html);
}

// ============================================================
//  THEME DEFINITIONS
// ============================================================

var THEMES = {
  onedark: {
    name: "One Dark",
    bg: "#282c34",
    headerBg: "#21252b",
    text: "#abb2bf",
    comment: "#5c6370",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
    type: "#e5c07b",
    lineNum: "#4b5263",
    border: "#181a1f",
  },
  dracula: {
    name: "Dracula",
    bg: "#282a36",
    headerBg: "#1e1f29",
    text: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    operator: "#ff79c6",
    type: "#8be9fd",
    lineNum: "#44475a",
    border: "#191a21",
  },
  "github-dark": {
    name: "GitHub Dark",
    bg: "#0d1117",
    headerBg: "#010409",
    text: "#e6edf3",
    comment: "#8b949e",
    keyword: "#ff7b72",
    string: "#a5d6ff",
    number: "#79c0ff",
    function: "#d2a8ff",
    operator: "#ff7b72",
    type: "#ffa657",
    lineNum: "#30363d",
    border: "#21262d",
  },
  monokai: {
    name: "Monokai",
    bg: "#272822",
    headerBg: "#1e1f1c",
    text: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#a6e22e",
    operator: "#f92672",
    type: "#66d9e8",
    lineNum: "#3e3d32",
    border: "#1a1a17",
  },
  "solarized-dark": {
    name: "Solarized Dark",
    bg: "#002b36",
    headerBg: "#00212b",
    text: "#839496",
    comment: "#586e75",
    keyword: "#859900",
    string: "#2aa198",
    number: "#d33682",
    function: "#268bd2",
    operator: "#cb4b16",
    type: "#b58900",
    lineNum: "#073642",
    border: "#00181f",
  },
};

// ============================================================
//  LANGUAGE DEFINITIONS  (token patterns)
// ============================================================

var LANGUAGES = {
  javascript: {
    name: "JavaScript",
    icon: "JS",
    keywords: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "break",
      "continue",
      "new",
      "delete",
      "typeof",
      "instanceof",
      "in",
      "of",
      "class",
      "extends",
      "super",
      "import",
      "export",
      "default",
      "async",
      "await",
      "try",
      "catch",
      "finally",
      "throw",
      "this",
      "null",
      "undefined",
      "true",
      "false",
      "void",
      "yield",
      "from",
      "static",
      "get",
      "set",
    ],
    types: [
      "Array",
      "Object",
      "String",
      "Number",
      "Boolean",
      "Promise",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "Symbol",
      "BigInt",
      "Date",
      "RegExp",
      "Error",
      "Function",
      "Proxy",
      "Reflect",
      "JSON",
      "Math",
      "console",
      "window",
      "document",
      "process",
    ],
  },
  typescript: {
    name: "TypeScript",
    icon: "TS",
    keywords: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "break",
      "continue",
      "new",
      "delete",
      "typeof",
      "instanceof",
      "in",
      "of",
      "class",
      "extends",
      "super",
      "import",
      "export",
      "default",
      "async",
      "await",
      "try",
      "catch",
      "finally",
      "throw",
      "this",
      "null",
      "undefined",
      "true",
      "false",
      "void",
      "yield",
      "from",
      "static",
      "get",
      "set",
      "interface",
      "type",
      "enum",
      "namespace",
      "declare",
      "abstract",
      "implements",
      "public",
      "private",
      "protected",
      "readonly",
      "as",
      "is",
      "keyof",
      "infer",
      "never",
      "unknown",
      "any",
    ],
    types: [
      "Array",
      "Object",
      "String",
      "Number",
      "Boolean",
      "Promise",
      "Map",
      "Set",
      "Record",
      "Partial",
      "Required",
      "Readonly",
      "Pick",
      "Omit",
      "Exclude",
      "Extract",
      "NonNullable",
      "ReturnType",
      "Parameters",
      "ConstructorParameters",
      "InstanceType",
      "void",
      "never",
      "unknown",
      "any",
      "Date",
      "RegExp",
      "Error",
      "Function",
    ],
  },
  python: {
    name: "Python",
    icon: "PY",
    keywords: [
      "def",
      "class",
      "return",
      "if",
      "elif",
      "else",
      "for",
      "while",
      "break",
      "continue",
      "import",
      "from",
      "as",
      "with",
      "try",
      "except",
      "finally",
      "raise",
      "pass",
      "lambda",
      "yield",
      "global",
      "nonlocal",
      "del",
      "assert",
      "in",
      "not",
      "and",
      "or",
      "is",
      "True",
      "False",
      "None",
      "async",
      "await",
    ],
    types: [
      "int",
      "str",
      "float",
      "bool",
      "list",
      "dict",
      "tuple",
      "set",
      "bytes",
      "bytearray",
      "complex",
      "range",
      "type",
      "object",
      "Exception",
      "ValueError",
      "TypeError",
      "KeyError",
      "IndexError",
      "AttributeError",
      "ImportError",
      "OSError",
      "print",
      "len",
      "range",
      "enumerate",
      "zip",
      "map",
      "filter",
      "sorted",
      "reversed",
      "sum",
      "min",
      "max",
      "abs",
      "round",
      "open",
      "super",
      "self",
    ],
  },
  sql: {
    name: "SQL",
    icon: "SQL",
    keywords: [
      "SELECT",
      "FROM",
      "WHERE",
      "JOIN",
      "LEFT",
      "RIGHT",
      "INNER",
      "OUTER",
      "FULL",
      "ON",
      "GROUP",
      "BY",
      "ORDER",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "INSERT",
      "INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE",
      "CREATE",
      "TABLE",
      "ALTER",
      "DROP",
      "INDEX",
      "VIEW",
      "DATABASE",
      "SCHEMA",
      "PRIMARY",
      "KEY",
      "FOREIGN",
      "REFERENCES",
      "NOT",
      "NULL",
      "DEFAULT",
      "UNIQUE",
      "CHECK",
      "CONSTRAINT",
      "AND",
      "OR",
      "IN",
      "NOT IN",
      "IS",
      "LIKE",
      "BETWEEN",
      "EXISTS",
      "UNION",
      "ALL",
      "DISTINCT",
      "AS",
      "WITH",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
      "OVER",
      "PARTITION",
      "WINDOW",
      "ROWS",
      "RANGE",
      "PRECEDING",
      "FOLLOWING",
      "CURRENT",
      "ROW",
    ],
    types: [
      "INT",
      "INTEGER",
      "BIGINT",
      "SMALLINT",
      "TINYINT",
      "DECIMAL",
      "NUMERIC",
      "FLOAT",
      "DOUBLE",
      "REAL",
      "VARCHAR",
      "CHAR",
      "TEXT",
      "NVARCHAR",
      "NCHAR",
      "DATE",
      "DATETIME",
      "TIMESTAMP",
      "TIME",
      "BOOLEAN",
      "BOOL",
      "BLOB",
      "CLOB",
      "JSON",
      "UUID",
      "SERIAL",
      "AUTOINCREMENT",
    ],
  },
  html: {
    name: "HTML",
    icon: "HTML",
    keywords: [],
    types: [],
  },
  css: {
    name: "CSS",
    icon: "CSS",
    keywords: [
      "important",
      "media",
      "keyframes",
      "font-face",
      "supports",
      "charset",
      "import",
      "namespace",
      "page",
    ],
    types: [
      "px",
      "em",
      "rem",
      "vh",
      "vw",
      "%",
      "auto",
      "none",
      "block",
      "inline",
      "flex",
      "grid",
      "absolute",
      "relative",
      "fixed",
      "sticky",
      "hidden",
      "visible",
      "pointer",
      "solid",
      "dashed",
      "dotted",
      "bold",
      "italic",
      "normal",
      "center",
      "left",
      "right",
      "top",
      "bottom",
      "transparent",
      "inherit",
      "initial",
      "unset",
    ],
  },
  java: {
    name: "Java",
    icon: "JV",
    keywords: [
      "class",
      "interface",
      "enum",
      "extends",
      "implements",
      "public",
      "private",
      "protected",
      "static",
      "final",
      "abstract",
      "synchronized",
      "volatile",
      "transient",
      "native",
      "strictfp",
      "new",
      "return",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "break",
      "continue",
      "try",
      "catch",
      "finally",
      "throw",
      "throws",
      "import",
      "package",
      "this",
      "super",
      "instanceof",
      "null",
      "true",
      "false",
      "void",
    ],
    types: [
      "String",
      "Integer",
      "Long",
      "Double",
      "Float",
      "Boolean",
      "Char",
      "Byte",
      "Short",
      "Object",
      "Array",
      "List",
      "ArrayList",
      "Map",
      "HashMap",
      "Set",
      "HashSet",
      "Exception",
      "RuntimeException",
      "System",
      "Math",
      "StringBuilder",
      "StringBuffer",
      "Thread",
      "Runnable",
      "Comparable",
      "Iterable",
    ],
  },
  go: {
    name: "Go",
    icon: "GO",
    keywords: [
      "package",
      "import",
      "func",
      "return",
      "var",
      "const",
      "type",
      "struct",
      "interface",
      "map",
      "chan",
      "go",
      "defer",
      "select",
      "case",
      "default",
      "break",
      "continue",
      "fallthrough",
      "goto",
      "if",
      "else",
      "for",
      "range",
      "switch",
      "nil",
      "true",
      "false",
      "make",
      "new",
      "len",
      "cap",
      "append",
      "copy",
      "delete",
      "close",
      "panic",
      "recover",
      "print",
      "println",
    ],
    types: [
      "int",
      "int8",
      "int16",
      "int32",
      "int64",
      "uint",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "float32",
      "float64",
      "complex64",
      "complex128",
      "bool",
      "string",
      "byte",
      "rune",
      "error",
      "any",
    ],
  },
  rust: {
    name: "Rust",
    icon: "RS",
    keywords: [
      "fn",
      "let",
      "mut",
      "const",
      "static",
      "struct",
      "enum",
      "impl",
      "trait",
      "use",
      "mod",
      "pub",
      "priv",
      "crate",
      "super",
      "self",
      "Self",
      "return",
      "if",
      "else",
      "match",
      "for",
      "while",
      "loop",
      "break",
      "continue",
      "move",
      "ref",
      "in",
      "where",
      "type",
      "as",
      "unsafe",
      "extern",
      "dyn",
      "async",
      "await",
      "yield",
      "abstract",
      "become",
      "box",
      "final",
      "override",
      "priv",
      "typeof",
      "unsized",
      "virtual",
    ],
    types: [
      "i8",
      "i16",
      "i32",
      "i64",
      "i128",
      "isize",
      "u8",
      "u16",
      "u32",
      "u64",
      "u128",
      "usize",
      "f32",
      "f64",
      "bool",
      "char",
      "str",
      "String",
      "Vec",
      "HashMap",
      "HashSet",
      "Option",
      "Result",
      "Box",
      "Rc",
      "Arc",
      "Mutex",
      "RwLock",
      "Cell",
      "RefCell",
    ],
  },
  bash: {
    name: "Bash",
    icon: "SH",
    keywords: [
      "if",
      "then",
      "else",
      "elif",
      "fi",
      "for",
      "while",
      "do",
      "done",
      "case",
      "esac",
      "function",
      "return",
      "exit",
      "break",
      "continue",
      "local",
      "export",
      "readonly",
      "declare",
      "typeset",
      "source",
      "alias",
      "unalias",
      "echo",
      "printf",
      "read",
      "set",
      "unset",
      "shift",
      "getopts",
      "trap",
      "wait",
      "sleep",
      "true",
      "false",
      "null",
    ],
    types: [
      "$0",
      "$1",
      "$2",
      "$?",
      "$$",
      "$!",
      "$@",
      "$*",
      "$#",
      "${",
      "$(",
      "$((",
    ],
  },
  json: {
    name: "JSON",
    icon: "JSON",
    keywords: ["true", "false", "null"],
    types: [],
  },
};

// ============================================================
//  CORE: INSERT CODE BLOCK INTO DOC
// ============================================================

/**
 * Main function called from sidebar.
 * @param {Object} payload  { code, language, theme, showLineNumbers, showHeader, fontSize }
 */
function insertCodeBlock(payload) {
  try {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var cursor = doc.getCursor();
    var selection = doc.getSelection();

    var code = payload.code || "";
    var langKey = payload.language || "javascript";
    var themeKey = payload.theme || "onedark";
    var showLineNums = payload.showLineNumbers !== false;
    var showHeader = payload.showHeader !== false;
    var fontSize = parseInt(payload.fontSize) || 11;

    var theme = THEMES[themeKey] || THEMES["onedark"];
    var lang = LANGUAGES[langKey] || LANGUAGES["javascript"];

    // Tokenize
    var tokens = tokenize(code, langKey);

    // Find insertion index
    var insertIndex = getInsertionIndex(body, cursor, selection);

    // Insert separator before block
    body
      .insertParagraph(insertIndex, "")
      .setSpacingBefore(6)
      .setSpacingAfter(0);
    insertIndex++;

    // Insert header row (language badge)
    if (showHeader) {
      var header = body.insertParagraph(insertIndex, "");
      insertIndex++;
      styleHeaderParagraph(header, lang, theme, fontSize);
    }

    // Insert code lines
    var lines = tokens; // array of line arrays of token objects
    for (var i = 0; i < lines.length; i++) {
      var para = body.insertParagraph(insertIndex, "");
      insertIndex++;
      styleCodeLine(
        para,
        lines[i],
        i + 1,
        showLineNums,
        theme,
        fontSize,
        i === 0 && !showHeader,
        i === lines.length - 1,
      );
    }

    // Insert separator after block
    body
      .insertParagraph(insertIndex, "")
      .setSpacingBefore(0)
      .setSpacingAfter(6);

    return { success: true, linesInserted: lines.length };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

// ============================================================
//  STYLING HELPERS
// ============================================================

function getInsertionIndex(body, cursor, selection) {
  try {
    if (cursor) {
      var element = cursor.getElement();
      var parent = element.getParent();
      if (parent && parent.getType() === DocumentApp.ElementType.BODY_SECTION) {
        return element.getParent().getChildIndex(element) + 1;
      }
      return body.getChildIndex(parent) + 1;
    }
  } catch (e) {}
  return body.getNumChildren();
}

function styleHeaderParagraph(para, lang, theme, fontSize) {
  para.setSpacingBefore(0).setSpacingAfter(0).setLineSpacing(1);
  para.setIndentStart(0).setIndentEnd(0);

  // Set paragraph background via shading workaround (border trick)
  para.setAttributes({
    [DocumentApp.Attribute.BACKGROUND_COLOR]: theme.headerBg,
    [DocumentApp.Attribute.SPACING_BEFORE]: 2,
    [DocumentApp.Attribute.SPACING_AFTER]: 0,
    [DocumentApp.Attribute.LINE_SPACING]: 1,
    [DocumentApp.Attribute.INDENT_START]: 0,
    [DocumentApp.Attribute.INDENT_END]: 0,
  });

  // Icon badge text
  var text = para.appendText("  " + lang.icon + "  " + lang.name + "  ");
  text
    .setFontFamily("Courier New")
    .setFontSize(fontSize - 1)
    .setForegroundColor(theme.type)
    .setBold(true)
    .setItalic(false);
}

function styleCodeLine(
  para,
  lineTokens,
  lineNum,
  showLineNums,
  theme,
  fontSize,
  isFirst,
  isLast,
) {
  var attrs = {
    [DocumentApp.Attribute.BACKGROUND_COLOR]: theme.bg,
    [DocumentApp.Attribute.SPACING_BEFORE]: isFirst ? 2 : 0,
    [DocumentApp.Attribute.SPACING_AFTER]: isLast ? 2 : 0,
    [DocumentApp.Attribute.LINE_SPACING]: 1.15,
    [DocumentApp.Attribute.INDENT_START]: 0,
    [DocumentApp.Attribute.INDENT_END]: 0,
  };
  para.setAttributes(attrs);

  // Line number
  if (showLineNums) {
    var numStr = ("   " + lineNum).slice(-3) + "  ";
    var numText = para.appendText(numStr);
    numText
      .setFontFamily("Courier New")
      .setFontSize(fontSize - 1)
      .setForegroundColor(theme.lineNum)
      .setBold(false)
      .setItalic(false);
  } else {
    para
      .appendText("  ")
      .setFontFamily("Courier New")
      .setFontSize(fontSize)
      .setForegroundColor(theme.text)
      .setBold(false);
  }

  // Tokens
  if (lineTokens.length === 0) {
    // Empty line — add a space to preserve line
    para
      .appendText(" ")
      .setFontFamily("Courier New")
      .setFontSize(fontSize)
      .setForegroundColor(theme.text)
      .setBold(false)
      .setItalic(false);
  } else {
    for (var t = 0; t < lineTokens.length; t++) {
      var tok = lineTokens[t];
      var color = getTokenColor(tok.type, theme);
      var run = para.appendText(tok.value);
      run
        .setFontFamily("Courier New")
        .setFontSize(fontSize)
        .setForegroundColor(color)
        .setBold(tok.type === "keyword")
        .setItalic(tok.type === "comment")
        .setUnderline(false);
    }
  }

  // Trailing padding
  para
    .appendText("  ")
    .setFontFamily("Courier New")
    .setFontSize(fontSize)
    .setForegroundColor(theme.bg)
    .setBold(false);
}

function getTokenColor(type, theme) {
  switch (type) {
    case "keyword":
      return theme.keyword;
    case "string":
      return theme.string;
    case "number":
      return theme.number;
    case "comment":
      return theme.comment;
    case "function":
      return theme.function;
    case "operator":
      return theme.operator;
    case "type":
      return theme.type;
    default:
      return theme.text;
  }
}

// ============================================================
//  TOKENIZER
// ============================================================

/**
 * Returns array of lines, each line is array of {type, value} tokens.
 */
function tokenize(code, langKey) {
  var lang = LANGUAGES[langKey] || LANGUAGES["javascript"];
  var lines = code.split("\n");
  var result = [];

  var inBlockComment = false;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var lineTokens = [];

    if (langKey === "sql") {
      lineTokens = tokenizeSQL(line, lang);
    } else if (langKey === "html") {
      lineTokens = tokenizeHTML(line);
    } else if (langKey === "css") {
      lineTokens = tokenizeCSS(line, lang);
    } else if (langKey === "json") {
      lineTokens = tokenizeJSON(line);
    } else if (langKey === "bash") {
      lineTokens = tokenizeBash(line, lang);
    } else {
      var blockResult = tokenizeLine(line, lang, inBlockComment);
      lineTokens = blockResult.tokens;
      inBlockComment = blockResult.inBlockComment;
    }

    result.push(lineTokens);
  }
  return result;
}

function tokenizeLine(line, lang, inBlockComment) {
  var tokens = [];
  var i = 0;

  while (i < line.length) {
    // Inside block comment
    if (inBlockComment) {
      var endIdx = line.indexOf("*/", i);
      if (endIdx === -1) {
        tokens.push({ type: "comment", value: line.slice(i) });
        i = line.length;
      } else {
        tokens.push({ type: "comment", value: line.slice(i, endIdx + 2) });
        i = endIdx + 2;
        inBlockComment = false;
      }
      continue;
    }

    // Single-line comment //
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ type: "comment", value: line.slice(i) });
      i = line.length;
      continue;
    }
    // Single-line comment #
    if (line[i] === "#" && lang.keywords.indexOf("def") !== -1) {
      tokens.push({ type: "comment", value: line.slice(i) });
      i = line.length;
      continue;
    }
    // Block comment start
    if (line[i] === "/" && line[i + 1] === "*") {
      var endIdx = line.indexOf("*/", i + 2);
      if (endIdx === -1) {
        tokens.push({ type: "comment", value: line.slice(i) });
        i = line.length;
        inBlockComment = true;
      } else {
        tokens.push({ type: "comment", value: line.slice(i, endIdx + 2) });
        i = endIdx + 2;
      }
      continue;
    }

    // String " or ' or `
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      var quote = line[i];
      var j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Number
    if (
      /[0-9]/.test(line[i]) ||
      (line[i] === "." && /[0-9]/.test(line[i + 1]))
    ) {
      var j = i;
      while (j < line.length && /[0-9a-fA-FxX._]/.test(line[j])) j++;
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_$]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      var word = line.slice(i, j);

      // Check next non-space for '(' => function call
      var afterWord = line.slice(j).trimLeft();
      var isCall = afterWord[0] === "(";

      if (lang.keywords.indexOf(word) !== -1) {
        tokens.push({ type: "keyword", value: word });
      } else if (lang.types.indexOf(word) !== -1) {
        tokens.push({ type: "type", value: word });
      } else if (isCall) {
        tokens.push({ type: "function", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~?:,;.[\]{}()]/.test(line[i])) {
      tokens.push({ type: "operator", value: line[i] });
      i++;
      continue;
    }

    // Whitespace
    if (/\s/.test(line[i])) {
      var j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      tokens.push({ type: "text", value: line.slice(i, j) });
      i = j;
      continue;
    }

    tokens.push({ type: "text", value: line[i] });
    i++;
  }

  return { tokens: tokens, inBlockComment: inBlockComment };
}

function tokenizeSQL(line, lang) {
  var tokens = [];
  var i = 0;
  var upper = line.toUpperCase();

  while (i < line.length) {
    if (line[i] === "-" && line[i + 1] === "-") {
      tokens.push({ type: "comment", value: line.slice(i) });
      break;
    }
    if (line[i] === "'" || line[i] === '"') {
      var q = line[i],
        j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      tokens.push({ type: "string", value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
      var word = line.slice(i, j);
      var wordUp = word.toUpperCase();
      if (lang.keywords.indexOf(wordUp) !== -1) {
        tokens.push({ type: "keyword", value: word });
      } else if (lang.types.indexOf(wordUp) !== -1) {
        tokens.push({ type: "type", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = j;
      continue;
    }
    tokens.push({ type: "operator", value: line[i] });
    i++;
  }
  return tokens;
}

function tokenizeHTML(line) {
  var tokens = [];
  var i = 0;
  while (i < line.length) {
    if (line.slice(i, i + 4) === "<!--") {
      var end = line.indexOf("-->", i);
      if (end === -1) {
        tokens.push({ type: "comment", value: line.slice(i) });
        break;
      }
      tokens.push({ type: "comment", value: line.slice(i, end + 3) });
      i = end + 3;
      continue;
    }
    if (line[i] === "<") {
      tokens.push({ type: "operator", value: "<" });
      i++;
      if (line[i] === "/") {
        tokens.push({ type: "operator", value: "/" });
        i++;
      }
      var j = i;
      while (j < line.length && /[a-zA-Z0-9-]/.test(line[j])) j++;
      if (j > i) {
        tokens.push({ type: "keyword", value: line.slice(i, j) });
        i = j;
      }
      continue;
    }
    if (line[i] === ">" || line[i] === "/") {
      tokens.push({ type: "operator", value: line[i] });
      i++;
      continue;
    }
    if (line[i] === '"' || line[i] === "'") {
      var q = line[i],
        j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      tokens.push({ type: "string", value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (/[a-zA-Z_-]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-zA-Z0-9_-]/.test(line[j])) j++;
      var word = line.slice(i, j);
      var next = line.slice(j).trimLeft();
      tokens.push({ type: next[0] === "=" ? "type" : "text", value: word });
      i = j;
      continue;
    }
    tokens.push({ type: "text", value: line[i] });
    i++;
  }
  return tokens;
}

function tokenizeCSS(line, lang) {
  var tokens = [];
  var i = 0;
  while (i < line.length) {
    if (line[i] === "/" && line[i + 1] === "*") {
      var end = line.indexOf("*/", i + 2);
      if (end === -1) {
        tokens.push({ type: "comment", value: line.slice(i) });
        break;
      }
      tokens.push({ type: "comment", value: line.slice(i, end + 2) });
      i = end + 2;
      continue;
    }
    if (line[i] === '"' || line[i] === "'") {
      var q = line[i],
        j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      tokens.push({ type: "string", value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (line[i] === "#") {
      var j = i + 1;
      while (j < line.length && /[a-fA-F0-9]/.test(line[j])) j++;
      if (j - i > 1) {
        tokens.push({ type: "number", value: line.slice(i, j) });
        i = j;
        continue;
      }
    }
    if (/[0-9]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[0-9.%a-zA-Z]/.test(line[j])) j++;
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_-]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-zA-Z0-9_-]/.test(line[j])) j++;
      var word = line.slice(i, j);
      var next = line.slice(j).trimLeft();
      if (next[0] === ":") {
        tokens.push({ type: "type", value: word });
      } else if (next[0] === "{") {
        tokens.push({ type: "function", value: word });
      } else if (lang.keywords.indexOf(word) !== -1) {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = j;
      continue;
    }
    tokens.push({ type: "operator", value: line[i] });
    i++;
  }
  return tokens;
}

function tokenizeBash(line, lang) {
  var tokens = [];
  var i = 0;
  while (i < line.length) {
    if (line[i] === "#") {
      tokens.push({ type: "comment", value: line.slice(i) });
      break;
    }
    if (line[i] === '"' || line[i] === "'") {
      var q = line[i],
        j = i + 1;
      while (j < line.length && line[j] !== q) {
        if (line[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (line[i] === "$") {
      var j = i + 1;
      while (j < line.length && /[a-zA-Z0-9_{]/.test(line[j])) j++;
      tokens.push({ type: "type", value: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-zA-Z0-9_-]/.test(line[j])) j++;
      var word = line.slice(i, j);
      if (lang.keywords.indexOf(word) !== -1) {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = j;
      continue;
    }
    tokens.push({ type: "text", value: line[i] });
    i++;
  }
  return tokens;
}

function tokenizeJSON(line) {
  var tokens = [];
  var i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      var j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j++;
        j++;
      }
      var str = line.slice(i, j + 1);
      var after = line.slice(j + 1).trimLeft();
      tokens.push({ type: after[0] === ":" ? "type" : "string", value: str });
      i = j + 1;
      continue;
    }
    if (/[0-9\-]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[0-9.\-eE+]/.test(line[j])) j++;
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-z]/.test(line[i])) {
      var j = i;
      while (j < line.length && /[a-z]/.test(line[j])) j++;
      var word = line.slice(i, j);
      tokens.push({
        type:
          ["true", "false", "null"].indexOf(word) !== -1 ? "keyword" : "text",
        value: word,
      });
      i = j;
      continue;
    }
    tokens.push({ type: "operator", value: line[i] });
    i++;
  }
  return tokens;
}

/**
 * Returns list of available languages for the sidebar dropdown.
 */
function getLanguages() {
  return Object.keys(LANGUAGES).map(function (k) {
    return { key: k, name: LANGUAGES[k].name, icon: LANGUAGES[k].icon };
  });
}

/**
 * Returns list of available themes for the sidebar dropdown.
 */
function getThemes() {
  return Object.keys(THEMES).map(function (k) {
    return { key: k, name: THEMES[k].name };
  });
}
