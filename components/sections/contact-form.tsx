"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  message: string;
  phone: string;
  company: string;
  website: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  message: "",
  phone: "",
  company: "",
  website: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const isValid = useMemo(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formState.fullName.trim().length > 1 &&
      emailPattern.test(formState.email) &&
      formState.message.trim().length > 10
    );
  }, [formState]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      setStatus("error");
      setMessage("Please fill all required fields with valid details.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Could not submit your message.");
      }

      setStatus("success");
      setMessage("Thanks! Your message has been received.");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Submission failed. Please try again shortly.",
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          Full Name *
          <input
            value={formState.fullName}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, fullName: event.target.value }))
            }
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-white/80">
          Email *
          <input
            type="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
            required
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          Phone
          <input
            value={formState.phone}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, phone: event.target.value }))
            }
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
        <label className="space-y-2 text-sm text-white/80">
          Company
          <input
            value={formState.company}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, company: event.target.value }))
            }
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
      </div>
      <label className="hidden space-y-2 text-sm text-white/80">
        Website
        <input
          value={formState.website}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, website: event.target.value }))
          }
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <label className="space-y-2 text-sm text-white/80">
        Message *
        <textarea
          rows={6}
          value={formState.message}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, message: event.target.value }))
          }
          className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
          required
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
