import { PASS_MESSAGE } from './types';

export default function passMessage(data) {
  return {
    type: PASS_MESSAGE,
    data
  };
}
