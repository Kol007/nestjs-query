"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongooseQueryServiceProviders = void 0;
const core_1 = require("nestjs-query/packages/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("./services");
// initialize default serializer for documents, this is the type that mongoose returns from queries
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
core_1.AssemblerSerializer((obj) => obj.toObject({ virtuals: true }))(mongoose_2.Document);
function createMongooseQueryServiceProvider(model) {
    return {
        provide: core_1.getQueryServiceToken(model.document),
        useFactory(ModelClass) {
            core_1.AssemblerDeserializer((obj) => new ModelClass(obj))(model.document);
            // eslint-disable-next-line @typescript-eslint/ban-types
            return new services_1.MongooseQueryService(ModelClass);
        },
        inject: [mongoose_1.getModelToken(model.name)],
    };
}
const createMongooseQueryServiceProviders = (models) => {
    return models.map((model) => createMongooseQueryServiceProvider(model));
};
exports.createMongooseQueryServiceProviders = createMongooseQueryServiceProviders;
//# sourceMappingURL=providers.js.map