import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import useOrganization from "loose-components/src/screens/Dashboard/Organization";
// import GithubLogin from "react-github-login";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import { UserContext } from "loose-components/src/contexts/User";
// import GithubButton from "../../../components/GithubButton";
import Button from "../../../components/Button";
import List from "../../../components/List";
import RepositoryCard from "../../../components/RepositoryCard";
import Loading from "../../../components/Loading";
import ProjectCard from "../../../components/ProjectCard";
import TasksList from "../../../components/Lists/Tasks";
import TeamsList from "../../../components/Lists/Teams";
// import UsersList from "../../../components/Lists/Users";

const Organization = ({
  route: {
    params: { id },
  },
}) => {
  const { actions } = useContext(ModalContext);
  const user = useContext(UserContext);
  const {
    organization,
    loading,
    error,
    projects,
    loadingProjects,
    projectsError,
    repositories,
    loadingRepositories,
    repositoriesError,
    onSuccess,
    onError,
    tab,
    setTab,
    onUnlinkOrganization,
    onDeleteOrganization,
    onInviteToOrganization,
    invitingToOrganization,
  } = useOrganization({ id });
  if (!organization) return null;
  return (
    <View>
      <View>
        <View>
          <Image source={{ uri: "/default_profile.png" }} />
          <Text>{organization.name}</Text>
          {/* <GithubLogin
            clientId={env.GITHUB_CLIENT_ID}
            onSuccess={onSuccess}
            onError={onError}
            redirectUri={`${env.HOST}/oauth`}
            scope="repo read:user read:org"
          >
            <GithubButton>
              {organization.githubOrganization
                ? organization.githubOrganization
                : "Connect"}
            </GithubButton>
          </GithubLogin> */}
          {organization.githubOrganization && (
            <TouchableOpacity onPress={onUnlinkOrganization}>
              Disconnect
            </TouchableOpacity>
          )}
        </View>
        {organization.owner.id === user.id && (
          <View>
            <Button
              onPress={() => {
                actions.openModal({
                  modal: "EditOrganization",
                  title: "Edit Organization",
                  params: { organization },
                });
              }}
            >
              Edit
            </Button>
            <Button
              title="Delete"
              deleteButton
              onPress={() => {
                actions.openModal({
                  modal: "Confirm",
                  title: "Delete Organization",
                  params: {
                    onOKText: "Delete",
                    onOK: async () => {
                      await onDeleteOrganization();
                      await router.push("/dashboard/organizations");
                    },
                    description: "Are you sure to delete this organization?",
                  },
                });
              }}
            />
            <Button
              title="Invite"
              onPress={() => {
                actions.openModal({
                  modal: "Invite",
                  title: "Invite To Organization",
                  params: {
                    organization,
                    onInvite: async (id) => {
                      await onInviteToOrganization(id);
                    },
                    type: "ORGANIZATION",
                    typeId: organization.id,
                  },
                });
              }}
            />
          </View>
        )}
      </View>
      <View>
        <View>
          <View>
            <TouchableOpacity onPress={() => setTab("REPOSITORIES")}>
              <Text> Repositories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab("PROJECTS");
              }}
            >
              <Text> Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab("TASKS");
              }}
            >
              <Text>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab("TEAMS");
              }}
            >
              <Text>Teams</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab("MEMBERS");
              }}
            >
              <Text>Members</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loadingRepositories || loadingProjects ? (
          <Loading />
        ) : (
          <View>
            {tab === "REPOSITORIES" && (
              <View>
                {loadingRepositories ? (
                  <Loading />
                ) : (
                  <List
                    items={repositories}
                    renderItem={(repository) => (
                      <RepositoryCard
                        repo={repository}
                        organization={organization}
                      />
                    )}
                  />
                )}

                {/* {repositories && (
                  <GithubButton
                    onPress={async () => {
                      await actions.openModal({
                        modal: "GithubRepos",
                        params: { repos: repositories, organization },
                        title: "Repositories",
                      });
                    }}
                  >
                    Import Issues
                  </GithubButton>
                )} */}
              </View>
            )}
            {tab === "PROJECTS" && (
              <View>
                {loadingProjects ? (
                  <Loading />
                ) : (
                  <List
                    items={projects}
                    renderItem={(project) => <ProjectCard project={project} />}
                  />
                )}

                {/* {repositories && (
                  <GithubButton
                    onPress={async () => {
                      await actions.openModal({
                        modal: "GithubProjects",
                        params: { organization, projects },
                        title: "Projects",
                      });
                    }}
                  >
                    Import Cards
                  </GithubButton>
                )} */}
              </View>
            )}
            {tab === "TASKS" && <TasksList organization={organization} />}
            {tab === "TEAMS" && <TeamsList organization={organization} />}
            {/* {tab === "MEMBERS" && <UsersList organization={organization} />} */}
          </View>
        )}
      </View>
    </View>
  );
};

export default Organization;
