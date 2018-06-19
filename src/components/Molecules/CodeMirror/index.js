import React from 'react';
import {Controlled} from "react-codemirror2";
import "codemirror/mode/go/go"
import "codemirror/mode/python/python"
import "codemirror/mode/clike/clike"

const modeMapper = (key) => {
    switch (key){
        case "java":
            return 'text/x-java'
        case "c++":
            return 'text/x-c++src'
        case "python3":
            return 'text/x-python'
        case "go":
            return'text/x-go'
    }
}



const CodeMirror = ({options, ...rest}) => {
    const props = {
        ...rest,
        options:{
            ...options,
            mode: modeMapper(options.mode)
        }
    }
    return (
        <Controlled
            {...props}
        />
    )
}

export default CodeMirror