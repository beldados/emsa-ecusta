'use client';

import * as React from 'react';
import { AcademyCourse } from '@/types/academy';
import { SubmissionPlatform } from '@/types/submissions';
import { Button } from '@/components/ui/button';

interface CapstoneSubmissionFormProps {
  course: AcademyCourse;
  isUnlocked: boolean; // True when course lessons are 100% completed
}

export function CapstoneSubmissionForm({ course, isUnlocked }: CapstoneSubmissionFormProps) {
  const [projectTitle, setProjectTitle] = React.useState('');
  const [platform, setPlatform] = React.useState<SubmissionPlatform>('GOOGLE_DRIVE');
  const [submissionUrl, setSubmissionUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [activeSubmission, setActiveSubmission] = React.useState<any>(null);
  const [showHistory, setShowHistory] = React.useState(false);

  // Load existing submission on mount
  React.useEffect(() => {
    fetch('/api/v1/academy/submissions')
      .then((res) => res.json())
      .then((json) => {
        if (json?.data && json.data.courseSlug === course.slug) {
          setActiveSubmission(json.data);
        }
      })
      .catch(() => {});
  }, [course.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!submissionUrl.startsWith('https://')) {
      setErrorMsg('Submission URL must use a secure HTTPS protocol (e.g., https://...)');
      return;
    }

    if (!isConfirmed) {
      setErrorMsg('You must confirm link access permissions for reviewers.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/academy/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseSlug: course.slug,
          projectTitle,
          platform,
          submissionUrl,
          projectDescription: description,
          accessibilityConfirmed: isConfirmed,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setActiveSubmission(json.data);
      } else {
        setErrorMsg(json.error?.message || json.error || 'Failed to submit capstone link');
      }
    } catch {
      setErrorMsg('Network error submitting capstone link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. LOCKED GATE (When course lessons < 100%)
  if (!isUnlocked && !activeSubmission) {
    return (
      <div className="flex flex-col items-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-rule-subtle bg-surface/50">
        <div className="h-12 w-12 rounded-full border border-rule-subtle bg-brand-midnight flex items-center justify-center text-xl mb-4">
          🔒
        </div>
        <h4 className="font-serif text-xl font-bold text-content-primary">
          Capstone Submission Locked
        </h4>
        <p className="mt-2 max-w-md text-xs sm:text-sm text-content-secondary leading-relaxed">
          Complete 100% of the lessons in your learning path to unlock your capstone project submission
          and qualify for certification.
        </p>
        <span className="mt-4 text-[11px] font-bold text-brand-gold uppercase tracking-wider">
          {course.totalLessons} Lessons Required • Watch all videos to proceed
        </span>
      </div>
    );
  }

  // 2. ACTIVE SUBMISSION STATUS VIEW
  if (activeSubmission) {
    const isPending = activeSubmission.status === 'PENDING_REVIEW';
    const isPassed = activeSubmission.status === 'PASSED';
    const isChangesRequested = activeSubmission.status === 'CHANGES_REQUESTED';

    return (
      <div className="flex flex-col gap-6">
        {/* Status Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-rule-subtle bg-surface/90 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule-subtle/50 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                CAPSTONE EVALUATION STATUS
              </span>
              <h4 className="font-serif text-xl font-bold text-content-primary mt-1">
                {activeSubmission.projectTitle}
              </h4>
              <span className="text-xs text-content-secondary">
                Revision #{activeSubmission.currentRevision} • Submitted on{' '}
                {new Date(activeSubmission.submittedAt).toLocaleDateString()}
              </span>
            </div>

            {/* Status Badge */}
            <div>
              {isPending && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/40 bg-amber-500/10 text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  Under Review
                </span>
              )}
              {isPassed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  <span>✓</span>
                  Approved & Certified
                </span>
              )}
              {isChangesRequested && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-brand-crimson/40 bg-brand-crimson/10 text-red-400">
                  <span>⚠</span>
                  Changes Requested
                </span>
              )}
            </div>
          </div>

          {/* Link Details */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-rule-subtle/60 bg-brand-midnight">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔗</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-content-secondary">
                  {activeSubmission.platform.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-content-primary truncate max-w-xs sm:max-w-md">
                  {activeSubmission.submissionUrl}
                </span>
              </div>
            </div>

            <a
              href={activeSubmission.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline shrink-0"
            >
              <span>Open Project Link</span>
              <span>↗</span>
            </a>
          </div>

          {/* Reviewer Feedback Box */}
          {activeSubmission.reviews && activeSubmission.reviews.length > 0 && (
            <div className="mt-5 p-4 rounded-xl border border-rule-subtle bg-surface text-xs leading-relaxed text-content-secondary">
              <span className="font-semibold text-content-primary block mb-1 text-sm">
                Reviewer Evaluation Feedback:
              </span>
              <p>{activeSubmission.reviews[0].feedbackNotes}</p>
            </div>
          )}

          {/* Re-submission Trigger if Changes Requested */}
          {isChangesRequested && (
            <div className="mt-6 pt-5 border-t border-rule-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-content-secondary">
                Please update your file according to feedback, then submit a revised link.
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSubmissionUrl('');
                  setIsConfirmed(false);
                }}
              >
                Submit Revised Link (Rev #{activeSubmission.currentRevision + 1}) →
              </Button>
            </div>
          )}
        </div>

        {/* Revision History Drawer */}
        {activeSubmission.revisions && activeSubmission.revisions.length > 0 && (
          <div className="rounded-xl border border-rule-subtle bg-surface/70 p-5">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-between w-full text-xs font-bold text-content-primary"
            >
              <span>Past Revision History ({activeSubmission.revisions.length})</span>
              <span>{showHistory ? '▲' : '▼'}</span>
            </button>

            {showHistory && (
              <div className="mt-4 space-y-3 pt-3 border-t border-rule-subtle/50">
                {activeSubmission.revisions.map((rev: any) => (
                  <div key={rev.revisionNumber} className="p-3 rounded-lg bg-brand-midnight text-xs flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-brand-gold block">
                        Revision #{rev.revisionNumber}
                      </span>
                      <span className="text-[10px] text-content-secondary">
                        {new Date(rev.submittedAt).toLocaleDateString()} • {rev.platform}
                      </span>
                    </div>
                    <a
                      href={rev.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-gold hover:underline"
                    >
                      View Link ↗
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 3. INITIAL SUBMISSION FORM
  return (
    <div className="flex flex-col gap-6">
      {/* Capstone Instructions Header */}
      <div className="p-6 rounded-2xl border border-rule-subtle bg-surface/80">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
          COURSE CAPSTONE PROJECT
        </span>
        <h4 className="font-serif text-xl font-bold text-content-primary">
          {course.capstoneSpec.title}
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-content-secondary leading-relaxed">
          {course.capstoneSpec.instructions}
        </p>

        {/* Rubric Points */}
        <div className="mt-4 pt-4 border-t border-rule-subtle/50">
          <span className="text-xs font-semibold text-content-primary block mb-2">
            Assessment Rubric Criteria:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-content-secondary">
            {course.capstoneSpec.rubricSummary.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-brand-gold font-bold">✓</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* External Link Submission Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-rule-gold/40 bg-surface/90 shadow-xl space-y-5">
        <h5 className="font-serif text-lg font-bold text-content-primary">
          Submit Completed Project Link
        </h5>

        {errorMsg && (
          <div className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        {/* Project Title */}
        <div>
          <label className="block text-xs font-medium text-content-primary mb-1">
            Project Title
          </label>
          <input
            type="text"
            required
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. SCORA Cervical Cancer Awareness Campaign Poster"
            className="w-full rounded-lg border border-rule-subtle bg-brand-midnight px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none"
          />
        </div>

        {/* Platform Selector */}
        <div>
          <label className="block text-xs font-medium text-content-primary mb-1">
            Submission Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as SubmissionPlatform)}
            className="w-full rounded-lg border border-rule-subtle bg-brand-midnight px-3.5 py-2.5 text-xs text-content-primary focus:border-brand-gold focus:outline-none cursor-pointer"
          >
            <option value="GOOGLE_DRIVE">Google Drive (Shareable Link)</option>
            <option value="CANVA">Canva (Public View Link)</option>
            <option value="FIGMA">Figma (View Only Prototype Link)</option>
            <option value="YOUTUBE">YouTube (Unlisted / Public Video URL)</option>
            <option value="OTHER_APPROVED">Other Approved Educational Host</option>
          </select>
        </div>

        {/* Submission URL */}
        <div>
          <label className="block text-xs font-medium text-content-primary mb-1">
            Project URL (Must use HTTPS)
          </label>
          <input
            type="url"
            required
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full rounded-lg border border-rule-subtle bg-brand-midnight px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none font-mono"
          />
        </div>

        {/* Optional Student Notes */}
        <div>
          <label className="block text-xs font-medium text-content-primary mb-1">
            Student Notes / Rationale (Optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your visual hierarchy choices, target audience, or campaign messaging..."
            className="w-full rounded-lg border border-rule-subtle bg-brand-midnight px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none resize-none"
          />
        </div>

        {/* Permission Confirmation */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl border border-rule-subtle bg-brand-midnight">
          <input
            type="checkbox"
            id="confirm-permission"
            required
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="mt-0.5 rounded border-rule-subtle text-brand-gold focus:ring-brand-gold"
          />
          <label htmlFor="confirm-permission" className="text-xs text-content-secondary leading-relaxed cursor-pointer">
            I confirm that sharing permissions on this link have been configured to{' '}
            <strong className="text-content-primary">"Anyone with the link can view"</strong> so chapter
            reviewers can access and evaluate my work.
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Link...' : 'Submit Project for Review →'}
        </Button>
      </form>
    </div>
  );
}
