-- ============================================================
-- EMSA-ECUSTA: AUTHENTICATION & STUDENT PROFILES MIGRATION
-- ============================================================

-- 1. Create Custom Enumerations
CREATE TYPE academic_batch_tier AS ENUM (
  'Pre-Clinical Year I',
  'Pre-Clinical Year II',
  'Clinical Year I',
  'Clinical Year II',
  'Internship',
  'Alumni'
);

CREATE TYPE standing_committee_slug AS ENUM (
  'scome',
  'scoph',
  'scora',
  'scope',
  'scorp',
  'score'
);

CREATE TYPE eligibility_status AS ENUM (
  'PENDING_APPROVAL',
  'ACTIVE_ELIGIBLE',
  'SUSPENDED',
  'REJECTED'
);

-- 2. Create Student Profiles Table (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_legal_name TEXT NOT NULL,
  batch_tier academic_batch_tier NOT NULL DEFAULT 'Pre-Clinical Year I',
  standing_committee standing_committee_slug NOT NULL DEFAULT 'scora',
  eligibility_status eligibility_status NOT NULL DEFAULT 'PENDING_APPROVAL',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_ecusta_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@ecusta\.edu\.et$')
);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Students can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Students can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can update their own non-critical profile info"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);
