import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {colors} from "../../Layouts/var";


const MainPath = styled.path`
    fill:${colors.purple};
`

const SubPath = styled.path`
    fill:#9B76FF;
`


const Logo = () => {
    return(
        <svg x="0px" y="0px" viewBox="0 0 291.042 291.042" style={{enableBackground: 'new 0 0 291.042 291.042'}}>
            <g>
                <g>
                    <SubPath d="M211.353,107.517c-0.003,22.945-0.092,63.074-0.025,68.871c0.086,7.463-0.745,7.943-7.062,11.59    c-4.984,2.878-41.136,23.75-60.5,34.93l-0.055-51.656c8.037-4.64,14.227-8.214,16.085-9.287c6.317-3.647,7.148-4.127,7.062-11.59    c-0.024-2.078-0.028-8.57-0.023-17.101L211.353,107.517z"/>
                </g>
                <g>
                    <g>
                        <MainPath d="M145.156,251.421c-0.022,0-0.121,0-0.143,0c-2.192-0.028-4.174-1.322-5.077-3.32     c-1.685-3.744-1.773-6.982-1.773-7.593l-0.088-84.888c0-10.941,1.134-12.852,11.046-18.579l71.54-41.398     c3.976-2.307,7.07-3.937,10.65-3.937c0.253,0,1.266,0.066,1.509,0.099c2.247,0.292,4.097,1.905,4.703,4.086     c0.683,2.483,0.705,5.154,0.738,9.587c0.044,6.388,0.022,26.684,0,45.842c-0.022,17.593-0.033,34.223,0,37.791     c0.11,9.708-1.894,11.933-9.879,16.536l-71.518,41.288C152.039,249.714,148.901,251.421,145.156,251.421z M226.972,105.015     c-0.209,0.127-0.43,0.253-0.661,0.385l-71.54,41.398c-2.357,1.36-4.78,2.759-5.209,3.331c-0.209,0.54-0.209,3.056-0.209,5.49     l0.088,82.57c0.628-0.352,1.244-0.71,1.784-1.024l71.518-41.288c1.718-0.991,3.678-2.12,4.042-2.583     c0.066-0.176,0.231-1.035,0.198-4.058c-0.033-3.59-0.022-20.28,0-37.934c0.022-19.113,0.044-39.366,0-45.263     C226.983,105.686,226.983,105.345,226.972,105.015z"/>
                    </g>
                    <g>
                        <g>
                            <MainPath d="M145.079,251.421c-0.022,0-0.044,0-0.066,0c-3.722-0.044-6.619-1.718-11.409-4.482l-71.838-41.469      c-7.621-4.411-9.658-12.318-9.658-16.299l-0.088-84.894c0-10.936,1.134-12.847,11.046-18.573l71.54-41.398      c3.998-2.313,7.092-3.948,10.661-3.948c3.59,0,6.299,1.569,10.407,3.943l71.364,41.293c5.672,3.254,9.086,5.22,10.484,10.314      c0.496,1.817,0.044,3.766-1.189,5.193c-1.244,1.415-3.084,2.126-4.989,1.883l0,0c-0.584,0-2.269,0.815-5.033,2.417      l-71.54,41.398c-2.357,1.36-4.78,2.759-5.209,3.331c-0.209,0.54-0.209,3.056-0.209,5.49l0.088,84.883v-0.006      c0,0,0.066,1.393,0.782,2.968c0.793,1.757,0.628,3.794-0.43,5.407C148.757,250.463,146.984,251.421,145.079,251.421z       M145.266,51.635c-0.54,0-2.225,0.815-5.022,2.428L68.715,95.461c-2.357,1.36-4.78,2.759-5.209,3.331      c-0.209,0.54-0.209,3.056-0.209,5.484l0.088,84.888c0,0.099,0.187,4.323,4.02,6.536l70.758,40.847l-0.088-80.929      c0-10.941,1.134-12.852,11.046-18.579l71.54-41.398c0.209-0.121,0.407-0.242,0.617-0.358l-71.243-41.216      C148.152,52.978,145.828,51.635,145.266,51.635z"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default Logo