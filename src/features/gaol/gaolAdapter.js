

export const connect = (listeners) => {
  try {
    listeners.map(listener => {
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
    listeners.map(listener => {
      window.removeOverlayListener(listener.name, (e) => listener.event(e))
    })
    console.log("Stopped Overlay plugin")
  } catch (e) {
    console.error("Must import Overlay Plugin CDN")
    console.error(e)
  }
}