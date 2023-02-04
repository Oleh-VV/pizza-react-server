export const UserDto = (user) => {
  const email = user.email;
  const name = user.firstName;
  const surname = user.surname;
  const id = user._id;
  const adress = user.adress;
  const phone = user.phone;
  const isActivated = user.isActivated;

  return { email, name, surname, id, isActivated, adress, phone };
};
