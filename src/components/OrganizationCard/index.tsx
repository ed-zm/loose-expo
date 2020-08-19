import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "loose-components/src/contexts/User";

const OrganizationCard = ({ organization }) => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Organization", { id: organization.id })
        }
      >
        <View>
          <Text>{organization.name}</Text>
          <Text>{organization.owner.id === user.id ? "Owner" : "Member"}</Text>
        </View>
      </TouchableOpacity>
      <View>
        {organization.users.map((user) => (
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 32, height: 32 }}
          />
        ))}
      </View>
      <Text>{`${organization.users.length} members`}</Text>
      <Text>{`${organization.teams.length} teams`}</Text>
    </View>
  );
};

export default OrganizationCard;
