import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Bot, User, Send, BarChart3 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Census Data Assistant. I can help you find information about food and material insecurity across the United States. Try asking me about specific states, counties, or cities.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      apiRequest("POST", "/api/ai-census", { message }),
    onSuccess: (response) => {
      response.json().then((data) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get response from AI assistant",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(inputMessage.trim());
    setInputMessage("");
  };

  const handleSampleQuery = (query: string) => {
    setInputMessage(query);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sampleQueries = [
    "Food insecurity rates in Maryland",
    "SNAP participation rates in Prince George's County",
    "College student hunger statistics nationwide",
    "Material insecurity data for Washington DC area",
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <BarChart3 className="h-12 w-12 text-brand-blue mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              AI Census Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get real-time data about food and material insecurity hotspots across the United States. 
            Our AI assistant provides census data to help identify underserved communities.
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            {/* Chat Header */}
            <CardHeader className="bg-brand-blue text-white rounded-t-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Census Data Assistant</CardTitle>
                  <p className="text-blue-100 text-sm">Ask about food insecurity data in any US location</p>
                </div>
              </div>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-brand-blue text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      {message.role === "user" && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {chatMutation.isPending && (
                    <div className="flex items-start justify-start">
                      <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs lg:max-w-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about food insecurity data..."
                    className="flex-1"
                    disabled={chatMutation.isPending}
                  />
                  <Button
                    type="submit"
                    className="bg-brand-blue hover:bg-blue-700 text-white"
                    disabled={!inputMessage.trim() || chatMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Sample Queries */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4">Try these sample queries:</p>
            <div className="flex flex-wrap gap-3">
              {sampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-brand-blue border-brand-blue hover:bg-blue-50"
                  onClick={() => handleSampleQuery(query)}
                  disabled={chatMutation.isPending}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This AI assistant provides general information about food and material 
              insecurity based on available census and government data. For the most current local data, 
              please consult official sources such as the USDA, Census Bureau, or local government agencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
