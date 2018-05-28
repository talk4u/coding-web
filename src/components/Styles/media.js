import {css} from 'styled-components';
export const sizes = {
    desktop: 1200,
    tablet: 768,
    phone: 425
}

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

    return acc
}, {})

export default media