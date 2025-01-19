import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import styled from '@emotion/styled';

const EditorContainer = styled(Box)`
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
`;

const OutputContainer = styled(Box)`
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #B388FF;
`;

const MagicButton = styled(Button)`
  margin: 10px;
  background: linear-gradient(45deg, #6200EA, #B388FF);
  color: white;
  &:hover {
    background: linear-gradient(45deg, #B388FF, #6200EA);
  }
`;

export const CodingPage: React.FC = () => {
  const [code, _setCode] = useState<string>('// Write your magical code here\nconsole.log("Hello, magical world!");\n');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorViewRef.current) {
      const newState = EditorState.create({
        doc: code,
        extensions: [
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
            }
          })
        ]
      });

      editorViewRef.current = new EditorView({
        state: newState,
        parent: editorRef.current
      });

      return () => {
        if (editorViewRef.current) {
          editorViewRef.current.destroy();
          editorViewRef.current = null;
        }
      };
    }
  }, [code]);

  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput('Casting your magical spell...\n');
    
    try {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error executing code:', error.message);
      } else {
        console.error('Error executing code:', String(error));
      }
      setOutput(`🌋 Your spell misfired!\nAn unknown error occurred`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    if (editorViewRef.current) {
      const newState = EditorState.create({
        doc: '// Write your magical code here\nconsole.log("Hello, magical world!");\n',
        extensions: [
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
            }
          })
        ]
      });
      editorViewRef.current.setState(newState);
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