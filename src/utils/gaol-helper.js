import DefaultGaolConfig from '../config/gaol'

// x is 0, 1, 2, 3
export const getStringFromMessage = (message, x) => {
  let str = ''
  switch (x) {
    case 3:
      str = message.gaol3 || DefaultGaolConfig.message.gaol3
      break
    case 2:
      str = message.gaol2 || DefaultGaolConfig.message.gaol2
      break
    case 1:
      str = message.gaol1 || DefaultGaolConfig.message.gaol1
      break
    case 0:
      str = message.nogaol || DefaultGaolConfig.message.nogaol
      break
  }
  
  return str
}
