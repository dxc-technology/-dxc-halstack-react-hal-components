import { DxcAlert, DxcFlex } from "@dxc-technology/halstack-react";
import React, { ReactNode } from "react";

import useHalFormChildrenProps from "./useHalFormChildrenProps";

interface HalFormProps {
  children: ReactNode;
  apiEndpoint: string;
  authHeaders?: Record<string, string>;
  onSubmit?: (formState: Record<string, string>, onlyUpdatedFields: Record<string, string>) => void;
  selfManagedSave?: boolean;
}

const HalForm: React.FC<HalFormProps> = ({
  children,
  apiEndpoint,
  authHeaders,
  onSubmit,
  selfManagedSave,
}) => {
  const { processChildren, formState, onlyUpdatedFields, apiUpdateError } = useHalFormChildrenProps(
    children,
    apiEndpoint,
    authHeaders,
    selfManagedSave
  );
  const handleSubmit = async (e: React.FormEvent) => {
    /**
     * For future set up of action buttons
     */
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formState, onlyUpdatedFields);
    }
  };

  return (
    <DxcFlex gap="2rem" direction="column">
      {apiUpdateError?.body?.messages?.map((err: any) => (
        <DxcFlex gap="2rem" direction="column">
          <DxcAlert type="error" size="fillParent" inlineText={err.message? `${err.context}: ${err.message}` : err} />
        </DxcFlex>
      ))}
      <form onSubmit={handleSubmit}>{processChildren(children)}</form>
    </DxcFlex>
  );
};

export default React.memo(HalForm);
