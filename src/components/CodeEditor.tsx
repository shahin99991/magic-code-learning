import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Paper } from '@mui/material';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <Paper elevation={3} sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        onChange={onChange}
        theme="light"
      />
    </Paper>
  );
};

export default CodeEditor; 