export function isStringField(field) {
  return field?.data_type == 1;
}

export function isNumberField(field) {
  return field?.data_type == 3;
}

export function isBooleanField(field) {
  return field?.data_type == 4;
}

export function isDateField(field) {
  return field?.data_type == 5;
}

export function isTimeField(field) {
  return field?.data_type == 6;
}

export function isListOfOptionsField(field) {
  return field?.data_type == 7;
}

export function isFileField(field) {
  return field?.data_type == 8;
}

export function isRelatedField(field) {
  return field?.data_type == 9;
}

export function isDateTimeField(field) {
  return field?.data_type == 10;
}

export const isFieldRequired = (propertys) =>
  Array.isArray(propertys) &&
  propertys?.find((i) => i?.property == 1)?.value == 1;

export const isFieldVisible = (propertys) =>
  Array.isArray(propertys) &&
  propertys?.find((i) => i?.property == 2)?.value == 1;

export const isFieldHasReadOnlyProperty = (propertys) =>
  Array.isArray(propertys) &&
  propertys?.find((i) => i.property == 3)?.value == 1;

export const getFieldDefaultValue = (properties) => {
  const defaultValue = properties?.find(
    (property) => property?.property == 24 && property?.value
  );
  return defaultValue && defaultValue.value && defaultValue.value !== "0"
    ? defaultValue.value
    : null;
};

export const isWidgetMultiLine = (prop) =>
  prop && prop.property === 23 && prop.value === "1";

export const isWidgetEmail = (prop) =>
  prop && prop.property === 23 && prop.value === "3";

export const isWidgetMobile = (prop) =>
  prop && prop.property === 23 && prop.value === "23";

export const getFieldWidget = (field) =>
  field?.properties?.find((prop) => prop.property === 23);

export const getValueFromSearchItemData = (item) => {
  var id = Object.keys(item)[0];
  var text = "";
  Object.keys(item[id]).map((key, index) => {
    if (
      (typeof item[id][key] == "string" || typeof item[id][key] == "number") &&
      item[id][key] &&
      key !== "id"
    ) {
      text += index == 0 ? item[id][key] : ` / ${item[id][key]}`;
    }
  });
  return text;
};

export const isWidgetRelatedGrid = (prop) =>
  prop && prop?.property === 23 && prop.value === "18";

export const getFieldPropertyForRelatedGridFieldForFarFieldId = (field) =>
  field?.properties.find((prop) => prop.property === 27);

export const getFieldPropertyForRelatedGridFieldModel = (field) =>
  field?.properties.find((prop) => prop.property === 26);
