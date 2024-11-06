import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema} from "@/types/product"; // Import the Zod schema
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; // Replace with actual imports
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea} from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

// Define the form values based on the schema
type KoiFishFormValues = z.infer<typeof productSchema>;

const KoiFishForm = () => {
  const form = useForm<KoiFishFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: KoiFishFormValues) => {
    console.log('Test');
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-auto h-[80vh]">

        {/* Name */}
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register("name")} placeholder="Cá Koi 2" />
          </FormControl>
          <FormMessage>{form.formState.errors.name?.message}</FormMessage>
        </FormItem>

        {/* Description */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...form.register("description")} placeholder="Description" />
          </FormControl>
          <FormMessage>{form.formState.errors.description?.message}</FormMessage>
        </FormItem>

        {/* Price */}

        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("price", { valueAsNumber: true })}
              placeholder="10000"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.price?.message}</FormMessage>
        </FormItem>

        {/* Origin */}
        <FormItem>
          <FormLabel>Origin</FormLabel>
          <FormControl>
            <Input {...form.register("origin")} placeholder="Japan" />
          </FormControl>
          <FormMessage>{form.formState.errors.origin?.message}</FormMessage>
        </FormItem>

        {/* Age */}
        <FormItem>
          <FormLabel>Age</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("age", { valueAsNumber: true })}
              placeholder="1"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.age?.message}</FormMessage>
        </FormItem>

        {/* Weight */}
        <FormItem>
          <FormLabel>Weight (grams)</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("weight", { valueAsNumber: true })}
              placeholder="1000"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.weight?.message}</FormMessage>
        </FormItem>

        {/* Length */}
        <FormItem>
          <FormLabel>Length (mm)</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("length", { valueAsNumber: true })}
              placeholder="1000"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.length?.message}</FormMessage>
        </FormItem>

        {/* Species */}
        <FormItem>
          <FormLabel>Species</FormLabel>
          <FormControl>
            <Input {...form.register("species")} placeholder="Koi" />
          </FormControl>
          <FormMessage>{form.formState.errors.species?.message}</FormMessage>
        </FormItem>

        {/* Color */}
        <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            <Input {...form.register("color")} placeholder="Red and White" />
          </FormControl>
          <FormMessage>{form.formState.errors.color?.message}</FormMessage>
        </FormItem>

        {/* Feeding Volume */}
        <FormItem>
          <FormLabel>Feeding Volume</FormLabel>
          <FormControl>
            <Input {...form.register("feedingVolumn")} placeholder="Standard" />
          </FormControl>
          <FormMessage>{form.formState.errors.feedingVolumn?.message}</FormMessage>
        </FormItem>

        {/* Filter Rate */}
        <FormItem>
          <FormLabel>Filter Rate</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("filterRate", { valueAsNumber: true })}
              placeholder="0"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.filterRate?.message}</FormMessage>
        </FormItem>

        {/* Gender */}
        <FormItem>
  <FormLabel>Gender</FormLabel>
  <FormControl>
  <select
      {...form.register("gender", { valueAsNumber: true })}
      defaultValue=""
      className="w-[180px] border border-gray-300 rounded p-2"
    >
      <option value="" disabled>Select gender</option>
      <option value={0}>Female</option>
      <option value={1}>Male</option>
    </select>
  </FormControl>
  {/* <FormMessage>{form.formState.errors.gender?.message}</FormMessage> */}
</FormItem>

        {/* Inventory */}
        <FormItem>
          <FormLabel>Inventory</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...form.register("inventory", { valueAsNumber: true })}
              placeholder="0"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.inventory?.message}</FormMessage>
        </FormItem>

        {/* Category ID */}
        <FormItem>
          <FormLabel>Category ID</FormLabel>
          <FormControl>
            <Input {...form.register("categoryId")} placeholder="3d4fc185-049d-4a96-851b-1d320e7dbba8" />
          </FormControl>
          <FormMessage>{form.formState.errors.categoryId?.message}</FormMessage>
        </FormItem>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default KoiFishForm;
