import Axios from "axios";
import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_ADD_REQUEST,
  COMPANY_ADD_SUCCESS,
  COMPANY_ADD_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAIL,
} from "../../constants/CompanyConstants";

const listCompany = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/cmpReg/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: COMPANY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COMPANY_LIST_FAIL, payload: error });
  }
};

const addCompany = (company) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!company._id) {
      const { data } = await Axios.post("/cmpReg/add", company, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: COMPANY_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/cmpReg/update/" + company._id,
        company,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: COMPANY_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: COMPANY_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteCompany = (companyId) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_DELETE_REQUEST, payload: companyId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/cmpReg/" + companyId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: COMPANY_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: COMPANY_DELETE_FAIL, payload: error.message });
  }
};

export { listCompany, addCompany, deleteCompany };
