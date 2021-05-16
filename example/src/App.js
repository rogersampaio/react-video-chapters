import React from 'react'

import { ReactVideoChapters } from 'react-video-chapters'
import 'react-video-chapters/dist/index.css'

// 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation.Hosted by archive.org
// Poster from peach.blender.org
const App = () => {
  return <ReactVideoChapters
    url='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    webvttChaptersUrl='/webvttChapterExample_long.vtt'
    style={{ maxWidth: '1080px' }}
  // type='video/mp4' 
  // crossOrigin='anonimous'   
  />

}

export default App
