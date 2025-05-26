import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/types/login";
import { axiosInstance } from "@/config/axiosInstance";
// import { FlipWords } from "@/components/ui/flip-words";

type FormFields = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/user/login", data);

      console.log(res.data.user);
      localStorage.setItem("token", res.data.token);

      navigate("/");
      console.log(res.data);
      reset();
      toast(res.data.message);
    } catch (error: any) {
      console.log(error);
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <div className=" m- gap-1.5 items-center h-screen flex ">
      <div className="left hidden lg:flex lg:flex-col m-2 items-center   justify-center bg-accent border-[1px] h-[98dvh] rounded-2xl w-1/2 text-[#FFFFE3] p-8 space-y-4 ">
        <h1 className="text-3xl font-semibold">
          Welcome to <span className="font-medium">Briefly</span>
        </h1>
        <p className="text-center text-sm leading-relaxed max-w-xs">
          Summarize smarter with AI. <br />
          Save hours on reading. <br />
          Stay informed in minutes. <br />
          Because time is knowledge.
        </p>
      </div>

      <div className="right flex-col p-10 flex items-center justify-center h-[98dvh]rounded-2xl w-full lg:w-1/2">
        <div className="text-3xl md:text-4xl mb-10 mx-auto font-semibold text-neutral-800  leading-tight">
          Summarize&nbsp;
          <br />
          your PDFs with Briefly AI
        </div>
        <div className="flex flex-col items-center gap-4 border-[1px] p-10 rounded-2xl">
          <h1 className="text-2xl">
            Login to <span className="text-[#FFFFE3]">Briefly</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4   "
          >
            <Input type="email" placeholder="Email" {...register("email")} />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.root && (
              <span className="text-red-800">{errors.root?.message}</span>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" p-2 rounded-lg cursor-pointer"
            >
              Login{" "}
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                ""
              )}
            </Button>
          </form>
        </div>
        <div className="flex flex-col mt-1 items-center">
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 ">
              Register
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
