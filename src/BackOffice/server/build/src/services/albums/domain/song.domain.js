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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESongStatusTranslate = exports.ESongStatus = void 0;
var domain_1 = require("../../shared/domain");
var file_valueobject_1 = __importDefault(require("./file.valueobject"));
var song_exception_1 = __importDefault(require("./song.exception"));
var ESongStatus;
(function (ESongStatus) {
    ESongStatus[ESongStatus["Pending"] = 0] = "Pending";
    ESongStatus[ESongStatus["InLab"] = 1] = "InLab";
    ESongStatus[ESongStatus["Canceled"] = 2] = "Canceled";
    ESongStatus[ESongStatus["Closed"] = 3] = "Closed";
})(ESongStatus = exports.ESongStatus || (exports.ESongStatus = {}));
exports.ESongStatusTranslate = (_a = {},
    _a[ESongStatus.Pending] = 'Pending',
    _a[ESongStatus.InLab] = 'InLab',
    _a[ESongStatus.Canceled] = 'Canceled',
    _a[ESongStatus.Closed] = 'Closed',
    _a);
var Song = /** @class */ (function (_super) {
    __extends(Song, _super);
    function Song(id, name, description, duration, durationFormatted, tags, author) {
        var _this = _super.call(this) || this;
        var registerDate = new Date();
        _this._id = id;
        _this._name = name;
        _this._description = description;
        _this._registerDate = registerDate;
        _this._duration = duration;
        _this._tags = tags;
        _this._author = author;
        _this._files = [];
        _this._audit = domain_1.Audit.Create(_this._author.authorId);
        _this._status = ESongStatus.Pending;
        return _this;
    }
    Object.defineProperty(Song.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "registerDate", {
        get: function () {
            return this._registerDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "author", {
        get: function () {
            return this._author;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "files", {
        get: function () {
            return this._files;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "audit", {
        get: function () {
            return this._audit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Song.Create = function (id, name, description, duration, durationFormatted, tags, author) {
        return new Song(id, name, description, duration, durationFormatted, tags, author);
    };
    Song.prototype.Promote = function () {
        if (this._status !== ESongStatus.Pending)
            this.StatusChangeException(ESongStatus.InLab);
        this._status = ESongStatus.InLab;
        this._audit = this._audit.Update(this._author.authorId);
    };
    Song.prototype.StatusChangeException = function (songStatusToChange) {
        throw new song_exception_1.default("Is not possible to change the album status from ".concat(exports.ESongStatusTranslate[this._status], " to ").concat(exports.ESongStatusTranslate[songStatusToChange]));
    };
    Song.prototype.Cancel = function () {
        if (this._status !== ESongStatus.InLab &&
            this._status !== ESongStatus.Pending)
            this.StatusChangeException(ESongStatus.Canceled);
        this._status = ESongStatus.Canceled;
        this._audit = this._audit.Update(this._author.authorId);
    };
    Song.prototype.ExistsTag = function (tag) {
        var _a;
        return ((_a = this._tags.find(function (p) { return p.toLowerCase() === tag.toLowerCase(); }) !== '') !== null && _a !== void 0 ? _a : false);
    };
    Song.prototype.AddTag = function (tag) {
        if (this.ExistsTag(tag))
            throw new song_exception_1.default("Tag ".concat(tag, " exists"));
        this._tags.push(tag);
    };
    Song.prototype.RemoveTag = function (tag) {
        if (!this.ExistsTag(tag))
            throw new song_exception_1.default("Tag ".concat(tag, " does not exists"));
        this._tags.splice(this._tags.findIndex(function (p) { return p.toLowerCase() === tag.toLowerCase(); }), 1);
    };
    Song.prototype.AddFile = function (name, path) {
        if (this.ExistsFile(path))
            throw new song_exception_1.default("File ".concat(path, " exists"));
        this._files.push(file_valueobject_1.default.Create(name, path));
    };
    Song.prototype.RemoveFile = function (file) {
        var name = file.name;
        if (!this.ExistsFile(file.name))
            throw new song_exception_1.default("File ".concat(name, " does not exists"));
        this._files.splice(this._files.findIndex(function (p) { return p.path.toLowerCase() === file.path.toLowerCase(); }), 1);
    };
    Song.prototype.ExistsFile = function (path) {
        var _a;
        return ((_a = this._files.find(function (p) { return p.path.toLowerCase() === path.toLowerCase(); }) !==
            null) !== null && _a !== void 0 ? _a : false);
    };
    return Song;
}(domain_1.AggregateRoot));
exports.default = Song;
