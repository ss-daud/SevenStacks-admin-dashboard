import { AuthOptions } from "next-auth";

import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        maxAge: 3 * 60 * 60,
    },
    session: {
        maxAge: 3 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (typeof user !== "undefined") {
                // @ts-ignore
                return user as JWT;
            }
            return token;
        },

        async session({ session, token, user }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] };
                } else {
                    return p;
                }
            }, {});
            return {
                ...session,
                user: sanitizedToken,
                apiToken: token.apiToken,
            };
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const response = await fetch(
                    `${process.env.INTERNAL_API_URL}/admin/login`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    },
                );

                if (!response.ok) {
                    return null;
                }

                const data = await response.json();

                return {
                    ...data.user,
                    apiToken: data.token,
                };
            },
        }),
    ],
};
