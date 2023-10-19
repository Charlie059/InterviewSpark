export const getBrowserType = () => {
  const userAgent = navigator.userAgent
  const isOpera = userAgent.indexOf('Opera') > -1
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE
  const isFF = userAgent.indexOf('Firefox') > -1
  const isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 && userAgent.indexOf('Edge') === -1
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && !isEdge

  if (isIE) {
    return 'IE'
  } else if (isFF) {
    return 'Firefox'
  } else if (isOpera) {
    return 'Opera'
  } else if (isSafari) {
    return 'Safari'
  } else if (isChrome) {
    return 'Chrome'
  } else if (isEdge) {
    return 'Edge'
  } else {
    return 'Other'
  }
}
