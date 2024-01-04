import { useState, useEffect } from 'react';
import './App.css';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

var demoData = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```js\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";

const MarkdownEditor = ({ onEditorChange, isMaximized, toggleMaximized, isHidden }) => {
  return (
    <div className={`editor-wrapper ${isMaximized ? 'maximized' : ''} ${isHidden ? 'hide' : ''}`}>
      <ToolBar title={'Editor'} isMaximized={isMaximized} toggleMaximized={toggleMaximized} />
      <textarea id='editor' type='text' spellCheck='false' onChange={onEditorChange}>
        {demoData}
      </textarea>
    </div>
  );
};

const MarkdownPreviewer = ({ markdown, isMaximized, toggleMaximized, isHidden }) => {
  // Configure Marked.js options
  const markedOptions = {
    breaks: true, // Render carriage returns as <br>
    gfm: true,    // Enable GitHub flavored markdown
  };

  const html = marked(markdown, { ...markedOptions });

  useEffect(() => {
    // Force PrismJS to highlight the code
    Prism.highlightAll();
  }, [html]);

  return (
    <div className={`previewer-wrapper ${isMaximized ? 'maximized' : ''} ${isHidden ? 'hide' : ''}`}>
      <ToolBar title={'Previewer'} isMaximized={isMaximized} toggleMaximized={toggleMaximized} />
      <div id='preview' dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

const ToolBar = ({ title, isMaximized, toggleMaximized }) => {
  return (
    <div className='toolbar'>
      <i className='fa fa-free-code-camp' title='no-stack-dub-sack'></i>
      {title}
      <i className={`fa ${isMaximized ? 'fa-compress' : 'fa-arrows-alt'}`} onClick={toggleMaximized}></i>
    </div>
  );
};

const App = () => {
  const [markdown, setMarkdown] = useState(demoData);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewerMaximized, setPreviewerMaximized] = useState(false);

  const handleEditorChange = (e) => {
    setMarkdown(e.target.value);
  };

  const toggleMaximized = (component) => {
    if (component === 'editor') {
      setEditorMaximized(!editorMaximized);
      setPreviewerMaximized(false);
    } else if (component === 'previewer') {
      setPreviewerMaximized(!previewerMaximized);
      setEditorMaximized(false);
    }
  };

  return (
    <>
      <MarkdownEditor onEditorChange={handleEditorChange} isMaximized={editorMaximized} toggleMaximized={() => toggleMaximized('editor')} isHidden={previewerMaximized} />
      <MarkdownPreviewer markdown={markdown} isMaximized={previewerMaximized} toggleMaximized={() => toggleMaximized('previewer')} isHidden={editorMaximized} />
    </>
  );
};

export default App;