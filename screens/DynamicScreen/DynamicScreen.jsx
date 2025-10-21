import React from "react";
import { View } from "react-native";
import styles from "../../src/theme/theme";
import {PageProvider} from '../../contexts/usePage/usePage'
import RenderPage from "../../src/components/RenderPage/RenderPage";
import { buildTree } from "../../src/utility/helper";

export const DynamicScreen = ({page , pages}) => {
    const style = styles()

    const HomePage = pages?.find(i => i?.is_home_page) ? `${pages?.find(i => i?.is_home_page)?.page_name}-${pages?.find(i => i?.is_home_page)?.id}` : null
    var elements = buildTree(page?.related_childrens || [])

    return(
        <PageProvider HomePage={HomePage} >
            <View style={{...style?.mainView , flex: 1 ,
            paddingHorizontal: 10,
            paddingVertical: 5
            }}>
                <RenderPage elements={elements}/> 
            </View>
        </PageProvider>
    )
}