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
    try {
      // Call form function and get result
      const result = await formFn(formData);

      // Only proceed if result is not null (indicating success)
      if (result !== null) {
        form.reset();
        if (onSuccess) {
          onSuccess(result);
        }
        return { success: true, data: result, error: null };
      }

      // If result is null, there was an error but it was already handled
      return { success: false, data: null, error: "Operation failed" };
    } catch (error) {
      console.error("Form submission error:", error);
      return { success: false, data: null, error };
    }
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