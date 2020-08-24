import React from "react";
import { Text } from "react-native";
import Select, { Option } from "../Select";
import useOrganizationSelect from "loose-components/src/components/OrganizationSelect";

const OrganizationSelect = ({ organization, setOrganization }) => {
  const { organizations } = useOrganizationSelect();
  return (
    <Select
      onValueChange={setOrganization}
      selectedValue={organization}
      items={organizations}
      renderItem={(org) => (
        <Option key={org.id} value={org.id} label={org.name} />
      )}
    >
      <Option key="personal-task-select" value={""} label="Personal" />
    </Select>
  );
};

export default OrganizationSelect;
