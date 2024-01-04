import { useState } from 'react';
import './App.css';
import { marked } from 'marked';

const MarkdownEditor = ({ onEditorChange, isMaximized, toggleMaximized, isHide }) => {
  console.log('Editor', isMaximized);
  return (
    <>
      <div className={`editor-wrapper ${isMaximized ? 'maximized' : ''} ${isHide ? 'hide': ''}`}>
        <ToolBar title={'Editor'} isMaximized={isMaximized} toggleMaximized={toggleMaximized} />
        <textarea
          id='editor'
          type='text'
          spellCheck='false'
          onChange={onEditorChange}
        ></textarea>
      </div>
    </>
  );
};

const MarkdownPreviewer = ({ markdown, isMaximized, toggleMaximized, isHide }) => {
  console.log('Priveiw', isMaximized);
  return (
      <div className={`previewer-wrapper ${isMaximized ? 'maximized' : ''} ${isHide ? 'hide': ''}`}>
        <ToolBar title={'Previewer'} isMaximized={isMaximized} toggleMaximized={toggleMaximized} />
        <div
          id='preview'
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        ></div>
      </div>
  );
};

const ToolBar = ({ title, isMaximized, toggleMaximized }) => {
  return (
    <>
      <div className='toolbar'>
        <i className='fa fa-free-code-camp' title='no-stack-dub-sack'></i>
        {title}
        <i
          className={`fa ${isMaximized ? 'fa-compress' : 'fa-arrows-alt'}`}
          onClick={toggleMaximized}
        ></i>
      </div>
    </>
  );
};

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewerMaximized, setPreviewerMaximized] = useState(false);
  const [isHideEditor, setIsHideEditor] = useState(false);
  const [isHidePreview, setIsHidePreview] = useState(false);

  const handleEditorChange = (e) => {
    setMarkdown(e.target.value);
  };

  const toggleEditorMaximized = () => {
    if (isHidePreview === true) {
      setIsHidePreview(false);
    } else {
      setIsHidePreview(true)
    }

    setEditorMaximized(!editorMaximized);
    setPreviewerMaximized(false); // Minimize the other componentt
  };

  const togglePreviewerMaximized = () => {
    if (isHideEditor === true) {
      setIsHideEditor(false);
    } else {
      setIsHideEditor(true)
    }

    setPreviewerMaximized(!previewerMaximized);
    setEditorMaximized(false); // Minimize the other component
  };

  return (
    <>
      <MarkdownEditor onEditorChange={handleEditorChange} isMaximized={editorMaximized} toggleMaximized={toggleEditorMaximized} isHide={isHideEditor} />
      <MarkdownPreviewer markdown={markdown} isMaximized={previewerMaximized} toggleMaximized={togglePreviewerMaximized} isHide={isHidePreview} />
    </>
  );
};

export default App;