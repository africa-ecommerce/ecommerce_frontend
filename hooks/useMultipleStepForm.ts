import { useForm, DefaultValues } from "react-hook-form";
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
export function useMultipleStepForm<T extends Record<string, any>>(
  formFn: (data: T) => Promise<any>,
  schema: ZodSchema<T>,
  onSuccess?: (data: any) => void,
  defaultValues?: DefaultValues<T>
) {
  // Setup form with Zod validation
  const form = useForm<T>({
    resolver: zodResolver(schema),
   defaultValues: defaultValues as DefaultValues<T> || {},
    mode: "onSubmit",
  });

  // Handle form submission
  const handleSubmit = async (formData: T) => {
    try {
      // Process the form data
      const result = await formFn(formData);

      // Call onSuccess callback if provided
      if (result && onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result, error: null };
    } catch (error) {
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