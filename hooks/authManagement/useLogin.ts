import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";


/**
 * Hook for user login with form validation
 *
 * @param loginFn - Function to authenticate a user
 * @param schema - Zod schema for validating login input
 * @param onSuccess - Optional callback function to execute after successful login
 * @returns Form utilities and submission handler
 */
export function useLogin<T extends Record<string, any>>(
  loginFn: (credentials: T) => Promise<any>,
  schema: ZodSchema<T>,
  onSuccess?: (data: any) => void
) {
  // Setup form with Zod validation
  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const handleSubmit = async (credentials: T) => {
      // Authenticate the user
      const result = await loginFn(credentials);

      // Reset the form
      form.reset();
 
      

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