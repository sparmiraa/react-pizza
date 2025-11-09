import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "../redux/slices/filterSlice.js";
import {SORT_OPTIONS} from "../constants/sortOptions.js";

export const useFilter = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const {categoryId, currentPage, search} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlCategoryId = searchParams.get("categoryId");
    const urlPage = searchParams.get("page");
    const urlSortProperty = searchParams.get("sortProperty");
    const urlSearch = searchParams.get("search") || "";

    const urlCategoryIdNumber = urlCategoryId ? Number(urlCategoryId) : 0;
    const urlPageNumber = urlPage ? Number(urlPage) : 1;
    const urlSortObj = urlSortProperty
      ? SORT_OPTIONS.find(obj => obj.sortProperty === urlSortProperty) || SORT_OPTIONS[0]
      : SORT_OPTIONS[0];

    dispatch(setFilters({
      categoryId: urlCategoryIdNumber,
      currentPage: urlPageNumber,
      sort: urlSortObj,
      search: urlSearch
    }));
  }, [searchParams]);

  const updateSearchParams = (updates) => {
    setSearchParams(prev => {
      const updatedParams = new URLSearchParams(prev);
      console.log("prev", prev.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" ||
          (key === "categoryId" && value === 0) ||
          (key === "page" && value === 1) ||
          (key === "sortProperty" && value === SORT_OPTIONS[0].sortProperty)) {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, String(value));
        }
      });
      console.log("updatedParams", updatedParams.toString());

      return updatedParams;
    });
  };

  return {
    setSearchParams,
    categoryId,
    currentPage,
    search,
    searchParams,
    updateSearchParams
  };
}