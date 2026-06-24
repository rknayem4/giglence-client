export const getUserClient = async () => {
  try {
    const { data: session } = await authClient.getSession();
  } catch (error) {
    console.error("Error fetching user session:", error);
    throw error;
  }
};