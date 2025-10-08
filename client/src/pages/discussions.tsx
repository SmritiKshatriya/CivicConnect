import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDiscussionSchema, type InsertDiscussion, type Discussion } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Send } from "lucide-react";

export default function DiscussionsPage() {
  const { toast } = useToast();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { data: discussions, isLoading } = useQuery<Discussion[]>({
    queryKey: ["/api/discussions"],
  });

  const form = useForm<InsertDiscussion>({
    resolver: zodResolver(insertDiscussionSchema),
    defaultValues: {
      author: "",
      content: "",
      parentId: "",
    },
  });

  const createDiscussionMutation = useMutation({
    mutationFn: async (data: InsertDiscussion) => {
      return await apiRequest("POST", "/api/discussions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discussions"] });
      form.reset();
      setReplyingTo(null);
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the discussion.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDiscussion) => {
    createDiscussionMutation.mutate({
      ...data,
      parentId: replyingTo || undefined,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const topLevelDiscussions = discussions?.filter((d) => !d.parentId) || [];
  const getReplies = (parentId: string) =>
    discussions?.filter((d) => d.parentId === parentId) || [];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-8" />
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardHeader>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">
            Community Discussions
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Join the conversation and engage with your community.
          </p>
        </div>

        {/* New Comment Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          data-testid="input-author"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts..."
                          className="min-h-24 resize-none"
                          data-testid="input-content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={createDiscussionMutation.isPending}
                  data-testid="button-post-comment"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {createDiscussionMutation.isPending ? "Posting..." : "Post Comment"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Discussion Thread */}
        {topLevelDiscussions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Discussions Yet</h3>
              <p className="text-muted-foreground">
                Be the first to start a conversation in your community.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {topLevelDiscussions.map((discussion) => {
              const replies = getReplies(discussion.id);
              return (
                <Card
                  key={discussion.id}
                  className="transition-all duration-150 hover:shadow-sm"
                  data-testid={`card-discussion-${discussion.id}`}
                >
                  <CardHeader>
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(discussion.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold" data-testid={`text-author-${discussion.id}`}>
                            {discussion.author}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-time-${discussion.id}`}>
                            {formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed" data-testid={`text-content-${discussion.id}`}>
                          {discussion.content}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Replies */}
                  {replies.length > 0 && (
                    <CardContent className="border-t pt-4">
                      <div className="space-y-4 pl-6">
                        {replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3" data-testid={`card-reply-${reply.id}`}>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                {getInitials(reply.author)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-semibold text-sm" data-testid={`text-reply-author-${reply.id}`}>
                                  {reply.author}
                                </span>
                                <span className="text-xs text-muted-foreground" data-testid={`text-reply-time-${reply.id}`}>
                                  {formatDistanceToNow(new Date(reply.timestamp), { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-sm text-foreground leading-relaxed" data-testid={`text-reply-content-${reply.id}`}>
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
