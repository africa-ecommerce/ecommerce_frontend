import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";

/**
 * Hook for user registration with form validation
 *
 * @param registerFn - Function to register a new user
 * @param schema - Zod schema for validating registration input
 * @param onSuccess - Optional callback function to execute after successful registration
 * @returns Form utilities and submission handler
 */
export function useRegister<T extends Record<string, any>>(
  registerFn: (input: T) => Promise<any>,
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
      // Register the user
      const result = await registerFn(formData);

      // Reset the form
      form.reset();
       
      successToast(result.message)
      // Execute success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error("Registration error:", errorMessage);
      errorToast(errorMessage)
     
      return { success: false, data: null, error: errorMessage };
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