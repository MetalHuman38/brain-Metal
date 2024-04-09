import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { SignInValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/lib/context/AuthContext";


const SignInForm = () => {

  
  const { login, isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
      try{
      await login(values);
    } catch (error) {
      console.error('Error logging in user:', error);
      }
  } 
    return (
      <Form {...form}>

        <div className="sm:w-420 flex-center flex-col">

          <img src="/assets/images/mylogo1.png" alt="Logo" className="w-24 h-24" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Log in to your account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your log in details</p>

          <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-3">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-3">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : "Sign In"}
            </Button>
            <p className="text-small-regular text-light-3 text-center mt-2">Dont have an account?
              <Link to="/sign-up" className="text-light-8 text-small-bold ml-1">Sign Up</Link>
            </p>
          </form>
        </div>
      </Form>
    )
  }

export default SignInForm