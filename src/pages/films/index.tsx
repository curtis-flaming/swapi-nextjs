import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film, List } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";
import { useQuery, dehydrate, QueryClient, useQueries } from "react-query";
import { SwapiFetch, useFilms } from "../api/queries";

const Film = () => {
  const router = useRouter();

  const { data: films, isSuccess } = useFilms();
  return (
    <div className="flex gap-2">
      {films?.results.map((film) => (
        <FilmCard film={film} />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["films"], () =>
    SwapiFetch<List<Film>>("films")
  );
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Film;

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <Link href={getSwapUrlParamString(film.url)}>
      <div className="w-96 border-2 border-primary cursor-pointer">
        <h2 className="text-lg text-center">{film.title}</h2>
        <p>Director: {film.director}</p>
        <p>Producer: {film.producer}</p>
        <p>Release Date: {film.release_date}</p>
      </div>
    </Link>
  );
};
