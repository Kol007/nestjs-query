/// <reference path="../../../src/types/mongoose-delete.d.ts" />
import { Document, Types } from 'mongoose';
export declare class TestReference extends Document {
    referenceName: string;
    testEntity?: Types.ObjectId;
}
export declare const TestReferenceSchema: import("mongoose").Schema<any>;
