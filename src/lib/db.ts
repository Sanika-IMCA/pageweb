import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Define the database path inside the workspace root
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "submissions.db");

// Ensure the directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize the better-sqlite3 database instance
const db = new Database(DB_PATH, { verbose: console.log });

// Create the submissions table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    timezone TEXT NOT NULL,
    team_size TEXT NOT NULL,
    solved_before TEXT NOT NULL,
    headache TEXT NOT NULL,
    next_step TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export interface SubmissionInput {
  name: string;
  role: string;
  company: string;
  timezone: string;
  teamSize: string;
  solvedBefore: string;
  headache: string;
  nextStep: string;
}

export interface Submission extends SubmissionInput {
  id: number;
  created_at: string;
}

export const dbService = {
  /**
   * Save a new scoping form submission into the database.
   */
  createSubmission(input: SubmissionInput): number | bigint {
    const stmt = db.prepare(`
      INSERT INTO submissions (
        name, role, company, timezone, team_size, solved_before, headache, next_step
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      input.name,
      input.role,
      input.company,
      input.timezone,
      input.teamSize,
      input.solvedBefore,
      input.headache,
      input.nextStep
    );

    return result.lastInsertRowid;
  },

  /**
   * Retrieve all submissions, sorted by newest first.
   */
  getAllSubmissions(): Submission[] {
    const stmt = db.prepare(`
      SELECT 
        id, 
        name, 
        role, 
        company, 
        timezone, 
        team_size AS teamSize, 
        solved_before AS solvedBefore, 
        headache, 
        next_step AS nextStep, 
        created_at
      FROM submissions
      ORDER BY id DESC
    `);
    
    return stmt.all() as Submission[];
  },

  /**
   * Delete a submission by ID.
   */
  deleteSubmission(id: number): void {
    const stmt = db.prepare("DELETE FROM submissions WHERE id = ?");
    stmt.run(id);
  },

  /**
   * Clear all submissions from the database.
   */
  clearAllSubmissions(): void {
    const stmt = db.prepare("DELETE FROM submissions");
    stmt.run();
  }
};
