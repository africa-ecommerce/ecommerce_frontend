import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { ZodSchema } from "zod";


/**
 * Hook for updating resources with form validation
 *
 * @param key - The SWR cache key
 * @param fetcher - Function to fetch the current resource
 * @param updateFn - Function to update the resource
 * @param schema - Zod schema for validating update input
 * @returns Object with data, form utilities, and submission handler
 */
export function useUpdateResource<T, InputType extends Record<string, any>>(
  key: string | null,
  fetcher: () => Promise<T>,
  updateFn: (input: InputType) => Promise<T>,
  schema: ZodSchema<InputType>
) {
  // Get the current data from SWR
  const { data, mutate, isLoading, error } = useSWR<T>(key, fetcher);

  // Setup form with Zod validation and default values
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    values: data as unknown as InputType,
  });

  // Handle form submission
  const handleSubmit = async (formData: InputType) => {
    try {
      // Update the resource
      const updatedResource = await updateFn(formData);

      // Trigger revalidation
      await mutate();

      return { success: true, data: updatedResource, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Update error:", errorMessage);

      return { success: false, data: null, error: errorMessage };
    }
  };

  return {
    data,
    isLoading,
    error,
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
      errors: form.formState.errors,
      isSubmitting: form.formState.isSubmitting,
      reset: () => form.reset(data as unknown as InputType),
    },
  };
}
