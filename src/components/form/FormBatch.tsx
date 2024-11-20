import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { batchSchema } from "@/types/batch";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetAllProduct } from "@/services/productService";

type BatchFormValues = z.infer<typeof batchSchema>;

const BatchForm = ({
  handleSubmit,
  initialData,
}: {
  handleSubmit: (data: any) => void;
  initialData?: any;
}) => {
  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
  });
  console.log(initialData);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await GetAllProduct();
      setProducts(res.result.data);
    };
    const productIds = []
    if (initialData)
    for (let product of initialData.products) {
      productIds.push(product.id)
    }
    fetchProducts();
    form.reset({...initialData, productIds: productIds});
    console.log('Test: ',{...initialData, productIds: productIds});
  }, [initialData, form]);

  const toggleProductSelection = (product: any) => {
    const currentSelectedIds: string[] = form.getValues("productIds") || [];
    const currentTotalPrice: number = form.getValues("price") || 0;

    if (currentSelectedIds.includes(product.id)) {
      const updatedIds = currentSelectedIds.filter((id) => id !== product.id);
      const updatedPrice = currentTotalPrice - product.price;

      form.setValue("productIds", updatedIds);
      form.setValue("price", updatedPrice);
    } else {
      const updatedIds = [...currentSelectedIds, product.id];
      const updatedPrice = currentTotalPrice + product.price;

      form.setValue("productIds", updatedIds);
      form.setValue("price", updatedPrice);
    }
  };

  const onSubmit = async (data: BatchFormValues) => {
    console.log("Form submitted:", data);
    handleSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 overflow-auto h-[80vh]"
      >
        {/* Name */}
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register("name")} placeholder="Batch Name" />
          </FormControl>
          <FormMessage>{form.formState.errors.name?.message}</FormMessage>
        </FormItem>

        {/* Description */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              {...form.register("description")}
              placeholder="Batch Description"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.description?.message}</FormMessage>
        </FormItem>

        {/* Product Selection */}
        <FormItem>
          <FormLabel>Select Products</FormLabel>
          <div className="grid grid-cols-2 gap-4 max-h-[20em] overflow-auto">
            {products.map((product: any) => {
              const selectedProductIds = form.watch("productIds") || [];
              console.log('Check: ',selectedProductIds);
              return (
                <div
                  key={product.id}
                  className={`p-4 border rounded ${
                    selectedProductIds.includes(product.id)
                      ? "bg-green-200"
                      : "bg-white"
                  }`}
                  onClick={() => toggleProductSelection(product)}
                >
                  <h4 className="font-bold">{product.name}</h4>
                  <p>Price: ${product.price}</p>
                </div>
              );
            })}
          </div>
        </FormItem>

        {/* Total Price */}
        <FormItem>
          <FormLabel>Total Price</FormLabel>
          <FormControl>
            <Input
              value={form.watch("price") || 0}
              placeholder="0"
              disabled
            />
          </FormControl>
          <FormMessage>{form.formState.errors.price?.message}</FormMessage>
        </FormItem>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="bg-green-600 text-white">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BatchForm;

