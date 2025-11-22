import { ChangeEvent, useEffect, useState } from "react";
import { useUpdateUser } from "../../Hooks/useUpdateUser.tsx";
import useUpdateImage from "../../Hooks/useUpdateImage.tsx";
import useCreateImage from "../../Hooks/useCreateImage.tsx";
import { useForm } from "react-hook-form";
import { User, UserUpdate } from "../../Types/User.tsx";
import GenericEditModal from "../../Components/Ui/GenericEditModal.tsx";

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserEditModal = ({
  user,
  isOpen,
  onClose,
}: UserEditModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setImageFile] = useState<File | null>(null);

  const { updateUser, isUserUpdating } = useUpdateUser();
  const { mutate: updateImage, isPending: isImageUpdating } = useUpdateImage();
  const { mutate: createImage, isPending: isImageCreating } = useCreateImage();

  const isUpdating = isUserUpdating || isImageUpdating || isImageCreating;

  const imageMutate = user?.image?.image_data ? updateImage : createImage;

  const { setValue, reset } = useForm<UserUpdate>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      name: user?.name || "",
      surname: user?.surname || "",
      is_admin: user?.is_admin || false,
      phone_number: user?.phone_number || "",
      country: user?.country || "",
      sex: user?.sex || 0,
      birthdate: user?.birthdate || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        is_admin: user.is_admin,
        phone_number: user.phone_number,
        country: user.country || "",
        sex: user.sex || 0,
        birthdate: user.birthdate || "",
      });

      if (user.image?.image_data) {
        setImagePreview(`data:image/png;base64,${user.image?.image_data}`);
      } else {
        setImagePreview(null);
      }
    }
  }, [user, reset]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64StringRequest = (reader.result as string).split(",")[1];
      setImagePreview(base64String);
      setImageFile(file);
      setValue("image_data", base64StringRequest, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (data: UserUpdate) => {
    console.log("SUBMITTED: " + JSON.stringify(data));
    if (!user) return;

    let formattedBirthdate = data.birthdate;
    if (data.birthdate && !data.birthdate.includes("T")) {
      formattedBirthdate = new Date(data.birthdate).toISOString().split("T")[0];
    }

    const processedData = {
      ...data,
      is_admin: data.is_admin === "true" || data.is_admin === true,
      birthdate: formattedBirthdate,
    };

    updateUser(
      { userId: user.id, updatedData: processedData },
      {
        onSuccess: () => onClose(),
      },
    );
    imageMutate(selectedImageFile, {
      onError: () => {
        alert("Failed to upload avatar. Please try again.");
      },
    });
  };

  const editFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: false,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: false,
    },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      required: false,
    },
    {
      name: "is_admin",
      label: "Is Admin",
      type: "select",
      options: ["true", "false"],
      required: false,
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      required: false,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      required: false,
    },
    {
      name: "sex",
      label: "Sex",
      type: "select",
      options: ["0", "1", "2"],
      required: false,
    },
    {
      name: "birthdate",
      label: "Birthdate",
      type: "date",
      required: false,
    },
    {
      name: "image-preview",
      label: "Avatar Preview",
      type: "image-preview",
    },
    {
      name: "image_data",
      label: "Upload Avatar",
      type: "file",
    },
  ];

  return (
    <GenericEditModal
      item={user}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      isUpdating={isUpdating}
      title={(user) => `Edit User: ${user?.username}`}
      fields={editFields}
      imagePreview={imagePreview}
      onFileChange={handleFileChange}
      setValue={setValue}
    />
  );
};
