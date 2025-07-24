import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../../../rx/conversations';

/**
 * State holds only the current conversation data.
 */
interface CurrentConversationState {
  currentConversation: (ConversationType & { id: number }) | null;
}

const initialState: CurrentConversationState = {
  currentConversation: null,
};

const conversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    /**
     * Set the current conversation data.
     * Payload: full conversation object including id.
     */
    setCurrentConversationData(state, action: PayloadAction<ConversationType & { id: number }>) {
      state.currentConversation = action.payload;
    },
    /**
     * Clear the current conversation.
     */
    clearCurrentConversationData(state) {
      state.currentConversation = null;
    },
  },
});

export const { setCurrentConversationData, clearCurrentConversationData } = conversationSlice.actions;
export default conversationSlice.reducer;
