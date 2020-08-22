import React from "react";
import { View, Image, Text } from "react-native";

const UserCard = ({ user, action }) => {
  return (
    <View>
      <View>
        <Image source={{ uri: user.avatar || "/default_profile.png" }} />
        <View>
          <Text>
            {user.firstName}&nbsp;{user.lastName}
          </Text>
          <Text>{user.username}</Text>
        </View>
      </View>
      {!!action && typeof action === "function" && <View>{action()}</View>}
    </View>
  );
};

export default UserCard;
