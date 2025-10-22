import { useFormContext } from "react-hook-form";
import { User } from "../Types/User.tsx";
import NameField from "./NameField.tsx";
import UsernameField from "./UsernameField.tsx";
import EmailField from "./EmailField.tsx";
import PhoneField from "./PhoneField.tsx";
import BirthdateField from "./BirthdateField.tsx";
import SexField from "./SexField.tsx";
import CountryField from "./CountryField.tsx";
import { getImage } from "../Api/apiImage.tsx";
import { ImageGet } from "../Types/Image.tsx";

interface PersonalDataFormProps {
  user: User | null;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  updateUser: (data: any) => void;
  isPending: boolean;
}

export default function PersonalDataForm({
  user,
  editingField,
  setEditingField,
  updateUser,
  isPending,
}: PersonalDataFormProps) {
  const { handleSubmit } = useFormContext();

  const handleSave = async (data: any) => {
    if (data.day && data.month && data.year) {
      const dateStr = `${data.year}-${String(data.month).padStart(2, "0")}-${String(data.day).padStart(2, "0")}`;
      const isValid = !isNaN(new Date(dateStr).getTime());
      if (isValid) {
        data.birthdate = dateStr;
      }
    }
    const image: ImageGet = await getImage();
    const payload = {
      ...data,
      image_data: image ? image.image_data : null,
    };
    console.log("PAYLOAD", payload);
    updateUser(payload);
    setEditingField(null);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <NameField
        user={user}
        isEditing={editingField === "name"}
        onStartEdit={() => setEditingField("name")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <UsernameField
        user={user}
        isEditing={editingField === "username"}
        onStartEdit={() => setEditingField("username")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <EmailField
        user={user}
        isEditing={editingField === "email"}
        onStartEdit={() => setEditingField("email")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <PhoneField
        user={user}
        isEditing={editingField === "phone_number"}
        onStartEdit={() => setEditingField("phone_number")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <BirthdateField
        user={user}
        isEditing={editingField === "birthdate"}
        onStartEdit={() => setEditingField("birthdate")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <SexField
        user={user}
        isEditing={editingField === "sex"}
        onStartEdit={() => setEditingField("sex")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />

      <CountryField
        user={user}
        isEditing={editingField === "country"}
        onStartEdit={() => setEditingField("country")}
        onCancel={() => setEditingField(null)}
        isPending={isPending}
      />
    </form>
  );
}
