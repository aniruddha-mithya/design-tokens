import {
  Action,
  State,
  action,
  createStore,
  createTypedHooks,
} from "easy-peasy";
import { BrandCSS } from "../@types";
import { isEqual } from "lodash";

interface Store {
  brands: BrandCSS[];
  setBrands: Action<Store, BrandCSS[]>;
}

export const store = createStore<Store>({
  brands: [],
  setBrands: action((state, payload) => {
    state.brands = payload;
  }),
});


const typedHooks = createTypedHooks<Store>();

export const { useStore, useStoreActions, useStoreDispatch } = typedHooks;

export const useStoreState = <Result>(
  a: (state: State<Store>) => Result,
  b?: any
) => typedHooks.useStoreState(a, b ?? isEqual);
