export const changeObjectIndex = (array, fromIndex, toIndex) => {
  if (
    fromIndex >= array.length ||
    toIndex >= array.length ||
    fromIndex < 0 ||
    toIndex < 0
  ) {
    console.error("Invalid indices");
    return array;
  }

  // Remove the object from the original index
  const [item] = array.splice(fromIndex, 1);

  // Insert the object at the new index
  array.splice(toIndex, 0, item);

  return array;
};

export const buildTree = (data) => {
  let tree = [];
  let lookup = {};

  // Initialize lookup object
  data.forEach((item) => {
    lookup[item.id] = { ...item, related_childrens: [] };
  });

  // Build the tree structure
  data.forEach((item) => {
    if (!item.parent) {
      tree.push(lookup[item.id]);
    } else if (lookup[item.parent?.id]?.related_childrens) {
      lookup[item.parent?.id].related_childrens.push(lookup[item.id]);
    }
  });

  const reverseChildren = (node) => {
    node?.related_childrens?.reverse();
    node?.related_childrens?.forEach((child) => reverseChildren(child));
  };

  return tree;
};

export const setUpStyle = (element, theme) => {
  var properties = {};
  if (element?.properties) {
    element?.properties?.map((property) => {
      if (property?.value && property?.property_name) {
        if (property?.value.includes("var(")) {
          if (property?.value.includes("var(--dark_color)")) {
            properties[property.property_name] = theme?.dark_color;
          } else if (property?.value.includes("var(--dark_bg_color)")) {
            properties[property.property_name] = theme?.dark_bg_color;
          } else if (property?.value.includes("var(--light_color)")) {
            properties[property.property_name] = theme?.light_color;
          } else if (property?.value.includes("var(--light_bg_color)")) {
            properties[property.property_name] = theme?.light_bg_color;
          } else if (property?.value.includes("var(--font_dark)")) {
            properties[property.property_name] = theme?.font_dark;
          } else if (property?.value.includes("var(--font_light)")) {
            properties[property.property_name] = theme?.font_light;
          }
        } else if (
          property?.value.includes("px") &&
          !property?.value.includes("(")
        ) {
          properties[property.property_name] = parseInt(
            property.value?.replace("px", "")
          );
        } else if (
          property.property_name == "borderRadius" &&
          property.value.includes("%") &&
          property.value
        ) {
          properties[property.property_name] = parseInt(
            property.value.replace("%", "")
          );
        } else {
          properties[property.property_name] = !isNaN(Number(property.value))
            ? parseInt(property.value)
            : property.value;
        }
      }
    });
  }

  return properties;
};
