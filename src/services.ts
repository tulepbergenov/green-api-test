import { fetchData } from "./api";
import {
  FormApiValuesType,
  GetSettingsResponseType,
  GetStateInstanceResponseType,
} from "./types";

export const getSettings = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<GetSettingsResponseType | undefined> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
  return fetchData<GetSettingsResponseType>(url);
};

export const getStateInstance = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<GetStateInstanceResponseType | undefined> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
  return fetchData<GetStateInstanceResponseType>(url);
};

export const sendPostRequest = async <T>(
  url: string,
  body: Record<string, any>
): Promise<T | undefined> => {
  return fetchData<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: {
  chatId: string;
  message: string;
} & FormApiValuesType): Promise<{ idMessage: string } | undefined> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  const body = { chatId, message };
  return sendPostRequest<{ idMessage: string }>(url, body);
};

export const sendFileByUrl = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  urlFile,
  fileName,
}: {
  chatId: string;
  urlFile: string;
  fileName: string;
} & FormApiValuesType): Promise<{ idMessage: string } | undefined> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
  const body = { chatId, urlFile, fileName };
  return sendPostRequest<{ idMessage: string }>(url, body);
};
