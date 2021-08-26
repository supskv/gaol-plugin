import local from '../../plugins/localForage'

export function fetchUserConfig() {
  return new Promise(async (resolve, reject) => {
    try {
      const gaol = await local.getItem('gaol')
      resolve(gaol || {})
    } catch (e) {
      reject(e)
    }
  });
}

export function updateUserConfig(config) {
  return new Promise(async (resolve, reject) => {
    try {
      await local.setItem('gaol', { ...config })
      resolve(true)
    } catch (e) {
      reject(e)
    }
  });
}
