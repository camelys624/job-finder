import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();
    const job = await prisma.job.create({
        data: {
            ...data,
            postedById: session.user.id,
        }
    })
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}