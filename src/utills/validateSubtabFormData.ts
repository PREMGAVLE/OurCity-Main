import { ZodSchema, ZodError } from "zod";

export const validateSubtabFormData = (
  schema: ZodSchema<any>,
  formData: any,
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  try {
    schema.parse(formData);
    setErrors({});
    return true;
  } catch (error) {
  
    if (error instanceof ZodError) {
      console.log("error*****",  error.errors,schema)
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
     
        const path = err.path.join(".");
        console.log("kajal>>", newErrors[path],err.message)
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
    }
    return false;
  }
};