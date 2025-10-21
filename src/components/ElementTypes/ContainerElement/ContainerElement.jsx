import React from "react";
import { View } from "react-native";
import useLang from "../../../../contexts/useLanguage/useLanguage";
import DataDisplay from "../DataDisplay/DataDisplay";
import { setUpStyle } from "../../../utility/helper";
import useTheme from "../../../../contexts/useTheme/useTheme";


const LazyRenderPage = React.lazy(() => import("../../RenderPage/RenderPage"));


const ContainerElement = ({element , assignedVariables , component , currentItem , componentParent , parent}) => {
    const {theme} = useTheme()
    return(
        <View style={{
              ...setUpStyle(element , theme),
            }}>
            {element?.data_source_model && 
            <DataDisplay element={element}/>
            }
            <LazyRenderPage 
            componentParent={componentParent}
            parent={parent} 
            currentItem={currentItem} 
            component={component} 
            assignedVariables={assignedVariables} 
            elements={element?.related_childrens} 
            />
        </View>
    )
}

export default ContainerElement