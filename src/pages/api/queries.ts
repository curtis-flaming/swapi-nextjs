import { useQuery } from "react-query";
import { Film, List } from "./SwapiTypes";

export const SWAPI = "https://swapi.dev/api/";

const toJSON = (response: Response) => {
  if (response.ok) return response.json();
  throw response;
};
// axios??
export const SwapiFetch = async <T>(swapiEndpoint: string): Promise<T> => {
  return await fetch(`${SWAPI + swapiEndpoint}`).then(toJSON);
};

export const useFilms = () => {
  return useQuery(["films"], () => SwapiFetch<List<Film>>("films"));
};

export const useFilm = (id: string) => {
  return useQuery(["film", id], () => SwapiFetch<Film>(`films/${id}`));
};

export const useCharacters = () => {
  return useQuery(["characters"], () => SwapiFetch<List<Film>>("characters"));
};
