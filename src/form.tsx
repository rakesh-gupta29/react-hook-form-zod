import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
  const formSchema = z
    .object({
      username: z.string().min(1, "Username is required").max(100),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
      terms: z.literal(true, {
        errorMap: () => ({
          message: "You must accept the terms and conditions",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center pb-6 capitalize leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block  pb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Your name"
                  autoFocus
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-red-800 text-sm font-medium block mt-1">
                    {errors.username?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block pb-2  text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-800 text-sm font-medium block mt-1">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-800 text-sm font-medium block mt-1">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-800 text-sm font-medium block mt-1">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
              <div className="flex items-start mb-3 mt-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-600">
                    I accept the{" "}
                    <a className="font-medium text-[#16253B]" href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {errors.terms && (
                <span className="text-red-800 text-sm font-medium block mt-1">
                  {errors.terms?.message}
                </span>
              )}
              <button
                type="submit"
                className="w-full text-white bg-[#16253B] hover:bg-[#0B131E] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={isSubmitting}
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
