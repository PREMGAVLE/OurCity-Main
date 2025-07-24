import { z } from "zod";

// Helper function to map validation rules to Zod methods
export  const getZodValidation = (validation: any[]) => {
  let schema = z.string(); // Default to a string schema

  validation.forEach((rule) => {
    if (rule.type === "required") {
      schema = schema.min(1, { message: rule.message });
    } else if (rule.type === "minLength") {
      schema = schema.min(rule.value, { message: rule.message });
    } else if (rule.type === "pattern") {
      schema = schema.regex(new RegExp(rule.value), { message: rule.message });
    } else if (rule.type === "email") {
      schema = schema.email({ message: rule.message });
    }
    // Add more validation types as needed
  });

  return schema;
};
// Function to generate a Zod schema for a given form step
export const generateZodSchema = (fields: any[]) => {
    const schemaObj: { [key: string]: any } = {};
  
    fields.forEach((field) => {
      const fieldName = field.name;
      const validations = field.validation || [];
  
      // Map the validations dynamically
      schemaObj[fieldName] = getZodValidation(validations);
    });
  
    return z.object(schemaObj);
  };
  // Utility to convert a field to zod schema
export  const getZodSchemaFromField = (field:any) => {
    let schema:any = z.any();
  
    for (const rule of field.validation || []) {
      switch (rule.type) {
        case "required":
          schema = z.string().min(1, rule.message);
          break;
        case "minLength":
          schema = schema.min(rule.value, rule.message);
          break;
        case "pattern":
          schema = schema.regex(new RegExp(rule.value), rule.message);
          break;
        default:
          break;
      }
    }
  
    return schema;
  };
  export const buildZodSchemaFromFields = (fields: any[]) => {
    const schemaShape: any = {};
  
    fields.forEach((field) => {
      console.log("###",field)
      if (field.type === "row") {

        field.fields.forEach((f: any) => {
          console.log("in f>>>>",f)
          if (f?.isRequired) {
            console.log("in side", schemaShape,f.name)
          schemaShape[f.name] = createZodField(f);}
        });
      } else {
        if (field?.isRequired) {
          schemaShape[field.name] = createZodField(field); // Only create schema for required fields
        }
        
        // schemaShape[field.name] = createZodField(field);
      }
    });
    return z.object(schemaShape);
  };
   // schema = z
          //   .string({
          //     required_error: rule.message || `${field.label || field.name} is required`,
          //   })
          //   .min(1, rule.message || `${field.label || field.name} is required`);
        
  export  const createZodField = (field: any) => {
    let schema :any= z.any();
   // Set schema based on field type
  switch (field.type) {
    case "text":
    case "email":
      schema = z.string(); // Default to string for text-based fields
      break;
    case "checkbox":
      schema = z.boolean(); // Boolean for checkbox fields
      break;
    // Add other field types as needed
    default:
      schema = z.any(); // Fallback to any type
  }
    for (const rule of field.validation || []) {
        console.log("rule>>>",rule,field)
      switch (rule.type) {
        case "required":
          schema = z
            .string({
              required_error: rule.message || `${field.label || field.name} is required`,
            })
            .min(1, rule.message || `${field.label || field.name} is required`);
          // if (schema instanceof z.ZodString) {
          //   schema = schema.min(1, rule.message || `${field.label || field.name} is required`);
          // } else if (schema instanceof z.ZodBoolean) {
          //   schema = schema.refine((value) => value === true || value === false, {
          //     message: rule.message || `${field.label || field.name} is required`,
          //   });
          // }
        
          break;
          case "checkbox":
            schema = z.boolean(); // Handle boolean fields like checkboxes
            break;
        case "minLength":
          schema = (schema as z.ZodString).min(rule.value, rule.message);
          break;
        case "maxLength":
          schema = (schema as z.ZodString).max(rule.value, rule.message);
          break;
        case "pattern":
          schema = (schema as z.ZodString).regex(new RegExp(rule.value), rule.message);
          break;
        // add more cases as needed
      }
    }
    console.log("schema>>>",schema)
    return schema;
  };
  type GetSchemaOptions = {
    currentForm: any;
    formData: any;
    activeSubTab?: string;
  };
  
  export const getSchemaAndDataToValidate = ({
    currentForm,
    formData,
    activeSubTab,
  }: GetSchemaOptions) => {
    const fields = currentForm?.fields || [];
    const zodSchema = buildZodSchemaFromFields(fields);
  
    const isSubtab = currentForm?.subtab;
    const selectedSubtab = activeSubTab || "";
    const dataToValidate = isSubtab && formData[selectedSubtab]
      ? formData[selectedSubtab]
      : formData;
  
    return { zodSchema, dataToValidate };
  };