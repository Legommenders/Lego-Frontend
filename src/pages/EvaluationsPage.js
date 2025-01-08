import React, { useEffect, useState } from 'react';
import EvaluationTable from '../components/EvaluationTable';
import FullTextModal from '../components/FullTextModal';
import { getEvaluations, updateEvaluation } from '../services/api';
import { api } from '../services/api';

function EvaluationsPage() {
    const [evaluations, setEvaluations] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const res = await getEvaluations();
            // res.data should be an array of evaluations
            setEvaluations(res.data);
        } catch (err) {
            console.error('Failed to fetch evaluations', err);
        }
    };

    const handleView = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setModalTitle('');
        setModalContent('');
    };

    const handleAddTag = async (signature, tagName) => {
        // Example approach: we send a post to /evaluations/ with updated tags
        try {
            const evaluation = evaluations.find((ev) => ev.signature === signature);
            if (!evaluation) return;

            // If the backend requires a separate endpoint for adding tags, use that.
            // Otherwise, do an update to the entire evaluation (createOrUpdate).
            const updated = {
                ...evaluation,
                tags: [...evaluation.tags, tagName]
            };
            await updateEvaluation(updated);
            // Refresh the list
            fetchEvaluations();
        } catch (err) {
            console.error('Error adding tag:', err);
        }
    };

    const handleRemoveTag = async (signature, tagName) => {
        try {
            const evaluation = evaluations.find((ev) => ev.signature === signature);
            if (!evaluation) return;

            const updatedTags = evaluation.tags.filter((t) => t !== tagName);
            const updated = {
                ...evaluation,
                tags: updatedTags
            };
            await updateEvaluation(updated);
            fetchEvaluations();
        } catch (err) {
            console.error('Error removing tag:', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Evaluation Management</h1>

            <EvaluationTable
                evaluations={evaluations}
                onView={handleView}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
            />

            <FullTextModal
                isOpen={modalOpen}
                onClose={handleModalClose}
                title={modalTitle}
                content={modalContent}
            />
        </div>
    );
}

export default EvaluationsPage;
