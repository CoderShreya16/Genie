import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Upload } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function CtaBand() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-14 text-center sm:px-16">
                <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <Sparkles className="relative mx-auto text-white/80" size={28} />
                <h2 className="relative mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                    Your next study session starts with one upload
                </h2>
                <p className="relative mx-auto mt-3 max-w-md text-indigo-100">
                    Free to start. No credit card, no setup — just your notes and a few seconds.
                </p>
                <Button
                    as={Link}
                    to="/workspace"
                    variant="ghost"
                    size="lg"
                    className="relative mt-7 bg-white text-indigo-700 hover:bg-indigo-50"
                >
                    <Upload size={17} />
                    Upload Your Notes
                </Button>
            </Card>
        </section>
    );
}