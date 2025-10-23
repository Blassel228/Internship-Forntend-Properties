import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../Types/RootState.tsx";
import Row from "../Components/Row.tsx";
import Column from "../Components/Column.tsx";
import { useUpdateAuthorizedUser } from "../Hooks/useUpdateUser.tsx";
import PersonalDataHeader from "../Components/PersonalDataHeader.tsx";
import PersonalDataForm from "../Components/PersonalDataForm.tsx";
import PersonalDataFooter from "../Components/PersonalDataFooter.tsx";
import { User } from "../Types/User.tsx";

export default function PersonalData() {
  const { updateUser, isUserUpdating, userUpdateError, error, isError } =
    useUpdateAuthorizedUser();
  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) as User | null;

  const [editingField, setEditingField] = useState<string | null>(null);
  const [lastValidValues, setLastValidValues] = useState<any>(null);

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

  useEffect(() => {
    if (!lastValidValues) {
      const initialValues = form.getValues();
      setLastValidValues(initialValues);
    }
  }, [form, lastValidValues]);

  useEffect(() => {
    if (isError && lastValidValues) {
      form.reset(lastValidValues);
    }
  }, [isError, lastValidValues, form]);

  const handleUpdateUser = (data: any) => {
    updateUser(data);
  };

  useEffect(() => {
    if (!isUserUpdating && !isError) {
      const currentValues = form.getValues();
      setLastValidValues(currentValues);
    }
  }, [isUserUpdating, isError, form]);

  useEffect(() => {
    console.log("ERROR", error, userUpdateError);
  }, [error, userUpdateError]);

  return (
    <>
      <Row className="settings-layout mt-36 justify-center content-center w-full">
        <Column className="user-settings w-2/4">
          <PersonalDataHeader
            username={user?.username}
            image_data={
              user?.image?.image_data ? user.image.image_data : undefined
            }
          />
          <FormProvider {...form}>
            <PersonalDataForm
              user={user}
              editingField={editingField}
              setEditingField={setEditingField}
              updateUser={handleUpdateUser}
              isPending={isUserUpdating}
            />
          </FormProvider>
          {isError && (
            <PersonalDataFooter
              message={userUpdateError?.response?.data?.detail}
            />
          )}
        </Column>
      </Row>
    </>
  );
}
