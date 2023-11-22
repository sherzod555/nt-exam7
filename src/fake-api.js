const userFromStorage = localStorage.getItem('db_users');

// tan olaman o'rtog'im o'rgatdi shunaqa qilish mumkinligini

let users = userFromStorage
  ? JSON.parse(userFromStorage)
  : [
      {
        id: crypto.randomUUID(),
        email: 'sher@gmail.com',
        password: 'sher555',
      },
      {
        id: crypto.randomUUID(),
        email: 'muhammadbobur@tutor.uz',
        password: 'tutor12345',
      },
      {
        id: crypto.randomUUID(),
        email: 'cristiano@alnassr.uae',
        password: 'georginia',
      },
    ];

function registerUser(newUser) {
  const user = {
    id: crypto.randomUUID(),
    ...newUser,
  };
  users.push(user);
  localStorage.setItem('db_users', JSON.stringify(users));
  return user;
}

function loginUser(email, password) {
  const user = users.find((user) => user.email === email && user.password === password);

  return user;
}

export { registerUser, loginUser };
