import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";
import { useQuery, dehydrate, QueryClient, useQueries } from "react-query";
import { FILMS, SwapiFetch, useFilm } from "../api/queries";

const getFilms = () =>
  fetch(`https://swapi.dev/api/films/1`).then((res) => res.json());

const Film = ({ dehydratedState }: { dehydratedState: Film }) => {
  const { query } = useRouter();

  const { data: film } = useFilm(query.id as string);
  console.log("DATA>>>>>> FILM", film);

  const results = useQueries(
    !film
      ? []
      : film?.characters.map((url) => ({
          queryKey: getSwapUrlParamString(url),
          queryFn: () => SwapiFetch(`${getSwapUrlParamString(url)}`),
          staleTime: Infinity,
          enabled: !!film,
        }))
  );

  return (
    <div>
      Films
      <div>{film?.title}</div>
      <div>{film?.director}</div>
      {film?.starships?.map((starship, i) => (
        <div key={i}>
          <Link href={getSwapUrlParamString(starship)}>{starship}</Link>
        </div>
      ))}
      <hr />
      {film?.planets?.map((planet, i) => (
        <div key={i}>
          <Link href={getSwapUrlParamString(planet)}>{planet}</Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/films/${context.query.filmId}`
  );

  const data = await res.json();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["films"], getFilms);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Film;
