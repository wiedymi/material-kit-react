"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _theme = require("src/theme");

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleTheme = function handleTheme() {
  var theme = localStorage.getItem('theme');

  if (theme) {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      return _theme.LightTheme;
    }

    localStorage.setItem('theme', 'dark');
    return _theme.DarkTheme;
  }

  localStorage.setItem('theme', 'light');
  return _theme.LightTheme;
};

var LoadTheme = function LoadTheme() {
  var theme = localStorage.getItem('theme');
  var themeMap = {
    dark: _theme.DarkTheme,
    light: _theme.LightTheme
  };

  if (theme) {
    return themeMap[theme];
  }

  return _theme.LightTheme;
};

var LoadUser = function LoadUser() {
  var user = localStorage.getItem('user');
  var userData = null;

  if (user) {
    userData = JSON.parse(user);
  }

  return userData;
};

var initialState = {
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

var rootReducer = function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.token);
      return _objectSpread({}, state, {
        isLoggedIn: localStorage.getItem('token')
      });

    case 'REMOVE_TOKEN':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return _objectSpread({}, state, {
        isLoggedIn: localStorage.getItem('token')
      });

    case 'TOGGLE_THEME':
      return _objectSpread({}, state, {
        theme: handleTheme()
      });

    case 'SET_USER':
      {
        localStorage.setItem('user', JSON.stringify(action.user));
        return _objectSpread({}, state, {
          user: action.user
        });
      }

    case 'SET_USERS_LIST':
      {
        return _objectSpread({}, state, {
          usersList: action.usersList
        });
      }

    case 'SET_TATTOOS_LIST':
      {
        return _objectSpread({}, state, {
          tattoosList: action.tattoosList
        });
      }

    case 'SAVE_AUDIO':
      {
        return _objectSpread({}, state, {
          audioDetails: action.audioDetails
        });
      }

    default:
      return state;
  }
};

var store = (0, _redux.createStore)(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var _default = store;
exports["default"] = _default;