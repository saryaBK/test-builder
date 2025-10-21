import React, { useState } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Form, Input } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';

const FileField = ({field , fieldInfo , trigger}) => {
    const [file, setFile] = useState(null);

    const pickFile = async (setFieldValue) => {
        const result = await DocumentPicker.getDocumentAsync({multiple: false});
        // const result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ['images', 'videos'],
        //     allowsEditing: true,
        //     // aspect: [4, 3],
        //     quality: 1,
        //   });
        
        if (result.type !== 'cancel') {
            const base64String = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const fileUri = result?.assets[0]?.uri;
            const fileName = result?.assets[0]?.name || fileUri.split("/").pop();
            const fileExt = fileName.split(".").pop();
            setFile({
                file: result?.assets[0]?.uri,
                ext: fileExt
            })
            setFieldValue(field?.code , {
                file: base64String,
                ext: fileExt
            })
        }
      };

  return (
    <View style={{
        gap:5,
        display: fieldInfo?.isVisible ? '' : 'none'
      }}>
        <Text style={{fontSize: 17}}>{fieldInfo?.isRequired ? <Text style={{color:'red'}}>* </Text> : ''}{fieldInfo?.label}</Text>
        <Form.Item 
        styles={{
          Line:{
            padding:0,
            paddingVertical:0,
            paddingRight:0,
            paddingTop:0
          }
        }}
        style={{
          paddingLeft:0,
          backgroundColor:'transparent'
        }} 
        shouldUpdate={(newValue , prevValue) => newValue?.[field?.code] != prevValue?.[field?.code]}
        // name={field?.code}
        >
            {({setFieldValue , getFieldValue}) => {
                return(
                    <>
                    <Form.Item
                    style={{
                        display:'none'
                    }} 
                    name={field?.code}
                    rules={[
                        ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
                    ]}
                    >
                        <Input />
                    </Form.Item>
                    <TouchableOpacity 
                        style={{
                            // backgroundColor:'white',
                            paddingHorizontal: 10,
                            width: '100%',
                            height: 60,
                            // justifyContent:'center',
                            alignItems:'center',
                            gap: 10,
                            flexDirection:'row',
                            borderRadius: 8,
                            opacity: fieldInfo?.isReadOnly ? 0.3 : 1,
                            borderStyle: 'dashed',
                            borderColor: 'lightgray',
                            borderWidth: 2,
                        }}
                        onPress={() => {
                            if(fieldInfo?.isReadOnly){
                                return
                            }
                            pickFile(setFieldValue)
                        }}
                        >
                            <AntDesign name="upload" size={20} color="black" />
                            {file?.file && (file?.ext == 'png' || file?.ext == 'jpg' || file?.ext == 'jpeg') ?
                            <Image
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: 'contain'
                            }}
                            source={{uri: file?.file}}
                            />
                            : getFieldValue(field?.code)?.file_url && (getFieldValue(field?.code)?.ext == 'png' || getFieldValue(field?.code)?.ext == 'jpg' || getFieldValue(field?.code)?.ext == 'jpeg') ?
                            <Image
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: 'contain'
                            }}
                            source={{uri: getFieldValue(field?.code)?.file_url}}
                            />
                            : file || getFieldValue(field?.code)?.file_url ?
                            <AntDesign name="file1" size={24} color="black" />
                            : null}
                        </TouchableOpacity>
                        {trigger && fieldInfo?.isRequired && !getFieldValue(field?.code) ?
                        <Text style={{color:'red', marginTop:5}}>this field is required</Text>
                        : null}
                    </>
                )
            }}
        </Form.Item>
    </View>
  )
}

export default FileField