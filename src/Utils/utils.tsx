export function getInitials(fullName: string): string|null {
  if(!fullName) return null;
  const names = fullName.trim().split(" ");
  if (names.length === 0) return "";

  const firstInitial = names[0][0] || "";
  const lastInitial = names[names.length - 1][0] || "";

  return (firstInitial + lastInitial).toUpperCase();
}
