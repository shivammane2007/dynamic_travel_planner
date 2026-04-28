import serverless from "serverless-http";

import { createServer } from "../../../Frontend/server";

export const handler = serverless(createServer());
