import * as localForage from "localforage"

const store = localForage.createInstance({
    name: "gaoloverlay"
});

export default store