"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAssemblerQueryService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const InjectAssemblerQueryService = (AssemblerClass) => common_1.Inject(helpers_1.getAssemblerQueryServiceToken(AssemblerClass));
exports.InjectAssemblerQueryService = InjectAssemblerQueryService;
//# sourceMappingURL=inject-assembler-query-service.decorator.js.map