export async function getAllUsers(): Promise<any> {
  const baseUrl = `/api/getUsers`;

  // const params = new URLSearchParams({
  //   clientId,
  //   documentId,
  //   type,
  // });
  // if (userId) {
  //   params.append("userId", userId);
  // }
  const url = `${baseUrl}`;
  const response = await fetch(`${url}`, {
    // cache: "no-store",
    // next: { revalidate: 1000 * 60 * 1 },
  });
  if (response) {
    const data = await response?.json();

    return data;
  }
  return;
}
