import RegexConfig from '../../config/regex'

const regex = RegexConfig.gaolRegex
const regexTest = RegexConfig.testRegex
const nameRegex = RegexConfig.nameRegex
const testNameRegex = RegexConfig.testNameRegex



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
  return [i, i > -1] // player name, index, is found
}

export const getGaolOrderByMe = (me, gaoled) => {
  let order = -1
  let arr = gaoled.map(i => i)
  arr.sort(sortByASC)
  order = arr.findIndex(e => e === me) + 1
  return [order, order > -1]
}

export const sortByASC = (a, b) => a - b

export const getNameFromRaw = (rawLine) => {
  let match = rawLine.match(nameRegex)
  let testMatch = rawLine.match(testNameRegex)
  if (match) {
    const name = match[0].split('|').pop()
    return name
  } else if (testMatch) {
    const name = testMatch[0].split('-').pop()
    return name
  }
  return null
}