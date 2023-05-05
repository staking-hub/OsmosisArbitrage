"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
//@ts-nocheck

var registry = [["/osmosis.protorev.v1beta1.MsgSetHotRoutes", _tx.MsgSetHotRoutes], ["/osmosis.protorev.v1beta1.MsgSetDeveloperAccount", _tx.MsgSetDeveloperAccount], ["/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx", _tx.MsgSetMaxPoolPointsPerTx], ["/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock", _tx.MsgSetMaxPoolPointsPerBlock], ["/osmosis.protorev.v1beta1.MsgSetPoolWeights", _tx.MsgSetPoolWeights], ["/osmosis.protorev.v1beta1.MsgSetBaseDenoms", _tx.MsgSetBaseDenoms]];
exports.registry = registry;
var load = function load(protoRegistry) {
  registry.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      typeUrl = _ref2[0],
      mod = _ref2[1];
    protoRegistry.register(typeUrl, mod);
  });
};
exports.load = load;
var MessageComposer = {
  encoded: {
    setHotRoutes: function setHotRoutes(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetHotRoutes",
        value: _tx.MsgSetHotRoutes.encode(value).finish()
      };
    },
    setDeveloperAccount: function setDeveloperAccount(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount",
        value: _tx.MsgSetDeveloperAccount.encode(value).finish()
      };
    },
    setMaxPoolPointsPerTx: function setMaxPoolPointsPerTx(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx",
        value: _tx.MsgSetMaxPoolPointsPerTx.encode(value).finish()
      };
    },
    setMaxPoolPointsPerBlock: function setMaxPoolPointsPerBlock(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock",
        value: _tx.MsgSetMaxPoolPointsPerBlock.encode(value).finish()
      };
    },
    setPoolWeights: function setPoolWeights(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetPoolWeights",
        value: _tx.MsgSetPoolWeights.encode(value).finish()
      };
    },
    setBaseDenoms: function setBaseDenoms(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetBaseDenoms",
        value: _tx.MsgSetBaseDenoms.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    setHotRoutes: function setHotRoutes(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetHotRoutes",
        value: value
      };
    },
    setDeveloperAccount: function setDeveloperAccount(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount",
        value: value
      };
    },
    setMaxPoolPointsPerTx: function setMaxPoolPointsPerTx(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx",
        value: value
      };
    },
    setMaxPoolPointsPerBlock: function setMaxPoolPointsPerBlock(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock",
        value: value
      };
    },
    setPoolWeights: function setPoolWeights(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetPoolWeights",
        value: value
      };
    },
    setBaseDenoms: function setBaseDenoms(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetBaseDenoms",
        value: value
      };
    }
  },
  fromPartial: {
    setHotRoutes: function setHotRoutes(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetHotRoutes",
        value: _tx.MsgSetHotRoutes.fromPartial(value)
      };
    },
    setDeveloperAccount: function setDeveloperAccount(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount",
        value: _tx.MsgSetDeveloperAccount.fromPartial(value)
      };
    },
    setMaxPoolPointsPerTx: function setMaxPoolPointsPerTx(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx",
        value: _tx.MsgSetMaxPoolPointsPerTx.fromPartial(value)
      };
    },
    setMaxPoolPointsPerBlock: function setMaxPoolPointsPerBlock(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock",
        value: _tx.MsgSetMaxPoolPointsPerBlock.fromPartial(value)
      };
    },
    setPoolWeights: function setPoolWeights(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetPoolWeights",
        value: _tx.MsgSetPoolWeights.fromPartial(value)
      };
    },
    setBaseDenoms: function setBaseDenoms(value) {
      return {
        typeUrl: "/osmosis.protorev.v1beta1.MsgSetBaseDenoms",
        value: _tx.MsgSetBaseDenoms.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;