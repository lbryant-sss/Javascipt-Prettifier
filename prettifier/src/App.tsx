import { useState } from 'react'
import prettier from 'prettier/standalone'
import babelPlugin from 'prettier/plugins/babel'
import estreePlugin from 'prettier/plugins/estree'

//This is the one that shows syntax color
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


//1. Prettier, react-syntax-highlighter


function App() {

  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')

  const prettifyCode = async () => {
    try {
      const formatted = prettier.format(inputCode, {
        parser: 'babel',
        plugins: [babelPlugin, estreePlugin],
        semi: true,
        singleQuote: true,
      });
      setOutputCode(await formatted)
    } catch (error) {
      console.log(error);
      setOutputCode("Error prettifying" + error)
    }
  }

  return (
    <>
      <div style={{width: '50vw'}}>
        <div style={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
            maxWidth: '800px',
            width: '100%'
          }
        }>
          <h2 style={{color: '#fff'}}>Javascript Prettifier</h2>
          <textarea
            rows={10}
            placeholder='Enter your javascripts code here...'
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            style={{width: '100%', marginBottom: '10px'}}
          />
          <button
          onClick={prettifyCode}
          style={{
            padding: '10px 20px', fontSize: '16px'
          }}
          >
            Prettify
          </button>
          <h3 style={{color: '#fff'}}>Output:</h3>
          <div style={{maxWidth: '800px'}}>
            <SyntaxHighlighter language='javascript' style={atomDark}>
              {outputCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
