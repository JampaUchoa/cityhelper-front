import React, { useState, useEffect } from 'react';
import "./dashboard.scss";
import { get } from 'utils/fetch';
import timeSince from 'utils/timesince';

export default function ViewSolicitation({match}) {

    const [solicitation, setSolicitation] = useState({});

    useEffect(() => {
        get(`/api/solicitation/${match.params.id}/`).then(res => setSolicitation(res));
    }, [])


    return (
        <div className="solicitation-view">
            <div className="divider">
                <div>
                    <div className="header">
                        <h1>Solicitação {solicitation.processo_numero}</h1>
                        <div className="status">
                            {solicitation.processo_status}
                        </div>
                    </div>

                    <span className="date-time">Criado em {solicitation.solicitacao_data} - há {timeSince(solicitation.solicitacao_data)}</span>

                    <div className="description"> 
                        {solicitation.solicitacao_descricao}
                    </div>

                    <span className="plantao">Plantão: {solicitation.solicitacao_plantao ? "Sim": "Não"}</span>
                    <br/>
                    Vitimas: {solicitation.solicitacao_vitimas ? "Sim": "Não"}
                    <br/>
                    Vitimas fatais: {solicitation.solicitacao_vitimas_fatais ? "Sim": "Não"}
                    <br/>
                    Origem: {solicitation.solicitacao_origem_chamado}
                </div>
                <div className="location">
                    <h2> Localização </h2>
                    <div className="">
                        {solicitation.processo_localizacao}
                        <br/>
                        <h4>Endereço</h4>
                        {solicitation.solicitacao_endereco}
                        <br/> {solicitation.solicitacao_bairro} <br/> {solicitation.solicitacao_roteiro}
                        <br/>

                    </div>
                </div>
            </div>


        </div>
    )
}