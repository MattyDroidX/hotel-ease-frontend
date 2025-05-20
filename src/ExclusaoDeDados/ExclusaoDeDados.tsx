import React from "react";
import group33 from "./group-33.png";
import rectangle12 from "./rectangle-12.svg";
import rectangle14 from "./rectangle-14.svg";
import "./style.css";

export const ExclusaoDeDados: React.FC = () => {
  return (
    <div className="exclusao-de-dados">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img className="rectangle" alt="Background" src={rectangle12} />
          <div className="ellipse" />
          <img className="group" alt="Logo" src={group33} />
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <p className="HOTELEASE"><span className="text-wrapper">H</span><span className="text-wrapper">OTEL</span><span className="span">EASE</span></p>
              <div className="navigation" />
            </div>
          </div>
          <img className="img" alt="Form" src={rectangle14} />
          <div className="div">Exclusao De Dados</div>
          {/* Form preenchido com dados */}
          <p className="deseja-realmente">Deseja Realmente Excluir A Seguinte Tarefa?</p>
          <div className="text-wrapper-7">Maria</div>
          <div className="text-wrapper-8">101</div>
          <div className="text-wrapper-9">Limpeza Completa</div>
          <div className="text-wrapper-10">01/06/24 10:00</div>
        </div>
      </div>
    </div>
  );
};
