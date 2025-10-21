import { ONEDAY_CONFIG } from "../onedayConfig/OneDayApiConfig";
const { mainUrl, Authorization, appId } = ONEDAY_CONFIG();
const Info = {
  mainUrl: mainUrl,
  Authorization,
  appId,
};

export const InfoConfig = () => {
  return Info;
};
