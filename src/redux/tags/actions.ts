import {
  ADD_IMAGE_TAG,
  DEL_IMAGE_TAG,
  GET_IMAGE_SINGLE_SAVE,
  GET_IMAGE_SINGLE_START,
  GET_TAGS_SAVE,
  GET_TAGS_START
} from './constants';

export const getCurrentBanner = (payload: AnyObject) => ({
  type: GET_IMAGE_SINGLE_START,
  payload
});

export const saveCurrentBanner = (payload: AnyObject) => ({
  type: GET_IMAGE_SINGLE_SAVE,
  payload
});


export const getTagsStart = () => ({type: GET_TAGS_START});
export const getTagsSave = (payload: AnyObject) => ({
  type: GET_TAGS_SAVE,
  payload
});


export const delBannerTag = (payload: AnyObject) => ({
  type: DEL_IMAGE_TAG,
  payload
});

export const addBannerTag = (payload: AnyObject) => ({
  type: ADD_IMAGE_TAG,
  payload
});
