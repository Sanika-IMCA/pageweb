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

  CREATE TABLE IF NOT EXISTS outreach_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospectId INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    campaign TEXT,
    source TEXT,
    industry TEXT,
    problem TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    nextFollowUp DATETIME
  );

  CREATE TABLE IF NOT EXISTS outreach_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequenceId INTEGER NOT NULL REFERENCES outreach_sequences(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    subject TEXT,
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sendDate DATETIME
  );

  CREATE TABLE IF NOT EXISTS outreach_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequenceId INTEGER NOT NULL REFERENCES outreach_sequences(id) ON DELETE CASCADE,
    replyType TEXT NOT NULL,
    content TEXT NOT NULL,
    intent TEXT NOT NULL,
    nextAction TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS discovery_calls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    scheduled_at DATETIME,
    call_date DATETIME,
    outcome TEXT,
    status TEXT NOT NULL DEFAULT 'SCHEDULED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS discovery_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    content TEXT,
    fact_type TEXT, -- OBSERVED, CLIENT-STATED, INFERRED, UNKNOWN
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workflow_nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    label TEXT,
    description TEXT,
    position_x REAL,
    position_y REAL,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workflow_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    source_node_id INTEGER NOT NULL REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    target_node_id INTEGER NOT NULL REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    label TEXT,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS friction_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    why_it_happens TEXT,
    frequency TEXT,
    people_affected TEXT,
    business_impact TEXT,
    current_workaround TEXT,
    evidence TEXT,
    severity TEXT CHECK(severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS qualification_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    problem_clarity TEXT,
    business_impact TEXT,
    frequency TEXT,
    urgency TEXT,
    operational_complexity TEXT,
    decision_maker_access TEXT,
    system_maturity TEXT,
    willingness_to_change TEXT,
    budget_indication TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS next_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    due_date DATETIME,
    owner TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS internal_proposal_briefs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    client TEXT,
    problem TEXT,
    business_impact TEXT,
    audit_objective TEXT,
    scope TEXT,
    deliverables TEXT,
    timeline TEXT,
    fee REAL,
    next_step TEXT,
    status TEXT DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS internal_implementation_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discovery_call_id INTEGER NOT NULL REFERENCES discovery_calls(id) ON DELETE CASCADE,
    client TEXT,
    problem TEXT,
    proposed_solution TEXT,
    scope TEXT,
    deliverables TEXT,
    timeline TEXT,
    fee REAL,
    next_step TEXT,
    status TEXT DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

    CREATE TABLE IF NOT EXISTS audits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    client TEXT NOT NULL,
    contact TEXT,
    problem TEXT,
    business_impact TEXT,
    current_state TEXT,
    desired_state TEXT,
    audit_objective TEXT,
    scope TEXT,
    out_of_scope TEXT,
    deliverables TEXT,
    timeline TEXT,
    fee REAL,
    currency TEXT,
    payment_terms TEXT,
    start_date DATETIME,
    target_completion DATETIME,
    owner TEXT,
    status TEXT DEFAULT 'AUDIT OPPORTUNITY',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audit_id INTEGER NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    version_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    scope TEXT,
    fee REAL,
    timeline TEXT,
    payment_terms TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audit_id INTEGER NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    payment_status TEXT DEFAULT 'NOT REQUESTED',
    payment_date DATETIME,
    reference TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_followups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audit_id INTEGER NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    followup_date DATETIME NOT NULL,
    owner TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_kickoffs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audit_id INTEGER NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    client TEXT,
    participants TEXT,
    objective TEXT,
    scope TEXT,
    timeline TEXT,
    documents_needed TEXT,
    systems_to_review TEXT,
    questions TEXT,
    meeting_date DATETIME,
    owner TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS implementations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audit_id INTEGER NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    client TEXT NOT NULL,
    project_name TEXT NOT NULL,
    stage TEXT NOT NULL DEFAULT 'OPPORTUNITY',
    owner TEXT NOT NULL,
    target_start DATETIME,
    target_completion DATETIME,
    project_value REAL,
    currency TEXT,
    payment_status TEXT DEFAULT 'NOT_REQUESTED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS implementation_proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    draft_content TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS implementation_milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    objective TEXT,
    deliverables TEXT,
    dependencies TEXT,
    owner TEXT,
    start_date DATETIME,
    target_date DATETIME,
    status TEXT DEFAULT 'NOT_STARTED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS implementation_change_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    request TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    requested_by TEXT,
    reason TEXT,
    impact TEXT,
    additional_cost REAL,
    additional_time TEXT,
    status TEXT DEFAULT 'REQUESTED'
  );
  CREATE TABLE IF NOT EXISTS implementation_scope_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    section TEXT NOT NULL,
    description TEXT,
    priority TEXT,
    included BOOLEAN,
    dependency TEXT,
    source TEXT
  );
  CREATE TABLE IF NOT EXISTS implementation_estimates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    milestone_id INTEGER NOT NULL REFERENCES implementation_milestones(id) ON DELETE CASCADE,
    effort TEXT,
    complexity TEXT,
    risk TEXT,
    confidence TEXT
  );
    CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    implementation_id INTEGER NOT NULL REFERENCES implementations(id) ON DELETE CASCADE,
    client_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'NOT_STARTED',
    owner_id INTEGER,
    start_date DATETIME,
    target_completion DATETIME,
    project_value REAL,
    payment_status TEXT,
    health TEXT DEFAULT 'ON_TRACK',
    health_override_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    objective TEXT,
    description TEXT,
    start_date DATETIME,
    target_date DATETIME,
    owner_id INTEGER,
    status TEXT DEFAULT 'NOT_STARTED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    milestone_id INTEGER NOT NULL REFERENCES project_milestones(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    owner_id INTEGER,
    priority TEXT,
    status TEXT DEFAULT 'TODO',
    source TEXT,
    start_date DATETIME,
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_dependencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    source_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_change_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    request TEXT NOT NULL,
    reason TEXT,
    impact TEXT,
    additional_effort TEXT,
    additional_cost REAL,
    additional_time TEXT,
    status TEXT DEFAULT 'REQUESTED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_client_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    request TEXT NOT NULL,
    requested_by TEXT,
    area TEXT,
    impact TEXT,
    status TEXT DEFAULT 'IN_SCOPE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_bugs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT,
    environment TEXT,
    steps TEXT,
    expected TEXT,
    actual TEXT,
    status TEXT DEFAULT 'OPEN',
    owner_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_deployments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    environment TEXT,
    version TEXT,
    date DATETIME,
    deployed_by TEXT,
    summary TEXT,
    status TEXT,
    rollback_available BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS project_retainer_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    client_id INTEGER NOT NULL,
    value_estimate REAL,
    notes TEXT,
    status TEXT DEFAULT 'PROVISIONAL',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS targets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    due_at DATETIME,
    status TEXT DEFAULT 'PENDING',
    owner_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Additional tables for system integration and QA
db.exec(`
  CREATE TABLE IF NOT EXISTS duplicate_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    primary_id INTEGER NOT NULL,
    duplicate_id INTEGER NOT NULL,
    flagged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'PENDING' -- PENDING, REVIEWED, MERGED, KEEP_BOTH
  );
  CREATE TABLE IF NOT EXISTS orphan_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    record_id INTEGER NOT NULL,
    missing_fk TEXT NOT NULL,
    flagged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'PENDING'
  );
  CREATE TABLE IF NOT EXISTS state_transitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    record_id INTEGER NOT NULL,
    from_state TEXT,
    to_state TEXT,
    user_id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    override_reason TEXT
  );
  CREATE TABLE IF NOT EXISTS overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    record_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    user_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    entity_type TEXT,
    record_id INTEGER,
    user_id TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS test_entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    reference_id INTEGER,
    is_test INTEGER NOT NULL DEFAULT 1,
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
