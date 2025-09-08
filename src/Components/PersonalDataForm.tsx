import { useFormContext } from "react-hook-form";
import { UserGet } from "../Types/User.tsx";
import NameField from "./NameField.tsx";
import UsernameField from "./UsernameField.tsx";
import EmailField from "./EmailField.tsx";
import PhoneField from "./PhoneField.tsx";
import BirthdateField from "./BirthdateField.tsx";
import SexField from "./SexField.tsx";

interface PersonalDataFormProps {
  user: UserGet | null;
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
  const { handleSubmit, getValues } = useFormContext();

  const handleSave = (data: any) => {
    if (data.day && data.month && data.year) {
      const dateStr = `${data.year}-${String(data.month).padStart(2, "0")}-${String(data.day).padStart(2, "0")}`;
      const isValid = !isNaN(new Date(dateStr).getTime());
      if (isValid) {
        data.birthdate = dateStr;
      }
    }

    const payload = {
      ...data,
    };

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
    </form>
  );
}