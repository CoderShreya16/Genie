// import React, { useState } from "react";
// import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
// import Button from "../ui/Button";

// export default function Navbar() {
//     const [open, setOpen] = useState(false);

//     const links = [
//         { label: "Home", href: "#home" },
//         { label: "Features", href: "#features" },
//         { label: "About", href: "#how-it-works" },
//     ];

//     return (
//         <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-xl">
//             <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
//                 {/* Logo */}
//                 <a
//                     href="#home"
//                     className="flex items-center gap-2 text-xl font-bold text-slate-900"
//                 >
//                     <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30">
//                         <Sparkles size={18} />
//                     </span>
//                     Genie
//                 </a>

//                 {/* Desktop Navigation */}
//                 <div className="hidden items-center gap-1 md:flex">
//                     {links.map((link) => (
//                         <a
//                             key={link.label}
//                             href={link.href}
//                             className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
//                         >
//                             {link.label}
//                         </a>
//                     ))}
//                 </div>

//                 {/* Desktop Buttons */}
//                 <div className="hidden items-center gap-3 md:flex">
//                     <Button variant="ghost" size="sm">
//                         Login
//                     </Button>

//                     <Button variant="primary" size="sm">
//                         Get Started
//                         <ArrowRight size={15} />
//                     </Button>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <button
//                     className="rounded-lg p-2 text-slate-700 md:hidden"
//                     onClick={() => setOpen(!open)}
//                     aria-label="Toggle menu"
//                 >
//                     {open ? <X size={22} /> : <Menu size={22} />}
//                 </button>
//             </nav>

//             {/* Mobile Menu */}
//             {open && (
//                 <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
//                     <div className="flex flex-col gap-1">
//                         {links.map((link) => (
//                             <a
//                                 key={link.label}
//                                 href={link.href}
//                                 onClick={() => setOpen(false)}
//                                 className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50"
//                             >
//                                 {link.label}
//                             </a>
//                         ))}

//                         <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
//                             <Button variant="outline" size="sm">
//                                 Login
//                             </Button>

//                             <Button variant="primary" size="sm">
//                                 Get Started
//                                 <ArrowRight size={15} />
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// }
import React, { useState } from "react";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { label: "Home", href: "/" },
        { label: "Features", href: "/#features" },
        { label: "About", href: "/#how-it-works" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <a href="/" className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30">
                        <Sparkles className="h-4.5 w-4.5" size={18} />
                    </span>
                    Genie
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            {link.label}
                        </a>
                    ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
                <Button variant="ghost" size="sm" as="a" href="/login">
                    Login
                </Button>
                <Button variant="primary" size="sm">
                    Get Started
                    <ArrowRight size={15} />
                </Button>
            </div>

            <button
                className="rounded-lg p-2 text-slate-700 md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>
        </nav>

      {
        open && (
            <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
                <div className="flex flex-col gap-1">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50"
                        >
                            {link.label}
                        </a>
                    ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                    <Button variant="outline" size="sm" as="a" href="/login">
                        Login
                    </Button>
                    <Button variant="primary" size="sm">
                        Get Started
                        <ArrowRight size={15} />
                    </Button>
                </div>
            </div>
        </div >
      )
    }
    </header >
  );
}