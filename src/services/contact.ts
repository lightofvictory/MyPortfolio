export async function submitContactMessage(
  form: FormData,
  accessKey: string,
  signal?: AbortSignal,
): Promise<void> {
  if (!accessKey.trim()) {
    throw new Error('The contact form is not configured yet. Please use the email link to get in touch.');
  }
  form.set('access_key', accessKey.trim());
  form.set('from_name', 'Jayaprakash Portfolio');
  form.set('replyto', String(form.get('email') ?? '').trim());

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: form,
    headers: { Accept: 'application/json' },
    signal,
  });
  const result: unknown = await response.json();
  if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) {
    throw new Error('Your message could not be sent. Please try again or use the email link.');
  }
}
