import { combineReducers } from 'redux';
import { IApplicationState } from '../store/initialize-store';

const rootReducer = combineReducers<IApplicationState>({});

export { rootReducer };
