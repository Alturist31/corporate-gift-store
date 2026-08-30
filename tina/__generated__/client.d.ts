import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:9001/graphql', token: 'undefined', queries,  });
export default client;
  