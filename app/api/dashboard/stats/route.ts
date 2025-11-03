import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get count of jobs posted by user
    const jobsPosted = await prisma.job.count({
      where: {
        postedById: session.user.id,
      },
    });

    // Get count of applications made by user
    const applicationsCount = await prisma.application.count({
      where: {
        userId: session.user.id,
      },
    });

    // Get applications by status
    const applicationsByStatus = await prisma.application.groupBy({
      by: ["status"],
      where: {
        userId: session.user.id,
      },
      _count: {
        status: true,
      },
    });

    // Get total applications received on user's posted jobs
    const applicationsReceived = await prisma.application.count({
      where: {
        job: {
          postedById: session.user.id,
        },
      },
    });

    const stats = {
      jobsPosted,
      applicationsCount,
      applicationsReceived,
      applicationsByStatus: applicationsByStatus.reduce(
        (acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
