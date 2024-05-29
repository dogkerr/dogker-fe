import NextAuth, { User, NextAuthConfig, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn as signInNextAuth } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;

type SignUpData = {
  username: string;
  password: string;
  email: string;
  fullname: string;
};

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      fullname: string;
      username: string;
      email: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    user: {
      id: string;
      fullname: string;
      username: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string;
    refreshToken: string;
    id: string;
    fullname: string;
    username: string;
    email: string;
  }
}

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
        // console.log("Authorize called");
        // console.log("Username", username);
        // console.log("Password", password);

        try {
          const res = await fetch(`${apiUrl}/authentications`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (!res.ok) {
            throw new Error("Authentication Failed");
          }

          const resData = await res.json();
          if (!resData) {
            throw new Error("Failed to parse JSON response");
          }

          const accessToken = resData.data.accessToken;

          const decoded = jwtDecode(accessToken);

          const userId = decoded.sub;

          const userDetailRes = await fetch(`${apiUrl}/users/${userId}`);
          if (!userDetailRes.ok) {
            throw new Error("Failed to fetch user details");
          }

          const userDetailResData = await userDetailRes.json();
          if (!userDetailResData) {
            throw new Error("Failed to parse JSON response");
          }

          resData.data.user = userDetailResData.data;
          resData.data.user.id = userId;

          return resData.data;
        } catch (error) {
          throw new Error(
            `Error during authorization: ${(error as any).message}`
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT called");
      // console.log("User", user);
      // console.log("Token", token);

      // Init token on first sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.user.id;
        token.fullname = user.user.fullname;
        token.username = user.user.username;
        token.email = user.user.email;
      }

      // Refresh token rotation
      const accessToken = token.accessToken;
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      const timeToExpiration = (decoded.exp as number) - currentTime;

      // TODO: Implement helper function to refresh token if API response is TokenExpirationError
      // Jika token akan expire dalam waktu kurang dari 1 hari, refresh token
      if (timeToExpiration < 24 * 60 * 60 * 1000) {
        const res = await fetch(`${apiUrl}/authentications`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });
        const data = await res.json();

        if (res.ok && data) {
          token.accessToken = data.data.accessToken;
        } else {
          throw new Error("JWT Callback error: Failed to refresh token");
        }
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("Session called");
      // console.log("Session", session);
      // console.log("Token", token);

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.id = token.id as string;
      session.user.fullname = token.fullname as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  events: {
    async signOut(message) {
      if ("token" in message) {
        const res = await fetch(`${apiUrl}/authentications`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${message?.token?.accessToken}`,
          },
          body: JSON.stringify({
            refreshToken: message?.token?.refreshToken,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to sign out");
        }
      }
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

export const signUp = async ({
  username,
  password,
  email,
  fullname,
}: SignUpData) => {
  try {
    const res = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, fullname }),
    });

    const data = await res.json();
    if (!data || !res.ok) {
      throw new Error(`Failed to register: ${data.message}`);
    }

    const signInRes = await signInNextAuth("credentials", {
      username,
      password,
      redirect: false,
    });
    if (signInRes && !signInRes.ok) {
      throw new Error("Failed to login after registration");
    }

    return signInRes;
  } catch (error) {
    return { error: (error as any).message };
  }
};
