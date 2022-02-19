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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
var valueobjects_1 = require("../valueobjects");
var Audit = /** @class */ (function (_super) {
    __extends(Audit, _super);
    function Audit(props) {
        var _a, _b;
        var _this = _super.call(this, props) || this;
        _this._createdOn = props.CreatedOn;
        _this._createdBy = props.CreatedBy;
        _this._updatedOn = (_a = props.UpdatedOn) !== null && _a !== void 0 ? _a : null;
        _this._updatedBy = (_b = props.UpdatedBy) !== null && _b !== void 0 ? _b : null;
        _this._timestamp = props.Timestamp;
        return _this;
    }
    Audit.prototype.CreatedOn = function () {
        return this._createdOn;
    };
    Audit.prototype.CreatedBy = function () {
        return this._createdBy;
    };
    Audit.prototype.UpdateOn = function () {
        var _a;
        return (_a = this._updatedOn) !== null && _a !== void 0 ? _a : null;
    };
    Audit.prototype.UpdatedBy = function () {
        var _a;
        return (_a = this._updatedBy) !== null && _a !== void 0 ? _a : '';
    };
    Audit.Create = function (createdBy) {
        var props = {
            CreatedOn: new Date(),
            CreatedBy: createdBy,
            UpdatedOn: null,
            UpdatedBy: '',
            Timestamp: +new Date()
        };
        return new Audit(__assign({}, props));
    };
    Audit.prototype.Update = function (updatedBy) {
        this._updatedBy = updatedBy;
        this._updatedOn = new Date();
        this._timestamp = +new Date();
        return this;
    };
    return Audit;
}(valueobjects_1.ValueObject));
exports.Audit = Audit;
