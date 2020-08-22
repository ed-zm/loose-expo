import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../Button";
import UsersList from "../../Lists/Users";
import Input from "../../Input";
import useInviteModal from "loose-components/src/components/Modals/Invite";

const Invite = ({ onInvite, organization, type, typeId, closeModal }) => {
  const {
    inviting,
    setInviting,
    tab,
    setTab,
    email,
    setEmail,
  } = useInviteModal();
  return (
    <View>
      <View>
        <View>
          <TouchableOpacity onPress={() => setTab("EMAIL")}>
            <Text>By Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab("SEARCH")}>
            <Text>By Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {tab === "EMAIL" && (
        <View>
          <Input
            placeholder="mail@mail.com"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            title="Invite"
            onPress={async () => {
              await setInviting(true);
              await onInvite({ email });
              await setInviting(false);
            }}
            disabled={inviting}
            loading={inviting}
          />
        </View>
      )}
      {tab === "SEARCH" && (
        <UsersList
          invite
          type={type}
          typeId={typeId}
          action={({ user, refetch, loading }) => (
            <Button
              title="Invite"
              onPress={async () => {
                await setInviting(true);
                await onInvite(user.id);
                refetch();
                await setInviting(false);
              }}
              disabled={inviting || loading}
              loading={inviting || loading}
            />
          )}
        />
      )}
    </View>
  );
};

export default Invite;
