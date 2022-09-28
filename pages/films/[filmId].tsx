import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Film } from "../api/SwapiTypes";
import { getSwapUrlParamString } from "../api/utils";

const Film = ({ data }: { data: Film }) => {
  const router = useRouter();

  return (
    <div>
      Films
      <div>{data.title}</div>
      <div>{data.director}</div>
      {data.starships.map((starship, i) => (
        <div key={i}>
          <Link href={getSwapUrlParamString(starship)}>{starship}</Link>
        </div>
      ))}
      <hr />
      {data.planets.map((planet, i) => (
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

  return {
    props: { data },
  };
};

export default Film;
