import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { credentialSchema } from "@/types/credential"; // Import the Zod schema
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; // Replace with actual imports
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Define the form values based on the schema
type CredentialFormValues = z.infer<typeof credentialSchema>;

const CredentialForm = ({ handleSubmit, initialData }: { handleSubmit: (data: any) => void, initialData?: any }) => {
  const form = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
  });

  const onSubmit = async (data: CredentialFormValues) => {
    console.log('Form submitted:', data);
    handleSubmit(data);
  };

  // Reset the form with initial data if available
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-auto">
        {/* Name */}
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register("name")} placeholder="Enter name" />
          </FormControl>
          <FormMessage>{form.formState.errors.name?.message}</FormMessage>
        </FormItem>

        {/* Description */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...form.register("description")} placeholder="Enter description (optional)" />
          </FormControl>
          <FormMessage>{form.formState.errors.description?.message}</FormMessage>
        </FormItem>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="bg-green-600 text-white">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CredentialForm;
