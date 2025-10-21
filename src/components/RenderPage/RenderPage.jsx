import React from "react";
import { Text, View } from "react-native";
import TextElement from "../ElementTypes/TextElement/TextElement";
import ImageElement from "../ElementTypes/ImageElement/ImageElement";
import DataDisplay from "../ElementTypes/DataDisplay/DataDisplay";
import ButtonElement from "../ElementTypes/ButtonElement/ButtonElement";
import LinkElement from "../ElementTypes/LinkElement/LinkElement";
import ContainerElement from "../ElementTypes/ContainerElement/ContainerElement";
import BoxElement from "../ElementTypes/BoxElement/BoxElement";
import DropdownElement from "../ElementTypes/DropdownElement/DropdownElement";
import ModelForm from "../ElementTypes/ModelForm/ModelForm";
import ModelWizard from "../ElementTypes/ModelWizard/ModelWizard";
import LoginForm from "../ElementTypes/LoginForm/LoginForm";
import CategoryListItem from "../ElementTypes/CategoryListItem/CategoryListItem";
// import ReportElement from "../ElementTypes/ReportElement/ReportElement";
import ItemDetils from "../ElementTypes/ItemDetils/ItemDetils";
import DevComponent from "../ElementTypes/DevComponent/DevComponent";
import ComponentElement from "../ElementTypes/ComponentElement/ComponentElement";
import AutoSlider from "../ElementTypes/AutoSlider/AutoSlider";
import BannerSlider from "../ElementTypes/BannerSlider/BannerSlider";

const RenderPage = ({elements , assignedVariables , component , currentItem , componentParent , parent}) => {

    return(
        <>
        {elements?.map((element) => {
                var globalProps = {
                    component,
                    assignedVariables, 
                    element,
                    currentItem,
                    componentParent,
                    parent,
                }
            return(
                <React.Fragment key={element?.id}>
                    {element?.element_type?.code == 'container' ? 
                    <ContainerElement {...globalProps} />
                    :
                    element?.element_type?.code == 'box' ? 
                    <BoxElement {...globalProps} />
                    :
                    element?.element_type?.code == 'text' ? 
                    <TextElement {...globalProps} />
                    :
                    element?.element_type?.code == 'image' ? 
                    <ImageElement {...globalProps} />
                    :
                    element?.element_type?.code == 'data_display' ? 
                    <DataDisplay {...globalProps} />
                    :
                    element?.element_type?.code == 'button' ? 
                    <ButtonElement {...globalProps} />
                    :
                    element?.element_type?.code == 'link' ? 
                    <LinkElement {...globalProps} />
                    :
                    element?.element_type?.code == 'dropdown' ? 
                    <DropdownElement {...globalProps}/>
                    :
                    element?.element_type?.code == 'model_form' ? 
                    <ModelForm {...globalProps}/>
                    :
                    element?.element_type?.code == 'model_wizard' ? 
                    <ModelWizard {...globalProps}/>
                    :
                    element?.element_type?.code == 'login_form' ? 
                    <LoginForm {...globalProps}/>
                    :
                    element?.element_type?.code == 'category_list_item' ? 
                    <CategoryListItem {...globalProps}/>
                    :
                    element?.element_type?.code == 'item_details' ? 
                    <ItemDetils {...globalProps}/>
                    :
                    element?.element_type?.code == 'component' ? 
                    <ComponentElement {...globalProps}/>
                    :
                    element?.element_type?.code == 'dev_component' ? 
                    <DevComponent {...globalProps}/>
                    :
                    element?.element_type?.code == 'report' ? 
                    <ReportElement {...globalProps} />
                    :
                    element?.element_type?.code == 'auto_slider' ? 
                    <AutoSlider {...globalProps} />
                    :
                    element?.element_type?.code == 'banner_slider' ? 
                    <BannerSlider {...globalProps} />
                    : null
                    }
                </React.Fragment>
            )
        })}
        </>
    )
}

export default RenderPage