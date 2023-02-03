              import * as types from "./actionTypes";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import {
  loadUsersSuccess,
  loadUsersError,
  createUsersSuccess,
  createUsersError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "./actions";
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(createUsersError(error.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onUpdateUserStartAsync({ payload: {id, formValue} }) {
  try {
    const response = yield call(updateUserApi, id, formValue)
    if(response.status === 200){
      yield put(updateUserSuccess)
    }
  } catch (error) {
    yield put(updateUserError(error.response.data))
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeEvery(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
  yield takeEvery(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUser), fork(onUpdateUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
