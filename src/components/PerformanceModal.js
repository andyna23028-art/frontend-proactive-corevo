import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { XLg, ChevronUp, ChevronDown } from 'react-bootstrap-icons';

const EMPLOYEE_OPTIONS = [
    { id: 1, name: 'Rayn Reynolds' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Lily Aminah' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Carolina Davis' },
    { id: 6, name: 'Jackson Smith' },
    { id: 7, name: 'Charles Wilson' },
    { id: 8, name: 'Thomas Herve' },
];

const MAX_RATING = 5;

export default function PerformanceModal({ show, handleClose, handleSubmit, initialData }) {
    // State untuk setiap field - initialized dengan nilai kosong/default
    const [employeeName, setEmployeeName] = useState('');
    const [goalAchievement, setGoalAchievement] = useState('');
    const [knowledgeSkills, setKnowledgeSkills] = useState('');
    const [behaviorWorkEthic, setBehaviorWorkEthic] = useState('');
    const [disciplineReliability, setDisciplineReliability] = useState('');
    const [goalAchievementDescription, setGoalAchievementDescription] = useState('');
    const [knowledgeSkillsDescription, setKnowledgeSkillsDescription] = useState('');
    const [behaviorWorkEthicDescription, setBehaviorWorkEthicDescription] = useState('');
    const [disciplineReliabilityDescription, setDisciplineReliabilityDescription] = useState('');
    const [validated, setValidated] = useState(false);

    // Load data hanya sekali saat modal dibuka
    useEffect(() => {
        if (show) {
            if (initialData) {
                // Mode Edit
                setEmployeeName(initialData.employeeName || '');
                setGoalAchievement(initialData.goalAchievement !== undefined ? String(initialData.goalAchievement) : '');
                setKnowledgeSkills(initialData.knowledgeSkills !== undefined ? String(initialData.knowledgeSkills) : '');
                setBehaviorWorkEthic(initialData.behaviorWorkEthic !== undefined ? String(initialData.behaviorWorkEthic) : '');
                setDisciplineReliability(initialData.disciplineReliability !== undefined ? String(initialData.disciplineReliability) : '');
                setGoalAchievementDescription(initialData.goalAchievementDescription || '');
                setKnowledgeSkillsDescription(initialData.knowledgeSkillsDescription || '');
                setBehaviorWorkEthicDescription(initialData.behaviorWorkEthicDescription || '');
                setDisciplineReliabilityDescription(initialData.disciplineReliabilityDescription || '');
            } else {
                // Mode Create - reset semua
                setEmployeeName('');
                setGoalAchievement('');
                setKnowledgeSkills('');
                setBehaviorWorkEthic('');
                setDisciplineReliability('');
                setGoalAchievementDescription('');
                setKnowledgeSkillsDescription('');
                setBehaviorWorkEthicDescription('');
                setDisciplineReliabilityDescription('');
            }
            setValidated(false);
        }
    }, [show]); // Hanya trigger saat show berubah

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        handleSubmit({
            employeeName,
            goalAchievement,
            knowledgeSkills,
            behaviorWorkEthic,
            disciplineReliability,
            goalAchievementDescription,
            knowledgeSkillsDescription,
            behaviorWorkEthicDescription,
            disciplineReliabilityDescription,
        });

        handleClose();
    };

    const isEditMode = !!initialData;

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            contentClassName="rounded-4"
            dialogClassName="modal-xl" // Gunakan ukuran yang lebih besar (xl) untuk menampung 2 kolom
        >
            <Modal.Header 
                style={{ borderBottom: 'none', padding: '1.5rem 1.5rem 0.5rem 1.5rem' }}
                closeButton={false}
            >
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Modal.Title className="fw-bold fs-4">{isEditMode ? 'Edit Performance' : 'Manage Performance'}</Modal.Title>
                    <Button variant="light" onClick={handleClose} className="rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                        <XLg size={20} />
                    </Button>
                </div>
            </Modal.Header>
            
            <Modal.Body style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
                <p className="text-muted mb-4">Employee performance is typically evaluated based on the following key categories</p>

                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    {/* Select Employee */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold text-dark">Select Employee</Form.Label>
                        <Form.Select
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            required
                            disabled={isEditMode}
                            style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem' }}
                        >
                            <option value="">Pilih Karyawan...</option>
                            {EMPLOYEE_OPTIONS.map((employee) => (
                                <option key={employee.id} value={employee.name}>
                                    {employee.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Mohon pilih karyawan terlebih dahulu.</Form.Control.Feedback>
                    </Form.Group>

                    {/* Goal Achievement */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Goal Achievement Value</Form.Label>
                                <div className="position-relative">
                                    <Form.Control
                                        type="number"
                                        value={goalAchievement}
                                        placeholder="points"
                                        onChange={(e) => setGoalAchievement(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        min={0}
                                        max={5}
                                        style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem', fontWeight: '500', paddingRight: '40px' }}
                                    />
                                    <div className="position-absolute d-flex flex-column" style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
                                        <ChevronUp size={20} className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setGoalAchievement(Math.min(5, goalAchievement + 1))} />
                                        <ChevronDown size={20} className="text-primary" style={{ cursor: 'pointer', marginTop: '-15px' }} onClick={() => setGoalAchievement(Math.max(0, goalAchievement - 1))} />
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={goalAchievementDescription}
                                    onChange={(e) => setGoalAchievementDescription(e.target.value)}
                                    style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', fontSize: '1rem', padding: '0.75rem' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Behavior & Work Ethic */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Behavior & Work Ethic Value</Form.Label>
                                <div className="position-relative">
                                    <Form.Control
                                        type="number"
                                        value={behaviorWorkEthic}
                                        placeholder="points"
                                        onChange={(e) => setBehaviorWorkEthic(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        min={0}
                                        max={5}
                                        style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem', fontWeight: '500', paddingRight: '40px' }}
                                    />
                                    <div className="position-absolute d-flex flex-column" style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
                                        <ChevronUp size={20} className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setBehaviorWorkEthic(Math.min(5, behaviorWorkEthic + 1))} />
                                        <ChevronDown size={20} className="text-primary" style={{ cursor: 'pointer', marginTop: '-15px' }} onClick={() => setBehaviorWorkEthic(Math.max(0, behaviorWorkEthic - 1))} />
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={behaviorWorkEthicDescription}
                                    onChange={(e) => setBehaviorWorkEthicDescription(e.target.value)}
                                    style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', fontSize: '1rem', padding: '0.75rem' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Knowledge & Skill */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Knowledge & Skill Value</Form.Label>
                                <div className="position-relative">
                                    <Form.Control
                                        type="number"
                                        value={knowledgeSkills}
                                        placeholder="points"
                                        onChange={(e) => setKnowledgeSkills(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        min={0}
                                        max={5}
                                        style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem', fontWeight: '500', paddingRight: '40px' }}
                                    />
                                    <div className="position-absolute d-flex flex-column" style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
                                        <ChevronUp size={20} className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setKnowledgeSkills(Math.min(5, knowledgeSkills + 1))} />
                                        <ChevronDown size={20} className="text-primary" style={{ cursor: 'pointer', marginTop: '-15px' }} onClick={() => setKnowledgeSkills(Math.max(0, knowledgeSkills - 1))} />
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={knowledgeSkillsDescription}
                                    onChange={(e) => setKnowledgeSkillsDescription(e.target.value)}
                                    style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', fontSize: '1rem', padding: '0.75rem' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Discipline & Reliability */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Discipline & Reliability Value</Form.Label>
                                <div className="position-relative">
                                    <Form.Control
                                        type="number"
                                        value={disciplineReliability}
                                        placeholder="points"
                                        onChange={(e) => setDisciplineReliability(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        min={0}
                                        max={5}
                                        style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem', fontWeight: '500', paddingRight: '40px' }}
                                    />
                                    <div className="position-absolute d-flex flex-column" style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
                                        <ChevronUp size={20} className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setDisciplineReliability(Math.min(5, disciplineReliability + 1))} />
                                        <ChevronDown size={20} className="text-primary" style={{ cursor: 'pointer', marginTop: '-15px' }} onClick={() => setDisciplineReliability(Math.max(0, disciplineReliability - 1))} />
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={disciplineReliabilityDescription}
                                    onChange={(e) => setDisciplineReliabilityDescription(e.target.value)}
                                    style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', fontSize: '1rem', padding: '0.75rem' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="light" onClick={handleClose} style={{ borderRadius: '10px', color: '#2563eb', border: '1px solid #dbeafe', padding: '0.5rem 1.5rem', marginRight: '10px' }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit} style={{ borderRadius: '10px', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>
                    {isEditMode ? 'Save Changes' : 'Save'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}