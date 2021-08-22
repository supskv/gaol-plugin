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

export function updateUserConfig({ players, myNumber }) {
  return new Promise(async (resolve, reject) => {
    try {
      await local.setItem('gaol', { players, myNumber })
      console.log(await local.getItem('gaol'))
      resolve(true)
    } catch (e) {
      reject(e)
    }
  });
}
