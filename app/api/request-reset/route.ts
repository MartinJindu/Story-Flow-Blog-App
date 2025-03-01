import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import sendResetEmail from "@/lib/sendResetEmail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "Email not found" }, { status: 404 });

    // ** Clear any existing reset token before creating a new one**
    await prisma.user.update({
      where: { email },
      data: { resetToken: null, resetTokenExpiry: null },
    });

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min expiry

    // Save token in DB
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // Send email (For now, just return the token for testing)
    await sendResetEmail(email, resetToken, user.username);

    return NextResponse.json({ message: "Password reset email sent!" });
  } catch (_error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
