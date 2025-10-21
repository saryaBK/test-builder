import React from 'react'
import { Text, TextInput, View } from 'react-native'
import  StringField from './FieldTypes/StringField'
import { getFieldDefaultValue, getFieldWidget, isBooleanField, isDateField, isDateTimeField, isFieldHasReadOnlyProperty, isFieldRequired, isFieldVisible, isFileField, isListOfOptionsField, isNumberField, isRelatedField, isStringField, isTimeField, isWidgetRelatedGrid } from '../../utility/typeAndStructure'
import NumberField from './FieldTypes/NumberField'
import DateField from './FieldTypes/DateField'
import BooleanFiled from './FieldTypes/BooleanFiled'
import ListOfOptionsField from './FieldTypes/ListOfOptionsField'
import RelatedField from './FieldTypes/RelatedField'
import FileField from './FieldTypes/FileField'
import TimeField from './FieldTypes/TimeField'
import DateTimeField from './FieldTypes/DateTimeField'

export const RenderFields = ({fields , element , fieldRef , trigger}) => {

  return (
    <View 
    style={{
        gap: 10,
    }}
    >
        {fields?.map(field => {
            var fieldInfo = {
                isVisible: isFieldVisible(field?.properties),
                isReadOnly: isFieldHasReadOnlyProperty(field?.properties),
                defaultValue: getFieldDefaultValue(field?.properties),
                label: field?.name,
                placeholder : field?.name,
                isRequired: isFieldRequired(field?.properties) ? {required: isFieldRequired(field?.properties) , message: `${field?.name} is required`} : null
            }
            return(
                <View ref={(ref) => fieldRef.current[field.code] = ref} key={field?.id}>
                        {isStringField(field) ? 
                            <StringField fieldInfo={fieldInfo} field={field}/>
                        : 
                        isNumberField(field) ? 
                            <NumberField fieldInfo={fieldInfo} field={field}/>
                        : 
                        isBooleanField(field) ? 
                            <BooleanFiled fieldInfo={fieldInfo} field={field}/>
                        : 
                        isDateField(field) ? 
                            <DateField trigger={trigger} fieldInfo={fieldInfo} field={field}/>
                        : 
                        isTimeField(field) ? 
                            <TimeField trigger={trigger} fieldInfo={fieldInfo} field={field}/>
                        :
                        isDateTimeField(field) ? 
                            <DateTimeField trigger={trigger} fieldInfo={fieldInfo} field={field}/>
                        :
                        isListOfOptionsField(field) ? 
                            <ListOfOptionsField trigger={trigger} fieldInfo={fieldInfo} field={field}/>
                        : 
                        isRelatedField(field) && !isWidgetRelatedGrid(getFieldWidget(field)) ? 
                            <RelatedField trigger={trigger} modelId={element?.data_source_model} fieldInfo={fieldInfo} field={field}/>
                        :
                        isFileField(field) ? 
                            <FileField trigger={trigger} fieldInfo={fieldInfo} field={field}/>
                        :
                        null
                        }
                </View>
            )
        })}
    </View>
  )
}
export default RenderFields