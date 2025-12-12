// src/pages/PerformanceEmployee.js

import React, { useState } from 'react';
import AppNavbar from '../components/Navbar';

// --- Employee Performance Data ---
const employeePerformanceData = [
  {
    id: 1,
    employeeName: "Thomas Herve",
    scores: { goalAchievement: 5, knowledgeSkills: 4, behaviorWorkEthic: 5, disciplineReliability: 5 },
    details: [
      { category: "Goal Achievement", score: 5, description: "Consistently exceeds targets and drives team performance." },
      { category: "Knowledge & Skills", score: 4, description: "Demonstrates strong understanding of responsibilities and applies best practices effectively." },
      { category: "Behavior & Work Ethic", score: 5, description: "Shows excellent work ethic, stays proactive, and supports the team during critical moments." },
      { category: "Discipline & Reliability", score: 5, description: "Highly disciplined and dependable, always completing tasks ahead of deadlines." }
    ]
  },
  {
    id: 2,
    employeeName: "Charles Wilson",
    scores: { goalAchievement: 4, knowledgeSkills: 5, behaviorWorkEthic: 4, disciplineReliability: 4 },
    details: [
      { category: "Goal Achievement", score: 4, description: "Achieves most targets with steady and reliable performance." },
      { category: "Knowledge & Skills", score: 5, description: "Strong technical expertise and often serves as a reference for teammates." },
      { category: "Behavior & Work Ethic", score: 4, description: "Maintains a positive attitude and collaborates well with others." },
      { category: "Discipline & Reliability", score: 4, description: "Consistently punctual and completes tasks according to expectations." }
    ]
  },
  {
    id: 3,
    employeeName: "Jackson Smith",
    scores: { goalAchievement: 5, knowledgeSkills: 3, behaviorWorkEthic: 4, disciplineReliability: 5 },
    details: [
      { category: "Goal Achievement", score: 5, description: "Successfully meets key targets and contributes significantly to team goals." },
      { category: "Knowledge & Skills", score: 3, description: "Needs improvement in certain technical areas but shows willingness to learn." },
      { category: "Behavior & Work Ethic", score: 4, description: "Actively contributes and maintains healthy working relationships." },
      { category: "Discipline & Reliability", score: 5, description: "Very reliable and consistent in delivering reports and assignments." }
    ]
  },
  {
    id: 4,
    employeeName: "Carolina Davis",
    scores: { goalAchievement: 3, knowledgeSkills: 4, behaviorWorkEthic: 5, disciplineReliability: 4 },
    details: [
      { category: "Goal Achievement", score: 3, description: "Shows effort but needs improvement to reach optimal target completion." },
      { category: "Knowledge & Skills", score: 4, description: "Demonstrates solid understanding and continues to grow professionally." },
      { category: "Behavior & Work Ethic", score: 5, description: "Highly supportive and maintains strong professional ethics." },
      { category: "Discipline & Reliability", score: 4, description: "Displays stable discipline and commitment to responsibilities." }
    ]
  },
  {
    id: 5,
    employeeName: "Alice Johnson",
    scores: { goalAchievement: 4, knowledgeSkills: 4, behaviorWorkEthic: 4, disciplineReliability: 5 },
    details: [
      { category: "Goal Achievement", score: 4, description: "Consistently meets targets with good-quality output." },
      { category: "Knowledge & Skills", score: 4, description: "Competent in her role and able to handle technical challenges effectively." },
      { category: "Behavior & Work Ethic", score: 4, description: "Maintains professionalism and contributes positively to team collaboration." },
      { category: "Discipline & Reliability", score: 5, description: "Always punctual and completes tasks with accuracy and consistency." }
    ]
  },
  {
    id: 6,
    employeeName: "Lily Aminah",
    scores: { goalAchievement: 5, knowledgeSkills: 5, behaviorWorkEthic: 3, disciplineReliability: 4 },
    details: [
      { category: "Goal Achievement", score: 5, description: "Excels in achieving targets and takes initiative in projects." },
      { category: "Knowledge & Skills", score: 5, description: "Highly skilled and often mentors other team members." },
      { category: "Behavior & Work Ethic", score: 3, description: "Needs improvement in maintaining consistent work behavior." },
      { category: "Discipline & Reliability", score: 4, description: "Shows good commitment, though occasionally requires reminders." }
    ]
  },
  {
    id: 7,
    employeeName: "John Doe",
    scores: { goalAchievement: 4, knowledgeSkills: 5, behaviorWorkEthic: 5, disciplineReliability: 5 },
    details: [
      { category: "Goal Achievement", score: 4, description: "Meets targets with strong execution and strategic contribution." },
      { category: "Knowledge & Skills", score: 5, description: "Highly competent and consistently applies industry standards." },
      { category: "Behavior & Work Ethic", score: 5, description: "Proactive, supportive, and a role model for the team." },
      { category: "Discipline & Reliability", score: 5, description: "Extremely disciplined and always completes tasks on time." }
    ]
  },
  {
    id: 8,
    employeeName: "Rayn Reynolds",
    scores: { goalAchievement: 5, knowledgeSkills: 4, behaviorWorkEthic: 4, disciplineReliability: 5 },
    details: [
      { category: "Goal Achievement", score: 5, description: "Plays a key role in helping the team reach its goals." },
      { category: "Knowledge & Skills", score: 4, description: "Solid technical understanding and adapts quickly to new challenges." },
      { category: "Behavior & Work Ethic", score: 4, description: "Maintains steady work behavior and actively supports team efforts." },
      { category: "Discipline & Reliability", score: 5, description: "Consistently disciplined and dependable in task completion." }
    ]
  }
];

// --- Inline Styles ---
const styles = {
  container: { padding: '2rem', fontFamily: 'Segoe UI, sans-serif' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1rem', color: '#666', marginBottom: '2rem' },

  searchFilter: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  searchInput: { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' },
  iconButton: { marginLeft: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },

  table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
  th: { border: '1px solid #ddd', padding: '0.75rem', textAlign: 'left', backgroundColor: '#f5f5f5' },
  td: { border: '1px solid #ddd', padding: '0.75rem', textAlign: 'left' },

  readButton: { backgroundColor: '#ff8c00', color: 'black', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },

  modal: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: '2rem', width: '80%', borderRadius: '8px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  closeButton: { fontSize: '1.5rem', cursor: 'pointer' }
};

// --- Modal Component ---
const PerformanceModal = ({ isVisible, details, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2>Read Employee performance</h2>
          <span style={styles.closeButton} onClick={onClose}>&times;</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index}>
                <td style={styles.td}>{detail.category}</td>
                <td style={styles.td}>{detail.score}</td>
                <td style={styles.td}>{detail.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Component ---
const PerformanceEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employeePerformanceData.filter((employee) => {
    const query = searchQuery.toLowerCase();

    return (
      employee.employeeName.toLowerCase().includes(query) ||
      employee.scores.goalAchievement.toString().includes(query) ||
      employee.scores.knowledgeSkills.toString().includes(query) ||
      employee.scores.behaviorWorkEthic.toString().includes(query) ||
      employee.scores.disciplineReliability.toString().includes(query)
    );
  });

  const handleReadClick = (employeeId) => {
    const employee = employeePerformanceData.find(e => e.id === employeeId);
    if (employee) {
      setSelectedDetails(employee.details);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetails([]);
  };

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Performance" />

      <main style={styles.container}>
        <h1 style={styles.title}>Performance</h1>
        <p style={styles.subtitle}>Engage with your team through games and discussions</p>

        <section>
          <div style={styles.searchFilter}>
            <input
              type="text"
              placeholder="Search by name..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee Name</th>
                <th style={styles.th}>Goal Achievement</th>
                <th style={styles.th}>Knowledge & Skills</th>
                <th style={styles.th}>Behavior & Work Ethic</th>
                <th style={styles.th}>Discipline & Reliability</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td style={styles.td}>{employee.employeeName}</td>
                  <td style={styles.td}>{employee.scores.goalAchievement}</td>
                  <td style={styles.td}>{employee.scores.knowledgeSkills}</td>
                  <td style={styles.td}>{employee.scores.behaviorWorkEthic}</td>
                  <td style={styles.td}>{employee.scores.disciplineReliability}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.readButton}
                      onClick={() => handleReadClick(employee.id)}
                    >
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <PerformanceModal
        isVisible={isModalOpen}
        details={selectedDetails}
        onClose={closeModal}
      />
    </>
  );
};

export default PerformanceEmployee;