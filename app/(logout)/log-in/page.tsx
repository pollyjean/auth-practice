"use client";
import { FormValues } from "@/lib/constants";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface StateValues {
  ok: boolean;
}

const Page = () => {
  const [data, setData] = useState<StateValues>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    await fetch("/api/confirm", {
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
      });
    setIsLoading(false);
  };
  useEffect(() => {
    if (!isLoading && !data?.ok) {
      setError(
        "email",
        { type: "custom", message: "Account does not exist" },
        { shouldFocus: true }
      );
    } else if (!isLoading && data?.ok) {
      redirect("/");
    }
  }, [data, isLoading, setError]);
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
