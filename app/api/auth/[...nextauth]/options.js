import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { userId, name, email, role, loginId } = credentials;
        const user = {
          userId: userId,
          loginId: loginId,
          name: name,
          email: email,
          role: role,
        };
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
        token.loginId = user.loginId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.role = token.role;
        session.user.loginId = token.loginId;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/",
  },
};
