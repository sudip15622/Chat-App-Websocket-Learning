"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GiMagicHat } from "react-icons/gi";
import { handleLogin } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface IFormInput {
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log(data);

    try {
      const response = await handleLogin(data);

      if(response.success) {
        alert(response.message);
        reset();
        router.push("/");
        router.refresh();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Failed to submit form: ", error);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="w-full max-w-sm mt-20 mx-auto flex flex-col p-10 shadow-2xl rounded-2xl">
      <Link
        href={"/"}
        className="flex justify-center items-center p-2 bg-primary text-primary-foreground rounded-xl w-fit mx-auto text-2xl mb-2"
      >
        <GiMagicHat />
      </Link>
      <h1 className="text-2xl font-bold text-center mx-auto mb-5">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-5 mx-auto"
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email" className="text-md">
            Email Address
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your email"
                className="text-lg"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="password" className="text-md">
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your password"
                className="text-lg"
              />
            )}
          />
        </div>

        <Button type="submit" className="cursor-pointer">
          Login
        </Button>
      </form>
    </main>
  );
};

export default page;
