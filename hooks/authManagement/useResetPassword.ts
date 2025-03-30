import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";

/**
 * Hook for password reset with form validation
 *
 * @param resetFn - Function to reset user password
 * @param schema - Zod schema for validating reset input
 * @param onSuccess - Optional callback function to execute after successful reset
 * @returns Form utilities and submission handler
 */
export function useResetPassword<T extends Record<string, any>>(
  resetFn: (data: T) => Promise<any>,
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
      // Reset password
      const result = await resetFn(formData);

      // Reset the form
      form.reset();

      // Show success toast
      successToast(result.message || "Password reset successful");

      // Execute success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Password reset error:", errorMessage);

      // Show error toast
      errorToast(errorMessage);

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
