import { createContext, useContext } from "react";
export const MapContext = createContext("Default Value");

export const useMapContext = () => {
  useContext(MapContext);
};
