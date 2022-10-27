import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film, People, Planet, Result } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";
import {
  useQuery,
  dehydrate,
  QueryClient,
  useQueries,
  useQueryClient,
} from "react-query";
import { SwapiFetch, useCharacters, useFilm } from "../api/queries";

const getFilms = () =>
  fetch(`https://swapi.dev/api/films/1`).then((res) => res.json());

const Film = ({ dehydratedState }: { dehydratedState: Film }) => {
  const { query } = useRouter();
  const queryClient = useQueryClient();

  const { data: film } = useFilm(query.id as string);
  console.log("DATA>>>>>> FILM", film);

  const characterQueries = useQueries(
    !film
      ? []
      : film?.characters.map((url) => ({
          queryKey: getSwapUrlParamString(url),
          queryFn: () => SwapiFetch(`${getSwapUrlParamString(url)}`),
          staleTime: Infinity,
          enabled: !!film,
        }))
  );
  const planetsQueries = useQueries(
    !film
      ? []
      : film?.planets.map((url) => ({
          queryKey: getSwapUrlParamString(url),
          queryFn: () => SwapiFetch(`${getSwapUrlParamString(url)}`),
          staleTime: Infinity,
          enabled: !!film,
        }))
  );

  const characterData = characterQueries?.map(({ data }) => data as People);
  const planetsData = planetsQueries?.map(({ data }) => data as Planet);

  console.log("RESULTS>>>>", film);

  return (
    <div>
      <h1 className="text-xl">{film?.title}</h1>

      <div>{film?.director}</div>
      <div className="flex">
        <div>
          <h2>Characters:</h2>
          {characterData?.map((character) => (
            <CharacterCard character={character} />
          ))}
        </div>
        <div>
          <h2>Planets:</h2>
          {planetsData?.map((planet) => (
            <PlanetCard planet={planet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/films/${context.query.filmId}`
  );

  const data = await res.json();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["films", context.query.id], getFilms);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Film;

const CharacterCard = ({ character }: { character: People }) => {
  if (character?.name.includes("nobi")) console.log(character);
  return (
    <div>
      <Link href={getSwapUrlParamString(character?.url)}>
        <p className="text-sm cursor-pointer font-bold">{character?.name}</p>
      </Link>
    </div>
  );
};

const PlanetCard = ({ planet }: { planet: Planet }) => {
  return (
    <div>
      <Link href={getSwapUrlParamString(planet?.url)}>
        <p className="text-sm cursor-pointer">{planet?.name}</p>
      </Link>
    </div>
  );
};
