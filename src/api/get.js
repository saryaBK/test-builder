import { getLocalStorage } from "../utility/get";
import { showToast } from "../utility/messages";
import { InfoConfig } from "./api_config";

const { mainUrl, appId, Authorization } = InfoConfig();

export const get = async ({ path, sendRes, noMeta, noAppId }) => {
  var headers = {
    Authorization,
  };
  var s_id = await getLocalStorage({ key: "s_id" });
  var jwt = await getLocalStorage({ key: "jwt" });
  if (s_id) {
    headers.s_id = s_id;
  }
  if (jwt) {
    headers.jwt = jwt;
  }
  try {
    const res = await fetch(
      `${`${mainUrl}${!noAppId ? `application/${appId}/` : ""}${path}`}`,
      {
        headers: noMeta ? {} : headers,
        credentials: "omit",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      if (data?.meta?.errors) {
        Object.keys(data?.meta?.errors)?.map((key) => {
          showToast({
            type: "error",
            text1: `${key}: ${data?.meta?.errors[key]}`,
          });
        });
      }

      return null;
    }

    if (sendRes && data) {
      return { res, data };
    } else if (data) {
      return data;
    }
  } catch (e) {
    showToast({ type: "error", text1: "server error" });
    return null;
  }
};
