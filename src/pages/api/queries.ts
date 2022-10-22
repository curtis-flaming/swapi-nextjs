import { useQuery } from "react-query";
import { Film, List } from "./SwapiTypes";

export const SWAPI = "https://swapi.dev/api/";
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
  return useQuery([FILMS], () => SwapiFetch<List<Film>>("films"));
};

export const useFilm = (id: string) => {
  return useQuery([FILMS, id], () => SwapiFetch<Film>(`films/${id}`));
};
