"use client";
import React from "react";
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  step?: string;
}
export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  step,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      {" "}
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
        {" "}
        {label}{" "}
      </label>{" "}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        step={step}
        className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all placeholder:text-slate-200"
      />{" "}
    </div>
  );
}
interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string;
}
export function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      {" "}
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
        {" "}
        {label}{" "}
      </label>{" "}
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all appearance-none"
      >
        {" "}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}{" "}
      </select>{" "}
    </div>
  );
}
