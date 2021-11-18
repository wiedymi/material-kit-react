import {DarkTheme, LightTheme} from 'src/theme';
import {createStore} from 'redux';

const handleTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      return LightTheme;
    }
    localStorage.setItem('theme', 'dark');
    return DarkTheme;
  }
  localStorage.setItem('theme', 'light');
  return LightTheme;
};

const LoadTheme = () => {
  const theme = localStorage.getItem('theme');
  const themeMap = {
    dark: DarkTheme,
    light: LightTheme,
  };
  if (theme) {
    return themeMap[theme];
  }
  return LightTheme;
};

const LoadUser = () => {
  const user = localStorage.getItem('user');
  let userData = {
    "id": null,
    "avatar": null,
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "date_joined": "",
    "groups": []
  }
  if (user) {
    userData = JSON.parse(user);
  }
  return userData;
};

const initialState = {
  isLoggedIn: localStorage.getItem('token'),
  user: LoadUser(),
  usersList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  tattoosList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  audioDetails: null,
  theme: LoadTheme()
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isLoggedIn: localStorage.getItem('token'),
      };
    case 'REMOVE_TOKEN':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isLoggedIn: localStorage.getItem('token')
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: handleTheme()
      };
    case 'SET_USER': {
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };
    }
    case 'SET_USERS_LIST': {
      return {
        ...state,
        usersList: action.usersList
      };
    }
    case 'SET_TATTOOS_LIST': {
      return {
        ...state,
        tattoosList: action.tattoosList
      };
    }
    case 'SAVE_AUDIO': {
      return {
        ...state,
        audioDetails: action.audioDetails
      };
    }
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
