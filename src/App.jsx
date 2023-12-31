import { useState } from 'react';
import './App.css';
import { marked } from 'marked';

const MarkdownEditor = ({ onEditorChange }) => {
  return (
    <>
      <div className='editor-wrapper'>
        <ToolBar title={'Editor'}/>
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

const MarkdownPreviewer = ({ markdown }) => {
  return (
      <div className='previewer-wrapper'>
        <ToolBar title={'Previewer'} />
        <div
          id='preview'
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        ></div>
      </div>
  );
};

const ToolBar = (props) => {
  return (
    <>
      <div className='toolbar'>
        <i className='fa fa-free-code-camp' title='no-stack-dub-sack'></i>
        {props.title}
        <i className='fa fa-arrows-alt'></i>
      </div>
    </>
  );
};

const App = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <>
      <MarkdownEditor onEditorChange={handleEditorChange} />
      <MarkdownPreviewer markdown={markdown} />
    </>
  );
};

export default App;