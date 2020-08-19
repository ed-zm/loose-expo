import React, { useContext } from "react";
import { View } from "react-native";
import OrganizationCard from "../../../components/OrganizationCard";
import Button from "../../../components/Button";
import useOrganizationsList from "loose-components/src/components/Lists/Organizations";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../../components/Input";
import Select, { Option } from "../../../components/Select";
import List from "../../List";

const Organizations = () => {
  const {
    organizations,
    setNameFilter,
    nameFilter,
    onFetchMore,
    pageInfo,
    loading,
    variables,
    ownerOrMember,
    setOwnerOrMember,
    orderBy,
    setOrderBy,
  } = useOrganizationsList();
  const modal = useContext(ModalContext);
  return (
    <View>
      <View>
        <Input
          placeholder="Find a Organization"
          value={nameFilter}
          onChangeText={setNameFilter}
        />
        <Select onValueChange={setOwnerOrMember} selectedValue={ownerOrMember}>
          <Option label="All" value="" key="organizations-filter--all" />
          <Option
            label="Owner"
            value="OWNER"
            key="organizations-filter-owner"
          />
          <Option
            label="Member"
            value="MEMBER"
            key="organizations-filter-member"
          />
        </Select>
        <Select onValueChange={setOrderBy} selectedValue={orderBy}>
          <Option
            label="Newest"
            value="createdAt_DESC"
            key="organizations-filter-order-by-newest"
          />
          <Option
            label="Oldest"
            value="createdAt_ASC"
            key="organizations-filter-order-by-oldest"
          />
        </Select>
        <Button
          title="Create Organization"
          onPress={() => {
            modal.actions.openModal({
              modal: "CreateOrganization",
              title: "Create Organization",
              params: { variables },
            });
          }}
        />
      </View>
      <List
        loading={loading}
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={organizations}
        renderItem={(organization) => (
          <OrganizationCard organization={organization} />
        )}
      />
    </View>
  );
};

export default Organizations;
