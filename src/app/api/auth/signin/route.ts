import { connectDB } from "@/app/lib/db";
import Usermodel from "@/app/Model/User";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signinSchema = Yup.object({
  email: Yup.string().email("invalid email").required("Email is required."),
  password: Yup.string().required("The Password field is required."),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    let { email, password } = body;
    await signinSchema.validate(body, { abortEarly: false });
    const existingUser = await Usermodel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          message:
            "The email address that you've entered doesn't match any account.Sign up for an account.",
        },
        { status: 409 }
      );
    }

    let Match = await bcrypt.compare(password, existingUser.password);
    if (!Match) {
      return NextResponse.json({
        message: "That's an invaild password.",
      });
    }
    let token = jwt.sign({ existingUser }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    if (!token) {
      return NextResponse.json({
        message: "Something wen't Wrong.",
      });
    }
    let { password: _, ...rest } = existingUser._doc;
    const response = NextResponse.json({
      message: "Login Successfull",
      user: rest,
    });
    response.cookies.set("verificationtoken", token);
    return response;
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
