export const ENV = {
  ENDPOINT: import.meta.env.MK_ENDPOINT,
  PROJECT_ID: import.meta.env.MK_PROJECT_ID,
  DATABASE_ID: import.meta.env.MK_DATABASE_ID,
  COLLECTION_ID: import.meta.env.MK_COLLECTION_ID,
  IS_DEVELOPMENT: import.meta.env.NODE_ENV === "development",
  ROLLBAR_ACCESS_TOKEN: import.meta.env.MK_ROLLBAR_ACCESS_TOKEN,
  ROLLBAR_ENVIRONMENT: import.meta.env.MK_ROLLBAR_ENVIRONMENT,
};
