import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  FormApiValuesType,
  FormSendFileByUrlValuesType,
  FormSendMessageValuesType,
  GetSettingsResponseType,
  GetStateInstanceResponseType,
} from "./types";

const getFormValues = <T extends Record<string, any>>(
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

document.getElementById("getSettings")?.addEventListener("click", async () => {
  const formApiValues = getFormValues<FormApiValuesType>("form-api");

  if (
    !formApiValues?.apiTokenInstance ||
    !formApiValues?.apiTokenInstance.trim() ||
    !formApiValues?.idInstance ||
    !formApiValues?.idInstance.trim()
  ) {
    alert("Please fill in the form");
    return;
  }

  const data = await getSettings(
    formApiValues.idInstance,
    formApiValues.apiTokenInstance
  );

  if (data) {
    const response = document.getElementById("response");

    if (response) {
      response.innerHTML = JSON.stringify(data, null, 2);
    }
  }
});

document
  .getElementById("getStateInstance")
  ?.addEventListener("click", async () => {
    const formApiValues = getFormValues<FormApiValuesType>("form-api");

    if (
      !formApiValues?.apiTokenInstance ||
      !formApiValues?.apiTokenInstance.trim() ||
      !formApiValues?.idInstance ||
      !formApiValues?.idInstance.trim()
    ) {
      alert("Please fill in the form");
      return;
    }

    const data = await getStateInstance(
      formApiValues.idInstance,
      formApiValues.apiTokenInstance
    );

    if (data) {
      const response = document.getElementById("response");

      if (response) {
        response.innerHTML = JSON.stringify(data, null, 2);
      }
    }
  });

document
  .getElementById("sendFileByUrl")
  ?.addEventListener("click", async () => {
    const formApiValues = getFormValues<FormApiValuesType>("form-api");
    const formSendMessageValues =
      getFormValues<FormSendFileByUrlValuesType>("form-img-url");

    if (
      !formApiValues?.apiTokenInstance ||
      !formApiValues?.apiTokenInstance.trim() ||
      !formApiValues?.idInstance ||
      !formApiValues?.idInstance.trim()
    ) {
      alert("Please fill in the idInstance, ApiTokenInstance fields");
      return;
    }

    if (
      !formSendMessageValues?.number ||
      !formSendMessageValues?.number.trim() ||
      !formSendMessageValues?.imgUrl ||
      !formSendMessageValues?.imgUrl.trim()
    ) {
      alert("Please fill in the sendFileByUrl form");
      return;
    }

    const data = await sendFileByUrl({
      ...formApiValues,
      chatId: `${formSendMessageValues.number}@c.us`.replace(/\+/g, ""),
      urlFile: formSendMessageValues.imgUrl,
      fileName:
        extractFileNameFromUrl(formSendMessageValues.imgUrl) || "image.jpg",
    });

    if (data) {
      const response = document.getElementById("response");

      if (response) {
        response.innerHTML = JSON.stringify(data, null, 2);
      }
    }
  });

document.getElementById("sendMessage")?.addEventListener("click", async () => {
  const formApiValues = getFormValues<FormApiValuesType>("form-api");
  const formSendMessageValues =
    getFormValues<FormSendMessageValuesType>("form-send-message");

  if (
    !formApiValues?.apiTokenInstance ||
    !formApiValues?.apiTokenInstance.trim() ||
    !formApiValues?.idInstance ||
    !formApiValues?.idInstance.trim()
  ) {
    alert("Please fill in the idInstance, ApiTokenInstance fields");
    return;
  }

  if (
    !formSendMessageValues?.number ||
    !formSendMessageValues?.number.trim() ||
    !formSendMessageValues?.message ||
    !formSendMessageValues?.message.trim()
  ) {
    alert("Please fill in the send message form");
    return;
  }

  const data = await sendMessage({
    ...formApiValues,
    chatId: `${formSendMessageValues.number}@c.us`.replace(/\+/g, ""),
    message: formSendMessageValues.message,
  });

  if (data) {
    const response = document.getElementById("response");

    if (response) {
      response.innerHTML = JSON.stringify(data, null, 2);
    }
  }
});

const getSettings = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<GetSettingsResponseType | undefined> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/waInstance${idInstance}/getSettings/${apiTokenInstance}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch settings");
    }

    const data = await response.json();

    console.log("data", data);

    return data;
  } catch (error) {
    alert("Failed to fetch settings");
    console.error(error);
    return undefined;
  }
};

const getStateInstance = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<GetStateInstanceResponseType | undefined> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch settings");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alert("Failed to fetch settings");
    console.error(error);
    return undefined;
  }
};

const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: {
  chatId: string;
  message: string;
} & FormApiValuesType): Promise<
  | {
      idMessage: "string";
    }
  | undefined
> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alert("Failed to send message");
    console.error(error);
    return undefined;
  }
};

const sendFileByUrl = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  urlFile,
  fileName,
}: {
  chatId: string;
  urlFile: string;
  fileName: string;
} & FormApiValuesType): Promise<
  | {
      idMessage: "string";
    }
  | undefined
> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
          urlFile,
          fileName,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alert("Failed to send message");
    console.error(error);
    return undefined;
  }
};

const extractFileNameFromUrl = (url: string): string | null => {
  const regex = /[^/]+$/;
  const match = url.match(regex);
  return match ? match[0] : null;
};
