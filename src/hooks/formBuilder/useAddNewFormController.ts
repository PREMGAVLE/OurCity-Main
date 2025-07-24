import { invoke } from "@tauri-apps/api/core";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function useAddNewFormController({setModules,moduleList,selectedTab,onFormSelect,selectedTabData,activeTab}:any) {
    const [popupModule, setPopupModule] = useState(true);
        const [ModuleName, setModuleName] = useState('');
        const [resourceList, setResourceList] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [formData, setFormData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchByResource = async () => {
      if (!selectedTab) return;
      try {
        const response: any[] = await invoke<any[]>("fetch_templates_by_resource", {
          resource: selectedTab,
        });
        
        const parsed: any = response
          .map((item) => {
            let parsedConfig = null;
            try {
              parsedConfig = item.json_config ? JSON.parse(item.json_config) : null;
            } catch (e) {
              console.warn("Failed to parse json_config for item:", item.template_id, e);
            }
            return {
              ...item,
              json_config: parsedConfig,
            };
          })
          .filter((item) => item.module === activeTab);
        
        console.log("parsed response >>>>", parsed);
        setResourceList(parsed);
       
      } catch (err) {
        console.error("Error fetching templates by resource:", err);
      }
    };
  
    fetchByResource();
  }, [selectedTab,activeTab]);
  console.log("selectedTab>>>",selectedTab)
  console.log("response>>>>",resourceList)
  const handleModuleNameSave = () => {
    const formName = ModuleName?.trim();
    if(ModuleName)
    {
        setFormData({...formData,ModuleName:formName})
        const newModule=[...moduleList,ModuleName]
        setModules(newModule)
       
        // Reset modal state
        setPopupModule(false);
        setTitle("");
        setDescription("");
    }
    console.log("here<<<>>>",formName)
  
  };
  console.log("selectedTabData>>>>",selectedTabData)
  const handleSave = async() => {
    const formName = title.trim();
    const templateIdVal=selectedTabData?.template_id;
    const json_config :any=
    [{
        form_id: '',
        form_name:formName,
        desc:description,
        
          layout: 'vertical',
          subtab: false,
          skip: true,
       
          fields: [],
    }]
    console.log("json_config>>>",json_config)
            const template_id = `${selectedTabData?.module.trim().toLowerCase().replace(/\s+/g, "_")}_${nanoid(6)}`;
    
    const updatedTemplate={
      enterprise: selectedTabData?.enterprise,
      module:selectedTabData?.module,
      resource:selectedTab,
      template_id:template_id,
      view_type:selectedTabData?.view_type,
      license:"new",
      roles: selectedTabData?.roles,
      json_config:JSON.stringify(json_config),
    }
    const FinalData={...selectedTabData,json_config:JSON.stringify(json_config)}
    console.log("selected ",FinalData,templateIdVal)
    console.log("update payload>>>>",templateIdVal,updatedTemplate)
    // const result = await invoke("update_template_command", {
    //   templateIdVal,
    //   updatedTemplate,
    // });
    const result = await invoke("insert_template_command", {
      args: updatedTemplate

 
    });
    console.log("result>>>>",result)
    if (formName) {
      const newForm = {
        title: formName,
        description: description.trim(),
      };

      // Get existing forms from local storage
      const existingForms = JSON.parse(
        localStorage.getItem("customForms") || "[]"
      );
      console.log(existingForms);
      // Add the new form to the array
      const updatedForms = [...existingForms, newForm];

      // Save back to local storage
      localStorage.setItem("customForms", JSON.stringify(updatedForms));

      // Notify parent component
      onFormSelect(formName);

      // Reset modal state
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
    }
  };


    return{
      popupModule, setPopupModule,ModuleName, setModuleName,isModalOpen, setIsModalOpen,title, setTitle,description, setDescription,formData,
      handleModuleNameSave ,handleSave,resourceList}
  }
  
