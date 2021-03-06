import React, { useContext } from "react";
import { View, Text, Modal } from "react-native";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
// import GithubOrganizations from "./GithubOrganizations";
// import GithubRepos from "./GithubRepos";
// import GithubIssues from "./GithubIssues";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import CreateOrganization from "./CreateOrganization";
import EditOrganization from "./EditOrganization";
import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
// import GithubProjects from "./GithubProjects";
// import GithubColumns from "./GithubColumns";
import Confirm from "./Confirm";
import Invite from "./Invite";
import ManageTeamMembers from "./ManageTeamMembers";
import AssignTask from "./AssignTask";
import styles from "./styles";

const ModalComponent = () => {
  const { open, modal, params, actions, title, ...rest } = useContext(
    ModalContext
  );
  const style = styles();
  if (!open) return null;
  return (
    // <View style={style.container}>
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={actions.closeModal}
    >
      <View style={style.contentContainer}>
        {/* <Text>
          {title}
          <Text onPress={actions.closeModal}>X</Text>
        </Text> */}
        {/* {modal === "GithubIssues" && (
            <GithubIssues {...params} closeModal={actions.closeModal} />
          )} */}
        {/* {modal === "GithubRepos" && (
            <GithubRepos {...params} closeModal={actions.closeModal} />
          )} */}
        {/* {modal === "GithubOrganizations" && (
            <GithubOrganizations {...params} closeModal={actions.closeModal} />
          )} */}
        {modal === "CreateTask" && (
          <CreateTask {...params} closeModal={actions.closeModal} />
        )}
        {modal === "EditTask" && (
          <EditTask {...params} closeModal={actions.closeModal} />
        )}
        {modal === "CreateTeam" && (
          <CreateTeam {...params} closeModal={actions.closeModal} />
        )}
        {modal === "EditTeam" && (
          <EditTeam {...params} closeModal={actions.closeModal} />
        )}
        {modal === "CreateOrganization" && (
          <CreateOrganization {...params} closeModal={actions.closeModal} />
        )}
        {modal === "EditOrganization" && (
          <EditOrganization {...params} closeModal={actions.closeModal} />
        )}
        {/* {modal === "GithubProjects" && (
            <GithubProjects {...params} closeModal={actions.closeModal} />
          )} */}
        {/* {modal === "GithubColumns" && (
            <GithubColumns {...params} closeModal={actions.closeModal} />
          )} */}
        {modal === "Invite" && (
          <Invite {...params} closeModal={actions.closeModal} />
        )}
        {modal === "Confirm" && (
          <Confirm {...params} closeModal={actions.closeModal} />
        )}
        {modal === "ManageTeamMembers" && (
          <ManageTeamMembers {...params} closeModal={actions.closeModal} />
        )}
        {modal === "AssignTask" && (
          <AssignTask {...params} closeModal={actions.closeModal} />
        )}
      </View>
    </Modal>
    // </View>
  );
};

export default ModalComponent;
