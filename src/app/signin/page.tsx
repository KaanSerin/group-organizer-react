"use client";
import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "react-bootstrap";
import Link from "next/link";

export default function Login() {
    return (
        <div>
            <h1 className="mb-0">Welcome Back</h1>
            <p className="text-secondary mt-3 fw-medium mb-0">Welcome back! Please enter your details.</p>
            <InputWithLabel className="mt-30" label={"Username"} placeholder={"Enter your username"} />
            <InputWithLabel className="mt-4" label={"Password"} placeholder={"********"} type="password"/>
            <Button size="lg" className="mt-35 w-100 btn-purple">Sign in</Button>
            <p className="text-center text-secondary fw-medium mt-30">Don’t have an account? <Link href="/signup" className="text-purple">Sign up</Link></p>
        </div>
    )
}