"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProProtection } from "@/hooks/use-pro-protection";

import { amountOptions, formSchema, resolutionOptions } from "./constants";


const PhotoPage = () => {
  useProProtection();

  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post('/api/photo', values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  }

  return ( 
    <div>
      <Heading
        title="Photo Generator"
        description="Generate AI Photos"
        src="/photo.png"
      />
      <div className="px-4 lg:px-8">
        <Card className="bg-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-md font-normal">
              Enter a detailed photo description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="col-span-5 md:col-span-4">
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Taj Mahal in neon colours, cyberpunk"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="col-span-5 md:col-span-1"
                    disabled={isLoading}
                    type="submit"
                  >
                    Generate
                  </Button>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="col-span-5 md:col-span-2">
                        <Select 
                          disabled={isLoading} 
                          onValueChange={field.onChange} 
                          value={field.value} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {amountOptions.map((option) => (
                              <SelectItem 
                                key={option.value} 
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resolution"
                    render={({ field }) => (
                      <FormItem className="col-span-5 md:col-span-2">
                        <Select 
                          disabled={isLoading} 
                          onValueChange={field.onChange} 
                          value={field.value} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resolutionOptions.map((option) => (
                              <SelectItem 
                                key={option.value} 
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
          <Empty label="Nothing to see here..." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
   );
}
 
export default PhotoPage;
