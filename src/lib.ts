import { FormApiValuesType } from "./types";

export const extractFileNameFromUrl = (url: string): string | null => {
  const regex = /[^/]+$/;
  const match = url.match(regex);
  return match ? match[0] : null;
};

export const validateApiForm = (
  formApiValues: FormApiValuesType | undefined
): boolean => {
  if (
    !formApiValues?.apiTokenInstance ||
    !formApiValues?.apiTokenInstance.trim() ||
    !formApiValues?.idInstance ||
    !formApiValues?.idInstance.trim()
  ) {
    alert("Please fill in the idInstance and apiTokenInstance fields");
    return false;
  }
  return true;
};

export const updateResponse = (data: any) => {
  const response = document.getElementById("response");
  if (response) {
    response.innerHTML = JSON.stringify(data, null, 2);
  }
};

export const handleApiCall = async (
  formId: string,
  callback: (formApiValues: FormApiValuesType) => Promise<any>
) => {
  const formApiValues = getFormValues<FormApiValuesType>(formId);

  if (!validateApiForm(formApiValues)) return;

  const data = await callback(formApiValues!);
  if (data) updateResponse(data);
};

export const getFormValues = <T extends Record<string, any>>(
  formId: string
): T | undefined => {
  try {
    const form = document.getElementById(formId) as HTMLFormElement | null;

    if (!form) {
      throw new Error(`Form with id ${formId} not found`);
    }

    const formData = new FormData(form);
    const values = {} as T;

    formData.forEach((value, key) => {
      (values as Record<string, any>)[key] = value;
    });

    return values;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
