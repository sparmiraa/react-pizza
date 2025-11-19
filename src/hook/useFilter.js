import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/slices/filterSlice.js";
import { SORT_OPTIONS } from "../constants/sortOptions.js";

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId, currentPage, search } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const categoryId = Number(searchParams.get("categoryId")) || 0;
    const currentPage = Number(searchParams.get("page")) || 1;
    const sortProperty =
      searchParams.get("sortProperty") || SORT_OPTIONS[0].sortProperty;
    const search = searchParams.get("search") || "";

    const sort =
      SORT_OPTIONS.find((obj) => obj.sortProperty === sortProperty) ||
      SORT_OPTIONS[0];

    dispatch(setFilters({ categoryId, currentPage, sort, search }));
  }, [dispatch, searchParams]);

  const updateSearchParams = (updates) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        const isDefault =
          value === null ||
          value === undefined ||
          value === "" ||
          (key === "categoryId" && value === 0) ||
          (key === "page" && value === 1) ||
          (key === "sortProperty" && value === SORT_OPTIONS[0].sortProperty);

        if (isDefault) {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, String(value));
        }
      });
      return updatedParams;
    });
  };

  return {
    categoryId,
    currentPage,
    search,
    searchParams,
    updateSearchParams,
  };
};
