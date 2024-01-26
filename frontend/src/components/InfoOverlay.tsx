import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

interface InfoOverlayProps {
  info: React.ReactNode;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ info }) => {
  const renderTooltip = (props: React.ReactNode) => (
    <Tooltip id="tooltip">{props}</Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 300, hide: 500 }}
      overlay={renderTooltip(info)}
    >
      <div
        className="mx-2"
        style={{ display: "inline-block", position: "relative" }}
      >
        <FaInfoCircle size={25} />
      </div>
    </OverlayTrigger>
  );
};

export default InfoOverlay;
