import j2s from "joi-to-swagger";
import { createMemberSchema } from "../validations/member.schema";

// Convert to JSON Schema
export const createMemberJsonSchema = j2s(createMemberSchema).swagger;

// A registry mapping route + method to JSON schema
export const routeSchemas = {
  "POST /api/v1/members": {
    body: createMemberJsonSchema,
    // Optionally response schemas...
  },
  // Add other routes here
};
