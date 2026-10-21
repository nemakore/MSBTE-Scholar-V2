'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, RotateCcw, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MockTest } from '@/data/types';

interface MockQuizModalProps {
  test: MockTest;
  onClose: () => void;
}

export const MockQuizModal: React.FC<MockQuizModalProps> = ({ test, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const currentQuestion = test.questions[currentIdx];

  // Calculate score
  const correctCount = test.questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((correctCount / test.questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2A2A2A] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#0B3B2E] text-[#FAF6EE] px-5 py-3.5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
              {test.subjectName} • {test.topic}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              {test.title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  secondsLeft < 120
                    ? 'bg-[#B3202F] text-white animate-pulse'
                    : 'bg-[#062D24] text-[#F1DFA4] border border-[#D4AF37]/40'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            {/* Question progress and topic badge */}
            <div className="flex items-center justify-between border-b border-[#E6DCC6] dark:border-[#262626] pb-3">
              <span className="text-xs font-bold text-[#5F5B52] dark:text-[#A09A8F]">
                Question {currentIdx + 1} of {test.questions.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E7F2EE] dark:bg-[#0B3B2E] text-[#0B3B2E] dark:text-[#F1DFA4] font-medium border border-[#0B3B2E]/20">
                {currentQuestion.topic}
              </span>
            </div>

            {/* Question Statement */}
            <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-xl border border-[#E6DCC6] dark:border-[#282828] shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-[#141414] dark:text-white">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#0B3B2E] bg-[#E7F2EE] text-[#0B3B2E] font-semibold dark:border-[#D4AF37] dark:bg-[#062D24] dark:text-[#F1DFA4]'
                        : 'border-[#E6DCC6] bg-white text-[#141414] hover:border-[#0B3B2E]/50 dark:border-[#2C2C2C] dark:bg-[#1C1C1C] dark:text-[#E0E0E0]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#0B3B2E] text-white dark:bg-[#D4AF37] dark:text-[#062D24]'
                          : 'bg-[#FAF6EE] dark:bg-[#262626] text-[#5F5B52] dark:text-[#999]'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Palette */}
            <div className="pt-2 border-t border-[#E6DCC6] dark:border-[#262626]">
              <div className="text-xs font-semibold text-[#5F5B52] dark:text-[#999] mb-2">
                Question Palette:
              </div>
              <div className="flex flex-wrap gap-2">
                {test.questions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-[#D4AF37] ring-offset-1 bg-[#0B3B2E] text-white'
                          : isAnswered
                          ? 'bg-[#1FA971] text-white'
                          : 'bg-white dark:bg-[#222] border border-[#E6DCC6] dark:border-[#333] text-[#5F5B52]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Confirm Submit Dialog Overlay if open */}
            {showConfirmSubmit && (
              <div className="bg-[#FFF8E6] dark:bg-[#221C11] border border-[#D4AF37] p-4 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#B08F26] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#5F5B52] dark:text-[#E0D8C8]">
                    You have answered {Object.keys(selectedAnswers).length} of {test.questions.length} questions. Submit now?
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="px-3 py-1 text-xs rounded-lg border border-[#E6DCC6] bg-white font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-3 py-1 text-xs rounded-lg bg-[#0B3B2E] text-white font-bold"
                  >
                    Confirm Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-[#E7F2EE] to-white dark:from-[#0B3B2E]/30 dark:to-[#171717] rounded-2xl border border-[#D4AF37]/30">
              <Award className="w-14 h-14 mx-auto text-[#D4AF37] mb-2" />
              <h4 className="text-xl font-extrabold text-[#0B3B2E] dark:text-white">
                Test Completed!
              </h4>
              <p className="text-sm text-[#5F5B52] dark:text-[#A09A8F] mt-1">
                Here is your MSBTE performance scorecard
              </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="bg-white dark:bg-[#1E1E1E] px-5 py-3 rounded-xl border border-[#E6DCC6] dark:border-[#333]">
                  <span className="text-2xl font-black text-[#0B3B2E] dark:text-[#D4AF37]">
                    {correctCount} / {test.questions.length}
                  </span>
                  <span className="block text-[11px] text-[#5F5B52] dark:text-[#888] font-medium">
                    Correct Answers
                  </span>
                </div>
                <div className="bg-white dark:bg-[#1E1E1E] px-5 py-3 rounded-xl border border-[#E6DCC6] dark:border-[#333]">
                  <span
                    className={`text-2xl font-black ${
                      percentage >= 70 ? 'text-[#1FA971]' : percentage >= 40 ? 'text-[#D4AF37]' : 'text-[#B3202F]'
                    }`}
                  >
                    {percentage}%
                  </span>
                  <span className="block text-[11px] text-[#5F5B52] dark:text-[#888] font-medium">
                    Overall Accuracy
                  </span>
                </div>
              </div>
            </div>

            {/* Review Answers */}
            <div className="space-y-4">
              <h5 className="font-bold text-sm text-[#141414] dark:text-white">
                Review Questions & Model Explanations:
              </h5>
              {test.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-sm ${
                      isCorrect
                        ? 'bg-[#E7F7EE]/60 border-[#1FA971]/40 dark:bg-[#1FA971]/10'
                        : 'bg-[#FDECEE]/60 border-[#B3202F]/40 dark:bg-[#B3202F]/10'
                    }`}
                  >
                    <div className="flex items-start gap-2 font-medium mb-2">
                      <span className="font-bold">{idx + 1}.</span>
                      <span>{q.question}</span>
                    </div>
                    <div className="text-xs space-y-1 mb-2">
                      <div>
                        Your Answer:{' '}
                        <span className={isCorrect ? 'text-[#1FA971] font-bold' : 'text-[#B3202F] font-bold'}>
                          {userAns !== undefined ? q.options[userAns] : 'Not Attempted'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          Correct Answer:{' '}
                          <span className="text-[#1FA971] font-bold">
                            {q.options[q.correctAnswer]}
                          </span>
                        </div>
                      )}
                    </div>
                    {q.explanation && (
                      <p className="text-xs text-[#5F5B52] dark:text-[#B0B0B0] bg-white/80 dark:bg-black/30 p-2 rounded-lg border border-[#E6DCC6]/60">
                        <strong className="text-[#0B3B2E] dark:text-[#D4AF37]">Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="bg-white dark:bg-[#181818] p-3 sm:p-4 border-t border-[#E6DCC6] dark:border-[#262626] flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold border border-[#E6DCC6] dark:border-[#333] hover:bg-[#FAF6EE] disabled:opacity-40"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < test.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B3B2E] text-white hover:bg-[#062D24]"
                  >
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#1FA971] text-white hover:bg-[#188B5D] shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Test
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setCurrentIdx(0);
                  setSecondsLeft(test.durationMinutes * 60);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#E6DCC6] hover:bg-[#FAF6EE]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Test
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#0B3B2E] text-white hover:bg-[#062D24]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
