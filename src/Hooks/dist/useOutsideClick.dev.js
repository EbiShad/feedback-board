"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useOutSideClick;

var _react = require("react");

function useOutSideClick(handler) {
  var listenCapturing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return function () {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);
  return ref;
}