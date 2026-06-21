import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("giglance");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
      },

      companyName: {
        type: "string",
        required: false,
      },

      companySize: {
        type: "string",
        required: false,
      },

      industry: {
        type: "string",
        required: false,
      },

      website: {
        type: "string",
        required: false,
      },

      location: {
        type: "string",
        required: false,
      },

      description: {
        type: "string",
        required: false,
      },

      title: {
        type: "string",
        required: false,
      },

      skills: {
        type: "string",
        required: false,
      },

      linkedin: {
        type: "string",
        required: false,
      },

      portfolio: {
        type: "string",
        required: false,
      },

      experience: {
        type: "string",
        required: false,
      },

      bio: {
        type: "string",
        required: false,
      },
      isSuspended: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
