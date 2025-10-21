import { StyleSheet } from "react-native";
import useTheme from "../../contexts/useTheme/useTheme";
import useLang from "../../contexts/useLanguage/useLanguage";

const styles = () => {
  const { theme, themeType } = useTheme();
  const { lang } = useLang();

  return StyleSheet.create({
    mainView: {
      // backgroundColor: theme?.backgroundColor,
    },
    mainText: {
      color: theme?.fontColor,
      // direction: lang == "ar" ? "rtl" : "ltr",
    },
  });
};

export default styles;
