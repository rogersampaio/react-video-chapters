import React from 'react'
import PropTypes from 'prop-types'
import styleSCSS from './styles.module.scss'

export const ReactVideoChapters = ({
  url,
  type,
  onPause,
  onPlay,
  onEnded,
  onTimeUpdate,
  webvttChaptersUrl,
  crossOrigin,
  style
}) => {
  function displayChapters(e) {
    const videoElement = e.target
    const textTrack = e.target.querySelector('track').track
    if (
      e.target.querySelector('track').readyState === 2 &&
      window.matchMedia('(min-width: 500px)').matches
    ) {
      if (textTrack.kind === 'chapters') {
        textTrack.mode = 'hidden'
        for (let i = 0; i < textTrack.cues.length; ++i) {
          const liElement = document.createElement('li')
          const aElement = document.createElement('a')

          aElement.setAttribute('id', textTrack.cues[i].startTime)
          aElement.setAttribute('tabindex', '0')
          aElement.appendChild(document.createTextNode(textTrack.cues[i].text))
          liElement.appendChild(aElement)
          e.target.parentElement
            .querySelector('.chapterList')
            .appendChild(liElement)
          aElement.addEventListener(
            'click',
            function () {
              videoElement.currentTime = this.id
            },
            false
          )
        }
        textTrack.addEventListener(
          'cuechange',
          function () {
            const currentLocation =
              this.activeCues[this.activeCues.length - 1]?.startTime
            const chapter = document.getElementById(currentLocation)
            if (chapter) {
              const locations = [].slice.call(
                document.querySelectorAll('.chapterList li a')
              )
              for (let i = 0; i < locations.length; ++i) {
                locations[i].classList.remove(styleSCSS.current)
              }
              chapter.classList.add(styleSCSS.current)
            }
          },
          false
        )
      }
    }
  }

  return (
    <figure className={styleSCSS.videotrackcontainer} style={style}>
      <video
        controls
        onPause={onPause}
        onPlay={onPlay}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        key={url}
        crossOrigin={crossOrigin}
        onLoadedMetadata={displayChapters}
      >
        <source src={url} type={type} />
        <track kind='chapters' src={webvttChaptersUrl} default />
      </video>
      <figcaption role='menu' aria-label='Message Log'>
        <ol className='chapterList' />
      </figcaption>
    </figure>
  )
}

ReactVideoChapters.propTypes = {
  element: PropTypes.objectOf(PropTypes.any)
}

// export default ReactVideoChapters

// export const ExampleComponent = ({ text }) => {
//   return <div className={styles.test}>Example Component: {text}</div>
// }
