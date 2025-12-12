import React from 'react';
import AppNavbar from '../components/Navbar';

import leadershipImage from '../images/leadership-fundamental.jpeg';
import communicationImage from '../images/effective-communication.jpeg';
import systemDesignImage from '../images/system-design.jpeg';

const reportData = [
  {
    imageSrc: leadershipImage,
    title: 'Leadership Fundamental',
    provider: 'Edukativ',
    score: '95%',
    scoreText: 'Excellent',
    duration: '2 days',
    certificateId: 'CERT-2025-001',
    completionDate: '10/03/2025'
  },
  {
    imageSrc: communicationImage,
    title: 'Effective Communication',
    provider: 'Perspective Group',
    score: '85%',
    scoreText: 'Great',
    duration: '1 day',
    certificateId: 'CERT-2025-002',
    completionDate: '25/10/2025'
  },
  {
    imageSrc: systemDesignImage,
    title: 'System Design Mastery',
    provider: 'Interaction Design Fondation',
    score: '91%',
    scoreText: 'Excellent',
    duration: '3 days',
    certificateId: 'CERT-2025-003',
    completionDate: '02/11/2025'
  }
];

const styles = {
  colorExcellent: '#28a745',
  colorGreat: '#007bff',
  employeeReportContainer: {
    padding: '30px',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#f8f9fa'
  },
  reportHeader: {
    marginBottom: '20px'
  },
  mainTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '5px',
    color: '#343a40'
  },
  subtitle: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  reportCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px'
  },
  reportCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  },
  cardImageContainer: {
    height: '150px',
    overflow: 'hidden'
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  cardContent: {
    padding: '20px'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#343a40'
  },
  cardProvider: {
    fontSize: '0.85rem',
    color: '#6c757d',
    marginBottom: '10px',
    fontWeight: '500'
  },
  statusCompletedPill: {
    display: 'inline-block',
    backgroundColor: '#e6ffe6',
    color: '#28a745',
    padding: '3px 8px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginTop: '5px',
    marginBottom: '15px'
  },
  cardDetailsRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    marginTop: '15px',
    gap: '30px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex'
  },
  scoreCircle: (color) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.1rem',
    marginRight: '10px',
    backgroundColor: color
  }),
  scoreLabel: {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#343a40'
  },
  durationLabel: {
    fontSize: '0.75rem',
    color: '#6c757d',
    marginBottom: '2px'
  },
  durationValue: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#343a40'
  },
  cardFooterInfo: {
    marginTop: '15px',
    fontSize: '0.85rem',
    color: '#343a40',
    lineHeight: '1.5'
  }
};

const getScoreColor = (score) => {
  const percentage = parseInt(score.replace('%', ''), 10);
  if (percentage >= 90) return styles.colorExcellent;
  if (percentage >= 80) return styles.colorGreat;
  return '#ccc';
};

const ReportCard = ({
  imageSrc,
  title,
  provider,
  score,
  scoreText,
  duration,
  certificateId,
  completionDate
}) => {
  const scoreColor = getScoreColor(score);

  return (
    <div
      style={styles.reportCard}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div style={styles.cardImageContainer}>
        <div
          style={{
            ...styles.cardImagePlaceholder,
            backgroundImage: `url(${imageSrc})`
          }}
        />
      </div>

      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardProvider}>{provider}</p>
        <div style={styles.statusCompletedPill}>Completed</div>

        <div style={styles.cardDetailsRow}>
          <div style={styles.scoreItem}>
            <div style={styles.scoreCircle(scoreColor)}>{score}</div>
            <div style={styles.detailItem}>
              <p style={styles.scoreLabel}>{scoreText}</p>
            </div>
          </div>

          <div style={styles.detailItem}>
            <p style={styles.durationLabel}>Duration</p>
            <p style={styles.durationValue}>{duration}</p>
          </div>
        </div>

        <div style={styles.cardFooterInfo}>
          <p>
            Certificate ID: <strong>{certificateId}</strong>
          </p>
          <p>
            Completed <strong>{completionDate}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

const ReportEmployeePage = () => {
  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Report" />
      <div style={styles.employeeReportContainer}>
        <div style={styles.reportHeader}>
          <h1 style={styles.mainTitle}>Training Report</h1>
          <p style={styles.subtitle}>Engage with your team through games and discussions</p>
        </div>

        <div style={styles.reportCardsGrid}>
          {reportData.map((report, index) => (
            <ReportCard key={index} {...report} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReportEmployeePage;