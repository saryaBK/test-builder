import { InfoConfig } from "./api_config";
import i18next from "i18next";

const { mainUrl, jobsConfig } = InfoConfig();

export const del = async ({ path, sendData, isJobs }) => {
  var headers = {};
  var s_id = window.localStorage.getItem("s_id");
  var jwt = window.localStorage.getItem("jwt");
  if (s_id) {
    headers.s_id = s_id;
    headers.sid = s_id;
  }
  if (jwt) {
    headers.jwt = jwt;
  }
  if (sendData) {
    headers["Content-Type"] = "application/json";
  }
  try {
    const res = await fetch(`${isJobs ? jobsConfig : mainUrl}${path}`, {
      headers: headers,
      method: "DELETE",
      ...(sendData
        ? {
            body: JSON.stringify(sendData),
            credentials: "omit",
          }
        : {}),
    });

    const data = await res.json();
    if (!res.ok) {
      if (data.meta && data.meta.errors) {
        Object.keys(data.meta.errors).map((err) => {});
      } else {
      }

      return null;
    }

    return { res, data };
  } catch (e) {
    return null;
  }
};
