import { db } from '@/lib/db';

/**
 * Parameters for a state transition validation request.
 */
export interface ValidateTransitionParams {
  /** Entity type, e.g., 'outreach', 'discovery', 'audit', 'implementation', 'project', 'retainer' */
  entityType: string;
  /** Current state value stored in the record */
  currentState: string;
  /** Desired next state */
  nextState: string;
  /** ID of the user performing the transition */
  userId: string;
  /** Optional override reason when the transition is not allowed */
  overrideReason?: string;
  /** Optional ID of the record being transitioned */
  recordId?: number;
}

/** Result of a validation check */
export interface ValidateTransitionResult {
  allowed: boolean;
  reason: string;
  requiresOverride: boolean;
}

// Define allowed state transitions per entity type.
const TRANSITIONS: Record<string, Record<string, string[]>> = {
  // Sales / Outreach workflow (uses status column in sales_outreach and related tables)
  outreach: {
    DRAFT: ['IN_REVIEW', 'PAUSED', 'NOT_INTERESTED', 'BOUNCED', 'CLOSED'],
    IN_REVIEW: ['READY_TO_SEND', 'PAUSED', 'NOT_INTERESTED', 'BOUNCED', 'CLOSED'],
    READY_TO_SEND: ['ACTIVE', 'PAUSED', 'NOT_INTERESTED', 'BOUNCED', 'CLOSED'],
    ACTIVE: ['REPLIED', 'COMPLETED', 'PAUSED', 'NOT_INTERESTED', 'BOUNCED', 'CLOSED'],
    REPLIED: ['COMPLETED', 'PAUSED', 'NOT_INTERESTED', 'BOUNCED', 'CLOSED'],
    COMPLETED: [],
    PAUSED: [],
    NOT_INTERESTED: [],
    BOUNCED: [],
    CLOSED: [],
  },
  // Discovery workflow
  discovery: {
    SCHEDULED: ['IN_PROGRESS', 'CANCELLED', 'NO_SHOW'],
    IN_PROGRESS: ['COMPLETED', 'CANCELLED', 'NO_SHOW'],
    COMPLETED: [],
    CANCELLED: [],
    NO_SHOW: [],
  },
  // Audit workflow
  audit: {
    OPPORTUNITY: ['SCOPE_DRAFT', 'DECLINED', 'NURTURE', 'NO_FIT'],
    SCOPE_DRAFT: ['PROPOSAL_DRAFT', 'DECLINED', 'NURTURE'],
    PROPOSAL_DRAFT: ['PROPOSAL_SENT', 'DECLINED', 'NURTURE'],
    PROPOSAL_SENT: ['CLIENT_REVIEW', 'DECLINED', 'NURTURE'],
    CLIENT_REVIEW: ['APPROVED', 'DECLINED', 'NURTURE'],
    APPROVED: ['PAYMENT_PENDING', 'DECLINED', 'NURTURE'],
    PAYMENT_PENDING: ['PAID', 'DECLINED', 'NURTURE'],
    PAID: ['AUDIT_SCHEDULED', 'DECLINED', 'NURTURE'],
    AUDIT_SCHEDULED: ['AUDIT_ACTIVE', 'DECLINED', 'NURTURE'],
    AUDIT_ACTIVE: ['AUDIT_COMPLETE', 'DECLINED', 'NURTURE'],
    AUDIT_COMPLETE: [],
    DECLINED: [],
    NURTURE: [],
    NO_FIT: [],
  },
  // Implementation workflow
  implementation: {
    OPPORTUNITY: ['SCOPE_DRAFT', 'DECLINED', 'NURTURE', 'LOST'],
    SCOPE_DRAFT: ['INTERNAL_REVIEW', 'DECLINED', 'NURTURE', 'LOST'],
    INTERNAL_REVIEW: ['PROPOSAL_DRAFT', 'DECLINED', 'NURTURE', 'LOST'],
    PROPOSAL_DRAFT: ['PROPOSAL_SENT', 'DECLINED', 'NURTURE', 'LOST'],
    PROPOSAL_SENT: ['CLIENT_REVIEW', 'DECLINED', 'NURTURE', 'LOST'],
    CLIENT_REVIEW: ['APPROVED', 'DECLINED', 'NURTURE', 'LOST'],
    APPROVED: ['PAYMENT_PENDING', 'DECLINED', 'NURTURE', 'LOST'],
    PAYMENT_PENDING: ['PAID', 'DECLINED', 'NURTURE', 'LOST'],
    PAID: ['KICKOFF', 'DECLINED', 'NURTURE', 'LOST'],
    KICKOFF: ['IN_DELIVERY', 'DECLINED', 'NURTURE', 'LOST'],
    IN_DELIVERY: ['COMPLETED', 'DECLINED', 'NURTURE', 'LOST'],
    COMPLETED: [],
    DECLINED: [],
    NURTURE: [],
    LOST: [],
  },
  // Project workflow
  project: {
    NOT_STARTED: ['KICKOFF', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    KICKOFF: ['PLANNING', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    PLANNING: ['IN_PROGRESS', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    IN_PROGRESS: ['INTERNAL_REVIEW', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    INTERNAL_REVIEW: ['CLIENT_REVIEW', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    CLIENT_REVIEW: ['DEPLOYMENT', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    DEPLOYMENT: ['HANDOFF', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    HANDOFF: ['COMPLETED', 'BLOCKED', 'ON_HOLD', 'CANCELLED'],
    COMPLETED: [],
    BLOCKED: [],
    ON_HOLD: [],
    CANCELLED: [],
  },
  // Retainer workflow
  retainer: {
    OPPORTUNITY: ['ASSESSMENT', 'PAUSED', 'CANCELLED'],
    ASSESSMENT: ['PROPOSAL_DRAFT', 'PAUSED', 'CANCELLED'],
    PROPOSAL_DRAFT: ['PROPOSAL_SENT', 'PAUSED', 'CANCELLED'],
    PROPOSAL_SENT: ['CLIENT_REVIEW', 'PAUSED', 'CANCELLED'],
    CLIENT_REVIEW: ['APPROVED', 'PAUSED', 'CANCELLED'],
    APPROVED: ['PAYMENT_PENDING', 'PAUSED', 'CANCELLED'],
    PAYMENT_PENDING: ['ACTIVE', 'PAUSED', 'CANCELLED'],
    ACTIVE: ['RENEWAL', 'PAUSED', 'CANCELLED'],
    RENEWAL: [],
    PAUSED: [],
    CANCELLED: [],
  },
};

/**
 * Validate a state transition for a given entity.
 * Returns an object describing if the transition is allowed,
 * a human‑readable reason, and whether an explicit override is required.
 */
export function validateTransition(params: ValidateTransitionParams): ValidateTransitionResult {
  const { entityType, currentState, nextState, overrideReason } = params;
  const normalizedEntity = entityType.toLowerCase();
  const normalizedCurrent = currentState.toUpperCase();
  const normalizedNext = nextState.toUpperCase();

  const entityTransitions = TRANSITIONS[normalizedEntity];
  if (!entityTransitions) {
    return {
      allowed: false,
      reason: `Unknown entity type '${entityType}'.`,
      requiresOverride: true,
    };
  }

  const allowedNext = entityTransitions[normalizedCurrent] || [];
  const isAllowed = allowedNext.includes(normalizedNext);

  if (isAllowed) {
    return { allowed: true, reason: 'Valid transition.', requiresOverride: false };
  }

  // If an override reason is supplied, we consider it an explicit manual override.
  const requiresOverride = !!overrideReason;
  return {
    allowed: requiresOverride,
    reason: requiresOverride
      ? `Transition overridden by user: ${overrideReason}`
      : `Invalid transition from '${currentState}' to '${nextState}' for entity '${entityType}'.`,
    requiresOverride,
  };
}

/**
 * Record a state transition in the state_transitions table.
 * This should be called after a successful transition (including overrides).
 */
export function recordStateTransition(params: {
  entityType: string;
  recordId: number;
  fromState: string;
  toState: string;
  userId: string;
  overrideReason?: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO state_transitions (
      entity_type,
      record_id,
      from_state,
      to_state,
      user_id,
      timestamp,
      override_reason
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
  `);
  stmt.run(
    params.entityType,
    params.recordId,
    params.fromState,
    params.toState,
    params.userId,
    params.overrideReason || null
  );
}

/**
 * Record a manual override entry.
 */
export function recordOverride(params: {
  entityType: string;
  recordId: number;
  fromState: string;
  toState: string;
  userId: string;
  reason: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO overrides (
      entity_type,
      record_id,
      reason,
      user_id,
      created_at
    ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  stmt.run(
    params.entityType,
    params.recordId,
    params.reason,
    params.userId
  );
}

/**
 * Convenience wrapper that validates, records the transition, and returns a result.
 * Throws an error if the transition is not allowed and no override is supplied.
 */
export function processStateTransition(params: ValidateTransitionParams & { recordId: number }) {
  const { entityType, currentState, nextState, userId, overrideReason, recordId } = params;
  const validation = validateTransition({
    entityType,
    currentState,
    nextState,
    userId,
    overrideReason,
    recordId,
  });

  if (!validation.allowed) {
    throw new Error(validation.reason);
  }

  // Record the transition (and possible override) atomically.
  const transaction = db.transaction(() => {
    if (validation.requiresOverride && overrideReason) {
      recordOverride({
        entityType,
        recordId,
        fromState: currentState,
        toState: nextState,
        userId,
        reason: overrideReason,
      });
    }
    recordStateTransition({
      entityType,
      recordId,
      fromState: currentState,
      toState: nextState,
      userId,
      overrideReason: validation.requiresOverride ? overrideReason : undefined,
    });
  });
  transaction();

  return { success: true, message: 'State transition recorded.' };
}

/**
 * Example middleware signature for Next.js API routes.
 * Usage inside a route:
 *   const { allowed, reason, requiresOverride } = validateTransition({ ... });
 *   if (!allowed) return NextResponse.json({ error: reason }, { status: 400 });
 */
export type TransitionMiddleware = (
  entityType: string,
  currentState: string,
  nextState: string,
  userId: string,
  recordId: number,
  overrideReason?: string
) => ValidateTransitionResult;
