import React from "react";

const SwapiCard = () => {
  return <div></div>;
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

SwapiCard.Header = Header;
SwapiCard.Content = Content;

export default SwapiCard;
