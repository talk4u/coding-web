import React from 'react'
import ReactDOM from 'react-dom'

import styled from 'styled-components'
import {appbar_height, max_width} from '../var'
import {darkTheme, defaultTheme} from "./theme";


export const AppBarContainer = styled.div`
    position: fixed;
    width: 100%;
    height: ${appbar_height}px;
    background: ${props=>props.theme.backgroundColor};
    color: ${props=>props.theme.color};
`
const AppBarView = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: ${max_width}px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`

const AppBar = ({children}) => {
    return(
        <AppBarContainer>
            <AppBarView>{children}</AppBarView>
        </AppBarContainer>
    )
}

AppBarContainer.defaultProps = {
    theme: defaultTheme
}


export default AppBar