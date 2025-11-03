import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: {
        id,
      },
      include: {
        postedBy: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // Check if the current user has applied for this job
    let hasApplied = false;
    if (session?.user?.id) {
      const application = await prisma.application.findUnique({
        where: {
          jobId_userId: {
            jobId: id,
            userId: session.user.id,
          },
        },
      });
      hasApplied = !!application;
    }

    return NextResponse.json({ ...job, hasApplied });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
