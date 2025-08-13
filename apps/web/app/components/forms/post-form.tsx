import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { withForm } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Textarea } from "@repo/ui/components/textarea";
import { formOptions } from "@tanstack/react-form/remix";

export const formOpts = formOptions({
  defaultValues: {
    title: "",
    excerpt: "",
    content: "",
    scheduling: "publish-now",
    scheduledAt: "",
  },
});

export const PostForm = withForm({
  ...formOpts,
  render: ({ form }) => {
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col space-y-8">

          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Enter the details of your post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form.AppField name="title">
                {(field) => (
                  <field.FormItem>
                    <field.FormLabel>Post Title</field.FormLabel>
                    <field.FormControl>
                      <Input
                        name="title"
                        placeholder="Enter your post title..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              </form.AppField>

              <form.AppField name="excerpt">
                {(field) => (
                  <field.FormItem>
                    <field.FormLabel>Post Excerpt</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        placeholder="Brief description of your post..."
                        rows={3}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              </form.AppField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your post content.</CardDescription>
            </CardHeader>
            <CardContent>
              <form.AppField name="content">
                {(field) => (
                  <field.FormItem>
                    <field.FormLabel>Post Content</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Start writing your post content..."
                        rows={6}
                        className="min-h-[200px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              </form.AppField>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
              <CardDescription>
                Control when and how your post is published
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <form.AppField name="scheduling">
                {(field) => (
                  <field.FormItem>
                    <field.FormLabel>Publishing Options</field.FormLabel>
                    <field.FormControl>
                      <RadioGroup
                        name="scheduling"
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(
                            value as "draft" | "publish-now" | "schedule-later",
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="draft" id="draft" />
                          <Label htmlFor="draft">Draft</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="publish-now"
                            id="publish-now"
                          />
                          <Label htmlFor="publish-now">Publish Now</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="schedule-later"
                            id="schedule-later"
                          />
                          <Label
                            htmlFor="schedule-later"
                            className="text-sm font-medium cursor-pointer"
                          >
                            Schedule for Later
                          </Label>
                        </div>
                      </RadioGroup>
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              </form.AppField>

              <form.Subscribe selector={(state) => state.values.scheduling}>
                {(scheduling) =>
                  scheduling === "schedule-later" && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                      <form.AppField name="scheduledAt">
                        {(field) => (
                          <field.FormItem>
                            <field.FormControl>
                              <Input
                                id="scheduledAt"
                                name="scheduledAt"
                                type="datetime-local"
                                value={field.state.value || ""}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                              />
                            </field.FormControl>
                            <field.FormMessage />
                          </field.FormItem>
                        )}
                      </form.AppField>
                    </div>
                  )
                }
              </form.Subscribe>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
});
