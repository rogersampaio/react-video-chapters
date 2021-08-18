import React from 'react'

import { ReactVideoChapters } from 'react-video-chapters'
import 'react-video-chapters/dist/index.css'

// 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation.Hosted by archive.org
// Poster from peach.blender.org
const App = () => {
  const subtitles = [
    {
      url: '/webvttSubtitleExample_English.vtt',
      srcLang: 'en-US',
      label: 'English',
      default: true
    },
    {
      url: '/webvttSubtitleExample_Portuguese.vtt',
      srcLang: 'pt-BR',
      label: 'Portuguese'
    }
  ]

  return (
    <ReactVideoChapters
      url='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      webvttChaptersUrl='/webvttChapterExample_long.vtt'
      style={{ maxWidth: '1080px' }}
      // crossOrigin='anonimous'
      subtitles={subtitles}
    />
  )
}

export default App
