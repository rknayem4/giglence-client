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
      companyName: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "client",
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
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },

  baseURL: process.env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
