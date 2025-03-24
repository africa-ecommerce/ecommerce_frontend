import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import useSWR from "swr";

/**
 * Generic hook for creating resources with form validation
 *
 * @param key - The SWR cache key
 * @param fetcher - Function to fetch the resource collection
 * @param createFn - Function to create a new resource
 * @param schema - Zod schema for validating the input
 * @returns Object with data, form utilities, and submission handler
 */
export function useCreateResource<T, InputType extends Record<string, any>>(
  key: string,
  fetcher: () => Promise<T[]>,
  createFn: (input: InputType) => Promise<T>,
  schema: ZodSchema<InputType>
) {
  // Get the current data from SWR
  const { data: swrData, mutate } = useSWR<T[]>(key, fetcher);
  const data = Array.isArray(swrData) ? swrData : [];

  // Setup form with Zod validation
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const handleSubmit = async (formData: InputType) => {
    try {
      // Create the resource
      const newResource = await createFn(formData);

      // Update the cache with the new resource
      await mutate();

      // Reset the form
      form.reset();

      return { success: true, data: newResource, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Creation error:", errorMessage);

      return { success: false, data: null, error: errorMessage };
    }
  };

  return {
    data,
    isLoading: !swrData,
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
      errors: form.formState.errors,
      isSubmitting: form.formState.isSubmitting,
    },
  };
}