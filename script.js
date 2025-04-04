const learnMoreEmails = new Set();
const registerEmails = new Set();

document.getElementById('learnMoreForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('learnEmail').value.trim().toLowerCase();
  const msg = document.getElementById('learnMoreMsg');

  if (learnMoreEmails.has(email)) {
    msg.textContent = 'This email is already subscribed.';
  } else {
    learnMoreEmails.add(email);
    msg.textContent = 'Thank you! You’re on the list.';
    this.reset();
  }
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const msg = document.getElementById('registerMsg');

  if (registerEmails.has(email)) {
    msg.textContent = 'This email is already registered.';
  } else {
    registerEmails.add(email);
    msg.textContent = 'Registration successful!';
    this.reset();
  }
});
