

const url = import.meta.env.VITE_DEVELOPMENT == 'true' ? import.meta.env.VITE_LIVE_URL :  import.meta.env.VITE_LOCAL_URL


export default url