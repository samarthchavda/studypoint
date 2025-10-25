import apiConnector from "../apiConnector";
import { categoryEndpoint } from "../apis";

export async function getAllCategory(dispatch, setLoading) {
  dispatch(setLoading(true));
  const { CATEGORIES_API } = categoryEndpoint;
  try {
    const response = await apiConnector("GET", CATEGORIES_API);
    if (response.data.success) {
      dispatch(setLoading(false));
      return response;
    }
  } catch (error) {
    console.log("error in category fetch", error);
    dispatch(setLoading(false));
  }
}