"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateId = exports.EntityId = void 0;
var _1 = require(".");
var base_valueobject_1 = require("../valueobjects/base.valueobject");
var EntityId = /** @class */ (function (_super) {
    __extends(EntityId, _super);
    function EntityId(value) {
        var _this = this;
        if (!value)
            throw new _1.InvalidArgumentException('the id cannot be null');
        _this = _super.call(this, value) || this;
        return _this;
    }
    return EntityId;
}(base_valueobject_1.ValueObject));
exports.EntityId = EntityId;
var AggregateId = /** @class */ (function (_super) {
    __extends(AggregateId, _super);
    function AggregateId(value) {
        return _super.call(this, value) || this;
    }
    AggregateId.From = function (value) {
        return new AggregateId(value);
    };
    return AggregateId;
}(EntityId));
exports.AggregateId = AggregateId;
