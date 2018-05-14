import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import {appbar_height, max_width} from "../var";

const AppContentContainer = styled.div`
    padding-top: ${appbar_height}px;
    min-height: 100%;
    background: #f1f1f5;
`
const AppContentView = styled.div`
    max-width: ${max_width}px;
    margin: 0 auto;
`

const AppContent = ({children})=>{
    return(
        <AppContentContainer>
            <AppContentView>{children}</AppContentView>
        </AppContentContainer>
    )
}
export default AppContent