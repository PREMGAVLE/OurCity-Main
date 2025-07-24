import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import {
  setActiveTab,
  setActiveTab as setActiveTabAction,
  setSelectedTab as setSelectedTabAction,
  setTabs as setTabsAction
} from '@/redux/formtool/toolslice';
import { RootState } from "@/redux/store";

export default function useDashboardController() {
      const [popupModule, setPopupModule] = useState(false);
        const [modules, setModules] = useState<string[]>([]);
        const dispatch = useDispatch();
        const tabs = useSelector((state: RootState) => state.tool.tabs);
        const selectedTab = useSelector((state: RootState) => state.tool.selectedTab);
        const activeTab = useSelector((state: RootState) => state.tool.activeTab);
        const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
      const [ModuleName, setModuleName] = useState('');
      const [tabName, setTabName] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      
      const handleJsonSubmit=async()=>{
        const template_id = `${ModuleName.trim().toLowerCase().replace(/\s+/g, "_")}_${nanoid(6)}`;
        const updatedTemplate={
          enterprise: "school",
          module:ModuleName,
          resource:"",
          template_id:template_id,
          view_type:"",
          license:"new",
          roles: '',
          json_config:'',
        }
        
       
        
         const insertData= await invoke('insert_template_command', {
              args: updatedTemplate
            });
            console.log("Template insert successfully:", insertData);
          }
          const handleTabsStore=async()=>{
            const template_id = `${activeTab.trim().toLowerCase().replace(/\s+/g, "_")}_${nanoid(6)}`;
            const updatedTemplate={
              enterprise: "school",
              module:activeTab,
              resource:tabName,
              template_id:template_id,
              view_type:"",
              license:"new",
              roles: '',
              json_config:'',
            }
            
           dispatch(setActiveTab(activeTab))
            
             const insertData= await invoke('insert_template_command', {
                  args: updatedTemplate
                });
                console.log("Template insert successfully:", insertData);
              }  
      const handleModuleNameSave = () => {
        const formName = ModuleName?.trim();
        if(ModuleName)
        {
        
            const newModule=[...modules,ModuleName]
            setModules(newModule)
            handleJsonSubmit()
            // Reset modal state
            setPopupModule(false);
            setTitle("");
            setDescription("");
        }
        console.log("here<<<>>>",formName)
      
      };
      const handleTabNameSave = () => {
        const formName = tabName?.trim();
        if(tabName)
        {
        
          const Tabs = 
            { name:tabName ,src: "/assets/Contract.svg" }
          
          
            const newTabs:any=[...tabs,Tabs]
            dispatch(setTabsAction(newTabs))
            dispatch(setSelectedTabAction(Tabs?.name))
            dispatch(setActiveTabAction(ModuleName))
            handleTabsStore()
            // Reset modal state
            setIsModalOpen(false);
            setTabName("");
            setDescription("");
        }
        console.log("here<<<>>>",formName)
      
      };
      
  return{
    popupModule,
    setPopupModule,
    ModuleName,
    setModuleName,
    modules,
    setModules,
    title,
    description,
    setDescription,
    setTitle,
    handleModuleNameSave,
    isModalOpen,
    setIsModalOpen,
    setTabName,
    tabName,
    handleTabNameSave,
    tabs,
    selectedTab,
    activeTab,
  }
}
