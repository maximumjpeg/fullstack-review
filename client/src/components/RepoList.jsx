import React from "react";

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map(repo => (
      <p>{repo.name}</p>
    ))}
  </div>
);

export default RepoList;
