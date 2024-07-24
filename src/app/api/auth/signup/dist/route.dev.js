"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _User = _interopRequireDefault(require("@/models/User"));

var _auth = require("@/utils/auth");

var _connectDB = _interopRequireDefault(require("@/utils/connectDB"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var _ref, email, password, existigUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _connectDB["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(req.json());

        case 5:
          _ref = _context.sent;
          email = _ref.email;
          password = _ref.password;

          if (!(!email || !password)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "Enter email or password please",
            status: 422
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 12:
          existigUser = _context.sent;

          if (!existigUser) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "you have signed up",
            status: 422
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap((0, _auth.hashPassword)(password));

        case 17:
          hashedPassword = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(_User["default"].create({
            email: email,
            password: hashedPassword
          }));

        case 20:
          newUser = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "user is created",
            status: 201
          }));

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.log(error);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "server problem is happend"
          }, {
            status: 500
          }));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
}