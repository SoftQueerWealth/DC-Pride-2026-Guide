import { useState, type FormEvent } from 'react';

export function JoinUs() {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [collective, setCollective] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <div className="sidebar-box join-box">
      <h3>Join Us</h3>
      <p className="sidebar-copy">
        Get the newsletter, and be first in line for the SQW Collective meetup group.
      </p>
      {joined ? (
        <div className="join-success" role="status">
          You&apos;re in ♡ Check your inbox to confirm.
        </div>
      ) : (
        <form onSubmit={handleJoin}>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />{' '}
            Newsletter
          </label>
          <label>
            <input
              type="checkbox"
              checked={collective}
              onChange={(e) => setCollective(e.target.checked)}
            />{' '}
            SQW Collective — meetup group launch
          </label>
          <label>
            <input
              type="checkbox"
              checked={productUpdates}
              onChange={(e) => setProductUpdates(e.target.checked)}
            />{' '}
            Product updates
          </label>
          <button
            type="submit"
            className="btn small"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Sign me up
          </button>
        </form>
      )}
    </div>
  );
}
