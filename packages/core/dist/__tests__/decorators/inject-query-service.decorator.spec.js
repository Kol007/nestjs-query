"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const src_1 = require("../../src");
describe('@InjectQueryService', () => {
    class TestEntity {
    }
    it('call inject with the correct key', async () => {
        let TestService = class TestService {
            constructor(service) {
                this.service = service;
            }
        };
        TestService = tslib_1.__decorate([
            common_1.Injectable(),
            tslib_1.__param(0, src_1.InjectQueryService(TestEntity)),
            tslib_1.__metadata("design:paramtypes", [Object])
        ], TestService);
        const noopQueryService = new src_1.NoOpQueryService();
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                TestService,
                {
                    provide: src_1.getQueryServiceToken(TestEntity),
                    useValue: noopQueryService,
                },
            ],
        }).compile();
        const testService = moduleRef.get(TestService);
        expect(testService).toBeInstanceOf(TestService);
        expect(testService.service).toBe(noopQueryService);
    });
});
//# sourceMappingURL=inject-query-service.decorator.spec.js.map