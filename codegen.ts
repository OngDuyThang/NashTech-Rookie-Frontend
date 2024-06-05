import { CodegenConfig } from "@graphql-codegen/cli";

const method = process.env.NEXT_PUBLIC_API_METHOD
const host = process.env.NEXT_PUBLIC_API_HOST
const productPort = process.env.NEXT_PUBLIC_API_PRODUCT_PORT
const cartPort = process.env.NEXT_PUBLIC_API_CART_PORT
const orderPort = process.env.NEXT_PUBLIC_API_ORDER_PORT

const config: CodegenConfig = {
    schema: [
        'http://localhost:3001/graphql',
        'http://localhost:3002/graphql'
    ],
    documents: ['src/**/*.ts', 'src/**/*.tsx'],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    // ignoreNoDocuments: true,
};

export default config;