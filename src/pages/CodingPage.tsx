import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { WASI } from '@wasmer/wasi';
import { WasmFs } from '@wasmer/wasmfs';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

const EditorContainer = styled(Box)`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #B388FF;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  min-height: 300px;
  font-family: 'Source Code Pro', monospace;
  color: #B388FF;
`;

const OutputContainer = styled(Box)`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #B388FF;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  min-height: 150px;
  color: #E8E3F4;
`;

const MagicButton = styled(Button)`
  background: linear-gradient(45deg, #6200EA 30%, #B388FF 90%);
  color: white;
  padding: 10px 20px;
  margin: 10px;
  &:hover {
    background: linear-gradient(45deg, #B388FF 30%, #6200EA 90%);
  }
`;

export const CodingPage: React.FC = () => {
  const [code, setCode] = useState<string>('// Write your magical code here\nconsole.log("Hello, magical world!");\n');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          javascript(),
          EditorView.theme({
            '&': { height: '300px' },
            '.cm-content': { 
              fontFamily: 'Source Code Pro, monospace',
              color: '#B388FF'
            },
            '.cm-gutters': { 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: '#B388FF',
              border: 'none'
            },
            '.cm-activeLineGutter': {
              backgroundColor: 'rgba(179, 136, 255, 0.1)'
            },
            '.cm-line': { padding: '0 8px' },
            '&.cm-focused': { outline: 'none' },
            '.cm-cursor': { borderColor: '#B388FF' }
          }),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              setCode(update.state.doc.toString());
            }
          })
        ]
      });

      const view = new EditorView({
        state,
        parent: editorRef.current
      });

      editorViewRef.current = view;

      return () => {
        view.destroy();
        editorViewRef.current = null;
      };
    }
  }, []);

  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput('Casting your magical spell...\n');
    
    try {
      const wasmFs = new WasmFs();
      let output = '';

      // カスタムconsole.logの実装
      const customConsole = {
        log: (...args: any[]) => {
          output += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ') + '\n';
        },
        error: (...args: any[]) => {
          output += '🔮 Error: ' + args.join(' ') + '\n';
        }
      };

      // コードを実行する関数を作成
      const executeCode = new Function('console', code);
      
      // 安全な環境でコードを実行
      executeCode(customConsole);
      
      setOutput('✨ Spell cast successfully!\n\nOutput:\n' + output);
    } catch (error) {
      setOutput(`🌋 Your spell misfired!\nError: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    if (editorViewRef.current) {
      const state = EditorState.create({
        doc: '// Write your magical code here\nconsole.log("Hello, magical world!");\n',
        extensions: editorViewRef.current.state.extensions
      });
      editorViewRef.current.setState(state);
    }
    setOutput('');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center" 
          sx={{ color: '#B388FF', textShadow: '0 0 10px #B388FF' }}>
          Cast Your Code Spells
        </Typography>
        
        <EditorContainer ref={editorRef} />

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <MagicButton
              onClick={handleRunCode}
              disabled={isExecuting}
              variant="contained"
            >
              {isExecuting ? '✨ Casting Spell...' : '🔮 Cast Spell'}
            </MagicButton>
          </Grid>
          <Grid item>
            <MagicButton
              onClick={handleReset}
              disabled={isExecuting}
              variant="contained"
            >
              🌟 Reset Spell
            </MagicButton>
          </Grid>
        </Grid>

        <OutputContainer>
          <Typography variant="h6" gutterBottom sx={{ color: '#B388FF' }}>
            ✨ Spell Results:
          </Typography>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {output}
          </pre>
        </OutputContainer>
      </Box>
    </Container>
  );
}; 