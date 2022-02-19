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
var domain_1 = require("../../shared/domain");
var FileReference = /** @class */ (function (_super) {
    __extends(FileReference, _super);
    function FileReference(props) {
        var _this = _super.call(this, props) || this;
        _this._name = props.name;
        _this._path = props.path;
        return _this;
    }
    Object.defineProperty(FileReference.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileReference.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    FileReference.Create = function (name, path) {
        return new FileReference({ name: name, path: path });
    };
    return FileReference;
}(domain_1.ValueObject));
exports.default = FileReference;
