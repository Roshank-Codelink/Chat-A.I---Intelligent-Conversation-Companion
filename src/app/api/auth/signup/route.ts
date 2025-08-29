"use server";

import { connectDB } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Usermodel from "@/app/Model/User";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

// 🔐 Yup Validation Schema
const signupSchema = Yup.object({
  firstname: Yup.string()
    .max(15, "First name must be 15 characters or fewer.")
    .matches(/^[A-Za-z ]+$/, "First name should contain only letters.")
    .required("First name is required."),
  lastname: Yup.string()
    .max(15, "Last name must be 15 characters or fewer.")
    .matches(/^[A-Za-z ]+$/, "Last name should contain only letters.")
    .required("Last name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must not exceed 15 characters.")
    .matches(/[A-Z]/, "Must include at least one uppercase letter.")
    .matches(/[0-9]/, "Must include at least one number.")
    .matches(/[^a-zA-Z0-9]/, "Must include one special character.")
    .test(
      "no-personal-info",
      "Password must not contain your name or email.",
      function (value) {
        const { firstname, lastname, email } = this.parent;
        const pwd = value?.toLowerCase() || "";
        const userEmailPart = email.split("@")[0]?.toLowerCase() || "";
        const parts = [
          ...firstname.toLowerCase().split(" "),
          ...lastname.toLowerCase().split(" "),
          userEmailPart,
        ];
        return parts.every((part) => !pwd.includes(part));
      }
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { firstname, lastname, email, password } = body;
    await signupSchema.validate(body, { abortEarly: false });
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 409 } 
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   let userdata= await Usermodel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully.",userdata },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}


