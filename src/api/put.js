import { getLocalStorage } from "../utility/get";
import { showToast } from "../utility/messages";
import { InfoConfig } from "./api_config";

const { mainUrl, appId, Authorization } = InfoConfig();

export const put = async ({ path, sendData, noAppId }) => {
  var headers = {
    Authorization,
    "Content-Type": "application/json",
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
        headers: headers,
        method: "PUT",
        body: JSON.stringify(sendData),
        credentials: "omit",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      if (
        data?.meta &&
        data?.meta?.errors &&
        typeof data?.meta?.errors == "object"
      ) {
        Object.keys(data?.meta?.errors)?.map((key) => {
          showToast({
            type: "error",
            text1: `${key}: ${data?.meta?.errors[key]}`,
          });
        });
      } else if (typeof data?.meta?.errors == "string") {
      } else {
        showToast({
          type: "error",
          text1: `${data?.meta?.errors}`,
        });
      }

      return null;
    }

    return { data, res };
  } catch (e) {
    return null;
  }
};
