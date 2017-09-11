export function errorCodes(error: string) {
  const codes = {
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found. Please check the email you entered',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'That email has already been registered to an account.',
    'auth/operation-not-allowed': 'Sorry, we aren\'t taking users at the moment.',
    'auth/weak-password': 'Your password is not strong enough. It must have at least 8 characters.',
    'app/team': 'You need to enter a team name. At least 3 letters or numbers',
    'app/name': 'You need to enter a user name. At least 3 letters or numbers'
  };
  if (codes[error]) {
    return codes[error];
  }
  return 'Sorry, there was a problem.';
}

export function checkInputsAreValidStrings(team, name) {
  const regex = /^[a-zA-Z0-9]+$/;
  if (name.length < 3 || !regex.test(name)) {
    return 'app/name';
  }
  if (team.length < 3 || !regex.test(team)) {
    return 'app/team';
  }
  return '';
}