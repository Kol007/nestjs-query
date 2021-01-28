"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBeforeCursor = exports.isForwardPaging = exports.isBackwardPaging = void 0;
function isBackwardPaging(cursor) {
    return typeof cursor.last !== 'undefined';
}
exports.isBackwardPaging = isBackwardPaging;
function isForwardPaging(cursor) {
    return !isBackwardPaging(cursor);
}
exports.isForwardPaging = isForwardPaging;
function hasBeforeCursor(cursor) {
    return isBackwardPaging(cursor) && !!cursor.before;
}
exports.hasBeforeCursor = hasBeforeCursor;
//# sourceMappingURL=helpers.js.map