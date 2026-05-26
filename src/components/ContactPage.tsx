import { useState } from 'react';

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = () => {
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <div className="contact-popup">
      <div className="contact-info">
        <p className="contact-label">OPERATOR_EMAIL:</p>
        <p className="contact-value">pallavi.kiragi@gmail.com</p>
      </div>
      
      <div className="contact-form">
        <textarea 
          placeholder="WRITE A MESSAGE..." 
          className="contact-textarea"
          disabled={status !== 'idle'}
        />
        <button 
          className={`contact-send ${status !== 'idle' ? 'contact-send--disabled' : ''}`}
          onClick={handleSend}
          disabled={status !== 'idle'}
        >
          {status === 'idle' ? '[ SEND_MESSAGE ]' : status === 'sending' ? '[ SENDING... ]' : '[ MESSAGE_SENT ]'}
        </button>
      </div>
    </div>
  );
}
