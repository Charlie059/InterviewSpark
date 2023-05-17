const MetaHire = () => {
  // ** URL of the iframe
  const iframeURL = 'https://v6p9d9t4.ssl.hwcdn.net/html/7838532/app1/index.html'

  return (
    <iframe
      src={iframeURL}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
        border: 'none'
      }}
      allow='autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated'
    ></iframe>
  )
}

// add ability to read IFrame
MetaHire.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default MetaHire
