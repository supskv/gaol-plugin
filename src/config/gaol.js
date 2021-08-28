

const config = {
    players: [],
    meIndex: -1,
    countMatch: 3,
    message: {
        nogaol: "Eating Titan's ass",
        gaol1: "1",
        gaol2: "2",
        gaol3: "3",
    },
    gaolLTE: Math.max(0, process.env.REACT_APP_GAOL_LTE || 5000),
    gaolResetLTE: Math.max(0, process.env.REACT_APP_GAOL_RESET || 10000),
}

export default config