"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface FormValues {
  name: string;
  email: string;
}

interface StateValues {
  ok: boolean;
}

const Page = () => {
  const SWR = useSWR<StateValues>("/api/user");
  useEffect(() => {
    if (!SWR.isLoading && SWR.data?.ok) {
      redirect("/log-in");
    }
  }, [SWR.data, SWR.isLoading]);
  const [data, setData] = useState<StateValues>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (formData: FormValues) => {
    fetch("/api/account", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    console.log(!isLoading, data?.ok);
    if (!isLoading && data?.ok) {
      alert("Account Created! Please log in!");
      redirect("/log-in");
    } else if (!isLoading && !data?.ok) {
      alert("You already have an account. Go to sign in");
      redirect("/log-in");
    }
  }, [data, isLoading]);
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="border"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 1, message: "Too Short" },
              maxLength: { value: 80, message: "Too Long" },
            })}
          />
          {errors.name?.message && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="border"
            {...register("email", {
              required: "Email is required",
              minLength: { value: 4, message: "Too Short" },
              maxLength: { value: 80, message: "Too Long" },
            })}
          />
          {errors.email?.message && <span>{errors.email.message}</span>}
        </div>
        <div>
          <button
            type="submit"
            className="border border-b-2 border-r-2 border-black p-1"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
