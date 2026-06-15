export function getRoleBasePath(
  role
) {
  return {
    super_admin:
      "/super-admin",

    admin_event:
      "/admin-event",

    peserta:
      "/participant",
  }[role];
}