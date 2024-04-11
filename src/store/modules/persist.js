import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
  return persistReducer(
    {
      key: 'STUDENT-APP',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
};
