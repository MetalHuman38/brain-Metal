import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import FileUpLoader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/lib/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useState } from "react";
import axios from "axios";


const PostForm = () => {

  const [post, setPost] = useState(null);
  const { isPostLoading, setisPostLoading } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      setisPostLoading(true);
      const newPost = await axios.post("http://localhost:3000/api/createPost", values);
      console.log(newPost);
      toast({
        title: 'Post created successfully',
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Failed to create post',
      });
    } finally {
      setisPostLoading(false);
    }
  }
  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field}  />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"> Add Photo </FormLabel>
              <FormControl>
                <FileUpLoader
                  fieldChange={field.onChange}
                  mediaUrl={post?.mediaUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">Add Location</FormLabel>
              <FormControl>
                <input type="text" className="shad-input" {...field} />
              </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">Add Tags (separated by comma " , ") </FormLabel>
              <FormControl>
                <input
                  type="text"
                  className="shad-input"
                  placeholder="e.g. #travel, #nature, #photography"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button> 
        </div>
      </form>
    </Form>
  )
}

export default PostForm