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
    submission_type TEXT NOT NULL DEFAULT 'general',
    change_impact TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Gracefully run ALTER TABLE to add the columns if the table already existed previously
try {
  db.exec(`ALTER TABLE submissions ADD COLUMN submission_type TEXT NOT NULL DEFAULT 'general'`);
} catch (err) {
  // Column already exists, safe to ignore
}

try {
  db.exec(`ALTER TABLE submissions ADD COLUMN change_impact TEXT DEFAULT ''`);
} catch (err) {
  // Column already exists, safe to ignore
}

// Create internal sales pipeline tables if they do not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS prospects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    website TEXT,
    domain TEXT,
    industry TEXT,
    location TEXT,
    employee_range TEXT,
    company_description TEXT,
    problem_hypothesis TEXT,
    operational_pattern TEXT,
    decision_maker TEXT,
    decision_maker_role TEXT,
    decision_maker_link TEXT,
    email TEXT,
    linkedin TEXT,
    source TEXT,
    campaign TEXT,
    pipeline_stage TEXT NOT NULL DEFAULT '01_RESEARCH',
    owner TEXT,
    priority TEXT,
    next_follow_up DATETIME,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    event TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_outreach (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    channel TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_audits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    problem TEXT,
    expected_output TEXT,
    start_date DATETIME,
    target_end_date DATETIME,
    status TEXT NOT NULL DEFAULT 'PROPOSED',
    fee REAL,
    payment_status TEXT,
    deliverables TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    project_name TEXT,
    scope TEXT,
    systems_to_build TEXT,
    integrations TEXT,
    milestones TEXT,
    estimated_timeline TEXT,
    project_value REAL,
    status TEXT DEFAULT 'PROPOSED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_research (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    website TEXT,
    linkedin_url TEXT,
    industry TEXT,
    country TEXT,
    decision_maker TEXT,
    campaign TEXT,
    status TEXT NOT NULL DEFAULT 'NOT STARTED',
    priority TEXT DEFAULT 'B',
    research_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
  submissionType?: string;
  changeImpact?: string;
}

export interface Submission {
  id: number;
  name: string;
  role: string;
  company: string;
  timezone: string;
  teamSize: string;
  solvedBefore: string;
  headache: string;
  nextStep: string;
  submissionType: string;
  changeImpact: string;
  created_at: string;
}

export const dbService = {
  /**
   * Save a new scoping form submission into the database.
   */
  createSubmission(input: SubmissionInput): number | bigint {
    const stmt = db.prepare(`
      INSERT INTO submissions (
        name, role, company, timezone, team_size, solved_before, headache, next_step, submission_type, change_impact
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      input.name,
      input.role,
      input.company,
      input.timezone,
      input.teamSize,
      input.solvedBefore,
      input.headache,
      input.nextStep,
      input.submissionType || "general",
      input.changeImpact || ""
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
        submission_type AS submissionType,
        change_impact AS changeImpact,
        created_at
      FROM submissions
      ORDER BY id DESC
    `);
    
    return stmt.all() as Submission[];
  }
};

export { db };
