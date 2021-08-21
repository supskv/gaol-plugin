import React, { useEffect, useRef, useState } from 'react'
import * as OverlayPlugin from '../../plugins/overlay'
import * as Config from '../../config'

export const OverlayContext = React.createContext({})

const Overlay = ({ children }) => {
    const [players, setPlayers] = useState([])
    const playersRef = useRef(players)
    const [gaoled, setGaoled] = useState([])
    const gaoledRef = useRef(gaoled)
    const [mei, setMei] = useState(-1) // index of me in player list
    const meiRef = useRef(mei)
    const [order, setOrder] = useState(0)
    const [countMatch, setCountMatch] = useState(3)

    useEffect(() => {
        fetchUserConfig()
    }, [])

    useEffect(() => {
        OverlayPlugin.boostrap({ gaolHandle })
    }, [])

    useEffect(() => {
        checkNOrder()
    }, [gaoled])

    const fetchUserConfig = async () => {
        let userGaolConfig = await Config.getConfig('gaol')

        // when initial
        if (!userGaolConfig) {
            await Config.boostrap()
            userGaolConfig = await Config.getConfig('gaol')
        }
        
        // console.log('fetchUserConfig')
        console.log(window.navigator);
        setMei(userGaolConfig.meIndex)
        setPlayers(userGaolConfig.players)
        setCountMatch(userGaolConfig.countMatch)

        // issue: Event listenner didn't update state latest.
        // solution & explain: https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
        playersRef.current = userGaolConfig.players
        meiRef.current = userGaolConfig.meIndex
    }

    const gaolHandle = async ({ data }) => {
        const rawLine = data.rawLine
        const { isGaolLog, getPlayerFromRaw } = OverlayPlugin
        if (!isGaolLog(rawLine)) return

        // fix players not update
        // note: callback to context didn't work.
        await fetchUserConfig()
        const nplayers = playersRef.current
        const [name, i, isFound] = getPlayerFromRaw(nplayers, rawLine)
        if (!isFound) {
            cleanState()
            return
        }

        if (gaoledRef.current.find(ix => ix === i) === -1) return
        gaoledRef.current = [...gaoledRef.current, i]
        setGaoled(gaoledRef.current)
    }

    const checkNOrder = () => {
        if (gaoledRef.current.length === countMatch) {
            const nmei = meiRef.current
            let [order, isOrderFound] = OverlayPlugin.getGaolOrderByMe(nmei, gaoledRef.current)
            console.log(gaoledRef.current, order)
            // update GUI
            setOrder(isOrderFound ? order : 0)
            cleanState(10) // in 5 sec
        }
    }

    const cleanState = (time = 0) => {
        setTimeout(() => {
            gaoledRef.current = []
            setGaoled([])
            setOrder(0)
        }, time * 1000)
    }

    return (
        <>
            <OverlayContext.Provider value={{ players, mei, order, fetchUserConfig }}>{children}</OverlayContext.Provider>
        </>
    )
}

export default Overlay