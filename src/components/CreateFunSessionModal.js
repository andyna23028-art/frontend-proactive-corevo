import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Toast, ToastContainer } from 'react-bootstrap'; 
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons'; 

// --- Warna Kustom untuk Toast Sukses (Sesuai dengan Model Gambar Anda) ---
const CUSTOM_SUCCESS_BG = '#e5f5e5';      // Hijau Muda Pastel
const CUSTOM_SUCCESS_TEXT = '#1e8449';    // Hijau Tua Kontras
const CUSTOM_SUCCESS_BORDER = '#a9d9a9';  // Border Hijau

const CreateFunSessionModal = ({ show, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        description: '',
        dateTimeLocal: '',
        duration: '',
        host: 'Admin',
        type: 'upcoming',
        participants: 0,
    });
    
    // State untuk mengelola notifikasi Toast (dinamis untuk pesan dan warna)
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ 
        msg: '', 
        variant: 'success' // Dapat berupa 'success' atau 'danger'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            department: '',
            description: '',
            dateTimeLocal: '',
            duration: '',
            host: 'Admin',
            type: 'upcoming',
            participants: 0,
        });
    };

    // Fungsi untuk menampilkan Toast
    const handleShowToast = (msg, variant) => {
        setToastMessage({ msg, variant });
        setShowToast(true);
    };

    // Fungsi untuk menutup Toast
    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = () => {
        if (!formData.title || !formData.dateTimeLocal || !formData.duration || !formData.description) {
            // ✅ MENGGANTI alert() dengan Toast Peringatan
            handleShowToast("Harap isi semua kolom wajib!", "danger"); 
            return;
        }

        const [datePart, timePart] = formData.dateTimeLocal.split('T');

        handleSave({
            ...formData,
            date: datePart,
            time: timePart,
        });

        // ✅ Tampilkan notifikasi Sukses kustom
        handleShowToast("Fun Session Added!", "success");

        // Reset form dan tutup modal
        resetForm();
        handleClose();
    };

    // --- LOGIKA STYLING TOAST KUSTOM ---
    const isSuccessToast = toastMessage.variant === 'success';

    const customToastStyle = isSuccessToast ? {
        backgroundColor: CUSTOM_SUCCESS_BG,
        borderColor: CUSTOM_SUCCESS_BORDER,
        color: CUSTOM_SUCCESS_TEXT,
        borderRadius: '12px', // Sudut melengkung
        width: '320px',      // Lebar lebih besar
    } : {};
    
    // Tentukan warna teks (hijau tua untuk sukses kustom, putih untuk danger standar)
    const toastTextColor = isSuccessToast ? CUSTOM_SUCCESS_TEXT : 'white';
    // Tentukan Ikon
    const ToastIcon = isSuccessToast ? CheckCircleFill : ExclamationTriangleFill;
    // Tentukan warna Ikon
    const toastIconColor = isSuccessToast ? CUSTOM_SUCCESS_TEXT : 'white';


    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Fun Session</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-muted small mb-3">Schedule new game for employees</p>
                    <Form>
                        {/* --- Form Fields (seperti kode Anda) --- */}
                        <Form.Group className="mb-3">
                            <Form.Label>Session Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className='custom-form-control'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className='custom-form-control'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className='custom-form-control'
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Date & Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="dateTimeLocal"
                                        value={formData.dateTimeLocal}
                                        onChange={handleChange}
                                        className='custom-form-control'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Duration (min)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="duration"
                                        min="10"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className='custom-form-control'
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* --- End Form Fields --- */}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* --- TOAST CONTAINER KUSTOM --- */}
            <ToastContainer
                className="p-3"
                position="bottom-end" 
                style={{ zIndex: 1056 }} 
            >
                <Toast 
                    show={showToast} 
                    onClose={handleCloseToast} 
                    delay={3000} 
                    autohide
                    // Hapus bg Bootstrap jika sukses, gunakan bg Bootstrap standar (misal 'danger') jika peringatan
                    bg={isSuccessToast ? null : toastMessage.variant} 
                    style={customToastStyle} // Terapkan custom style untuk sukses
                    className={isSuccessToast ? 'border' : ''} // Tambahkan border jika custom
                >
                    {/* Menggunakan Toast.Body saja untuk tampilan sederhana seperti yang Anda inginkan */}
                    <Toast.Body className="d-flex align-items-center p-3">
                        {/* Ikon Dinamis (Check atau Warning) */}
                        <ToastIcon 
                            size={24} 
                            className="me-3" 
                            style={{ color: toastIconColor }} 
                        /> 
                        
                        {/* Pesan Toast */}
                        <span style={{ color: toastTextColor, fontWeight: 'bold' }}>
                            {toastMessage.msg}
                        </span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default CreateFunSessionModal;