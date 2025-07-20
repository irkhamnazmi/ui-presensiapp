import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/"; // redirect
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  return (
    <div className="h-dvh flex flex-col mt-8 items-center gap-5">
      {/* <h1 className="text-2xl font-semibold mb-10">Presensi App</h1>
       */}
      <img src="/images/presensiapp.png" width={100} alt="" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 px-3"
      >
        <div className="grid items-center gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="focus:border-sky-950"
          />
        </div>
        <div className="grid items-center gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your Password"
            className="focus:border-sky-950 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[32px] text-gray-500"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        <span className="text-right text-sky-500">Lupa password?</span>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button className="mt-2 bg-sky-950 hover:bg-sky-950/90" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
