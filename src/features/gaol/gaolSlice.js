import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserConfig as fetchUserConfigAPI, updateUserConfig as updateUserConfigAPI } from './gaolAPI';
import * as gaolService from './gaolService'
import * as gaolAdaper from './gaolAdapter'

const initialState = {
  number: -1,
  players: [],
  gaoledPlayers: [],
  myNumber: -1,
  nog: 3,
  status: 'ready',
  error: '',
};

const isExpire = (timestamp) => new Date().getTime() > timestamp

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchUserConfig = createAsyncThunk(
  'gaol/fetchUserConfig',
  async () => {
    const config = await fetchUserConfigAPI()
    // The value we return becomes the `fulfilled` action payload
    return config
  }
);

export const gaolSlice = createSlice({
  name: 'gaol',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    order: (state, action) => {
      state.number = action.payload;
    },
    form: (state, action) => {
      state.players = action.payload;
    },
    position: (state, action) => {
      state.myNumber = action.payload;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    appendGaoledPlayer: (state, action) => {
      const iplayer =  action.payload
      
      // filter out gaol that expired.
      // prevent unexpected gaol such as header's gaol
      // wrong case: 5 = healer, [6, 4, 2] = next gaol. Thus, gaol will be [5, 6, 4] instead of [6, 4, 2].
      const gaoled = state.gaoledPlayers.filter(gp => !isExpire(gp.lte))
      // prevent duplicate
      const duplicate = gaoled.find(gp => gp.iplayer === iplayer) !== undefined
      const newItem = { iplayer, lte: new Date().getTime() + 3000 }
      state.gaoledPlayers = !duplicate ? [...gaoled, newItem] : gaoled
      if (duplicate) {
        console.log('Duplicate player on gaol', iplayer)
      }
    },
    resetGaoledPlayer: (state) => {
      state.gaoledPlayers = []
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserConfig.fulfilled, (state, action) => {
        state.status = 'ready';
        state.players = action.payload.players || state.players
        state.myNumber = action.payload.myNumber !== undefined ? action.payload.myNumber : state.myNumber
      });
  },
});

export const { order, form, position, error, appendGaoledPlayer, resetGaoledPlayer } = gaolSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNumber = (state) => state.gaol.number;
export const selectMyNumber = (state) => state.gaol.myNumber;
export const selectPlayers = (state) => state.gaol.players;
export const selectGaoledPlayers = (state) => state.gaol.gaoledPlayers;
export const selectError = (state) => state.gaol.error;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/**
 * 
 * Raw line examples:
 * 15|4001641A|Titan|2B6C|Rock Throw|10334A83|Windie Likesakiii|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|42891|50096|9336|10000|0|1000|97.37081|113.451|-0.01279504|-3.055689|2675710|4476950|0|10000|0|1000|113.7886|86.21142|-1.378858E-12|-0.7854581|00008C59|0
 * 15|4001641B|Titan|2B6C|Rock Throw|10264B3D|Anger Shana|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|75033|75033|10000|10000|0|1000|96.35912|113.5649|-0.002290758|3.081287|2675710|4476950|0|10000|0|1000|116.7683|99.91648|-8.35191E-15|-1.48065|00008C5A|0
 * 15|40016420|Titan|2B6B|Rock Throw|1032B65A|Zengoku Mustard|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|45764|54967|10000|10000|0|1000|96.73949|114.1539|-0.001052974|-1.584579|3155300|4607480|10000|10000|0|1000|100|86|-1.4E-12|-4.792213E-05|00008C5B|0
 * @param {*} param0 data
 * @returns false | void
 */
export const updateGaol = (rawLine) => (dispatch, getState) => {
  const { getNameFromRaw, getPlayerFromRaw } = gaolService
  const players = selectPlayers(getState())
  const [i, isFound] = getPlayerFromRaw(players, rawLine)
  if (!isFound) {
    dispatch(resetGaoledPlayer())
    const name = getNameFromRaw(rawLine)
    if (name) {
      dispatch(error(`${name} isn't in the party.`))
      setTimeout(() => dispatch(error('')), 3000)
    }
    return
  }

  dispatch(appendGaoledPlayer(i))
  dispatch(orderGaol())
}

export const orderGaol = () => (dispatch, getState) => {
  const gaoledPlayers = selectGaoledPlayers(getState())
  if (gaoledPlayers.length === 3) {
    const myNumber = selectMyNumber(getState())
    let [number] = gaolService.getGaolOrderByMe(myNumber, gaoledPlayers.map(gp => gp.iplayer))
    console.log(new Date(), gaoledPlayers, number)

    // tts gaol temp.
    const msg = number || "Eating Titan's ass."
    gaolAdaper.tts(msg)

    setTimeout(() => {
      dispatch(resetGaoledPlayer())
      dispatch(order(-1))
    }, 10000)
    dispatch(order(number))
  }
}

export const updateConfig = ({ players, myNumber }) => async (dispatch) => {
  await updateUserConfigAPI({ players, myNumber })
}

export default gaolSlice.reducer;
