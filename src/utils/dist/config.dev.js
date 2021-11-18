"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iosHeaders = exports.baseHeaders = exports.baseUrl = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var baseUrl = process.env.REACT_APP_REST_API_URL;
exports.baseUrl = baseUrl;
var mlUrl = process.env.ML_URL;
var baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
exports.baseHeaders = baseHeaders;
var iosHeaders = {
  'Cache-Control': 'no-cache'
};
exports.iosHeaders = iosHeaders;