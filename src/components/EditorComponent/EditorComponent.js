import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import React Quill dynamically only on the client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const EditorComponent = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    // Make sure to import and load the Quill modules here on the client-side
    const Quill = require('quill');
    require('quill/dist/quill.core.css');
    require('quill/dist/quill.snow.css');
    require('quill/dist/quill.js');
  }, []);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <ReactQuill
      value={content}
      onChange={handleEditorChange}
      modules={{ toolbar: true }}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
      ]}
      placeholder="Write something"
      className="myCustomQuilcss"
    />
  );
};

export default EditorComponent;
