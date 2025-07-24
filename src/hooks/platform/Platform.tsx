// src/hooks/platform/Platform.ts
import {
  people,
  tables,
  countdownData,
  weeklyData,
  yearlyData,
  
  countryCodes,
} from '@/Pages/student-registraion/components/HostelDatas';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from './Localstorage';
// import { ConversationType, getAllConversation, getConversationByTag } from '../../../rx/conversations';
import { ConversationType, getAllConversation, getConversationByTag } from '../../../rx/Conversations';

type DummyResponse<T> = {
  success: boolean;
  data: {
    message: string;
    list: T;
  };
};

const simulateDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100));
};

const Platform = () => {
  const getPeople = async (): Promise<DummyResponse<typeof people>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched people data successfully',
          list: people,
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

  const getTables = async (): Promise<DummyResponse<typeof tables>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched table data successfully',
          list: tables,
        },
      };
    } catch (error) {
      console.error('Error in getTables:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch table data',
          list: [],
        },
      };
    }
  };

  const getCountDown = async (): Promise<DummyResponse<typeof countdownData>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched countdown data successfully',
          list: countdownData,
        },
      };
    } catch (error) {
      console.error('Error in getCountDown:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch countdown data',
          list: [],
        },
      };
    }
  };

  const getWeeklyData = async (): Promise<DummyResponse<typeof weeklyData>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched weekly data successfully',
          list: weeklyData,
        },
      };
    } catch (error) {
      console.error('Error in getWeeklyData:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch weekly data',
          list: [],
        },
      };
    }
  };

const getMonthlyData = async (): Promise<DummyResponse<typeof weeklyData>> => {
  try {
    const response = await getWeeklyData();

    if (!response.success) {
      return {
        success: false,
        data: {
          message: 'Failed to generate monthly data',
          list: [],
        },
      };
    }

    const transformedData = response.data.list.map((d, i) => ({
      ...d,
      missed: d.missed + i * 2,
      late: d.late + 1,
    }));

    return {
      success: true,
      data: {
        message: 'Generated monthly data successfully',
        list: transformedData,
      },
    };
  } catch (error) {
    console.error('Error in getMonthlyData:', error);
    return {
      success: false,
      data: {
        message: 'Failed to generate monthly data',
        list: [],
      },
    };
  }
};


  const getYearlyData = async (): Promise<DummyResponse<typeof yearlyData>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched yearly data successfully',
          list: yearlyData,
        },
      };
    } catch (error) {
      console.error('Error in getYearlyData:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch yearly data',
          list: [],
        },
      };
    }
  };

  const getCountryCodes = async (): Promise<DummyResponse<typeof countryCodes>> => {
    try {
      await simulateDelay();
      return {
        success: true,
        data: {
          message: 'Fetched country codes successfully',
          list: countryCodes,
        },
      };
    } catch (error) {
      console.error('Error in getCountryCodes:', error);
      return {
        success: false,
        data: {
          message: 'Failed to fetch country codes',
          list: [],
        },
      };
    }
  };

const getChatuser = async (
  tag: 'all' | 'hostels' | 'groups' | 'split_money',
  searchQuery: string
): Promise<DummyResponse<ConversationType>> => {
  try {
    console.log("tag name:::",tag)
    await simulateDelay();

    let userList: ConversationType[] = [];

    if (tag === 'all') {
      userList = await getAllConversation();
    } else {
      userList = await getConversationByTag(tag);
    }

    if (searchQuery) {
      userList = userList.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return {
      success: true,
      data: {
        message: "Fetched people data successfully",
        list: userList,
      },
    };
  } catch (error) {
    console.error("Error in getChatuser:", error);
    return {
      success: false,
      data: {
        message: "Failed to fetch people data",
        list: [],
      },
    };
  }
};

  return {
    getChatuser,
    getPeople,
    getTables,
    getCountDown,
    getWeeklyData,
    getMonthlyData,
    getYearlyData,
    getCountryCodes,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  };
};

export default Platform;
