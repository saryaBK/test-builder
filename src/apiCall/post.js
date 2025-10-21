import { InfoConfig } from "../api/api_config";
import { post } from "../api/post";
const { appId } = InfoConfig();

export const getAllPages = async ({ sendData }) => {
  return await post({
    path:
      `item_data/advanced_search?model=wsb_pages&field_name=1&by_field_code=1&result_structure_short=1&system_fields=1&language=en&` +
      `item_data_fields=__object__,related_variables,related_childrens[__object__,properties[__object__],related_events[__object__,to_page[page_name,item_model_id,id,show_in_mobile_bar]],items[__object__],link_to_page[id,page_name,show_in_mobile_bar]]`,
    sendData: sendData,
  });
};

export const postAddNewModelItem = async ({ sendData, model_id }) => {
  return await post({
    path: `item_data?model=${model_id}&ignore_container=1&by_field_code=1`,
    sendData,
  });
};

export const postLogin = async ({ sendData }) => {
  return await post({
    path: `sign_in_guest`,
    sendData: {
      ...sendData,
    },
    sendRes: true,
  });
};

export const postSignup = async ({ sendData }) => {
  return await post({
    path: `sign_up_guest`,
    sendData: {
      ...sendData,
    },
    sendRes: true,
  });
};
