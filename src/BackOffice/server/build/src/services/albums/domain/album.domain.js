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
exports.EAlbumStatusTranslate = exports.EAlbumStatus = void 0;
var album_exception_1 = __importDefault(require("./album.exception"));
var song_domain_1 = __importDefault(require("./song.domain"));
var song_exception_1 = __importDefault(require("./song.exception"));
var domain_1 = require("../../shared/domain");
var EAlbumStatus;
(function (EAlbumStatus) {
    EAlbumStatus[EAlbumStatus["Pending"] = 0] = "Pending";
    EAlbumStatus[EAlbumStatus["InLab"] = 1] = "InLab";
    EAlbumStatus[EAlbumStatus["Closed"] = 2] = "Closed";
    EAlbumStatus[EAlbumStatus["Canceled"] = 3] = "Canceled";
})(EAlbumStatus = exports.EAlbumStatus || (exports.EAlbumStatus = {}));
exports.EAlbumStatusTranslate = (_a = {},
    _a[EAlbumStatus.Pending] = 'Pending',
    _a[EAlbumStatus.InLab] = 'InLab',
    _a[EAlbumStatus.Closed] = 'Closed',
    _a[EAlbumStatus.Canceled] = 'Canceled',
    _a);
var Album = /** @class */ (function (_super) {
    __extends(Album, _super);
    function Album(id, name, description, author, tags) {
        var _this = _super.call(this) || this;
        var registerDate = new Date();
        _this._id = id;
        _this._name = name;
        _this._description = description;
        _this._author = author;
        _this._tags = tags;
        _this._registerDate = registerDate;
        _this._songs = [];
        _this._audit = domain_1.Audit.Create(_this._author.authorId);
        _this._status = EAlbumStatus.Pending;
        return _this;
    }
    Object.defineProperty(Album.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "registerDate", {
        get: function () {
            return this._registerDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "author", {
        get: function () {
            return this._author;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "audit", {
        get: function () {
            return this._audit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "songs", {
        get: function () {
            return this._songs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Album.Create = function (id, name, description, author, tags) {
        return new Album(id, name, description, author, tags);
    };
    Album.prototype.Promote = function () {
        if (this._status !== EAlbumStatus.Pending)
            this.StatusChangeException(EAlbumStatus.InLab);
        this._status = EAlbumStatus.InLab;
        this._audit = this._audit.Update(this._author.authorId);
    };
    Album.prototype.Cancel = function () {
        if (this._status !== EAlbumStatus.InLab &&
            this._status !== EAlbumStatus.Pending)
            this.StatusChangeException(EAlbumStatus.Canceled);
        this._status = EAlbumStatus.Canceled;
        this._audit = this._audit.Update(this._author.authorId);
    };
    Album.prototype.AddTag = function (tag) {
        if (this.ExistsTag(tag))
            throw new album_exception_1.default("Tag ".concat(tag, " exists"));
        this._tags.push(tag);
    };
    Album.prototype.RemoveTag = function (tag) {
        if (!this.ExistsTag(tag))
            throw new album_exception_1.default("Tag ".concat(tag, " does not exists"));
        this._tags.splice(this._tags.findIndex(function (p) { return p === tag; }), 1);
    };
    Album.prototype.AddSong = function (id, name, description, duration, durationFormatted, tags, author) {
        if (this.ExistsSong(name))
            throw new song_exception_1.default("Song ".concat(name, " exists"));
        var song = song_domain_1.default.Create(id, name, description, duration, durationFormatted, tags, author);
        this._songs.push(song);
    };
    Album.prototype.RemoveSong = function (song) {
        var name = song.name;
        if (!this.ExistsSong(name))
            throw new album_exception_1.default("Song ".concat(name, " does not exists"));
        this._songs.splice(this._songs.findIndex(function (p) { return p.name.toLowerCase() === name.toLowerCase(); }), 1);
    };
    Album.prototype.ExistsTag = function (tag) {
        var _a;
        return ((_a = this._tags.find(function (p) { return p.toLowerCase() === tag.toLowerCase(); }) !== '') !== null && _a !== void 0 ? _a : false);
    };
    Album.prototype.ExistsSong = function (name) {
        return this._songs.find(function (p) { return p.name.toLowerCase() === name.toLowerCase(); })
            ? true
            : false;
    };
    Album.prototype.StatusChangeException = function (albumStatusToChange) {
        throw new album_exception_1.default("Is not possible to change the album status from ".concat(exports.EAlbumStatusTranslate[this._status], " to ").concat(exports.EAlbumStatusTranslate[albumStatusToChange]));
    };
    return Album;
}(domain_1.AggregateRoot));
exports.default = Album;
