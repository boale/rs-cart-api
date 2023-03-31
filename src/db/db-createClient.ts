import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// import { REGION } from "../../constants";

const ddbClient = new DynamoDBClient({ region: 'us-east-1' });
export { ddbClient };

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);