"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
var uuid_1 = require("uuid");
var DomainEvent = /** @class */ (function () {
    function DomainEvent(eventName, aggregateId, eventId, occurredOn) {
        this.aggregateId = aggregateId;
        this.eventId = eventId || (0, uuid_1.v4)();
        this.occurredOn = occurredOn || new Date();
        this.eventName = eventName;
    }
    return DomainEvent;
}());
exports.DomainEvent = DomainEvent;
