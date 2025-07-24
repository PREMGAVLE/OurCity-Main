export interface GlobalSetting {
  key: string;           // primary
  value: string;         // JSON string or raw
  type?: string;         // optionally "boolean"|"string"|"number"|"object"
  updatedAt: string;     // ISO timestamp
}

export interface ConversationSetting {
  conversationId: string;      // primary key (match your conversation key type)
  mute?: boolean;
  pinned?: boolean;
  archived?: boolean;
  customTitle?: string;
  lastReadTimestamp?: string;  // ISO string
  themeOverride?: string;
  updatedAt: string;           // ISO timestamp
  // If you have other fields you want indexed, add here
}
export interface FeatureItem {
  /** Auto-incremented ID in IndexedDB (optional when creating new entries) */
  id?: number;
  /** Display name of the feature/module */
  name: string;
  /** Icon identifier: could be a string key matching an icon component or a URL/path */
  icon: string;
  /** Category the feature belongs to (e.g., "education", "management", etc.) */
  category: string;
  /** Tags related to the feature (e.g., ["analytics", "report"] ) */
  tags: string[];
}
// INFO: if any one want to add new Features add one more object here 
export const defaultFeatures=[
    {
        "name": "Hostel Management",
        "icon": "visitormanagementicon",
        category:'',
        tags:''
    },
    {
        "name": "Attendance",
        "icon": "visitormanagementicon",
         category:'',
        tags:''
    },
    {
        "name": "Task Management",
        "icon": "visitormanagementicon",
         category:'Management',
        tags:'management'
    }
]