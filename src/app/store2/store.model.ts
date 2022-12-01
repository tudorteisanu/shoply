import { BehaviorSubject } from 'rxjs';

export abstract class StoreModel<T> {
  private readonly _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
  }

  public get state(): T {
    return this._state$.getValue();
  }
  public setState(state: T) {
    this._state$.next(state);
  }

  public patchState(state: Partial<T>) {
    this._state$.next({
      ...this.state,
      ...state,
    });
  }
}
