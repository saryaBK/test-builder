import { put } from "../api/put";

export const putAddNewModelItem = async ({ sendData, model_id, itemId }) => {
  return await put({
    path: `item_data/${itemId}?model=${model_id}&ignore_container=1&by_field_code=1`,
    sendData,
  });
};
