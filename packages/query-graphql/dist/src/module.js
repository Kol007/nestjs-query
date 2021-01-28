"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryGraphQLModule = void 0;
const core_1 = require("nestjs-query/packages/core");
const providers_1 = require("./providers");
const subscription_1 = require("./subscription");
class NestjsQueryGraphQLModule {
    static forFeature(opts) {
        var _a;
        const coreModule = core_1.NestjsQueryCoreModule.forFeature({
            assemblers: opts.assemblers,
            imports: opts.imports,
        });
        const pubSubProvider = (_a = opts.pubSub) !== null && _a !== void 0 ? _a : this.defaultPubSubProvider();
        const DTOClasses = opts.resolvers.map((r) => r.DTOClass);
        const resolverProviders = providers_1.createResolvers(opts.resolvers);
        const providers = [...(opts.services || []), ...providers_1.createAuthorizerProviders(DTOClasses)];
        return {
            module: NestjsQueryGraphQLModule,
            imports: [...opts.imports, coreModule],
            providers: [...providers, ...resolverProviders, pubSubProvider],
            exports: [...providers, ...resolverProviders, ...opts.imports, coreModule, pubSubProvider],
        };
    }
    static defaultPubSubProvider() {
        return { provide: subscription_1.pubSubToken(), useValue: subscription_1.defaultPubSub() };
    }
}
exports.NestjsQueryGraphQLModule = NestjsQueryGraphQLModule;
//# sourceMappingURL=module.js.map