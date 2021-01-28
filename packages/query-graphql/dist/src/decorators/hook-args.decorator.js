"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookArgs = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const decorator_utils_1 = require("./decorator.utils");
const helpers_1 = require("../resolvers/helpers");
const HookArgs = (HookArgsClass, ...hooks) => {
    return decorator_utils_1.composeDecorators(graphql_1.Args(), common_1.createParamDecorator(async (data, ctx) => {
        const gqlContext = graphql_1.GqlExecutionContext.create(ctx);
        const args = await helpers_1.transformAndValidate(HookArgsClass, gqlContext.getArgs());
        if (hooks && hooks.length) {
            return hooks.reduce((hookedArgs, hook) => hook ? Object.assign(hookedArgs, hook(hookedArgs, gqlContext.getContext())) : hookedArgs, args);
        }
        return args;
    })());
};
exports.HookArgs = HookArgs;
//# sourceMappingURL=hook-args.decorator.js.map