# react-video-chapters

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-video-chapters.svg)](https://www.npmjs.com/package/react-video-chapters) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a HTML 5 video component with WebVTT Chapters ans Subtitles support made for React.

## Screenshot

![alt text](https://raw.githubusercontent.com/rogersampaio/react-video-chapters/master/example/public/react-video-chapters-screenshot2.png?raw=true)

## Install

```bash
npm install --save react-video-chapters
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactVideoChapters from 'react-video-chapters'
import 'react-video-chapters/dist/index.css'

class Example extends Component {
  render() {
    const subtitles = [
      {
        url: '/subtitleEnglish.vtt',
        srcLang: 'en-US',
        label: 'English',
        default: true
      },
      {
        url: '/subtitlePortuguese.vtt',
        srcLang: 'pt-BR',
        label: 'Portuguese'
      }
    ]

    return (
      <ReactVideoChapters
        url='/videoFile.mp4'
        webvttChaptersUrl='/chapterFile.vtt'
        style={{ maxWidth: '1080px' }}
        subtitles={subtitles}
      />
    )
  }
}
```

## License

MIT © [rogersampaio](https://github.com/rogersampaio)
