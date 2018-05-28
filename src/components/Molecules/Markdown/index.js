import React from 'react';
import * as markdownIt from 'markdown-it';
import * as markdownItKaTeX from 'markdown-it-katex';
import keys from 'lodash/keys';
import intersection from 'lodash/intersection';
import styled from 'styled-components'


const MarkdownContainer = styled.div`
    & img {
        max-width: 100%;
    }
`

const defaultOpts = {
    'math': false,
    'html': false,
    'xhtmlOut': false,
    'breaks': false,
    'langPrefix': 'language-',
    'linkify': false,
    'typographer': false,
    'quotes': '“”‘’',
};

export default class Markdown extends React.Component {
    constructor(props) {

        super(props);
        const overrideDefaultsAsKey = intersection(keys(defaultOpts, keys(props.options)));

        let markdown = markdownIt(Object.assign(defaultOpts, props.options));

        let options = Object.assign(defaultOpts, props.options || {});

        if (options.katex) {
            markdown = markdown.use(markdownItKaTeX);
        }

        this.Markdown = markdown;
    }
    render() {
        return (
            <MarkdownContainer dangerouslySetInnerHTML={{__html: this.Markdown.render(this.props.source)}}></MarkdownContainer>
        );
    }
}