import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb.js";

const adminEmails = process.env.MAIL_ADMIN ? process.env.MAIL_ADMIN.split(",") : [];

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Adaptador para MongoDB
  callbacks: {
    session: ({session, token, user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      } else {
        return false;
      }

    },
  },
};
 
export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    return false;
  }
}