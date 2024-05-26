import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_CLIENT_API_URL;

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials;
        console.log("Authorize called");
        console.log("Username", username);
        console.log("Password", password);

        try {
          // const res = await fetch(`${apiUrl}/authentications`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ username, password }),
          // });
          // if (!res.ok) {
          //   throw new Error("Authentication Failed");
          // }

          // const user = await res.json();
          // if (!user) {
          //   throw new Error("Failed to parse JSON response");
          // }

          const user = {
            id: "1",
            name: "John Smith",
            email: "test@test.com",
          };

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Error during authentication");
        }
      },
    }),
  ],
  callbacks: {
    // TODO: Implement JWT and Session callbacks
    async jwt({ token, user }) {
      console.log("JWT called");
      console.log("User", user);
      console.log("Token", token);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session called");
      console.log("Session", session);
      console.log("Token", token);
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
