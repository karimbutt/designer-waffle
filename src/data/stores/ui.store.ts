import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import RootStore from './root.store';

type KeyboardFocusArea = 'sidebar' | 'main' | null;

export default class UiStore {
  keyboardFocusArea: KeyboardFocusArea;

  constructor(private rootStore: RootStore) {
    // makeAutoObservable(this, {}, { autoBind: true });
    makeObservable(this, {
      keyboardFocusArea: observable,
      setKeyboardFocus: action,
    });
    this.keyboardFocusArea = null;
  }

  setKeyboardFocus(area: KeyboardFocusArea) {
    this.keyboardFocusArea = area;
  }
}
