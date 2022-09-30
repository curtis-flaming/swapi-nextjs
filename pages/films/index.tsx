import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film, List } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { FILMS, SwapiFetch, useFilms } from "../api/queries";

const Film = ({ dehydratedState }: { dehydratedState: Film }) => {
  const router = useRouter();

  const { data: films, isSuccess } = useFilms();
  //   console.log(">>>>>>>>>>>>>>??????????????", dehydratedState);
  console.log("DATA>>>>>>", films?.results);
  console.log("DATA>>>>>> success", isSuccess);
  return (
    <div>
      Films
      {films?.results.map((film) => (
        <div>
          <div>{film?.title}</div>
          <div>{film?.director}</div>
          {film?.starships.map((starship, i) => (
            <div key={i}>
              <Link href={getSwapUrlParamString(starship)}>{starship}</Link>
            </div>
          ))}
          <hr />
          {film?.planets.map((planet, i) => (
            <div key={i}>
              <Link href={getSwapUrlParamString(planet)}>{planet}</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([FILMS], () =>
    SwapiFetch<List<Film>>("films")
  );
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Film;
