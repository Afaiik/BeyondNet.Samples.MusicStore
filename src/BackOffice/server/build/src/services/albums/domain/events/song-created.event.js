"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SongCreatedDomainEvent = /** @class */ (function () {
    function SongCreatedDomainEvent(id, name, description, duration, registerDate, author, tags) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.registerDate = registerDate;
        this.author = author;
        this.tags = tags;
    }
    return SongCreatedDomainEvent;
}());
exports.default = SongCreatedDomainEvent;
