import React from "react";
import Select, { Option } from "../Select";
import useTeamSelect from "loose-components/src/components/TeamSelect";

const TeamSelect = ({ team, setTeam }) => {
  const { teams } = useTeamSelect();
  return (
    <Select
      onValueChange={(e) => setTeam(e.target.value)}
      selectedValue={team}
      items={teams}
      renderItem={(team) => (
        <Option key={team.id} value={team.id} label={team.name} />
      )}
    />
  );
};

export default TeamSelect;
