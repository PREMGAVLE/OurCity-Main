
import { useSelector } from 'react-redux';
import init, { get_message_list, get_summary_data, Message } from '../../../public/wasm/rust_app_bl';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '@/redux/store';
import { updateConversationSetting } from "../../../rx/conversationLevelSetting";
import { setGlobalSetting } from "../../../rx/settings";
import { useConversationSocket } from '@/sockets/useConversationSocket';

type Student = {
  name: string;
  dp: string;
  context: string;
  time: string;
  message_time: string;
  unread_count: number;
};

type CheckinData = {
  checkin_count: number;
  contout: number;
  missed_checkin: number;
  late_checkin: number;
  student_list: Student[];
};

type ApiResponse = {
  status: string;
  data: CheckinData;
};
export default function useConversion() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [loadCount, setLoadCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
   const currentConversation = useSelector((state: RootState) => state.currentConversation.currentConversation);
  const conversationId = currentConversation?.conversation_id;
  const updateSetting=async()=>{
    // await setGlobalSetting('theme', 'light');
  await updateConversationSetting(conversationId, { customTitle: "Project Simplo Chat" });

}
  useEffect(() => {
    (async () => {
      await init(); // Init wasm
      const res: ApiResponse = get_summary_data("daily");
      if (res.status === "ok") {
       console.log("res summary>>>",res)
      }
    })();
  }, []);
  useEffect(()=>{
    updateSetting();

  },[conversationId])
  useEffect(() => {
    const loadWasm = async () => {
      await init();
      const result = get_message_list("check_in_out");
      const data = result.messages ? result.messages : result;
      console.log("messages>>>",result)
      setMessages(data);
    };

    loadWasm();
  }, []);

  useEffect(() => {
    setVisibleMessages(messages.slice(-loadCount));
  }, [messages, loadCount]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || loadCount >= messages.length || isLoading) return;

    if (container.scrollTop === 0) {
      const prevHeight = container.scrollHeight;
      setIsLoading(true);
      setLoadCount((prev) => prev + 10);

      // Give time for new messages to render and scroll back
      setTimeout(() => {
        const newHeight = container.scrollHeight;
        container.scrollTop = newHeight - prevHeight;
        setIsLoading(false);
      }, 100);
    }
  };
// INFO: socket connection
 useConversationSocket({
    conversationId,
    onMessageReceived: (msg) => setMessages((prev) => [...prev, msg]),
  });
  return {
    messages,
    visibleMessages,
    containerRef,
    handleScroll,
    isLoading,
    conversationId
  };
}
