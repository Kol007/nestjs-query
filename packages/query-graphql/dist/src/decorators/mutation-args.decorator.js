"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationArgs = void 0;
const hook_args_decorator_1 = require("./hook-args.decorator");
const MutationArgs = (HookArgsClass, hook) => {
    if (!hook) {
        return hook_args_decorator_1.HookArgs(HookArgsClass);
    }
    return hook_args_decorator_1.HookArgs(HookArgsClass, (args, context) => Object.assign(args, { input: hook(args.input, context) }));
};
exports.MutationArgs = MutationArgs;
//# sourceMappingURL=mutation-args.decorator.js.map