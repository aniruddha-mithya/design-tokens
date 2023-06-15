import React, { FC } from "react";
import "./index.css";
import { useStoreState } from "../../Stores";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Brand: FC = (props) => {
  const { brands } = useStoreState(({ brands }) => ({ brands }));
  const { brand } = useParams<{ brand: string }>();
  const brandCSSFile = brands.find(
    ({ brandName }) => brandName === brand
  )?.cssFile;

  return (
    <>
      <Helmet>
        <link
          href={`${
            (import.meta as unknown as { env: { VITE_API_URL: string } }).env
              .VITE_API_URL
          }${brandCSSFile}`}
          rel="stylesheet"
        />
      </Helmet>
      <div className={`${brand} root`}>
        <h1 className="brand-heading">Duis do enim laboris magna:</h1>
        <div className="cards-container">
          <div className="card">
            Nisi eiusmod ad aliquip nisi consectetur aute duis incididunt nulla.
          </div>
          <div className=" card">
            Incididunt nisi pariatur dolore dolor qui sint commodo incididunt.
          </div>
          <div className="card">
            Fugiat ad officia incididunt magna ut deserunt voluptate cillum enim
            consectetur anim duis quis.
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
