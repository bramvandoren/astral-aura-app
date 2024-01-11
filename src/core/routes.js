const Routes = Object.freeze({
  Login: '/login',
  Register: '/register',

  Opdrachten: '/opdrachten',
  OpdrachtDetail: "/opdrachten/:id",
  CreateOpdracht: "/opdrachten/create",

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