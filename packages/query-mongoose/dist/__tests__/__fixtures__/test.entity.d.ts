import { Document, Types } from 'mongoose';
export declare class TestEntity extends Document {
    stringType: string;
    boolType: boolean;
    numberType: number;
    dateType: Date;
    testReference?: Types.ObjectId;
    testReferences?: Types.ObjectId[];
}
export declare const TestEntitySchema: import("mongoose").Schema<any>;
