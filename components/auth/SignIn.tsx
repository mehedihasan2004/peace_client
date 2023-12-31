import { useState } from "react";
import { useForm } from "react-hook-form";
import { Btn, Inp } from "../shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Eye, EyeOffIcon } from "lucide-react";
import { useSingInMutation } from "@/redux/api/authApi";
import { setUserToLocalStorage } from "@/utils/localstorage";
import { accessToken } from "@/constant/localstorage";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [passType, setPassType] = useState<"password" | "text">("password");

  const { toast } = useToast();

  const [signIn, { isLoading: signInIsLoading }] = useSingInMutation();

  const handleShowPassword = () => {
    if (passType === "password") setPassType("text");
    else setPassType("password");
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await signIn(data).unwrap();

      setUserToLocalStorage(accessToken, res?.data?.accessToken);
    } catch (err) {
      console.log("Error From Sign In -->", err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // @ts-ignore
        description: err.data.message as string,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      reset();
      setLoading(false);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Sign up to get connected and new updates
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <Inp
            name="email"
            placeholder="*Enter Email"
            type="email"
            register={register}
            errorMessage="Please enter your email"
            errors={errors}
          />
          <div className="relative">
            <Inp
              name="password"
              placeholder="*Password"
              type={passType}
              register={register}
              errorMessage="Please set a strong password"
              errors={errors}
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-0 right-0 transform z-10 cursor-default text-gray-500 hover:text-gray-600 py-2 px-3 text-lg"
            >
              {passType === "password" ? <EyeOffIcon /> : <Eye />}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Btn
            label="Sign In"
            type="submit"
            className="w-full"
            disabled={isLoading || signInIsLoading}
          />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignIn;
