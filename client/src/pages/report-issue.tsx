import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIssueSchema, type InsertIssue } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Road & Infrastructure",
  "Street Lighting",
  "Waste Management",
  "Water Supply",
  "Public Safety",
  "Parks & Recreation",
  "Noise Complaint",
  "Other",
];

export default function ReportIssuePage() {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertIssue>({
    resolver: zodResolver(insertIssueSchema),
    defaultValues: {
      category: "",
      description: "",
      location: "",
      photoUrl: "",
    },
  });

  const createIssueMutation = useMutation({
    mutationFn: async (data: InsertIssue) => {
      return await apiRequest("POST", "/api/issues", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
      setIsSuccess(true);
      toast({
        title: "Issue Reported",
        description: "Your civic issue has been successfully submitted.",
      });
      setTimeout(() => {
        form.reset();
        setPhotoPreview(null);
        setIsSuccess(false);
      }, 3000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertIssue) => {
    createIssueMutation.mutate(data);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue("photoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    form.setValue("photoUrl", "");
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-12">
            <CheckCircle className="mx-auto h-16 w-16 text-chart-3 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Issue Reported Successfully!</h2>
            <p className="text-muted-foreground">
              Thank you for helping improve our community. We'll review your submission shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">
            Report Civic Issue
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Help us improve your community by reporting issues that need attention.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us address the issue effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the issue in detail..."
                          className="min-h-32 resize-none"
                          data-testid="input-description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Main Street & 5th Avenue"
                          data-testid="input-location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>Photo (Optional)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {!photoPreview ? (
                            <label
                              htmlFor="photo-upload"
                              className="flex h-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input hover:border-primary transition-colors"
                            >
                              <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload a photo
                                </p>
                              </div>
                              <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoUpload}
                                data-testid="input-photo"
                              />
                            </label>
                          ) : (
                            <div className="relative inline-block">
                              <img
                                src={photoPreview}
                                alt="Preview"
                                className="h-48 w-48 rounded-md object-cover border"
                                data-testid="img-preview"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                                onClick={removePhoto}
                                data-testid="button-remove-photo"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={createIssueMutation.isPending}
                  data-testid="button-submit"
                >
                  {createIssueMutation.isPending ? "Submitting..." : "Submit Issue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
