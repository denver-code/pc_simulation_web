"use client"

import { useRef, useEffect } from "react"
import Editor, { EditorProps, OnMount } from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Define a custom language for our assembly-like code
    monaco.languages.register({ id: 'customasm' })
    monaco.languages.setMonarchTokensProvider('customasm', {
      tokenizer: {
        root: [
          [/[a-zA-Z]\w*/, 'keyword'],
          [/R[0-7]/, 'variable'],
          [/0x[0-9a-fA-F]+/, 'number.hex'],
          [/0b[01]+/, 'number.binary'],
          [/\d+/, 'number'],
          [/;.*/, 'comment'],
        ]
      }
    })

    // Basic autocompletion
    monaco.languages.registerCompletionItemProvider('customasm', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        }
        const suggestions = [
           {
            label: "VER",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "VER = ${1:1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Toggle verbosity (0 or 1)",
            range: range,
          },
          {
            label: "INIT",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "INIT ${1:R0} = ${2:0}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Initialize a register or memory address",
            range: range,
          },
          {
            label: "MOV",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "MOV ${1:R0}, ${2:0}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Move a value to a register or memory address",
            range: range,
          },
          {
            label: "QMOV",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "QMOV ${1:R0}, ${2:R1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Move a value and clear the source",
            range: range,
          },
          {
            label: "ADD",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "ADD ${1:R0}, ${2:R1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Add two values",
            range: range,
          },
          {
            label: "SUB",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "SUB ${1:R0}, ${2:R1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Subtract two values",
            range: range,
          },
          {
            label: "MUL",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "MUL ${1:R0}, ${2:R1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Multiply two values",
            range: range,
          },
          {
            label: "DIV",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "DIV ${1:R0}, ${2:R1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Divide two values",
            range: range,
          },
          {
            label: "OUT",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "OUT ${1:R0}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Output a value",
            range: range,
          },
          {
            label: "IF",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "IF ${1:R0} ${2:==} ${3:0}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Conditional statement",
            range: range,
          },
          {
            label: "CLR",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "CLR ${1:R0}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Clear a register or memory address",
            range: range,
          },
          {
            label: "HALT",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "HALT ${1:1}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Halt the program (0 or 1)",
            range: range,
          },
        ]
        return { suggestions }
      }
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const editorOptions: EditorProps["options"] = {
    minimap: { enabled: false },
    fontSize: 14,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: "on",
    lineNumbers: "on",
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
  }

  return (
    <Editor
      height="calc(100vh - 8rem)"
      defaultLanguage="customasm"
      value={code}
      options={editorOptions}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
    />
  )
}