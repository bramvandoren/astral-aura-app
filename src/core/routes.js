const Routes = Object.freeze({
  Login: '/login',
  Register: '/register',

  Opdrachten: '/opdrachten',
  OpdrachtenDetail: "/opdrachten/:id",
  CreateOpdracht: "/opdracht/create",

  Profiel: '/profiel',
  ProfielOpdrachten: '/profiel/opdrachten',
  ProfielEdit: '/profiel/edit',
  ProfielMedium: '/medium',
});

// replaces : values with values from object
export const route = (path, options = {}) => {
  Object.keys(options).forEach(key => {
      path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { Routes };