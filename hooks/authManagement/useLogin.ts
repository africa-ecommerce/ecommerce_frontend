import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";


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
    try {
      // Authenticate the user
      const result = await loginFn(credentials);

      // Reset the form
      form.reset();

      // Execute success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Login error:", errorMessage);

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