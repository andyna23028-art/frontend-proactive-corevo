import React, { useState, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { HandThumbsUp, PersonSquare, Check } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';

const DEPARTMENTS = ['Human Resources', 'Finance', 'Engineering', 'Procurement'];

const EMPLOYEES_BY_DEPT = {
  'Human Resources': [
    'Alice Johnson',
    'Caroline Davis',
    'Charles Wilson',
    'Thomas Herve'
  ],

  Finance: [
    'Jackson Smith',
    'Emily Brown',
    'Rayn Reynolds',
    'Justin Hubner',
    'Rizky Ridho'
  ],

  Engineering: [
    'Kevin Lee',
    'Sarah Chen',
    'John Doe',
    'Caroline Davis',   // konsisten ejaan
    'Rafael Struick',
    'Pratama Arhan'
  ],

  Procurement: [
    'John Carter',
    'Mila Rogers',
    'Lily Aminah',
    'Tom Haye',
    'Marselino Ferdinan'
  ],
};

const REWARD_TYPES = ['Best Employee', 'Most Active Employee', 'Best Contributor'];

export default function Reward() {
  const [showModal, setShowModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [form, setForm] = useState({
    department: '',
    employee: '',
    type: '',
    message: '',
  });

  const [recentAwards, setRecentAwards] = useState([
    {
      id: 1,
      name: 'Lily Aminah',
      award: 'Best Employee',
      reason: 'Thank you for giving outstanding work on the new feature launch!',
      time: '15 minutes ago',
      avatar: 'https://i.pravatar.cc/150?u=lilyaminah',
    },
    {
      id: 2,
      name: 'John Doe',
      award: 'Most Active Employee',
      reason: 'Thank you for always willing to help teammates succeed.',
      time: '3 months ago',
      avatar: 'https://i.pravatar.cc/150?u=johndoe',
    },
    {
      id: 3,
      name: 'Thomas Herve',
      award: 'Best Contributor',
      reason: 'Thanks for your brilliant solution to the customer feedback system!',
      time: '6 months ago',
      avatar: 'https://i.pravatar.cc/150?u=thomasherve',
    },
  ]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
      ...(field === 'department' ? { employee: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAward = {
      id: recentAwards.length + 1,
      name: form.employee,
      award: form.type,
      reason: form.message || 'Thank you for your amazing contribution!',
      time: 'Just now',
      avatar: `https://i.pravatar.cc/150?u=${form.employee.replace(/\s/g, '').toLowerCase()}`,
    };

    setRecentAwards([newAward, ...recentAwards]);

    // ✅ Notifikasi aesthetic
    setNotifMessage(`Reward sent to ${form.employee}`);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);

    setForm({ department: '', employee: '', type: '', message: '' });
    setShowModal(false);
  };

  const employeesForSelectedDept = EMPLOYEES_BY_DEPT[form.department] || [];

  // Filter data penghargaan berdasarkan pilihan
  const filteredAwards = useMemo(() => {
    if (selectedFilter === 'All') {
      return recentAwards;
    }
    return recentAwards.filter(award => award.award === selectedFilter);
  }, [selectedFilter, recentAwards]);

  // Fungsi untuk mengubah filter
  const handleFilterChange = (awardType) => {
    if (selectedFilter === awardType) {
      setSelectedFilter('All');
    } else {
      setSelectedFilter(awardType);
    }
  };


  const RewardTypeCard = ({ icon, title, description, selected, onClick }) => {
    const cardStyle = {
      backgroundColor: '#eff6ff',
      border: selected ? '2px solid #3B82F6' : '1px solid #C9DFFF',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      boxShadow: selected ? '0 4px 10px rgba(59, 130, 246, 0.2)' : 'none',
    };

    return (
      <Card className="h-100 mb-3" style={cardStyle} onClick={() => onClick(title)}>
        <Card.Body className="d-flex align-items-start">
          <div className="me-3 p-3 rounded-3" style={{ backgroundColor: '#C9DFFF' }}>
            {icon}
          </div>
          <div>
            <h6 className="fw-bold mb-1">{title}</h6>
            <p className="text-muted small mb-0">{description}</p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const RecentAwardItem = ({ award }) => (
    <div className="d-flex align-items-start p-3 border-bottom">
      <img
        src={award.avatar}
        alt={award.name}
        className="rounded-circle me-3 border"
        width="50"
        height="50"
        style={{ objectFit: 'cover' }}
      />
      <div>
        <p className="mb-1">
          <span className="fw-bold">{award.name}</span> received{' '}
          <span className="fw-semibold text-primary">{award.award}</span>
        </p>
        <p className="text-muted mb-1 small">{award.reason}</p>
        <small className="text-secondary">{award.time}</small>
      </div>
    </div>
  );

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Reward" />

      <Container fluid className="mt-4 px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold fs-3">Reward</h1>
            <p className="text-muted">Recognize and celebrate your achievements</p>
          </div>
          <Button variant="primary" className="fw-bold" onClick={() => setShowModal(true)}>
            Give Reward
          </Button>
        </div>

        {/* Reward Types */}
        <h4 className="fw-bold mb-3">Reward Types</h4>
        <Row className="mb-5">
          <Col md={6}>
            <RewardTypeCard
              icon={<HandThumbsUp size={24} className="text-primary" />}
              title="Best Employee"
              description="Recognizing the employee with outstanding performance and exceptional results throughout the quarter."
              selected={selectedFilter === 'Best Employee'}
              onClick={handleFilterChange}
            />
          </Col>
          <Col md={6}>
            <RewardTypeCard
              icon={<PersonSquare size={24} className="text-primary" />}
              title="Most Active Employee"
              description="Awarded to the employee who shows the highest level of engagement, participation, and enthusiasm during the period."
              selected={selectedFilter === 'Most Active Employee'}
              onClick={handleFilterChange}
            />
          </Col>
        </Row>

        {/* Recent Awards */}
        <h4 className="fw-bold mb-3">
          Recent Employees Have Been Awarded
          {selectedFilter !== 'All' && (
            <span className="badge bg-primary ms-2 fs-6">{selectedFilter}</span>
          )}
        </h4>
        <Card className="shadow border-0">
          <Card.Body className="p-0">
            {filteredAwards.length > 0 ? (
              filteredAwards.map((award) => (
                <RecentAwardItem key={award.id} award={award} />
              ))
            ) : (
              <p className="text-center text-muted p-4 mb-0">
                No recent awards found for the selected category.
              </p>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '14px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              width: '100%',
              maxWidth: '600px',
              zIndex: 1060,
            }}
          >
            <h5 style={{ fontWeight: 600, color: '#1e3a8a' }}>Give a Reward</h5>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Recognize an employee outstanding contribution
            </p>

            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">

                {/* Department */}
                <Col xs={12}>
                  <Form.Label style={{ fontWeight: 500 }}>Select Department</Form.Label>
                  <Form.Select
                    value={form.department}
                    onChange={handleChange('department')}
                    required
                    style={{
                      borderRadius: '10px',
                      borderColor: '#d1d5db',
                      padding: '0.55rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="">Choose department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Employee */}
                <Col xs={12}>
                  <Form.Label style={{ fontWeight: 500 }}>Select Employee</Form.Label>
                  <Form.Select
                    value={form.employee}
                    onChange={handleChange('employee')}
                    disabled={!form.department}
                    required
                    style={{
                      borderRadius: '10px',
                      borderColor: '#d1d5db',
                      padding: '0.55rem',
                      fontSize: '0.9rem',
                      backgroundColor: !form.department ? '#f3f4f6' : 'white',
                    }}
                  >
                    <option value="">
                      {form.department ? 'Choose employee' : 'Select department first'}
                    </option>
                    {employeesForSelectedDept.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Reward Type */}
                <Col xs={12}>
                  <Form.Label style={{ fontWeight: 500 }}>Reward Type</Form.Label>
                  <Form.Select
                    value={form.type}
                    onChange={handleChange('type')}
                    required
                    style={{
                      borderRadius: '10px',
                      borderColor: '#d1d5db',
                      padding: '0.55rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="">Choose reward type</option>
                    {REWARD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Message */}
                <Col xs={12}>
                  <Form.Label style={{ fontWeight: 500 }}>Message (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Write a short appreciation message..."
                    style={{
                      borderRadius: '10px',
                      borderColor: '#d1d5db',
                      fontSize: '0.9rem',
                      padding: '0.75rem',
                    }}
                  />
                </Col>
              </Row>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontWeight: 500,
                    padding: '0.45rem 1.2rem',
                    borderRadius: '8px',
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#2563eb',
                    borderColor: '#2563eb',
                    color: 'white',
                    fontWeight: 600,
                    padding: '0.45rem 1.2rem',
                    borderRadius: '8px',
                  }}
                >
                  Send Reward
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* ✅ NOTIFICATION AESTHETIC */}
      {showNotif && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#d1fae5', // hijau pastel
            color: '#065f46', // hijau gelap elegan
            padding: '14px 18px',
            borderRadius: '10px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 2000,
            minWidth: '260px',
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            ✓
          </div>

          <span>{notifMessage}</span>
        </div>
      )}
    </>
  );
}