
export const SUBSCRIPTION_HOST = 'ws://localhost:3040/subscriptions';
export const GRAPHQL_HOST = 'http://localhost:3030/graphql';

export const dev = process.env.NODE_ENV !== 'production';
export const appPath = process.env.NODE_ENV === 'production' ? './build/app' : './';

export const HOST_NAME = process.env.HOST_NAME || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;
export const HOST = (process.browser && window.location.host) || `${HOST_NAME}:${APP_PORT}`;