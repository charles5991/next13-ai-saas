"use client";

import * as z from "zod";
import axios from "axios";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";

import { formSchema } from "./constants";
import { useProProtection } from "@/hooks/use-pro-protection";

const ChatPage = () => {
  useProProtection();
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ isUser: boolean; message: string; }[]>([
    {
      isUser: false,
      message: "How may I assist you today?"
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  
  const isLoading = form.formState.isSubmitting;
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessages((current) => [...current, { isUser: true, message: values.prompt }]);
      
      const response = await axios.post('/api/chat', values);
      setMessages((current) => [...current, { isUser: false, message: response.data }]);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  }

  return ( 
    <div>
      <Heading
        title="Chatbot"
        description="Chat with an AI Assistant."
        src="/chat.png"
      />
      <div className="px-4 lg:px-8">
        <Card className="h-[64vh] relative">
          <CardContent className="p-0 h-[calc(100%-80px)] overflow-auto">
            {messages.map((message) => (
              <div 
                key={message.message} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8",
                  message.isUser ? "bg-white" : "bg-muted",
                )}
              >
                {!message.isUser && <BotAvatar />}
                <p>
                  {message.message}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="p-8 w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            <div ref={chatEndRef} />
          </CardContent>
          <CardFooter className="py-5 absolute bottom-0 w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-x-4 w-full">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input 
                          disabled={isLoading} 
                          placeholder="Write a Facebook ad for a restaurant." 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="w-12" type="submit" size="icon">
                  <Send />
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </div>
   );
}
 
export default ChatPage;
