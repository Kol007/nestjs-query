"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntitySchema = exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let TestEntity = class TestEntity extends mongoose_1.Document {
};
tslib_1.__decorate([
    mongoose_2.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "stringType", void 0);
tslib_1.__decorate([
    mongoose_2.Prop({ required: true }),
    tslib_1.__metadata("design:type", Boolean)
], TestEntity.prototype, "boolType", void 0);
tslib_1.__decorate([
    mongoose_2.Prop({ required: true }),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "numberType", void 0);
tslib_1.__decorate([
    mongoose_2.Prop({ required: true }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "dateType", void 0);
tslib_1.__decorate([
    mongoose_2.Prop({ type: mongoose_1.SchemaTypes.ObjectId, ref: 'TestReference' }),
    tslib_1.__metadata("design:type", mongoose_1.Types.ObjectId)
], TestEntity.prototype, "testReference", void 0);
tslib_1.__decorate([
    mongoose_2.Prop([{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'TestReference' }]),
    tslib_1.__metadata("design:type", Array)
], TestEntity.prototype, "testReferences", void 0);
TestEntity = tslib_1.__decorate([
    mongoose_2.Schema()
], TestEntity);
exports.TestEntity = TestEntity;
exports.TestEntitySchema = mongoose_2.SchemaFactory.createForClass(TestEntity);
exports.TestEntitySchema.virtual('virtualTestReferences', {
    ref: 'TestReference',
    localField: '_id',
    foreignField: 'testEntity',
});
//# sourceMappingURL=test.entity.js.map