import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TeamCard = ({ team }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Team", { id: team.id });
        }}
      >
        <Text>{team.name}</Text>
      </TouchableOpacity>
      <View>
        {["", ""].map((member) => (
          <View>
            <Image
              source={{ uri: team.avatar || "/default_profile.png" }}
              style={{
                width: 32,
                height: 32,
              }}
            />
          </View>
        ))}
      </View>
      <Text>{`${team.users.length} members`}</Text>
    </View>
  );
};

export default TeamCard;
