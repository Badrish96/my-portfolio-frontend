"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../lib/store/store";
import { hydrateAuth } from "../lib/store/authSlice";
import { readStoredAuth } from "../lib/store/authStorage";

function AuthHydrator({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth(readStoredAuth()));
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return <Provider store={store}><AuthHydrator>{children}</AuthHydrator></Provider>;
}
