import express from "express";
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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/remuneration", remunerationRoutes());
  app.use("/employees", employeesRoutes());
  app.use("/departments", departmentsRoutes());
  app.use("/titles", titlesRoutes());
  app.use("/feedback", feedbackRoutes());
  app.get("/dbstatus", (req, res) => {
    db.prepare("SELECT * FROM employees WHERE employee_id=1;").all()
      ? res.json({ status: "SQLite is working!" })
      : res.status(500).json({ status: "SQLite connection failed" });
  });

  const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};
InitServer();

export default InitServer;
