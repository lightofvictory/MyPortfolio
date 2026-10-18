import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CONTACT_WINDOW_MS, ContactLimitError, withContactLimit } from '../src/services/contactLimit.ts';

const stored = new Map();
Object.defineProperty(globalThis, 'localStorage', {
  value: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) },
});

test('allows five successful sends, then blocks normalized email without sending', async () => {
  let sent = 0;
  const send = async () => { sent++; };
  for (let index = 0; index < 5; index++) await withContactLimit(' Limit@Example.com ', send);
  await assert.rejects(withContactLimit('limit@example.com', send), ContactLimitError);
  assert.equal(sent, 5);
  await withContactLimit('another@example.com', send);
  assert.equal(sent, 6);
});

test('failed sends do not consume the allowance', async () => {
  await assert.rejects(withContactLimit('failure@example.com', async () => { throw new Error('Network failure'); }));
  for (let index = 0; index < 5; index++) await withContactLimit('failure@example.com', async () => {});
  await assert.rejects(withContactLimit('failure@example.com', async () => {}), ContactLimitError);
});

test('resets the full allowance after one hour, including after a reload', async () => {
  const realNow = Date.now;
  let now = realNow();
  Date.now = () => now;
  try {
    for (let index = 0; index < 5; index++) await withContactLimit('reset@example.com', async () => {});
    now += CONTACT_WINDOW_MS - 1;
    await assert.rejects(withContactLimit('reset@example.com', async () => {}), ContactLimitError);
    // A fresh module has no memory of sends and must recover the saved allowance.
    const reloaded = await import('../src/services/contactLimit.ts?reload');
    await assert.rejects(reloaded.withContactLimit('reset@example.com', async () => {}), { name: 'ContactLimitError' });
    now += 1;
    for (let index = 0; index < 5; index++) await reloaded.withContactLimit('reset@example.com', async () => {});
    await assert.rejects(reloaded.withContactLimit('reset@example.com', async () => {}), { name: 'ContactLimitError' });
  } finally { Date.now = realNow; }
});
