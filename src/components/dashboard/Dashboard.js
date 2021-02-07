import React, { useState, useEffect } from 'react';
import "./dashboard.scss";
import { Link } from 'react-router-dom';
import { get } from 'utils/fetch';
import timeSince from 'utils/timesince';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Dashboard() {

    const [solicitations, setSolicitations] = useState([]);
    const [ordering, setOrdering] = useState("-solicitacao_data");
    const [offset, setOffset] = useState(0);  
    const [count, setCount] = useState(0);  

    useEffect(() => {
        get(`/api/solicitation/?ordering=${ordering}&offset=${offset}`).then(res => {
            setSolicitations(res.results);
            setCount(res.count);
        });
    }, [ordering, offset])


    function toggleOrdering(name){
        setOffset(0);
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

                <div className="pagination">
                    <button 
                        disabled={(offset - solicitations.length) < 0}
                        onClick={() => (offset - solicitations.length) >= 0 && setOffset(offset - solicitations.length)}>
                        <FiChevronLeft/>
                    </button>
                        Pagina {1 + Math.floor(offset / solicitations.length)} de {Math.ceil(count / solicitations.length)}
                    <button
                        disabled={(offset + solicitations.length) > count}
                        onClick={() => (offset + solicitations.length) < count && setOffset(offset + solicitations.length)}>
                        <FiChevronRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}