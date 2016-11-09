import { AppError } from './model';
import { RESET_ERRORS } from '../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  const { type, errorMessage } = action;

  if (type === RESET_ERRORS) {
    return null;
  } else if (errorMessage) {
    return new AppError({
      message: errorMessage
    });
  }

  return state;
};
