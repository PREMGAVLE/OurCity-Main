import { companies } from "@/Pages/visitors-flow/common-page/VisitorData";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from './Localstorage';


type DummyResponse<T> = {
  success: boolean;
  data: {
    message: string;
    list: T;
  };
};

const simulateDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 300));
};

const Visitor = () => {
const getCompany = async (): Promise<DummyResponse<typeof companies>> => {

    try {
      await simulateDelay();
    const Company = JSON.parse(localStorage.getItem("submittedcompanyList") || "[]");
    let CompanyList=[...Company]


    setLocalStorage("companylist", CompanyList);
      return {
        success: true,
        data: {
          message: 'Fetched people data successfully',
          list: companies,
        },
      };
    } catch (error) {
      console.error('Error in getPeople:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch people data',
          list: [],
        },
      };
    }
  };

    return {
        getCompany,
        getLocalStorage,
        removeLocalStorage,
        setLocalStorage
    }
}

export default Visitor;