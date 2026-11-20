import { useState } from "react";
import { cn } from "@/lib/utils";

const IDLE = { status: "idle", message: "" };

const fieldNameOf = (field) => field.fieldName || field._key;

/** Submits a CMS-defined form to Web3Forms and tracks the request state. */
export function useFormSubmission({ fields, title }) {
  const [submission, setSubmission] = useState(IDLE);

  async function handleSubmit(event) {
    event.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmission({
        status: "error",
        message:
          "This form is unavailable because its submission service has not been configured.",
      });
      return;
    }

    const submittedForm = event.currentTarget;
    const formData = new FormData(submittedForm);
    const missingCheckboxSelection = (fields ?? []).find(
      (field) =>
        field.fieldType === "checkboxes" &&
        field.required &&
        formData.getAll(fieldNameOf(field)).length === 0,
    );

    if (missingCheckboxSelection) {
      setSubmission({
        status: "error",
        message: `Please select at least one option for "${missingCheckboxSelection.fieldName}".`,
      });
      submittedForm
        .querySelector(`[name="${CSS.escape(fieldNameOf(missingCheckboxSelection))}"]`)
        ?.focus();
      return;
    }

    formData.set("access_key", accessKey);
    formData.set("subject", `Form completed - ${title}`);
    formData.set("from_name", "Crescent Village Website");
    setSubmission({ status: "submitting", message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Web3Forms could not submit the form.");
      }

      submittedForm.reset();
      setSubmission({ status: "success", message: "" });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The form could not be submitted. Please try again.",
      });
    }
  }

  return { submission, handleSubmit, reset: () => setSubmission(IDLE) };
}

const labelClassName =
  "block font-subtext text-[14px] font-medium leading-5 tracking-[-0.02em] text-[#1D1E22]";
const controlClassName =
  "mt-1.5 block w-full rounded-md border border-[#1D1E22]/15 bg-cream/60 px-3 py-2.5 font-subtext text-[16px] leading-5 tracking-[-0.02em] text-[#1D1E22] outline-none transition-colors focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-terracotta">
      {" "}
      *
    </span>
  );
}

function ChoiceField({ field, fieldId }) {
  const inputType = field.fieldType === "radio" ? "radio" : "checkbox";
  const options = field.options ?? [];

  return (
    <fieldset>
      <legend className={labelClassName}>
        {field.fieldName}
        {field.required && <RequiredMark />}
        {inputType === "checkbox" && options.length > 1 && (
          <span className="ml-1.5 font-normal text-[#1D1E22]/50">
            Select all that apply
          </span>
        )}
      </legend>
      <div className={cn("mt-2 grid gap-2", options.length > 3 && "sm:grid-cols-2")}>
        {options.map((option, index) => (
          <label
            key={option}
            htmlFor={`${fieldId}-${index}`}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-[#1D1E22]/15 bg-cream/60 px-3 py-2.5 font-subtext text-[15px] leading-5 tracking-[-0.02em] text-[#1D1E22] transition-colors hover:border-[#1D1E22]/30 has-checked:border-green has-checked:bg-green/5 has-focus-visible:ring-2 has-focus-visible:ring-green/30"
          >
            <input
              id={`${fieldId}-${index}`}
              type={inputType}
              name={fieldNameOf(field)}
              value={option}
              required={field.required && inputType === "radio" && index === 0}
              className="mt-0.5 size-4 shrink-0 accent-green"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function OnlineFormFields({ id, fields, onSubmit }) {
  return (
    <form id={id} onSubmit={onSubmit} className="space-y-6">
      {fields.map((field) => {
        const fieldId = `form-field-${field._key}`;

        if (field.fieldType === "checkboxes" || field.fieldType === "radio") {
          return <ChoiceField key={field._key} field={field} fieldId={fieldId} />;
        }

        const controlProps = {
          id: fieldId,
          name: fieldNameOf(field),
          required: field.required,
          className: controlClassName,
        };

        return (
          <div key={field._key}>
            <label htmlFor={fieldId} className={labelClassName}>
              {field.fieldName}
              {field.required && <RequiredMark />}
            </label>
            {field.fieldType === "textarea" ? (
              <textarea
                {...controlProps}
                rows={4}
                className={cn(controlClassName, "resize-y")}
              />
            ) : field.fieldType === "select" ? (
              <select {...controlProps} defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                {(field.options ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...controlProps}
                type={field.fieldType === "email" ? "email" : "text"}
                autoComplete={field.fieldType === "email" ? "email" : undefined}
              />
            )}
          </div>
        );
      })}
    </form>
  );
}
