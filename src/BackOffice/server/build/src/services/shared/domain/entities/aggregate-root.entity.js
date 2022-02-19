"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
var AggregateRoot = /** @class */ (function () {
    function AggregateRoot() {
        var _this = this;
        this.DomainEvents = function () { return _this.domainEvents; };
        this.AddDomainEvent = function (event) {
            _this.domainEvents.push(event);
        };
        this.RemoveDomainEvent = function (event) {
            var index = _this.domainEvents.indexOf(event);
            if (index === -1)
                return;
            _this.domainEvents.splice(_this.domainEvents.indexOf(event), 1);
        };
        this.ClearDomainEvents = function () {
            _this.domainEvents = [];
        };
        this.domainEvents = [];
    }
    return AggregateRoot;
}());
exports.AggregateRoot = AggregateRoot;
