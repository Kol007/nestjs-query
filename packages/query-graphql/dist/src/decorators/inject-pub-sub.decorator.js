"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectPubSub = void 0;
const common_1 = require("@nestjs/common");
const subscription_1 = require("../subscription");
const InjectPubSub = () => common_1.Inject(subscription_1.pubSubToken());
exports.InjectPubSub = InjectPubSub;
//# sourceMappingURL=inject-pub-sub.decorator.js.map