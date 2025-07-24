
import { useEffect, useRef, useState } from "react";
import Platform from "../platform/Platform";
import { useLocation, useNavigate } from "react-router-dom";
import useChatSocket, { SocketMessage } from "./useChatSocket";
import { MessageDirection } from "../../../rx/messages";
import API from "@/api/axiosInstance"
import { getChatReciever_info, getChatUser_Url } from "@/api/urls";
import { useGroupSocket } from "./useGroupSocket";
export type MessageDirection = "Sender" | "Receiver";

// export type Message = {
//   id: string;
//   sender: string;
//   content: string;
//   message_type: string;
//   direction: MessageDirection;
// };

type Person = {
  name: string;
  status: string;
  time: string;
  count: number;
  image: string;
  checkStatus: string;
};

export interface ChatUserInfo {
  name: string;
  lastSeen: string;
}

export interface Message {
  id: string;
  sender: string;
  direction: MessageDirection;
  content: string;
  message_type: string;
  timestamp: string;

}

export interface GroupMessage {
  id: string;
  sender: string;
  direction: MessageDirection;
  content: string;
  message_type: string;
  timestamp: string;
  Payload: any;
}
const useChatController = (
  currentUserId: string,
  receiverId: string,
  chatType: "user" | "group" = "user"
) => {
  const [chatList, setChatList] = useState<Message[]>([]);
  const [allPeople, setAllPeople] = useState<Message[]>([]);

  const [facilityId, setFacilityId] = useState("all");
  const [focusFilter, setFocusFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

   const navigate= useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      const data: any = await Platform().getChatuser(facilityId, focusFilter, searchQuery);
      console.log("platform conv data>>>", data)
      if (data?.success) {
        setChatList(data?.data?.list);
        setAllPeople(data?.data?.list);
      }
      // const storedData = JSON.parse(localStorage.getItem("chatpepole") || "[]");

      // setChatList([...storedData]); 
      // setAllPeople(storedData);             
    };

    fetchData();
  }, [facilityId, focusFilter, searchQuery]);

  // Handle local search filtering
  // useEffect(() => {
  //   if (searchQuery.trim()) {
  //     const filtered = allPeople.filter((item: { name: string }) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setChatList([...filtered].reverse());
  //   } else {
  //     setChatList([...allPeople].reverse());
  //   }
  // }, [searchQuery, allPeople]);


  const [people, setPeople] = useState<Person[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Platform().getPeople();
      if (response.success) {
        setPeople(response.data.list);
        setFilterStatus(null);
        console.log(">>>>profile>>>>", response.data.list);
      } else {
        console.error("Failed to fetch people:", response.data.message);
      }
    };

    fetchUsers();
  }, []);

  const filteredPeople = filterStatus
    ? people.filter((p) => p.checkStatus === filterStatus)
    : people;

  // function RoleBasedComponent 
  const location = useLocation();
  const containerRef = useRef(null);
  const [selfieAdded, setSelfieAdded] = useState(false);
  const [Capture, setCapture] = useState(false);

  const storedSelfies = JSON.parse(localStorage.getItem("selfies") || "[]");
  const CapturePhoto = JSON.parse(localStorage.getItem("CapturePhoto") || "[]");

  useEffect(() => {
    if (storedSelfies.length) setSelfieAdded(true);
    if (CapturePhoto.length) setCapture(true);
  }, []);

  // for chats.tsx
  const [searchTerm, setSearchTerm] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('1');
  const role = location.state?.role;

  useEffect(() => {
    const storedToggle = localStorage.getItem('chat-toggle');
    const initialToggle = storedToggle === 'true';
    setIsToggled(initialToggle);

    const defaultTab = (role === 'parent' || role === 'admin') ? '2' : '1';
    setActiveTab(defaultTab);
  }, [role]);

  const handleToggle = (checked: boolean) => {
    setIsToggled(checked);
    localStorage.setItem('chat-toggle', String(checked));

    if (!checked) {
      setActiveTab('1');
    }
  };

  const handleContactPick = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const contacts = await (navigator as any).contacts.select(
          ['name', 'tel'],
          { multiple: false }
        );

        if (contacts.length > 0) {
          const contact = contacts[0];
          console.log('Selected contact:', contact);

          const name = contact.name?.[0] ?? 'Unknown';
          const phone = contact.tel?.[0] ?? '';

          alert(`Start a chat with:\n${name} - ${phone}`);
          // Integrate further actions here like starting chat
        }
      } catch (error) {
        console.error('Contact selection canceled or failed:', error);
      }
    } else {
      alert('Contact Picker is not supported on this device or browser.');
    }
  };




  //<<<<<<<<<<<<<<<<<new message functionalty in socket io>>>>>>>>>>>>>>>>>>>>>>>

  const [messages, setMessages] = useState<Message[]>([]);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [chatUser, setChatUser] = useState<ChatUserInfo | null>(null);

  const formatLastSeen = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `last seen today at ${time}`;
    if (isYesterday) return `last seen yesterday at ${time}`;
    const formattedDate = date.toLocaleDateString([], { day: "numeric", month: "short" });
    return `last seen on ${formattedDate} at ${time}`;
  };

  const fetchChatPartner = async () => {
    try {
      const res = await API.get(getChatUser_Url(currentUserId));
      const chats = res?.data?.data || [];
      console.log("Chats:", chats);

      const matched = chats.find((chat: any) => chat._id === receiverId);

      if (!matched) {
        // fallback for direct 1-1 chat
        const fallback = await API.get(getChatReciever_info(receiverId));
        const userInfo = fallback.data?.user;
        if (userInfo) {
          const name = userInfo.userName || "Unknown";
          const isOnline = userInfo.online;
          const lastSeenTime = userInfo.updatedAt || new Date().toISOString();

          setChatUser({
            name,
            lastSeen: isOnline ? "Online" : formatLastSeen(lastSeenTime),
          });
        }
        return;
      }

      // Handle group chat
      if (matched.type === "group") {
        const groupName = matched.name || "Unnamed Group";
        const memberIds = matched.members || [];
        const lastSeenTime = matched.last_activity || new Date().toISOString();

        // Optional: Fetch all member names using their IDs (if needed)
        // Assuming you have an API like /api/auth/user/:id
        const memberNames: string[] = [];

        for (const memberId of memberIds) {
          try {
            const res = await API.get(`/api/auth/user/${memberId}`);
            const name = res.data?.user?.userName || "Unknown";
            memberNames.push(name);
          } catch {
            memberNames.push("Unknown");
          }
        }

        setChatUser({
          name: `${groupName} `,
          lastSeen: (""), // or use group_status_message here
        });

      } else {
        // Handle one-to-one chat
        const name = matched.userInfo?.name || matched.userName || "Unknown";
        const isOnline = matched?.online;
        const lastSeenTime = matched.last_activity || new Date().toISOString();

        setChatUser({
          name,
          lastSeen: isOnline ? "Online" : formatLastSeen(lastSeenTime),
        });
      }
    } catch (err) {
      console.error("Error fetching chat user", err);
    }
  };


  useEffect(() => {
    if (currentUserId && receiverId) fetchChatPartner();
  }, [currentUserId, receiverId]);

  const { sendSocketMessage } = useChatSocket(
    currentUserId,
    receiverId,
    (msg: SocketMessage) => {
      if (msg.senderId === receiverId) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: msg.senderId,
            direction: MessageDirection.Incoming,
            content: msg.message,
            message_type: "text",
            timestamp: msg.timestamp || new Date().toISOString(),
            Payload: null,
          }
        ]);
      }
    },
    (initialMessages: SocketMessage[]) => {
      const formatted = initialMessages.map(msg => ({
        id: Date.now().toString() + Math.random(),
        sender: msg.senderId,
        direction: msg.senderId === currentUserId ? MessageDirection.Outgoing : MessageDirection.Incoming,
        content: msg.message,
        message_type: "text",
        timestamp: msg.timestamp || new Date().toISOString(),
      }));
      setMessages(formatted);
    }
  );
  //group>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const { sendGroupMessage } = useGroupSocket(
    currentUserId,
    chatType === "group" ? receiverId : "", // ✅ only pass if it's a group
    (msg) => {
      if (msg.groupId === receiverId) {
        setGroupMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: msg.senderId,
          direction: MessageDirection.Receiver,
          content: msg.message,
          message_type: "text",
          timestamp: msg.timestamp || new Date().toISOString(),
          Payload: msg.payload || null,
        }]);
      }
    },
    (initialMessages) => {
      const formatted = initialMessages.map((msg) => ({
        id: Date.now().toString() + Math.random(),
        sender: msg.senderId,
        direction: msg.senderId === currentUserId ? MessageDirection.Sender : MessageDirection.Receiver,
        content: msg.message,
        message_type: "text",
        timestamp: msg.timestamp || new Date().toISOString(),
        Payload: msg.payload || null,
      }));
      setGroupMessages(formatted);
    }
  );


  const handleSendGroupMessage = (msg: string | File[]) => {
    if (typeof msg === "string" && msg.trim()) {
      const payload: SocketMessage = {
        senderId: currentUserId,
        groupId: receiverId,
        message: msg,
        timestamp: new Date().toISOString(),
      };

      sendGroupMessage(payload);

      setGroupMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: currentUserId,
          direction: MessageDirection.Sender,
          content: msg,
          message_type: "text",
          timestamp: payload.timestamp!,
          Payload: null,
        }
      ]);
    }
  };

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const handleSendMessage = (msg: string | File[]) => {
    if (typeof msg === "string" && msg.trim()) {
      const payload: SocketMessage = {
        senderId: currentUserId,
        receiverId,
        message: msg,
        timestamp: new Date().toISOString(),
      };

      sendSocketMessage(payload);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: currentUserId,
          direction: MessageDirection.Outgoing,
          content: msg,
          message_type: "text",
          timestamp: payload.timestamp!,
        }
      ]);
    }
  };



  //<<<<<<<<<<<<< Group Create Functionality >>>>>>>>>>>>>>>>>>>>>>>>>

  // Group creation states
  const [groupName, setGroupName] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdGroupName, setCreatedGroupName] = useState('');

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!user?._id) return;

    API.get(`/api/chat/full-chat-list/${user._id}`)
      .then(res => {
        setContacts(res.data.data || []);
      })
      .catch(err => {
        console.error("❌ API Error:", err.response?.data || err.message || err);
      });
  }, [user?._id]);

  const handleCreateGroup = async () => {
    if (!groupName || selectedMembers.length < 2) {
      alert('Please enter group name and select at least 2 members');
      return;
    }

    try {
      const res = await API.post('/api/group/groups', {
        name: groupName,
        members: selectedMembers,
        admins: [user?._id]
      });
      localStorage.setItem("groupID", res.data._id);
      setCreatedGroupName(res.data.name);
      setShowSuccessDialog(true);
    } catch (err) {
      console.error(err);
      alert('Error creating group');
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    navigate('/chatlist');
  };

  return {
    chatList, facilityId, setFacilityId, setSearchQuery, searchQuery, focusFilter, setFocusFilter,
    people, allPeople, filteredPeople, filterStatus, setFilterStatus,
    location, containerRef, selfieAdded, setSelfieAdded, storedSelfies, Capture,
    searchTerm, setSearchTerm, isToggled, setIsToggled, activeTab, setActiveTab,
    handleToggle,
    handleContactPick,
    role,
    messages,
    groupMessages,
    chatUser,
    handleSendMessage,
    handleSendGroupMessage,
    groupName, setGroupName,
    contacts, selectedMembers, setSelectedMembers,
    showSuccessDialog, setShowSuccessDialog,
    createdGroupName,
    handleCreateGroup,
    handleCloseDialog,

  };
}
export default useChatController;