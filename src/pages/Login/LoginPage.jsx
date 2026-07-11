import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Checkbox from "../../components/ui/Checkbox";
import Eyebrow from "../../components/ui/Eyebrow";
import BrandingPanel from "../../data/auth/BrandingPanel";
import GoogleButton from "../../data/auth/GoogleButton";
import GlobalStyles from "../../styles/GlobalStyles";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", remember: false });

    useEffect(() => {
        document.title = "Log in — Genie";
    }, []);

    const handleChange = (field) => (e) => {
        const value = field === "remember" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: replace with real authentication once the backend exists.
        // For now, treat any submit as a successful login and go straight
        // to the workspace so the flow can be demoed end-to-end.
        console.log("Login submitted:", form);
        navigate("/workspace");
    };

    return (
        <div className="min-h-screen bg-white font-body antialiased">
            <GlobalStyles />

            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <BrandingPanel />

                <div className="relative flex items-center justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
                    <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#eef2ff_0%,rgba(255,255,255,0)_70%)] lg:hidden"></div>

                    <div className="relative w-full max-w-sm animate-fade-up">
                        <a href="/" className="mb-8 flex items-center gap-2 font-display text-xl font-bold text-slate-900 lg:hidden">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30">
                                <Sparkles size={18} />
                            </span>
                            <span>Genie</span>
                        </a>

                        <Eyebrow>Welcome back</Eyebrow>

                        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Log in to Genie
                        </h1>
                        <p className="mt-3 text-sm text-slate-600">
                            Pick up your summaries, quizzes, and cheat sheets right where you left off.
                        </p>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="you@university.edu"
                                value={form.email}
                                onChange={handleChange("email")}
                                autoComplete="email"
                                required
                                rightElement={<Mail size={17} className="text-slate-400" />}
                            />

                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange("password")}
                                autoComplete="current-password"
                                required
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="text-slate-400 transition-colors hover:text-indigo-600"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                }
                            />

                            <div className="flex items-center justify-between">
                                <Checkbox
                                    id="remember"
                                    checked={form.remember}
                                    onChange={handleChange("remember")}
                                    label="Remember me"
                                />
                                <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" variant="primary" size="lg" className="w-full">
                                Log In
                                <ArrowRight size={16} />
                            </Button>
                        </form>

                        <div className="my-7 flex items-center gap-3">
                            <span className="h-px flex-1 bg-slate-100"></span>
                            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                                or continue with
                            </span>
                            <span className="h-px flex-1 bg-slate-100"></span>
                        </div>

                        <GoogleButton />

                        <p className="mt-8 text-center text-sm text-slate-600">
                            Don't have an account?{" "}
                            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}