import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

/**
 * Hook for form with validation
 *
 * @param formFn - Function to be called when submitted
 * @param schema - Zod schema for validating reset input
 * @param onSuccess - Optional callback function to execute after successful formFn
 * @returns Form utilities and submission handler
 */
export function useFormResolver<T extends Record<string, any>>(
  formFn: (data: T) => Promise<any>,
  schema: ZodSchema<T>,
  onSuccess?: (data: any) => void
) {
  // Setup form with Zod validation
  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const handleSubmit = async (formData: T) => {
      // Reset password
      const result = await formFn(formData);

      // Reset the form
      form.reset();

      

      // Execute success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result, error: null };
    
  };

  return {
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
      errors: form.formState.errors,
      isSubmitting: form.formState.isSubmitting,
    },
  };
}
