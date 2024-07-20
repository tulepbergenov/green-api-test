import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

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

document.getElementById("getSettings")?.addEventListener("click", () => {
  console.log(getFormValues("form-api"));
});
