

export const getInitialJsonXML = () => {
  let json = {
    declaration: {
      attributes: {
        version: "1.0",
        encoding: "utf-8",
        standalone: "yes"
      }
    },
    elements: [],
  }

  return json
}

export const array2PriorityJsonXML = (arr) => {
  let json = getInitialJsonXML()
  let playerElements = arr.map(item => {
    return {
      type: "element",
      name: "Player",
      elements: [{ type: "text", text: item }]
    }
  })
  json.elements.push({
    type: "element",
    name: "Priority",
    elements: playerElements,
  })
  return json
}