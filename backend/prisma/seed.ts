import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, ApplicationStage, TaskPriority } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DEMO_EMAIL = "demo@careeros.dev";
const DEMO_PASSWORD = "Password123!";

// Small date helpers so the dashboard's time-based widgets light up.
const daysFromNow = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

async function main() {
  const password = await bcrypt.hash(DEMO_PASSWORD, 12);

  // Idempotent: upsert the demo user, then wipe their owned data so reruns
  // produce a clean, predictable dataset (child rows cascade on delete).
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: {
      email: DEMO_EMAIL,
      password,
      firstName: "Demo",
      lastName: "User",
      isVerified: true,
    },
  });

  await prisma.application.deleteMany({ where: { userId: user.id } });
  await prisma.company.deleteMany({ where: { userId: user.id } });
  await prisma.task.deleteMany({ where: { userId: user.id } });
  await prisma.activityLog.deleteMany({ where: { userId: user.id } });

  // --- Companies ---
  const [stripe, vercel, linear, figma] = await Promise.all([
    prisma.company.create({ data: { userId: user.id, name: "Stripe", industry: "Fintech", location: "Remote" } }),
    prisma.company.create({ data: { userId: user.id, name: "Vercel", industry: "DevTools", location: "San Francisco" } }),
    prisma.company.create({ data: { userId: user.id, name: "Linear", industry: "SaaS", location: "Remote" } }),
    prisma.company.create({ data: { userId: user.id, name: "Figma", industry: "Design", location: "New York" } }),
  ]);

  // --- Applications across several stages ---
  // `appliedAt` set to "now" for a couple so they count toward appliedThisWeek.
  const stripeApp = await prisma.application.create({
    data: {
      userId: user.id,
      companyId: stripe.id,
      jobTitle: "Senior Backend Engineer",
      stage: ApplicationStage.TECHNICAL_ROUND,
      appliedAt: daysFromNow(-1),
      location: "Remote",
      isRemote: true,
      salaryMin: 160000,
      salaryMax: 210000,
    },
  });

  const vercelApp = await prisma.application.create({
    data: {
      userId: user.id,
      companyId: vercel.id,
      jobTitle: "Full Stack Engineer",
      stage: ApplicationStage.HR_SCREENING,
      appliedAt: daysFromNow(-2),
      location: "San Francisco",
    },
  });

  await prisma.application.create({
    data: {
      userId: user.id,
      companyId: linear.id,
      jobTitle: "Product Engineer",
      stage: ApplicationStage.APPLIED,
      appliedAt: daysFromNow(0),
      isRemote: true,
    },
  });

  await prisma.application.create({
    data: {
      userId: user.id,
      companyId: figma.id,
      jobTitle: "Frontend Engineer",
      stage: ApplicationStage.WISHLIST, // no appliedAt -> excluded from appliedThisWeek
      isRemote: false,
    },
  });

  await prisma.application.create({
    data: {
      userId: user.id,
      companyId: stripe.id,
      jobTitle: "Platform Engineer",
      stage: ApplicationStage.OFFER,
      appliedAt: daysFromNow(-20),
    },
  });

  // --- Upcoming interviews (within 7 days so the dashboard shows them) ---
  await prisma.interview.createMany({
    data: [
      { applicationId: stripeApp.id, type: "Technical", scheduledAt: daysFromNow(2), duration: 60, location: "Google Meet" },
      { applicationId: vercelApp.id, type: "HR Screen", scheduledAt: daysFromNow(4), duration: 30, location: "Zoom" },
    ],
  });

  // --- Tasks (pending + one completed) ---
  await prisma.task.createMany({
    data: [
      { userId: user.id, applicationId: stripeApp.id, title: "Prep system design", priority: TaskPriority.HIGH, dueDate: daysFromNow(1) },
      { userId: user.id, applicationId: vercelApp.id, title: "Send follow-up email", priority: TaskPriority.MEDIUM, dueDate: daysFromNow(3) },
      { userId: user.id, title: "Update resume", priority: TaskPriority.LOW, isCompleted: true },
    ],
  });

  // --- Activity log (recent feed) ---
  await prisma.activityLog.createMany({
    data: [
      { userId: user.id, applicationId: stripeApp.id, action: "Moved Stripe application to Technical Round" },
      { userId: user.id, applicationId: vercelApp.id, action: "Applied to Vercel" },
      { userId: user.id, action: "Created 4 companies" },
    ],
  });

  console.log(`\n✅ Seed complete.`);
  console.log(`   Login: ${DEMO_EMAIL} / ${DEMO_PASSWORD}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
