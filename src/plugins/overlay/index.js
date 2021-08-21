import DefaultGaolConfig from '../../config/gaol'

const regex = DefaultGaolConfig.gaolRegex
const regexTest = DefaultGaolConfig.testRegex

/**
 * Must import Overlay Plugin CDN
 */
export const boostrap = ({ gaolHandle }) => {
    try {
        // Start OverlayPlugin
        window.addOverlayListener("LogLine", (e) => gaolHandle({ data: e }));
        window.startOverlayEvents();
        console.log("Started Overlay plugin")
    } catch (e) {
        console.error("Must import Overlay Plugin CDN")
        console.error(e)
    }
}

/**
 * Issue: Cannot use global "g" flag in Regex because will use lastIndex
 * So, testing will be wrong result in some case.
 * var re = /^a/g;
 * re.test("ab") // true, lastIndex was 0
 * re.test("ab") // false, lastIndex was 1
 * https://stackoverflow.com/a/6891667
 * 
 * @param {String} str rawLine
 * @returns Array
 */
export const isGaolLog = (str) => regex.test(str) || regexTest.test(str)

export const getPlayerFromRaw = (players, rawLine) => {
    const i = players.findIndex(name => rawLine.includes(name))
    return [players[i], i, i > -1] // player name, index, is found
}

export const getGaolOrderByMe = (me, gaoled) => {
    let order = -1
    gaoled.sort(sortByASC)
    order = gaoled.findIndex(e => e === me) + 1
    return [order, order > -1]
}

const sortByASC = (a, b) => a - b