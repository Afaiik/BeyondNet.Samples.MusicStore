"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlbumCreatedDomainEvent = /** @class */ (function () {
    function AlbumCreatedDomainEvent(id, name, description, registerDate, author, tags) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.registerDate = registerDate;
        this.author = author;
        this.tags = tags;
    }
    return AlbumCreatedDomainEvent;
}());
exports.default = AlbumCreatedDomainEvent;
