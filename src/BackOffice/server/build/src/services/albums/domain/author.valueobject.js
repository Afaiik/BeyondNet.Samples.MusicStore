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
var Author = /** @class */ (function (_super) {
    __extends(Author, _super);
    function Author(props) {
        var _this = _super.call(this, props) || this;
        _this._authorId = props.authorId;
        _this._firstName = props.firstName;
        _this._lastName = props.lastName;
        return _this;
    }
    Object.defineProperty(Author.prototype, "authorId", {
        get: function () {
            return this._authorId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Author.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Author.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        enumerable: false,
        configurable: true
    });
    Author.Create = function (authorId, firstName, lastName) {
        return new Author({ authorId: authorId, firstName: firstName, lastName: lastName });
    };
    Author.prototype.FullName = function () {
        return "".concat(this._firstName, ",").concat(this._lastName);
    };
    return Author;
}(domain_1.ValueObject));
exports.default = Author;
