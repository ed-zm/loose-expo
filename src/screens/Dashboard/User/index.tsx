import React, { useState, useEffect } from 'react'
import { Text, View, Image } from 'react-native'
// import axios from 'axios'
// import FileReaderInput from 'react-file-reader-input'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useRoute } from '@react-navigation/native'
import { USER, GET_S3_SIGNED_URL, CHANGE_PICTURE } from './index.graphql'
// import Cropper from '../../../components/Cropper'

const User = () => {
  const { params: { id } } = useRoute()
  // const [ picture, setPicture ] = useState({
  //   currentPicture: null,
  //   fileType: 'image/jpg',
  // })
  // const [ openCropper, setOpenCropper ] = useState(false)
  // const { currentPicture, fileType } = picture
  const { data } = useQuery(USER, { variables: { id } })
  // const [ getS3SignedUrl, { data: s3Url, error, loading }] = useLazyQuery(GET_S3_SIGNED_URL)
  // const [ changePicture ] = useMutation(CHANGE_PICTURE)
  // useEffect(() => {
  //   let s3Key
  //   if(s3Url) {
  //     const extension = picture.fileType.split('/')
  //     s3Key = `${data.user.id}.${extension[1]}`
  //     new Promise( async resolve => {
  //       const res = await axios.put(s3Url.getS3SignedUrl, picture.currentPicture, { headers: { 'Content-Type': fileType } })
  //       resolve(res)
  //     })
  //     .then((res: any) => {
  //       if(res.status === 200) {
  //         return changePicture({
  //           variables: {
  //             id: data.user.id,
  //             avatar: `https://s3.eu-west-1.amazonaws.com/dev.loose.www.avatars/${s3Key}`
  //           }
  //         })
  //       } else {
  //         throw new Error('An error occured uploading your image')
  //       }
  //     })
  //     .then(async res => {
  //       await setPicture({currentPicture: null, fileType: 'image/jpg'})
  //     console.log('Success')
  //     })
  //     .catch(() => {})
  //   }
  // }, [s3Url])

  // const changeProfilePicture = picture => {
  //   const file = picture.map(res => res[0].target.result)
  //   const currentPicture = file && file[0]
  //   setPicture({currentPicture, fileType: picture[0][1].type})
  // }

  // const savePicture = async (blob) => {
  //   await getS3SignedUrl({
  //     variables: {
  //       operation: 'putObject',
  //       fileType: fileType,
  //       id: data.user.id
  //     }
  //   })
  // }
  return(
    <View>
        {data && data.user &&
          <View>
            <Image source = {data.user.avatar || '/static/default_profile.png'} width = {30} height = {30}/>
            <View><Text>{ data.user.email }</Text></View>
            <View><Text>{ data.user.username }</Text></View>
            <View><Text>{ data.user.firstName }</Text></View>
            <View><Text>{ data.user.lastName }</Text></View>
            {/* <FileReaderInput type='file' onChange={ (e, pic) => changeProfilePicture(pic) } /> */}
          </View>
        }
        {/* currentPicture && fileType && <Cropper closeCropper = { async () => {
          setPicture({currentPicture: null, fileType: 'image/jpg'})
        } } src = { currentPicture } fileType = { fileType } savePicture = { savePicture }/> */}
    </View>
  )
}

export default User