"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader } from "lucide-react";
import { registerSchema } from "@/types/register";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/config/axiosInstance";
// import { FlipWords } from "@/components/ui/flip-words";

type FormFields = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/user/register", data);
      console.log(res.data);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Registration successful!");
        reset();
        router("/login");
      } else {
        throw new Error(res.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";

      setError("root", { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <div className="m- gap-1.5 items-center h-screen flex">
      <div className="right flex-col p-10 flex items-center justify-center h-[98dvh] rounded-2xl w-full lg:w-1/2">
        <div className="text-3xl md:text-4xl mb-10 mx-auto font-semibold text-neutral-800  leading-tight">
          Summarize&nbsp;
          <br />
          your PDFs with Briefly AI
        </div>
        <div className="flex flex-col items-center gap-4 border-[1px] p-10 rounded-2xl">
          <h1 className="text-2xl">
            Register to <span className="text-[#FFFFE3]">Briefly</span>
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input type="text" placeholder="Name" {...register("name")} />
            <Input type="email" placeholder="Email" {...register("email")} />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.root && (
              <p className="text-red-600">{errors.root.message}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="p-2 rounded-lg cursor-pointer"
            >
              {isSubmitting ? <Loader className="animate-spin mr-2" /> : null}
              Register
            </Button>
          </form>
        </div>
        <div className="flex flex-col mt-1 items-center">
          <small>
            Already have an account?
            <Link to="/login" className="ml-1 text-blue-500 hover:underline">
              Login
            </Link>
          </small>
        </div>
      </div>

      <div className="left hidden lg:flex lg:flex-col m-2 items-center justify-center bg-accent border-[1px] h-[98dvh] rounded-2xl lg:w-1/2 text-[#FFFFE3] p-8 space-y-4">
        <h1 className="text-3xl font-semibold">
          New to <span className="font-medium">Briefly</span>
        </h1>
        <small className="text-center text-sm leading-relaxed max-w-xs">
          Summarize smarter with AI. <br />
          Save hours on reading. <br />
          Stay informed in minutes. <br />
          Because time is knowledge.
        </small>
      </div>
    </div>
  );
};

export default Register;
