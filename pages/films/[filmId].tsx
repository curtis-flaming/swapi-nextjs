import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";

const getFilms = () =>
  fetch(`https://swapi.dev/api/films/1`).then((res) => res.json());

const Film = ({ dehydratedState }: { dehydratedState: Film }) => {
  const router = useRouter();

  const { data } = useQuery<Film>(["films"], getFilms);
  console.log("DATA>>>>>>", data);
  return (
    <div>
      Films
      <div>{data?.title}</div>
      <div>{data?.director}</div>
      {data?.starships.map((starship, i) => (
        <div key={i}>
          <Link href={getSwapUrlParamString(starship)}>{starship}</Link>
        </div>
      ))}
      <hr />
      {data?.planets.map((planet, i) => (
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
