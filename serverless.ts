import type { AWS } from "@serverless/typescript"
import { join } from "path"
import { config } from "dotenv"

const pathToEnv = join(__dirname, "./.env")
config({ path: pathToEnv })

import cartRoot from  './src/index'
const serverlessConfiguration: AWS = {
    service: "cart-service",
    frameworkVersion: "3",
    plugins: ["serverless-offline","serverless-webpack"], // "serverless-auto-swagger"
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        stage: "dev",
        region: 'eu-west-1',
        profile: "danny",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
            DB_USERNAME: process.env.DB_USERNAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_PORT: process.env.DB_PORT,
            DB_HOST: process.env.DB_HOST,
            DB_NAME: process.env.DB_NAME,
        },
    },
    functions: {
        cartRoot,
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
        // autoswagger: {
        //     typefiles: ["./src/types/index.ts"],
        // },
        webpack: {
            packager: "yarn",
        },
    },
}

module.exports = serverlessConfiguration




   
