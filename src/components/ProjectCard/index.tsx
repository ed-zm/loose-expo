import React from "react";
import { Text, View } from "react-native";
import moment from "moment";

const ProjectCard = ({ project }) => {
  return (
    <View>
      <View>
        <View>
          <Text>{project.name}</Text>
          <Text>private</Text>
        </View>
        <View>
          <Text>updated at {moment(project.updatedAt).fromNow()}</Text>
        </View>
      </View>
      <Text>description</Text>
    </View>
  );
};

export default ProjectCard;
