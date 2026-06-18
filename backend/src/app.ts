import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";

import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import companiesRoutes from "./modules/companies/companies.routes";
import applicationsRoutes from "./modules/applications/applications.routes";
import interviewsRoutes from "./modules/interviews/interviews.routes";
import tasksRoutes from "./modules/tasks/tasks.routes";
import contactsRoutes from "./modules/contacts/contacts.routes";
import notesRoutes from "./modules/notes/notes.routes";
import documentsRoutes from "./modules/documents/documents.routes";
import goalsRoutes from "./modules/goals/goals.routes";
import notificationsRoutes from "./modules/notifications/notifications.routes";
import activityRoutes from "./modules/activity/activity.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [env.CLIENT_URL, /^http:\/\/localhost:\d+$/]
      if (!origin || allowed.some((o) => (typeof o === "string" ? o === origin : o.test(origin)))) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
});
