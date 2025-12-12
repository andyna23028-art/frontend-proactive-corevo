import React, { useState, useMemo } from 'react'; // Import useState dan useMemo
import { Container, Row, Col, Card } from 'react-bootstrap';
import { HandThumbsUp, Award } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';

// Data Dummy Riwayat Penghargaan
const RECENT_AWARDS = [
    {
        id: 1,
        name: 'Lily Aminah',
        award: 'Best Employee',
        reason: 'Thank you for giving outstanding work on the new feature launch!',
        time: 'Just now',
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
        award: 'Best Employee',
        reason: 'Thanks for your brilliant solution to the customer feedback system!',
        time: '3 months ago',
        avatar: 'https://i.pravatar.cc/150?u=thomasherve',
    },
];

// Komponen Card Jenis Penghargaan 
const RewardTypeCard = ({ icon, title, description, selected, onClick }) => {
    // Warna dan gaya berdasarkan desain (biru muda dan outline biru)
    const BASE_BLUE_COLOR = '#3B82F6';
    const LIGHT_BLUE_BORDER = '#C9DFFF';

    const cardStyle = {
        backgroundColor: '#EFF6FF', 
        border: selected ? `2px solid ${BASE_BLUE_COLOR}` : `1px solid ${LIGHT_BLUE_BORDER}`, 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        boxShadow: selected ? `0 4px 10px rgba(59, 130, 246, 0.2)` : 'none', 
    };

    const iconWrapperStyle = {
        backgroundColor: LIGHT_BLUE_BORDER, 
        color: BASE_BLUE_COLOR,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
    };

    return (
        <Card 
            className="reward-card border-0 h-100"
            style={cardStyle}
            onClick={() => onClick(title)} // Menambahkan event onClick
        >
            <Card.Body className="d-flex align-items-start p-4">
                <div 
                    className="me-3 p-3" 
                    style={iconWrapperStyle}
                >
                    {icon} 
                </div>
                <div>
                    <h5 className="fw-bold">{title}</h5>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{description}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

// Komponen Riwayat Penghargaan 
const RecentAwardItem = ({ award, isLast }) => ( // Terima prop isLast untuk item terakhir
    <div 
        className="d-flex align-items-center p-3"
        style={{
            // Hanya tambahkan border bawah jika BUKAN item terakhir
            borderBottom: isLast ? 'none' : '1px solid #e0e0e0', // Border tipis abu-abu
            backgroundColor: '#ffffff', // Pastikan latar belakang item adalah putih jika container utama biru muda
        }}
    >
        <img
            src={award.avatar}
            alt={award.name}
            className="rounded-circle me-3" 
            width="50" 
            height="50"
            style={{ objectFit: 'cover' }}
        />
        <div>
            <p className="mb-0">
                <span className="fw-bold">{award.name}</span> received{' '}
                <span className="fw-semibold" style={{ color: '#3B82F6' }}>{award.award}</span>
            </p>
            <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>{award.reason}</p>
            <small className="text-muted">{award.time}</small>
        </div>
    </div>
);

export default function RewardEmployee() {
    // State untuk melacak filter yang dipilih (misalnya: 'All', 'Best Employee', 'Most Active Employee')
    const [selectedFilter, setSelectedFilter] = useState('All'); 

    // Filter data penghargaan menggunakan useMemo agar efisien
    const filteredAwards = useMemo(() => {
        if (selectedFilter === 'All') {
            return RECENT_AWARDS;
        }
        return RECENT_AWARDS.filter(award => award.award === selectedFilter);
    }, [selectedFilter]);

    // Fungsi untuk mengubah filter
    const handleFilterChange = (awardType) => {
        // Jika filter yang sama diklik lagi, reset ke 'All'
        if (selectedFilter === awardType) {
            setSelectedFilter('All');
        } else {
            setSelectedFilter(awardType);
        }
    };

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Reward" />

            <Container fluid className="mt-4 px-4">

                {/* Header */}
                <div className="mb-4">
                    <h1 className="fw-bold fs-3">Reward Employee</h1>
                    <p className="text-muted">Recognize and celebrate employee achievements</p>
                </div>

                {/* Reward Types */}
                <h4 className="fw-bold mb-3">Reward Types</h4>
                <Row className="mb-5">
                    <Col md={6} className="mb-3 mb-md-0">
                        <RewardTypeCard
                            icon={<HandThumbsUp size={30} />}
                            title="Best Employee"
                            description="Recognizing the employee with outstanding performance and exceptional results throughout the quarter."
                            selected={selectedFilter === 'Best Employee'} // Tentukan apakah kartu ini terpilih
                            onClick={handleFilterChange} // Tambahkan handler klik
                        />
                    </Col>
                    <Col md={6} className="mb-3 mb-md-0">
                        <RewardTypeCard
                            // Menggunakan ikon 'PersonSquare' default, asumsikan ini yang paling dekat
                            icon={<Award size={30} />} 
                            title="Most Active Employee"
                            description="Awarded to the employee who shows the highest level of engagement, participation, and enthusiasm during the period."
                            selected={selectedFilter === 'Most Active Employee'} // Tentukan apakah kartu ini terpilih
                            onClick={handleFilterChange} // Tambahkan handler klik
                        />
                    </Col>
                </Row>

                {/* Recent Awards */}
                <h4 className="fw-bold mb-3">
                    Recent Employees Have Been Awarded 
                    {selectedFilter !== 'All' && (
                        <span className="badge bg-primary ms-2 fs-6">{selectedFilter}</span> // Tampilkan badge filter
                    )}
                </h4>

                {/* Daftar Award */}
                <Card 
                    className="border-0" 
                    style={{ 
                        borderRadius: '12px',
                        backgroundColor: '#FFFFFF', // Pastikan Card utama berwarna putih
                        border: '1px solid #C9DFFF', // Garis luar (outline) biru muda halus
                    }}
                >
                    <Card.Body className="p-0">
                        {filteredAwards.length > 0 ? (
                            filteredAwards.map((award, index) => (
                                <RecentAwardItem 
                                    key={award.id} 
                                    award={award} 
                                    isLast={index === filteredAwards.length - 1} 
                                />
                            ))
                        ) : (
                            // Tampilkan pesan jika tidak ada data
                            <p className="text-center text-muted p-4 mb-0">
                                No recent awards found for the selected category.
                            </p>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}