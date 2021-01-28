"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeObjectTypeSDL = exports.connectionObjectTypeWithTotalCountSDL = exports.connectionObjectTypeSDL = exports.noPagingQueryArgsFilterRequiredTypeSDL = exports.noPagingQueryArgsTypeSDL = exports.offsetQueryArgsFilterRequiredTypeSDL = exports.offsetQueryArgsTypeSDL = exports.cursorQueryArgsFilterRequiredTypeSDL = exports.cursorQueryArgsTypeSDL = exports.sortingInputTypeSDL = exports.pageInfoObjectTypeSDL = exports.pagingInputTypeSDL = exports.subscriptionFilterInputTypeSDL = exports.deleteFilterInputTypeSDL = exports.updateFilterInputTypeSDL = exports.filterRequiredFieldInputTypeSDL = exports.filterAllowedComparisonsInputTypeSDL = exports.filterInputTypeSDL = exports.relationsInputTypeSDL = exports.relationInputTypeSDL = exports.mutationArgsTypeSDL = exports.deleteManyInputTypeSDL = exports.deleteOneInputTypeSDL = exports.updateManyInputTypeSDL = exports.updateOneInputTypeSDL = exports.createManyInputTypeSDL = exports.createOneInputTypeSDL = exports.updateManyResponseTypeSDL = exports.deleteManyResponseTypeSDL = exports.aggregateResponseTypeWithCustomNameSDL = exports.aggregateResponseTypeSDL = exports.aggregateArgsTypeSDL = exports.expectSDL = exports.readGraphql = void 0;
const fs_1 = require("fs");
const graphql_1 = require("graphql");
const path_1 = require("path");
const testing_1 = require("@nestjs/testing");
const graphql_2 = require("@nestjs/graphql");
const getOrCreateSchemaFactory = async () => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [graphql_2.GraphQLSchemaBuilderModule],
    }).compile();
    return moduleRef.get(graphql_2.GraphQLSchemaFactory);
};
const readGraphql = (filePath) => {
    return fs_1.readFileSync(filePath).toString();
};
exports.readGraphql = readGraphql;
// eslint-disable-next-line @typescript-eslint/ban-types
const expectSDL = async (resolvers, sdl) => {
    const sf = await getOrCreateSchemaFactory();
    const schema = await sf.create(resolvers);
    return expect(graphql_1.printSchema(schema)).toEqual(sdl);
};
exports.expectSDL = expectSDL;
exports.aggregateArgsTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './aggregate-args-type.graphql'));
exports.aggregateResponseTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './aggregate-response-type.graphql'));
exports.aggregateResponseTypeWithCustomNameSDL = exports.readGraphql(path_1.resolve(__dirname, './aggregate-response-type-with-custom-name.graphql'));
exports.deleteManyResponseTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './delete-many-response-type.graphql'));
exports.updateManyResponseTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './update-many-response-type.graphql'));
exports.createOneInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './create-one-input-type.graphql'));
exports.createManyInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './create-many-input-type.graphql'));
exports.updateOneInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './update-one-input-type.graphql'));
exports.updateManyInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './update-many-input-type.graphql'));
exports.deleteOneInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './delete-one-input-type.graphql'));
exports.deleteManyInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './delete-many-input-type.graphql'));
exports.mutationArgsTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './mutation-args-type.graphql'));
exports.relationInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './relation-input-type.graphql'));
exports.relationsInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './relations-input-type.graphql'));
exports.filterInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './filter-input-type.graphql'));
exports.filterAllowedComparisonsInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './filter-allowed-comparisons-input-type.graphql'));
exports.filterRequiredFieldInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './filter-required-field-input-type.graphql'));
exports.updateFilterInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './update-filter-input-type.graphql'));
exports.deleteFilterInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './delete-filter-input-type.graphql'));
exports.subscriptionFilterInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './subscription-filter-input-type.graphql'));
exports.pagingInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './paging-input-type.graphql'));
exports.pageInfoObjectTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './page-info-object-type.graphql'));
exports.sortingInputTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './sorting-input-type.graphql'));
exports.cursorQueryArgsTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './cursor-query-args-type.graphql'));
exports.cursorQueryArgsFilterRequiredTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './cursor-query-args-required-filter-type.graphql'));
exports.offsetQueryArgsTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './offset-query-args-type.graphql'));
exports.offsetQueryArgsFilterRequiredTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './offset-query-args-required-filter-type.graphql'));
exports.noPagingQueryArgsTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './no-paging-query-args-type.graphql'));
exports.noPagingQueryArgsFilterRequiredTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './no-paging-query-args-required-filter-type.graphql'));
exports.connectionObjectTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './connection-object-type.graphql'));
exports.connectionObjectTypeWithTotalCountSDL = exports.readGraphql(path_1.resolve(__dirname, './connection-object-type-with-total-count.graphql'));
exports.edgeObjectTypeSDL = exports.readGraphql(path_1.resolve(__dirname, './edge-object-type.graphql'));
//# sourceMappingURL=index.js.map