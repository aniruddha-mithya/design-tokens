import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStoreState } from "../../Stores";

const Home: FC = (props) => {
  const { brands } = useStoreState(({ brands }) => ({ brands }));

  return (
    <>
      <nav className="py-4 px-8 flex gap-8">
        <Link to={"/"}>Home</Link>
        {brands.map((brand) => (
          <Link key={brand.brandName} to={brand.brandName}>
            {brand.brandName}
          </Link>
        ))}
      </nav>

      <Outlet />
    </>
  );
};

export default Home;
