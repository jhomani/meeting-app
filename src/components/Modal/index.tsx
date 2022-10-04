import {SimpleModal} from './SimpleModal';
import {confirm} from './confirm';
import {undoAction} from './undoAction';

export const Modal = Object.assign(SimpleModal, {
  confirm,
  undoAction,
});
