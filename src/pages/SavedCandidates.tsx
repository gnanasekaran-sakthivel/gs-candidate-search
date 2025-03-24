import React, { useState, useEffect } from "react";

// Define the Candidate interface to ensure the proper shape of the data
interface Candidate {
  login: string;
  id: number;
  url: string;
  avatar_url: string; // Added avatar_url field
}

const CandidateTable: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Load candidates from local storage on mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem("SavedCandidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to delete a candidate and update local storage
  const deleteCandidate = (id: number) => {
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.id !== id
    );
    setCandidates(updatedCandidates);
    localStorage.setItem("SavedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Big header */}
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        Potential Candidates
      </h1>
      {/* Table with black background */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid white" }}>
            <th style={thStyle}>Image</th> {/* New column for Image */}
            <th style={thStyle}>Login</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>URL</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id} style={{ borderBottom: "1px solid gray" }}>
                <td style={tdStyle}>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td style={tdStyle}>{candidate.login}</td>
                <td style={tdStyle}>{candidate.id}</td>
                <td style={tdStyle}>
                  <a
                    href={candidate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "lightblue" }}
                  >
                    {candidate.url}
                  </a>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => deleteCandidate(candidate.id)}
                    style={buttonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{ textAlign: "center", padding: "10px", color: "gray" }}
              >
                No candidates available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table styles
const thStyle: React.CSSProperties = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid white",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid gray",
};

const buttonStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default CandidateTable;
