import { get } from "../api/get";
import { post } from "../api/post";
import { getLocalStorage } from "../utility/get";

export const getElementData = async ({ modelId }) => {
  var lang = await getLocalStorage({ key: "lang" });
  return await get({
    path: `item_brief?model=${modelId}&language=${lang}&translate_original=1&field_name=1&result_structure_short=1&is_active=1&api_all_result=1`,
  });
};

export const getModelFields = async ({ modelId }) => {
  return await get({
    path: `field?model=${modelId}&api_fields=__object__,container[__object__],properties[__object__],field_options[__object__],related_relation[__object__]`,
  });
};

export const getSearchItemData = async ({ modelId, currentItem, search }) => {
  return await get({
    path: `item_data/search?model=${modelId}&keyword=${search || ""}${
      currentItem ? `&current_item=${currentItem}` : ""
    }&item_name_fields=1&field_name=1&result_structure_short=1&ignore_container=1`,
  });
};

export const getModelDesign = async ({ model_id }) => {
  return await get({
    path: `model/${model_id}/model_design`,
  });
};

export const getFieldById = async ({ field_id }) => {
  return await get({
    path: `field/${field_id}?api_fields=__object__,properties[__object__],related_relation[__object__],field_options[__object__]`,
  });
};

export const getGridDataByFieldId = async ({ body, modelId, page }) => {
  return await post({
    path: `item_data/advanced_search?system_fields=1&is_active=1&model=${modelId}&field_name=1&result_structure_short=1${
      page ? `&api_limit[page]=${page}` : ""
    }`,
    sendData: body,
  });
};

export const getReportDataById = async ({ reportId, page, filters }) => {
  return await get({
    path: `report/${reportId}/report_data?api_total_count=1&api_limit[page]=${page}&api_limit[count]=10${
      filters ? filters : ""
    }`,
  });
};

export const getreportFieldsById = async ({ reportId }) => {
  return await get({
    path: `report_field?report_id=${reportId}&api_fields=__object__,field[__object__,field_options[__object__],related_relation[__object__]]`,
  });
};

export const getSiteTheme = async () => {
  return await get({
    path: `item_brief?model=builder_config&field_name=1&result_structure_short=1`,
  });
};

export const getPageData = async ({ pageId, modelCode, isTemplateEditor }) => {
  return await get({
    path:
      `item_brief?model=${modelCode}&id=${pageId}&field_name=1&result_structure_short=1&grid_unlimited_rows=1&system_fields=1&item_data_fields=id` +
      `,page_name,show_in_mobile_bar,is_home_page,dropdown_display_types,icon,related_layout[__object__,related_childrens[__object__,items[__object__],link_to_page[id,page_name,show_in_mobile_bar,path],related_events[__object__,to_page[id,path,show_in_mobile_bar,page_name]],properties[__object__]]],content_type,path,related_childrens[__object__,items[__object__],link_to_page[id,page_name,show_in_mobile_bar,path],properties[__object__],related_events[__object__,to_page[id,path,page_name,show_in_mobile_bar]]],related_variables[__object__]`,
  });
};

export const getItemById = async ({ itemId, lang, modelId }) => {
  return await get({
    path: `item_brief?id=${itemId}&model=${modelId}&language=${lang}&translate_original=1&api_all_result=1&field_name=1&result_structure_short=1&api_data_field=__object__`,
  });
};
