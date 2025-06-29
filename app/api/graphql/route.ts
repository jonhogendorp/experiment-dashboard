import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@/lib/generated/prisma";
import { gql } from "graphql-tag";

const prisma = new PrismaClient();

const typeDefs = gql`
	type Subscription {
		id: Int!
		name: String!
		price: Float!
		renewalDate: String!
		category: String
	}

	type Query {
		subscriptions: [Subscription!]!
		subscription(id: Int!): Subscription
	}

	type Mutation {
		addSubscription(
			name: String!
			price: Float!
			renewalDate: String!
			category: String
		): Subscription!
		updateSubscription(
			id: Int!
			name: String
			price: Float
			renewalDate: String
			category: String
		): Subscription!
		deleteSubscription(id: Int!): Boolean!
	}
`;

const resolvers = {
	Query: {
		subscriptions: async () => prisma.subscription.findMany(),
		subscription: async (_parent: unknown, args: { id: number }) =>
			prisma.subscription.findUnique({ where: { id: args.id } }),
	},
	Mutation: {
		addSubscription: async (
			_parent: unknown,
			args: {
				name: string;
				price: number;
				renewalDate: string;
				category?: string;
			}
		) => {
			return prisma.subscription.create({ data: args });
		},
		updateSubscription: async (
			_parent: unknown,
			args: {
				id: number;
				name?: string;
				price?: number;
				renewalDate?: string;
				category?: string;
			}
		) => {
			const { id, ...data } = args;
			return prisma.subscription.update({ where: { id }, data });
		},
		deleteSubscription: async (_parent: unknown, args: { id: number }) => {
			await prisma.subscription.delete({ where: { id: args.id } });
			return true;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

export const dynamic = "force-dynamic";

export const POST = startServerAndCreateNextHandler<NextRequest>(server);
