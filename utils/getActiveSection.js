export function getActiveSection(path) {
  if (path === "/") {
    return "home"
  }
  const section = path.split('/')[1];
  return section;
}
