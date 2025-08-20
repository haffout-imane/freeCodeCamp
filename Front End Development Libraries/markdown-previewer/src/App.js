import { useState, useRef } from "react";
import { marked } from "marked";
import "./App.css";

marked.setOptions({
  breaks: true,
});

const defaultMarkdown = `# Welcome to my Markdown Previewer!
## This is a sub-heading
[Visit GitHub](https://github.com/)

Inline code: \`console.log("Hello")\`

\`\`\`javascript
function greet() {
  return "Hello World";
}
\`\`\`

- List item 1
- List item 2

> This is a blockquote.

**Bold text**

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
`;

function App() {
  const [text, setText] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(true);
  const [editorWidth, setEditorWidth] = useState(50);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current || !showPreview) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setEditorWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  return (
    <div
      className="app"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Editor wrapper */}
      <div
        className="editor-wrapper"
        style={{ flexBasis: showPreview ? `${editorWidth}%` : "100%" }}
      >
        <div className="editor-toolbar">
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Close Preview" : "Open Preview"}
          </button>
        </div>
        <div className="editor-container">
          <div className="line-numbers">
            {text.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            id="editor"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      {/* Resizer Bar */}
      {showPreview && <div className="resizer" onMouseDown={handleMouseDown} />}

      {/* Preview */}
      {showPreview && (
        <div
          className="preview-container"
          style={{ flexBasis: `${100 - editorWidth}%` }}
        >
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
