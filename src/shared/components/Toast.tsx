import { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCountdown } from '../../hooks/useCountdown';
import './toast.scss';

export type ToastMessage = { id: number; message: string; resetAt?: number };

type ToastProps = { notification: ToastMessage | null; onDismiss: () => void };

export default function Toast({ notification, onDismiss }: ToastProps) {
  const { remainingSeconds, formatted } = useCountdown(notification?.resetAt);
  const hasCountdown = notification?.resetAt !== undefined;

  useEffect(() => {
    if (!notification || notification.resetAt !== undefined) return;
    const timeout = setTimeout(onDismiss, 10000);
    return () => clearTimeout(timeout);
  }, [notification, onDismiss]);

  return createPortal(
    <div className="toast-region" role="alert" aria-atomic="true">
      {notification && <div className="toast" key={notification.id}>
        <AlertCircle size={21} aria-hidden="true" />
        <div>
          <strong>{hasCountdown && remainingSeconds === 0 ? 'Email limit reset' : 'Email limit reached'}</strong>
          {hasCountdown
            ? remainingSeconds > 0
              ? <><p>You’ve reached your limit of 5 messages per hour.</p><p>Resets in <span role="timer" aria-live="off">{formatted}</span>. You can send 5 more messages after the reset.</p></>
              : <p>Your limit has reset. You can now send up to 5 messages.</p>
            : <p>{notification.message}</p>}
        </div>
        <button type="button" onClick={onDismiss} aria-label="Dismiss notification"><X size={18} /></button>
      </div>}
    </div>,
    document.body,
  );
}
