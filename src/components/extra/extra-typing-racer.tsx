'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const passages = [
  "The elegance of a scientific theory lies in its ability to explain complex phenomena through simple elegant principles.",
  "In the history of science, the most profound discoveries often emerge from the willingness to question established beliefs.",
  "The pursuit of knowledge is a journey without end, where each answer leads to new questions waiting to be explored.",
  "Mathematics is the language in which the universe speaks to those who take the time to listen and understand its patterns.",
  "The greatest scientists are artists as well, for they create new ways of seeing the world that others have missed entirely.",
  "Science progresses not by overthrowing established theories but by building upon the work of those who came before.",
  "The beauty of a formula lies not in its symbols but in the truth it captures about the nature of reality itself.",
];

interface ExtraTypingRacerProps {
  onBack?: () => void;
}

export function ExtraTypingRacer({ onBack }: ExtraTypingRacerProps) {
  const [passageIdx, setPassageIdx] = useState(() => Math.floor(Math.random() * passages.length));
  const passage = passages[passageIdx];
  const chars = passage.split('');

  const [input, setInput] = useState('');
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isFinished) return;

    if (e.key === 'Backspace') {
      setInput(prev => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();

      if (input.length >= passage.length) return;

      if (!startTime) setStartTime(Date.now());

      const targetChar = passage[input.length];
      if (e.key !== targetChar) {
        setErrors(prev => prev + 1);
      }

      const newInput = input + e.key;
      setInput(newInput);

      if (newInput.length >= passage.length) {
        setEndTime(Date.now());
        setIsFinished(true);
      }
    }
  }, [input, passage, startTime, isFinished]);

  const elapsed = startTime
    ? endTime
      ? (endTime - startTime) / 1000
      : (Date.now() - startTime) / 1000
    : 0;

  const correctChars = input.split('').filter((ch, i) => i < passage.length && ch === passage[i]).length;
  const wpm = elapsed > 0
    ? Math.round((correctChars / 5) / (elapsed / 60))
    : 0;
  const precision = input.length > 0
    ? Math.round((correctChars / input.length) * 100)
    : 100;

  const restart = useCallback(() => {
    const idx = Math.floor(Math.random() * passages.length);
    setPassageIdx(idx);
    setInput('');
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setTimeout(() => containerRef.current?.focus(), 100);
  }, []);

  return (
    <div>
      <div className="section-heading flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-chip"
        >
          <ArrowLeft size={12} data-back />
          <span>Back</span>
        </button>
        {!isFinished && (
          <span className="text-xs text-muted italic">
            type the passage below
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="font-serif text-lg leading-relaxed tracking-wide select-none cursor-text outline-none focus:outline-none"
      >
        {chars.map((char, i) => {
          let className = 'text-muted/40';
          if (i < input.length) {
            className = input[i] === char
              ? 'text-foreground'
              : 'text-red-500 bg-red-500/10';
          } else if (i === input.length) {
            className = 'text-muted/40 border-l border-accent';
          }
          return (
            <span
              key={i}
              ref={i === input.length ? cursorRef : null}
              className={className}
            >
              {char}
            </span>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4 text-sm text-muted">
        {!isFinished ? (
          <>
            <span>
              speed{' '}
              <strong className="text-foreground font-mono">{wpm}</strong> wpm
            </span>
            <span className="opacity-20">·</span>
            <span>
              precision{' '}
              <strong className="text-foreground font-mono">{precision}</strong>%
            </span>
            <span className="opacity-20">·</span>
            <span className="font-mono text-foreground">{elapsed.toFixed(1)}s</span>
          </>
        ) : (
          <>
            <span className="text-foreground">
              done{' '}
              <span className="opacity-20">—</span>{' '}
              <strong className="font-mono">{wpm}</strong> wpm{' '}
              <span className="opacity-20">·</span>{' '}
              <strong className="font-mono">{precision}</strong>%{' '}
              <span className="opacity-20">·</span>{' '}
              <strong className="font-mono">{errors}</strong>{' '}
              error{errors !== 1 ? 's' : ''}
            </span>
            <button
              onClick={restart}
              className="text-muted italic underline hover:text-foreground bg-transparent border-none p-0 cursor-pointer transition-colors"
            >
              again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
