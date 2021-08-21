import localForage from "../plugins/localForage"
import gaol from "./gaol"

export const boostrap = async () => {
    const userGaol = await localForage.getItem('gaol')
    await localForage.setItem('gaol', {...gaol, ...(userGaol ? userGaol : {})})
}

export const getConfig = async (name) => {
    return await localForage.getItem(name)
}

export const setConfig = async (name, value) => {
    return await localForage.setItem(name, value)
}

export const updatePlayersNMe = async (players, meIndex) => {
    let gaolConfig = await getConfig('gaol')
    await setConfig('gaol', {...gaolConfig, players, meIndex })
}

// export const getConfig = (name, successCallback) => {
//     localForage.getItem(name, successCallback)
// }
