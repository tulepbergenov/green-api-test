import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  getSettings,
  getStateInstance,
  sendFileByUrl,
  sendMessage,
} from "./services";
import {
  FormApiValuesType,
  FormSendFileByUrlValuesType,
  FormSendMessageValuesType,
} from "./types";
import {
  extractFileNameFromUrl,
  getFormValues,
  handleApiCall,
  updateResponse,
  validateApiForm,
} from "./lib";

document.getElementById("getSettings")?.addEventListener("click", async () => {
  await handleApiCall("form-api", (formApiValues) =>
    getSettings(formApiValues.idInstance, formApiValues.apiTokenInstance)
  );
});

document
  .getElementById("getStateInstance")
  ?.addEventListener("click", async () => {
    await handleApiCall("form-api", (formApiValues) =>
      getStateInstance(formApiValues.idInstance, formApiValues.apiTokenInstance)
    );
  });

document
  .getElementById("sendFileByUrl")
  ?.addEventListener("click", async () => {
    const formApiValues = getFormValues<FormApiValuesType>("form-api");
    const formSendMessageValues =
      getFormValues<FormSendFileByUrlValuesType>("form-img-url");

    if (!validateApiForm(formApiValues)) return;

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
      ...formApiValues!,
      chatId: `${formSendMessageValues.number}@c.us`.replace(/\+/g, ""),
      urlFile: formSendMessageValues.imgUrl,
      fileName:
        extractFileNameFromUrl(formSendMessageValues.imgUrl) || "image.jpg",
    });

    if (data) updateResponse(data);
  });

document.getElementById("sendMessage")?.addEventListener("click", async () => {
  const formApiValues = getFormValues<FormApiValuesType>("form-api");
  const formSendMessageValues =
    getFormValues<FormSendMessageValuesType>("form-send-message");

  if (!validateApiForm(formApiValues)) return;

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
    ...formApiValues!,
    chatId: `${formSendMessageValues.number}@c.us`.replace(/\+/g, ""),
    message: formSendMessageValues.message,
  });

  if (data) updateResponse(data);
});
