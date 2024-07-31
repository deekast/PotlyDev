import { ConfigContext } from 'expo/config';
export default ({ config }: ConfigContext) => {
  const appConfig = config;
  appConfig.ios!.googleServicesFile = process.env.GOOGLE_SERVICES_PLIST;
  // console.log(appConfig)
  return {
    ...appConfig,
  };
};