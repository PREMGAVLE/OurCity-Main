import { FormConfig, FormStep } from "@/Pages/school-erp-desktop/Components/types";
import { setSelectedFormData } from "@/redux/formtool/toolslice";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useNewFormBuilderController({selectedTabData}:any) {
  const [jsonOutput, setJsonOutput] = useState("");
  const [existData, setIsExistData] = useState(false);
  const [finalData, setFinalData] = useState<any>({});
   const [steps, setSteps] = useState<FormStep[]>([]);
const dispatch=useDispatch()
  console.log("steps *************>>>",steps,finalData)
  const handleJsonSubmit=async()=>{
const data:FormConfig=JSON.parse(jsonOutput);

const updatedTemplate={
  enterprise: finalData?.enterprise,
  module:finalData?.module,
  resource:finalData?.resource,
  template_id:finalData?.template_id,
  view_type:finalData?.view_type,
  license:"new",
  roles: finalData?.roles?JSON.stringify(data?.roles):'',
  json_config: JSON.stringify(data?.json_config),
}
console.log("updatedTemplate ######",updatedTemplate)
if(existData)
{
  console.log("insert data",steps,
    finalData?.template_id,{

    updatedTemplate,existData
  })
  const templateIdVal=finalData?.template_id;
  const result=await invoke("update_template_command", {
    templateIdVal: templateIdVal,
    updatedTemplate,
  });
      // const result = await invoke("update_template_module_and_resource", {
      // module_val: selectedTabData?.module,
      // resource_val: selectedTabData?.resource,
      // updated_template: updatedTemplate});

 console.log("Template updated successfully:", result);
 dispatch(setSelectedFormData(null))
}
else
{
 const insertData= await invoke('insert_template_command', {
      args: updatedTemplate
    });
    console.log("Template insert successfully:", insertData);
    dispatch(setSelectedFormData(null))
  }

}
const deleteTemplate = async () => {
  try {
    const templateIdVal = selectedTabData?.template_id; // replace with the ID you want to delete
console.log("templateIdVal>>>>>",templateIdVal)
    const result = await invoke("delete_template_command", {
      templateIdVal,
    });

    console.log("Template deleted successfully:", result);
  } catch (error) {
    console.error("Error deleting template:", error);
  }
};

  return{
handleJsonSubmit,jsonOutput, setJsonOutput,
existData, setIsExistData,
steps, setSteps,
finalData, setFinalData,deleteTemplate
  }
}
