import { SET_GROUP_ID } from './types';

export default function setGroupId(id) {
  return {
    type: SET_GROUP_ID,
    id
  };
}
