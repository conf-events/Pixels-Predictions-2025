// Learn More Form
document.getElementById('learnMoreForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('learnEmail').value;
  const msg = document.getElementById('learnMoreMsg');

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  msg.textContent = data.message;
  msg.style.color = res.ok ? 'green' : 'red';

  if (res.ok) this.reset();
});

// Conference Registration Form
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const surname = document.getElementById('regSurname').value;
  const email = document.getElementById('regEmail').value;
  const msg = document.getElementById('registerMsg');

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, surname, email })
  });

  const data = await res.json();
  msg.textContent = data.message;
  msg.style.color = res.ok ? 'green' : 'red';

  if (res.ok) this.reset();
});
