"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProProtection } from "@/hooks/use-pro-protection";

import { formSchema } from "./constants";

const VoicePage = () => {
  useProProtection();

  const [voice, setVoice] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVoice(undefined);

      const response = await axios.post('/api/voice', values);

      setVoice(response.data.audio_out);
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  }

  return ( 
    <div>
      <Heading
        title="Voice Generator"
        description="Generate AI Voices"
        src="/voice.png"
      />
      <div className="px-4 lg:px-8">
        <Card className="bg-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-md font-normal">
              Enter a sentence you want the AI to say!
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
                            placeholder="Hello, my name is Antonio, uh - and I like programming. [laughs]"
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
        {!voice && !isLoading && (
          <Empty label="Nothing to see here..." />
        )}
        {voice && (
          <audio controls className="w-full mt-8">
            <source src={voice} />
          </audio>
        )}
      </div>
    </div>
   );
}
 
export default VoicePage;
