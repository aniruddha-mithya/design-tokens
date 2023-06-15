import axios from "axios";
import React, { FC, FormEvent, useCallback, useContext } from "react";
import { AppContext } from "../../AppContext";
import { useStoreActions } from "../../Stores";

const Form: FC = (props) => {
  const { setBrands } = useStoreActions(({ setBrands }) => ({
    setBrands: setBrands,
  }));

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const bodyFormData = new FormData(event.currentTarget);
      const { data: brands } = await axios.request({
        url: "brand-tokens",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      });
      setBrands(brands);
    },
    [setBrands]
  );

  return (
    <div className="main-content">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <label htmlFor="name" className="text-lg inline-flex gap-8">
          <span className="">Enter brand name:</span>
          <input
            className="px-2 py-1 bg-slate-100 bg-opacity-10"
            name="name"
            type="text"
            placeholder="Enter brand name"
          />
        </label>

        <label className="text-lg inline-flex gap-8">
          <span>Select design tokens file:</span>
          <input type="file" name="design-tokens" className="" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
