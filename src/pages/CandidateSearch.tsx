import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import "../assets/styles/candidates.css"; // Import the CSS file

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidateDetails, setCurrentCandidateDetails] =
    useState<Candidate | null>(null);

  const fetchCandidates = async () => {
    try {
      const candidatesJsonData = await searchGithub();
      setCandidates(candidatesJsonData);
      console.log(candidatesJsonData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchCandidateDetails = async (index: number) => {
    if (candidates.length > 0 && index < candidates.length) {
      try {
        const details: Candidate = await searchGithubUser(
          candidates[index].login
        );

        setCurrentCandidateDetails(details);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    }
  };

  // Fetch candidates on mount
  useEffect(() => {
    fetchCandidates();
    setCurrentCandidateDetails(candidates[0]);
  }, []); // Refetch when `start` changes for pagination

  // Load details for the first candidate when candidates are fetched
  useEffect(() => {
    if (candidates.length > 0) {
      fetchCandidateDetails(currentIndex);
    }
  }, [candidates, currentIndex]); // Runs when `candidates` or `currentIndex` changes

  // Function to save current candidate and move to the next one
  const saveAndNextCandidate = () => {
    if (currentCandidateDetails) {
      let savedCandidatesStorage: string =
        localStorage.getItem("SavedCandidates") || "[]";

      let savedCandidatesArray = JSON.parse(savedCandidatesStorage);
      savedCandidatesArray.push(currentCandidateDetails);

      localStorage.setItem(
        "SavedCandidates",
        JSON.stringify(savedCandidatesArray)
      );
    }

    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to next candidate
    } else {
      setCurrentIndex(0);
    }
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to next candidate
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentCandidateDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Candidate Search</h1>

      <div className="card">
        <img
          src={currentCandidateDetails.avatar_url}
          alt="Avatar"
          className="image"
        />
        <h3 className="name">
          {currentCandidateDetails.name} ({currentCandidateDetails.id})
        </h3>

        <div className="details">
          <div>
            <strong>Location:</strong> {currentCandidateDetails.location}
          </div>
          <div>
            <strong>Email:</strong> {currentCandidateDetails.email}
          </div>
          <div>
            <strong>Company:</strong> {currentCandidateDetails.company}
          </div>
          <div>
            <strong>Bio:</strong> {currentCandidateDetails.bio}
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <img
          src="./images/minus.png"
          alt="Minus"
          onClick={nextCandidate}
          className="button"
        />
        <img
          src="./images/plus.png"
          alt="Plus"
          onClick={saveAndNextCandidate}
          className="button"
        />
      </div>
    </div>
  );
};

export default CandidateSearch;
