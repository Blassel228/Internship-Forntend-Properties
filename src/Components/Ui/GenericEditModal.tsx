import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as Avatar from "@radix-ui/react-avatar";

interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
}

interface GenericEditModalProps<T> {
  item: T | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isUpdating: boolean;
  title: (item: T) => string;
  fields: FieldConfig<T>[];
  imagePreview?: string | null;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue?: (name: string, value: any, config?: any) => void;
}

const ImagePreview = ({
  imagePreview,
  alt,
}: {
  imagePreview?: string | null;
  alt: string;
}) => {
  return (
    <div className="w-32 h-32 overflow-hidden border-4 border-orange-100 bg-gray-100 flex items-center justify-center">
      <Avatar.Root className="w-full h-full">
        {imagePreview ? (
          <Avatar.Image
            src={imagePreview}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <Avatar.Fallback
            className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100"
            delayMs={0}
          >
            No image
          </Avatar.Fallback>
        )}
      </Avatar.Root>
    </div>
  );
};

const TextField = <T,>({
  field,
  register,
  errors,
}: {
  field: FieldConfig<T>;
  register: any;
  errors: any;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        type={field.type}
        placeholder={field.label}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        {...register(field.name, {
          required: field.required ? `${field.label} is required` : false,
          min: field.min,
          max: field.max,
          step: field.step,
        })}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm">
          {errors[field.name]?.message as string}
        </p>
      )}
    </div>
  );
};

const NumberField = <T,>({
  field,
  register,
  errors,
}: {
  field: FieldConfig<T>;
  register: any;
  errors: any;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        type="number"
        placeholder={field.label}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        {...register(field.name, {
          required: field.required ? `${field.label} is required` : false,
          valueAsNumber: true,
          min: field.min,
          max: field.max,
          step: field.step,
        })}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm">
          {errors[field.name]?.message as string}
        </p>
      )}
    </div>
  );
};

const SelectField = <T,>({
  field,
  register,
  errors,
}: {
  field: FieldConfig<T>;
  register: any;
  errors: any;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
        {...register(field.name, {
          required: field.required ? `${field.label} is required` : false,
        })}
      >
        {field.options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[field.name] && (
        <p className="text-red-500 text-sm">
          {errors[field.name]?.message as string}
        </p>
      )}
    </div>
  );
};

const FileField = <T,>({
  field,
  onFileChange,
}: {
  field: FieldConfig<T>;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
      />
    </div>
  );
};

const ImagePreviewField = <T,>({
  field,
  imagePreview,
}: {
  field: FieldConfig<T>;
  imagePreview?: string | null;
}) => {
  return (
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <ImagePreview imagePreview={imagePreview} alt="Preview" />
    </div>
  );
};

const FormField = <T,>({
  field,
  register,
  errors,
  imagePreview,
  onFileChange,
}: {
  field: FieldConfig<T>;
  register: any;
  errors: any;
  imagePreview?: string | null;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  switch (field.type) {
    case "select":
      return <SelectField field={field} register={register} errors={errors} />;
    case "file":
      return <FileField field={field} onFileChange={onFileChange} />;
    case "image-preview":
      return <ImagePreviewField field={field} imagePreview={imagePreview} />;
    case "number":
      return <NumberField field={field} register={register} errors={errors} />;
    default:
      return <TextField field={field} register={register} errors={errors} />;
  }
};

const GenericEditModal = <T extends Record<string, any>>({
  item,
  isOpen,
  onClose,
  onSubmit,
  isUpdating,
  title,
  fields,
  imagePreview,
  onFileChange,
}: GenericEditModalProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<T>();

  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  {item ? title(item) : "Edit Item"}
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {fields.map((field) => (
                    <FormField
                      key={String(field.name)}
                      field={field}
                      register={register}
                      errors={errors}
                      imagePreview={imagePreview}
                      onFileChange={onFileChange}
                    />
                  ))}

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      disabled={isUpdating || isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-60"
                      disabled={isUpdating || isSubmitting}
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GenericEditModal;
