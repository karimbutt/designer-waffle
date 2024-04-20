import { createContext, useContext } from 'react';
import RootStore from '../data/stores/root.store';
import AppApi from '../data/services/api/app-api';

interface AppContextType {
  store: RootStore;
  api: AppApi;
}

const AppContext = createContext<null | AppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContext;
