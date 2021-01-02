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

const companyListReducer = (
  state = {
    companies: [],
  },
  action
) => {
  switch (action.type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANY_LIST_SUCCESS:
      return { loading: false, companies: action.payload };
    case COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addCompanyReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_ADD_REQUEST:
      return { loading: true };
    case COMPANY_ADD_SUCCESS:
      return { loading: false, success: true, company: action.payload };
    case COMPANY_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteCompanyReducer = (
  state = {
    company: {},
  },
  action
) => {
  switch (action.type) {
    case COMPANY_DELETE_REQUEST:
      return { loading: true };
    case COMPANY_DELETE_SUCCESS:
      return { loading: false, success: true, company: action.payload };
    case COMPANY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { companyListReducer, addCompanyReducer, deleteCompanyReducer };
