import Axios from "../network/axios";
import SummaryApi from "../../comman/summaryApi";

/*
  Fetch logged-in user using access token
  Used after login, refresh, app init
*/
const fetchUserDetails = async () => {
  try {
    const { data } = await Axios({
      ...SummaryApi.userDetails
    });

    return data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch user"
    };
  }
};

export default fetchUserDetails;
