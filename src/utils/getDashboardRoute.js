export const getDashboardRoute = (
  role
) => {
  switch (role) {
    case "super_admin":
      return "/super-admin";

    case "admin_event":
      return "/admin-event";

    case "juri":
      return "/judge";

    case "peserta":
      return "/participant";

    default:
      return "/";
  }
};