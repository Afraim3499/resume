'use client';

import { Check, Copy, ExternalLink, Mail, MessageCircle, Send, Share2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type ShareButtonProps = {
  href?: string;
  label?: string;
  title?: string;
  description?: string;
  buttonClassName?: string;
  align?: 'left' | 'right';
};

export function ShareButton({
  href,
  label = 'Share result',
  title = 'Purchasing Power Roadmap',
  description = 'Explore how purchasing power changed using official historical price index data.',
  buttonClassName = 'button',
  align = 'right'
}: ShareButtonProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return href ?? '';
    return new URL(href ?? window.location.href, window.location.origin).toString();
  }, [href]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} - ${description}`);
  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: <MessageCircle size={17} aria-hidden="true" />
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <span aria-hidden="true">f</span>
    },
    {
      label: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <span aria-hidden="true">X</span>
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <span aria-hidden="true">in</span>
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Send size={17} aria-hidden="true" />
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: <Mail size={17} aria-hidden="true" />
    }
  ];

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  async function copyUrl() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareNative() {
    if (!navigator.share) {
      setOpen(true);
      return;
    }

    try {
      await navigator.share({
        title,
        text: description,
        url: shareUrl
      });
    } catch {
      // User-cancelled native share sheets should not change the visible state.
    }
  }

  return (
    <div className={`share-menu share-menu--${align}`} ref={menuRef}>
      <button
        className={buttonClassName}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
      >
        <Share2 size={18} aria-hidden="true" />
        {label}
      </button>

      {open ? (
        <div className="share-panel" role="dialog" aria-label="Share this purchasing power result">
          <div className="share-panel__header">
            <strong>{title}</strong>
            <span>{description}</span>
          </div>

          <div className="share-panel__primary">
            <button className="share-action" type="button" onClick={copyUrl}>
              {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
              {copied ? 'Copied link' : 'Copy link'}
            </button>
            <button className="share-action" type="button" onClick={shareNative}>
              <Share2 size={17} aria-hidden="true" />
              Native share
            </button>
          </div>

          <div className="share-grid">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.icon}
                {link.label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
