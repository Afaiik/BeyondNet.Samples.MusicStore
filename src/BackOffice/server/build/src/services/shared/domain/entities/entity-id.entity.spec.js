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
var aggregate_root_entity_1 = require("./aggregate-root.entity");
var entity_id_entity_1 = require("./entity-id.entity");
describe('Entities - AggregateId', function () {
    it('should create an aggregate Id', function () {
        var Foo = /** @class */ (function (_super) {
            __extends(Foo, _super);
            function Foo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Foo;
        }(aggregate_root_entity_1.AggregateRoot));
        var sut = entity_id_entity_1.AggregateId.From('foo');
        expect(sut).toBeDefined();
        expect(sut.props).toBe('foo');
    });
});
