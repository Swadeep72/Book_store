import { model, Schema } from "mongoose";

export const timeStampSchema = schema => new Schema(schema, { timestamps: true })
export const mongooseModel = (name, schema) => model(name, schema)