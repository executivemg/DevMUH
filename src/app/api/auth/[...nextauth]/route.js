import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/db/connect";
import User from "@/models/UserModel";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					connect();
					const user = await User.findOne({ email });
					const userPass = await bcrypt.compare(password, user.password);

					if (!user) {
						return false;
					}

					if (!userPass) {
						return false;
					}

					return user;
				} catch (error) {
					console.error("Error authorizing user:", error.message);
					return false;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.id = token.id;
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
