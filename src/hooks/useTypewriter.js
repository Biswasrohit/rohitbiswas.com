import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (phrases, speed = 80, pause = 2000) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = phrases[phraseIndex];
    if (!current) return;

    if (!deleting) {
      setText(current.slice(0, charIndex + 1));
      if (charIndex + 1 === current.length) {
        setTimeout(() => setDeleting(true), pause);
        return;
      }
      setCharIndex((c) => c + 1);
    } else {
      setText(current.slice(0, charIndex));
      if (charIndex === 0) {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      setCharIndex((c) => c - 1);
    }
  }, [charIndex, deleting, phraseIndex, phrases, pause]);

  useEffect(() => {
    const timeout = setTimeout(tick, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [tick, deleting, speed]);

  return text;
};
