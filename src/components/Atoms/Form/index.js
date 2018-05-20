import React from 'react'
import {Form as SemanticForm} from 'semantic-ui-react'
import styled from 'styled-components'
const Form = styled(SemanticForm)`
    background: black;
`
Form.Field = styled(SemanticForm.Field)`
    &&&{
        input{
            border: none;
            box-shadow: inset 0 -1px 0 0 #e1e1e7;
            border-radius: 0;
            transition: box-shadow .1s;
            &:focus{
                box-shadow: inset 0 -1.3px 0 0 #6B29FB;
                border-radius: 0;
            }   
        }
    }
`

export default Form