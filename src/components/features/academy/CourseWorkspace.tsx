'use client';

import * as React from 'react';
import Link from 'next/link';
import { AcademyCourse, AcademyLesson } from '@/types/academy';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils/cn';
import { CapstoneSubmissionForm } from './CapstoneSubmissionForm';

interface CourseWorkspaceProps {
  course: AcademyCourse;
}

export function CourseWorkspace({ course }: CourseWorkspaceProps) {
  // Flatten all lessons across modules
  const allLessons: AcademyLesson[] = React.useMemo(() => {
    return course.modules.flatMap((m) => m.lessons);
  }, [course]);

  // Active lesson and completion tracking state
  const [currentLessonId, setCurrentLessonId] = React.useState<string>(
    allLessons[0]?.id || ''
  );
  const [completedLessonIds, setCompletedLessonIds] = React.useState<string[]>(
    allLessons.slice(0, 2).map((l) => l.id) // Default 2 completed for demonstration
  );
  const [activeTab, setActiveTab] = React.useState<'overview' | 'resources' | 'capstone'>('overview');

  const currentLesson =
    allLessons.find((l) => l.id === currentLessonId) || allLessons[0];
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  // Calculate percentage
  const totalLessons = allLessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Mark lesson completed and advance to next
  const handleMarkCompleted = () => {
    if (!completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds((prev) => [...prev, currentLesson.id]);
    }
    // Advance to next lesson if available
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* ========================================================
          1. TOP WORKSPACE NAVIGATION BAR
          ======================================================== */}
      <div className="sticky top-0 z-30 w-full border-b border-rule-subtle/50 bg-brand-midnight-deep/95 backdrop-blur-md py-3">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Back trigger & Title */}
          <div className="flex items-center gap-4">
            <Link
              href="/academy"
              className="text-xs font-semibold text-content-secondary hover:text-brand-gold transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Back to Catalog</span>
            </Link>
            <span className="text-rule-subtle hidden sm:inline">|</span>
            <h1 className="font-serif text-base font-bold text-content-primary line-clamp-1">
              {course.title}
            </h1>
          </div>

          {/* Student Status & Progress Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-content-secondary border border-rule-subtle/60 rounded-full px-3 py-1 bg-surface">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-medium text-content-primary">Student Learner</span>
              <span>•</span>
              <span>Pre-Clinical I</span>
            </div>

            <span className="text-xs font-mono font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/30 rounded-full px-2.5 py-1">
              {progressPercent}% Complete
            </span>
          </div>
        </Container>
      </div>

      {/* ========================================================
          2. MAIN PLAYER & CURRICULUM SIDEBAR GRID
          ======================================================== */}
      <Container className="py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Video Player Pane & Workspace Tabs (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Player Container */}
            <div className="flex flex-col rounded-2xl border border-rule-subtle bg-surface/90 overflow-hidden shadow-2xl">
              {/* Header Info */}
              <div className="p-4 sm:p-5 border-b border-rule-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                    EMSA ACADEMY / LESSON 0{currentLesson.lessonNumber}
                  </span>
                  <h2 className="font-serif text-lg font-bold text-content-primary mt-0.5">
                    {currentLesson.title}
                  </h2>
                </div>
                <span className="text-xs font-medium text-content-secondary shrink-0">
                  Curated Resource • YouTube Public Education
                </span>
              </div>

              {/* 16:9 Responsive YouTube Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentLesson.youtubeVideoId}?rel=0&modestbranding=1`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              {/* Action Bar Below Player */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-midnight/60 border-t border-rule-subtle/50">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-content-secondary">
                    NOW PLAYING • DURATION: {currentLesson.duration}
                  </span>
                  <span className="text-xs font-semibold text-content-primary mt-0.5">
                    {currentLesson.title}
                  </span>
                </div>

                <Button
                  onClick={handleMarkCompleted}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto font-semibold shrink-0"
                >
                  {completedLessonIds.includes(currentLesson.id)
                    ? 'Completed ✓ (Next Lesson →)'
                    : 'Mark as Completed & Continue →'}
                </Button>
              </div>
            </div>

            {/* Bottom Tabbed Workspace */}
            <div className="rounded-2xl border border-rule-subtle bg-surface/80 p-6 shadow-xl">
              {/* Tab Switcher */}
              <div className="flex items-center gap-6 border-b border-rule-subtle/50 pb-3 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wider transition-colors pb-1 border-b-2 -mb-[13px]',
                    activeTab === 'overview'
                      ? 'border-brand-gold text-brand-gold'
                      : 'border-transparent text-content-secondary hover:text-content-primary'
                  )}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('resources')}
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wider transition-colors pb-1 border-b-2 -mb-[13px]',
                    activeTab === 'resources'
                      ? 'border-brand-gold text-brand-gold'
                      : 'border-transparent text-content-secondary hover:text-content-primary'
                  )}
                >
                  Resources & Exercise
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('capstone')}
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wider transition-colors pb-1 border-b-2 -mb-[13px]',
                    activeTab === 'capstone'
                      ? 'border-brand-gold text-brand-gold'
                      : 'border-transparent text-content-secondary hover:text-content-primary'
                  )}
                >
                  Final Project Submission
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4 text-xs sm:text-sm text-content-secondary leading-relaxed">
                  <h3 className="font-serif text-lg font-bold text-content-primary">
                    About this Lesson
                  </h3>
                  <p>{currentLesson.summary || course.description}</p>
                  <p>
                    Watch the video lesson carefully. Take notes on key principles of medical
                    communication, visual clarity, and patient advocacy. Once you finish watching,
                    click "Mark as Completed" to track your progress toward your certificate.
                  </p>
                </div>
              )}

              {/* Tab 2: Resources & Exercise */}
              {activeTab === 'resources' && (
                <div className="space-y-4 text-xs sm:text-sm text-content-secondary leading-relaxed">
                  <h3 className="font-serif text-lg font-bold text-content-primary">
                    Practical Exercise
                  </h3>
                  <p>
                    Review the accompanying medical design templates and accessibility standards.
                    Ensure you test your color contrasts against clinical readability guidelines.
                  </p>
                  <div className="p-4 rounded-xl border border-rule-subtle bg-brand-midnight flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-content-primary block">
                        Lesson Exercise Checklist
                      </span>
                      <span className="text-[11px] text-content-secondary">
                        PDF Guidelines • 1.2 MB
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Download ↓
                    </Button>
                  </div>
                </div>
              )}

              {/* Tab 3: Final Project Submission */}
              {activeTab === 'capstone' && (
                <CapstoneSubmissionForm
                  course={course}
                  isUnlocked={progressPercent === 100}
                />
              )}
            </div>
          </div>

          {/* RIGHT: Sticky Curriculum Path Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="rounded-2xl border border-rule-subtle bg-surface/90 p-6 shadow-xl flex flex-col gap-6">
              {/* Sidebar Header */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                  EMSA-ECUSTA / ACADEMY
                </span>
                <h3 className="font-serif text-xl font-bold text-content-primary mt-1">
                  Your learning path
                </h3>
                <span className="text-xs text-content-secondary block mt-0.5">
                  {totalLessons} lessons • Curated YouTube playlist
                </span>

                {/* Progress bar */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-content-secondary">
                      {completedCount} of {totalLessons} completed
                    </span>
                    <span className="text-brand-gold font-bold font-mono">
                      {progressPercent}%
                    </span>
                  </div>
                  <ProgressBar value={progressPercent} variant="gold" />
                </div>
              </div>

              {/* Grouped Modules List */}
              <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-1">
                {course.modules.map((module) => (
                  <div key={module.moduleNumber} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-content-secondary border-b border-rule-subtle/50 pb-1.5">
                      <span>{module.title}</span>
                      <span className="text-[10px] font-normal lowercase">
                        {module.lessons.length} lessons
                      </span>
                    </div>

                    {/* Lesson Items */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      {module.lessons.map((lesson) => {
                        const isCurrent = lesson.id === currentLessonId;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => setCurrentLessonId(lesson.id)}
                            className={cn(
                              'w-full text-left flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 text-xs',
                              isCurrent
                                ? 'border-brand-gold bg-brand-gold/10 shadow-sm ring-1 ring-brand-gold/30'
                                : 'border-transparent hover:border-rule-subtle hover:bg-surface'
                            )}
                          >
                            {/* Status Icon */}
                            <div className="shrink-0 mt-0.5">
                              {isDone ? (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                  ✓
                                </span>
                              ) : isCurrent ? (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-midnight text-[9px] font-bold">
                                  ▶
                                </span>
                              ) : (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-rule-subtle text-content-secondary text-[9px]">
                                  {lesson.lessonNumber}
                                </span>
                              )}
                            </div>

                            {/* Title & Runtime */}
                            <div className="flex-1 flex flex-col min-w-0">
                              <span
                                className={cn(
                                  'font-medium line-clamp-1',
                                  isCurrent ? 'text-brand-gold font-bold' : 'text-content-primary'
                                )}
                              >
                                {lesson.title}
                              </span>
                              <span className="text-[10px] text-content-secondary mt-0.5">
                                Video lesson • {lesson.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Encouragement Footer */}
              <div className="p-3.5 rounded-xl border border-rule-subtle/60 bg-brand-midnight-deep/60 text-[11px] text-content-secondary leading-relaxed">
                <span className="text-content-primary font-semibold block mb-0.5">
                  Your progress stays with you.
                </span>
                Return to any lesson as you work on your final capstone project.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
