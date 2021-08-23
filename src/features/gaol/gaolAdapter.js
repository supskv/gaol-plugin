

export const connect = (listeners) => {
  try {
    listeners.forEach(listener => {
      window.addOverlayListener(listener.name, (e) => listener.event(e))
    })
    window.startOverlayEvents()
    console.log("Started Overlay plugin")
  } catch (e) {
    console.error("Must import Overlay Plugin CDN")
    console.error(e)
  }
}

export const disconnect = (listeners) => {
  try {
    listeners.forEach(listener => {
      window.removeOverlayListener(listener.name, (e) => listener.event(e))
    })
    console.log("Stopped Overlay plugin")
  } catch (e) {
    console.error("Must import Overlay Plugin CDN")
    console.error(e)
  }
}

export const tts = async (msg) => {
  try {
    const call = createMessage('say', 'text', msg)
    await window.callOverlayHandler(call)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const createMessage = (type, key, data) => {
  const call = {
    call: type,
    [key]: data,
    key, data
  }
  return call
}