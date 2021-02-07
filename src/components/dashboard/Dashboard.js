import React, { useState, useEffect } from 'react';
import "./dashboard.scss";
import { Link } from 'react-router-dom';
import { get } from 'utils/fetch';
import timeSince from 'utils/timesince';

export default function Dashboard() {

    const [solicitations, setSolicitations] = useState([]);
    const [ordering, setOrdering] = useState("-created_at");

    useEffect(() => {
        get(`/api/solicitation/?ordering=-solicitacao_data`).then(res => setSolicitations(res.results));
    }, [ordering])


    function toggleOrdering(name){
        if (ordering === name){
            setOrdering("-" + name)
        } else{
            setOrdering(name)
        }
    }

    return (
        <div className="dashboard">
            <div className="solicitations-score">
                <div className="title-bar">
                    <h2> Minhas Solicitações </h2>
                    <Link to={"/temas"}>
                        <button className="main-btn"> Nova Solicitação</button>
                    </Link>
                </div>

                <div className="solicitations">
                    <div className="solicitation header">
                        <div className="solicitation-title">
                            Numero
                        </div>
                        <div className="solicitation-theme">
                            Descrição
                        </div>
                        <div className="score-container">
                            Status
                        </div>
                        <div className="solicitation-result" onClick={() => toggleOrdering("title")}>
                            Data
                        </div>
                    </div>
                    {solicitations.length === 0 ?
                        <div className="no-solicitations">
                            <h3> Seus chamados irão aparecer aqui! </h3>
                            <Link to={"/temas"}>
                                <button className="main-btn"> Começar Agora </button>
                            </Link>
                        </div>
                        :
                        null
                    }
                    {solicitations.map(solicitation =>
                        <Link to={"/chamado/" + solicitation.id} className="solicitation" key={solicitation.id}>
                            <div className="solicitation-title">
                                {solicitation.processo_numero}
                            </div>
                            <div className="solicitation-description">
                                {solicitation.solicitacao_descricao}

                            </div>
                            <div className="solicitation-situation">
                                {solicitation.processo_situacao}
                            </div>
                            <div className="solicitation-date">
                                há {timeSince(solicitation.solicitacao_data)}
                            </div>

                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}