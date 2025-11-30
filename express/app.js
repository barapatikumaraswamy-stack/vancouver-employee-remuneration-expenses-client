import express from "express";
import cors from "cors";
import {
  remunerationRoutes,
  employeesRoutes,
  departmentsRoutes,
  titlesRoutes,
  feedbackRoutes,
} from "./routes/index.js";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "./db/data.db"), {
  enableForeignKeyConstraints: true,
});

const InitServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/v1/remuneration", remunerationRoutes());
  app.use("/v1/employees", employeesRoutes());
  app.use("/v1/departments", departmentsRoutes());
  app.use("/v1/titles", titlesRoutes());
  app.use("/v1/feedback", feedbackRoutes());

  app.get("/v1/dbstatus", (req, res) => {
    const rows = db
      .prepare("SELECT * FROM employees WHERE employee_id = 1;")
      .all();
    if (rows && rows.length > 0) {
      res.json({ status: "SQLite is working!" });
    } else {
      res.status(500).json({ status: "SQLite connection failed" });
    }
  });

  app.use(express.static(path.join(import.meta.dirname, "public")));
  app.use((req, res) => {
    res.sendFile(path.join(import.meta.dirname, "public", "index.html"));
  });

  const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

InitServer();

export default InitServer;
