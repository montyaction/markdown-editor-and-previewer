import { useState, useEffect } from 'react';
import './App.css';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

const MarkdownEditor = ({ onEditorChange, isMaximized, toggleMaximized, isHidden }) => {
  return (
    <div className={`editor-wrapper ${isMaximized ? 'maximized' : ''} ${isHidden ? 'hide' : ''}`}>
      <ToolBar title={'Editor'} isMaximized={isMaximized} toggleMaximized={toggleMaximized} />
      <textarea id='editor' type='text' spellCheck='false' onChange={onEditorChange}></textarea>
    </div>
  );
};

const MarkdownPreviewer = ({ markdown, isMaximized, toggleMaximized, isHidden }) => {
  const html = marked(markdown);

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
  const [markdown, setMarkdown] = useState('');
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