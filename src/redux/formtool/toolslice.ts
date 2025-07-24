import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  activeTab: string;
  selectedTab: string;
  selectedTabData: any | null;
  selectedFormData: any | null;
  tabResources: any[];
  tabs: string[];
}

const initialState: TabState = {
  activeTab: '',
  selectedTab: '',
  selectedTabData: null,
  selectedFormData: null,
  tabResources: [],
  tabs: [],
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
    setSelectedTabData(state, action: PayloadAction<any>) {
      state.selectedTabData = action.payload;
    },
    setSelectedFormData(state, action: PayloadAction<any>) {
      state.selectedFormData = action.payload;
    },
    setTabResources(state, action: PayloadAction<any[]>) {
      state.tabResources = action.payload;
    },
    setTabs(state, action: PayloadAction<string[]>) {
      state.tabs = action.payload;
    },
    resetTabState(state) {
      state.activeTab = '';
      state.selectedTab = '';
      state.selectedTabData = null;
      state.selectedFormData = null;
      state.tabResources = [];
      state.tabs = [];
    },
  },
});

export const {
  setActiveTab,
  setSelectedTab,
  setSelectedTabData,
  setSelectedFormData,
  setTabResources,
  setTabs,
  resetTabState,
} = toolSlice.actions;

export default toolSlice.reducer;
