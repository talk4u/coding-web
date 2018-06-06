import React from 'react';
import {UnControlled} from "react-codemirror2";
import "codemirror/mode/go/go"
import "codemirror/mode/python/python"
import "codemirror/mode/clike/clike"

const modeMapper = {
    "java": 'text/x-java',
    "c++": 'text/x-c++src',
    "python3": 'text/x-python',
    "go": 'text/x-go'
}


const CodeMirror = ({options, ...rest}) => {
    const props = {
        ...rest,
        options:{
            ...options,
            mode: modeMapper[options.mode]
        }
    }
    return (
        <UnControlled
            {...props}
        />
    )
}

export default CodeMirror