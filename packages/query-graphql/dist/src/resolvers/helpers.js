"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelationAuthFilter = exports.getAuthFilter = exports.createSubscriptionFilter = exports.transformAndValidate = void 0;
const core_1 = require("nestjs-query/packages/core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
/** @internal */
const transformAndValidate = async (TClass, partial) => {
    if (partial instanceof TClass) {
        return partial;
    }
    const transformed = class_transformer_1.plainToClass(TClass, partial);
    const validationErrors = await class_validator_1.validate(transformed, {});
    if (validationErrors.length) {
        throw new common_1.BadRequestException(validationErrors);
    }
    return transformed;
};
exports.transformAndValidate = transformAndValidate;
const createSubscriptionFilter = (InputClass, payloadKey) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (payload, variables) => {
        const { input } = variables;
        if (input) {
            const args = await exports.transformAndValidate(InputClass, input);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const dto = payload[payloadKey];
            return core_1.applyFilter(dto, args.filter || {});
        }
        return true;
    };
};
exports.createSubscriptionFilter = createSubscriptionFilter;
const getAuthFilter = async (authorizer, context) => {
    if (!context || !authorizer) {
        return undefined;
    }
    return authorizer.authorize(context);
};
exports.getAuthFilter = getAuthFilter;
const getRelationAuthFilter = async (relationName, authorizer, context) => {
    if (!context || !authorizer) {
        return undefined;
    }
    return authorizer.authorizeRelation(relationName, context);
};
exports.getRelationAuthFilter = getRelationAuthFilter;
//# sourceMappingURL=helpers.js.map