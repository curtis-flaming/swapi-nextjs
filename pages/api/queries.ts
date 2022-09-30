import { useQuery } from "@tanstack/react-query";
import { Film, List } from "./SwapiTypes";

const SWAPI = "https://swapi.dev/api/";
export const FILMS = "films";

const toJSON = (response: Response) => {
  if (response.ok) return response.json();
  throw response;
};
// axios??
export const SwapiFetch = async <T>(swapiEndpoint: string): Promise<T> => {
  return await fetch(`${SWAPI + swapiEndpoint}`).then(toJSON);
};

export const useFilms = () => {
  return useQuery([FILMS], () => SwapiFetch<List<Film>>("films"), {
    onSuccess: (data) => console.log("DID IT WORK", data),
  });
};
