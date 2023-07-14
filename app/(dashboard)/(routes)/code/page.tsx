"use client";

import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SyntaxHighlighter from 'react-syntax-highlighter';

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { useProProtection } from "@/hooks/use-pro-protection";
import { UserAvatar } from "@/components/user-avatar";

import { formSchema } from "./constants";
import { Empty } from "@/components/ui/empty";

const formatCode = (code: string) => {
  return code.replace(/\n/g, "<br />")
}

const CodePage = () => {
  useProProtection();
  
  const [messages, setMessages] = useState<{ isUser: boolean; message: string; }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  
  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessages((current) => [{ isUser: true, message: values.prompt }, ...current]);
      
      const response = await axios.post('/api/code', values);
      setMessages((current) => [{ isUser: false, message: response.data }, ...current]);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  }

  return ( 
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="React.js snippet for a toggle button using hooks" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No code generated." />
          )}
          {messages.map((message) => (
            <div 
              key={message.message} 
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.isUser ? "bg-white border border-black/10" : "bg-muted",
              )}
            >
              <div className="hidden md:block">
                {!message.isUser ? <BotAvatar /> : <UserAvatar />}
              </div>
              {message.isUser && <div>{message.message}</div>}
              {!message.isUser && (
                <SyntaxHighlighter showLineNumbers customStyle={{ fontSize: 16 }}>
                  {message.message}
                </SyntaxHighlighter>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
   );
}
 
export default CodePage;
