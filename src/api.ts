export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
