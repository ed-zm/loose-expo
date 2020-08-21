import React, { useContext } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
// import GithubButton from "../GithubButton";

const RepositoryCard = ({ repo, importButton, organization }) => {
  const { actions } = useContext(ModalContext);
  return (
    <View>
      <View>
        <View>
          <Text>{repo.name}</Text>
          <Text>{repo.private ? "Private" : "Public"}</Text>
        </View>
        <View>
          <Text>{repo.language}</Text>
          <View>
            <Text>Open </Text>
            <Text>{repo.openIssuesCount}</Text>
          </View>
          <Text>Updated at &nbsp;{moment(repo.updatedAt).fromNow()}</Text>
          {/* <View>
            <Text>Stars:{' '}</Text>
            <Text>{repo.stargazersCount}</Text>
          </View>
          <View>
            <Text>Forks:{' '}</Text>
            <Text>{repo.forksCount}</Text>
          </View> */}
        </View>
      </View>
      <View>
        {/* {importButton && (
          <GithubButton
            onClick={async () => {
              await actions.openModal({ modal: "GithubIssues", params: { repo, organization }, title: "Issues" });
            }}
          >
            Import
          </GithubButton>
        )} */}
      </View>
    </View>
  );
};

export default RepositoryCard;
