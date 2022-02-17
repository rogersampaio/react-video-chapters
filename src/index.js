import React from 'react'
import PropTypes from 'prop-types'
import styleSCSS from './styles.module.scss'

const ReactVideoChapters = ({
  url,
  type,
  onPause,
  onPlay,
  onEnded,
  onTimeUpdate,
  title,
  webvttChaptersUrl,
  subtitles,
  crossOrigin,
  style
}) => {
  const webvttSubtitles = []

  function displayChapters(e) {
    const videoElement = e.target

    function hideControls() {
      if (videoElement.paused) return
      videoElement.parentElement.querySelector('.controls').style.display =
        'none'
    }

    videoElement.addEventListener(
      'mouseover',
      function () {
        videoElement.parentElement.querySelector('.controls').style.display =
          'block'
      },
      false
    )

    videoElement.addEventListener(
      'mouseleave',
      function (e) {
        if (e?.relatedTarget?.localName === 'li') return
        hideControls()
      },
      false
    )

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
          const liMarker = document.createElement('li')
          const spanTooltip = document.createElement('span')
          const chapterName = textTrack.cues[i].text

          liMarker.classList.add('tooltip')
          spanTooltip.classList.add('tooltiptext')
          spanTooltip.classList.add('tooltip-top')

          spanTooltip.innerHTML = chapterName

          const percentage =
            (textTrack.cues[i].startTime / videoElement.duration) * 100
          liMarker.style.marginLeft = percentage + '%'

          liMarker.setAttribute('value', textTrack.cues[i].startTime)
          aElement.setAttribute('id', textTrack.cues[i].startTime)
          aElement.setAttribute('tabindex', '0')

          aElement.appendChild(document.createTextNode(chapterName))
          liElement.appendChild(aElement)
          liMarker.appendChild(spanTooltip)
          e.target.parentElement
            .querySelector('.chapterList')
            .appendChild(liElement)
          videoElement.parentElement
            .querySelector('.controls')
            .appendChild(liMarker)
          aElement.addEventListener(
            'click',
            function () {
              videoElement.currentTime = this.id
            },
            false
          )
          liMarker.addEventListener(
            'click',
            function () {
              videoElement.currentTime = this.value
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

  ;(subtitles || []).forEach((element, i) => {
    webvttSubtitles.push(
      <track
        key={i}
        label={element.label}
        kind='subtitles'
        srcLang={element.srcLang}
        src={element.url}
        default={element.default}
      ></track>
    )
  })

  return (
    <figure className={styleSCSS.videotrackcontainer} style={style}>
      <video
        controls
        controlsList='nodownload'
        onPause={onPause}
        onPlay={onPlay}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        key={url}
        crossOrigin={crossOrigin}
        onLoadedMetadata={displayChapters}
        title={title?.value ? title.value : ''}
      >
        <source src={url} type={type} />
        <track kind='chapters' src={webvttChaptersUrl} default />
        {webvttSubtitles}
      </video>
      <ul className='controls' data-state='hidden'></ul>
      {webvttChaptersUrl && (
        <figcaption role='menu' aria-label='Message Log'>
          <ol className='chapterList'></ol>
        </figcaption>
      )}
    </figure>
  )
}

export default ReactVideoChapters;

ReactVideoChapters.propTypes = {
  element: PropTypes.objectOf(PropTypes.any)
}
