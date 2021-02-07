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
    const [search, setSearch] = useState("");  
    const [searchTarget, setSearchTargets] = useState({});  

    useEffect(() => {
        get(`/api/solicitation/?ordering=${ordering}&offset=${offset}&search=${search}&${jsonToQueryString(searchTarget)}`).then(res => {
            setSolicitations(res.results);
            setCount(res.count);
        });
    }, [ordering, offset, search, searchTarget])


    function toggleOrdering(name){
        setOffset(0);
        if (ordering === name){
            setOrdering("-" + name)
        } else{
            setOrdering(name)
        }
    }

    function searchAll(name){
        setOffset(0);
        setSearch(name);
    }

    function searchAttr(attr, name){
        setOffset(0);
        const newTarget = {...searchTarget}
        newTarget[attr] = name;
        setSearchTargets(newTarget);
    }

    let jsonToQueryString = (json) => {
        return Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }

    return (
        <div className="dashboard">
            <div className="solicitations-score">
                <div className="title-bar">
                    <h2> Solicitações </h2>
                    <Link to={"/chamados/criar"}>
                        <button className="main-btn"> Nova Solicitação</button>
                    </Link>
                </div>

                <input type="search" placeholder="Pesquisar tudo..." onChange={(e) => searchAll(e.target.value)}/>

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
                        <div className="solicitation-result" onClick={() => toggleOrdering("solicitacao_data")}>
                            Data
                        </div>
                    </div>
                    <div className="solicitation header">
                        <div className="solicitation-title">
                            <input type="search" placeholder="" onChange={(e) => searchAttr("processo_numero", e.target.value)}/>
                        </div>
                        <div className="solicitation-theme">
                            <input type="search" placeholder="" onChange={(e) => searchAttr("solicitacao_descricao", e.target.value)}/>
                        </div>
                        <div className="score-container" >
                            <input type="search" placeholder="" onChange={(e) => searchAttr("processo_situacao", e.target.value)}/>
                        </div>
                        <div className="solicitation-result" >
                            <input type="date" placeholder="" onChange={(e) => searchAttr("solicitacao_data", e.target.value)}/>
                        </div>
                    </div>

                    {solicitations.length === 0 ?
                        <div className="no-solicitations">
                            <h3> Nenhum processo encontrado! </h3>
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