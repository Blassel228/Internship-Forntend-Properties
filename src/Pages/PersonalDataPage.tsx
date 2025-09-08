// src/features/personalData/PersonalDataPage.tsx
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../Types/RootState.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import Row from "../Components/Row.tsx";
import Column from "../Components/Column.tsx";
import useUpdateUser from "../Hooks/useUpdateUser.tsx";
import PersonalDataHeader from "../Components/PersonalDataHeader.tsx";
import PersonalDataForm from "../Components/PersonalDataForm.tsx";
import PersonalDataFooter from "../Components/PersonalDataFooter.tsx";
import { UserGet } from "../Types/User.tsx";

export default function PersonalDataPage() {
  const { mutate: updateUser, isPending, isError: isUpdatingError } = useUpdateUser();
  const user = useSelector((root: RootState) => root.authorizedUser.authorizedUser) as UserGet | null;

  const [editingField, setEditingField] = useState<string | null>(null);

  const defaultBirthDate = user?.birthdate ? new Date(user.birthdate) : null;

  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      country: user?.country ?? "",
      day: defaultBirthDate ? defaultBirthDate.getDate() : undefined,
      month: defaultBirthDate ? defaultBirthDate.getMonth() + 1 : undefined,
      year: defaultBirthDate ? defaultBirthDate.getFullYear() : undefined,
      sex: user?.sex ?? 0,
    },
  });

  return (
    <>
      <FullHeader />
      <Row className="settings-layout mt-36 justify-center content-center w-full">
        <Column className="user-settings w-2/4">
          <PersonalDataHeader />

          <FormProvider {...form}>
            <PersonalDataForm
              user={user}
              editingField={editingField}
              setEditingField={setEditingField}
              updateUser={updateUser}
              isPending={isPending}
            />
          </FormProvider>

          <PersonalDataFooter isUpdatingError={isUpdatingError} />
        </Column>
      </Row>
    </>
  );
}