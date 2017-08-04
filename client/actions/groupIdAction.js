import { SET_GROUP_DETAILS } from './types';

export default function setGroupId(data) {
  return {
    type: SET_GROUP_DETAILS,
    data
  };
}
