const KEY_USER = 'KEY_USER';
const USER_EXTRA = 'USER_EXTRA';
const JWT = 'TOKEN'


const storage = {
    getUser: () => {
        const user = localStorage.getItem(KEY_USER);
        if(user) {
            return JSON.parse(user);
        }
        return null;
    },
    
    storeUser: (user) => {
        localStorage.setItem(KEY_USER, JSON.stringify(user));
    },

    storeJWT: (jwt) => {
        localStorage.setItem(JWT, JSON.stringify(jwt))
    },

    getJWT: () => {
        const jwt = localStorage.getItem(JWT);
        if(jwt) {
            return JSON.parse(jwt);
        }
        return null;
    },

    storeUserVariableData: (user) => {
        localStorage.setItem(USER_EXTRA, JSON.stringify(user));
    },

    getUserVariableData: () => {
        const user = localStorage.getItem(USER_EXTRA);
        if(user) {
            return JSON.parse(user);
        }
        return null;
    },
    
};

export default storage