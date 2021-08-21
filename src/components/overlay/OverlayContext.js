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
    const [errMsg, setErrMsg] = useState('')

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
        setMei(userGaolConfig.meIndex)
        setPlayers(userGaolConfig.players)
        setCountMatch(userGaolConfig.countMatch)

        // issue: Event listenner didn't update state latest.
        // solution & explain: https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
        playersRef.current = userGaolConfig.players
        meiRef.current = userGaolConfig.meIndex
    }

    /**
     * 
     * Raw line examples:
     * 15|4001641A|Titan|2B6C|Rock Throw|10334A83|Windie Likesakiii|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|42891|50096|9336|10000|0|1000|97.37081|113.451|-0.01279504|-3.055689|2675710|4476950|0|10000|0|1000|113.7886|86.21142|-1.378858E-12|-0.7854581|00008C59|0
     * 15|4001641B|Titan|2B6C|Rock Throw|10264B3D|Anger Shana|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|75033|75033|10000|10000|0|1000|96.35912|113.5649|-0.002290758|3.081287|2675710|4476950|0|10000|0|1000|116.7683|99.91648|-8.35191E-15|-1.48065|00008C5A|0
     * 15|40016420|Titan|2B6B|Rock Throw|1032B65A|Zengoku Mustard|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|45764|54967|10000|10000|0|1000|96.73949|114.1539|-0.001052974|-1.584579|3155300|4607480|10000|10000|0|1000|100|86|-1.4E-12|-4.792213E-05|00008C5B|0
     * @param {*} param0 data
     * @returns false | void
     */
    const gaolHandle = async ({ data }) => {
        const rawLine = data.rawLine
        const { isGaolLog, getNameFromRaw, getPlayerFromRaw } = OverlayPlugin
        if (!isGaolLog(rawLine)) return

        // fix players not update
        // note: callback to context didn't work.
        await fetchUserConfig()
        const nplayers = playersRef.current
        const [i, isFound] = getPlayerFromRaw(nplayers, rawLine)
        if (!isFound) {
            cleanState()
            const name = getNameFromRaw(rawLine)
            if (name) {
                setErrMsg(`${name} isn't in the party.`)
            }
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
            setErrMsg('')
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
            <OverlayContext.Provider value={{ players, mei, order, fetchUserConfig, errMsg }}>{children}</OverlayContext.Provider>
        </>
    )
}

export default Overlay