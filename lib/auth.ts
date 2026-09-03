// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { query } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // مثال لـ Email / Password
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        // Query مباشرة بـ SQL لـ Postgres
        const res = await query('SELECT * FROM users WHERE email = $1', [credentials.email]);
        const user = res.rows[0];

        if (!user) return null;

        // تحذير: فـ الحقيقة خاصك تقارن Password مع Hash باستعمال bcrypt
        if (user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // التأكد واش المستخدم كاين فـ Postgres، إذا ماكاينش كنكرييوه
          const res = await query('SELECT * FROM users WHERE email = $1', [user.email]);
          if (res.rows.length === 0) {
            await query(
              'INSERT INTO users (name, email, image) VALUES ($1, $2, $3)',
              [user.name, user.email, user.image]
            );
          }
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});