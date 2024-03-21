import { Request, Response } from "express";
import * as fs from "fs";
import express = require("express");
import * as cors from "cors";

const app = express();
const PORT = 2020;

app.use(cors());

interface Job {
  APPLICATION_ID: number;
  COMPANY_NAME: string;
  POSITION_TITLE: string;
  LOCATION: string;
  SALARY_RANGE: string;
  APPLICATION_SUBMITTED_DATE: string;
  ACCEPTED_OR_DENIED: string;
  HIRING_MANAGER_RESPONDED: string;
  HIRING_MANAGER_RESPONDED_DATE: string;
  INTERVIEW_SCHEDULED: string;
  INTERVIEW_SCHEDULED_DATE: string;
  OFFER_MADE: string;
  OFFER_MADE_DATE: string;
}

const dataFilePath = "./data/data.json";

// Read data from JSON file
function readDataFromFile(): Job[] {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    if (!data) {
      console.log("The data in the file is empty");
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file: ", error);
    return [];
  }
}

// Write data to JSON file
function writeDataToFile(data: Job[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data to file: ", error);
  }
}

// Get all Jobs
app.get("/get-jobs", (req: Request, res: Response) => {
  const jobs = readDataFromFile();
  res.json(jobs);
});

// Submit a Job
app.post("/submit-job", (req: Request, res: Response) => {
  const jobs = readDataFromFile();
  const newJob = req.body as Job;
  jobs.push(newJob);
  writeDataToFile(jobs);
  res.status(201).json(newJob);
});

// Update a Job
app.put("/update-job/:id", (req: Request, res: Response) => {
  const jobs = readDataFromFile();
  const applicationId = parseInt(req.params.id);
  const updatedJob = req.body as Job;
  const index = jobs.findIndex((job) => job.APPLICATION_ID === applicationId);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
    writeDataToFile(jobs);
    res.json(jobs[index]);
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

// Delete a Job
app.delete("/delete-job/:id", (req: Request, res: Response) => {
  const jobs = readDataFromFile();
  const applicationId = parseInt(req.params.id);
  const index = jobs.findIndex((job) => job.APPLICATION_ID === applicationId);
  if (index !== -1) {
    const deletedJob = jobs.splice(index, 1)[0];
    writeDataToFile(jobs);
    res.json(deletedJob);
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

// Start the server on local port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
