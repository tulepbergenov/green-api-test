import "bootstrap/dist/css/bootstrap.min.css";

const getFormValues = (formId: string): { [key: string]: any } | undefined => {
  try {
    const form = document.getElementById(formId) as HTMLFormElement | null;

    if (!form) {
      throw new Error(`Form with id ${formId} not found`);
    }

    const formData = new FormData(form);
    const values: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      values[key] = value;
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
