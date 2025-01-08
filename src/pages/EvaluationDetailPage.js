import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvaluation } from '../services/api';

function EvaluationDetailPage() {
    const { signature } = useParams();
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        fetchEvaluationDetail();
    }, []);

    const fetchEvaluationDetail = async () => {
        try {
            const res = await getEvaluation(signature);
            setEvaluation(res.data);
        } catch (err) {
            console.error('Failed to fetch evaluation detail', err);
        }
    };

    if (!evaluation) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Evaluation Detail - {evaluation.signature}</h1>
            <p><strong>Command:</strong> {evaluation.command}</p>
            <p><strong>Configuration:</strong> {evaluation.configuration}</p>
            <p><strong>Log:</strong> {evaluation.log}</p>
            <p><strong>Performance:</strong> {evaluation.performance}</p>
            <p><strong>Comment:</strong> {evaluation.comment}</p>
            <p><strong>Tags:</strong> {evaluation.tags.join(', ')}</p>
            <Link to="/evaluations">Back to List</Link>
        </div>
    );
}

export default EvaluationDetailPage;
