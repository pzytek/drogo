import React from "react";
import { Helmet } from "react-helmet-async";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Drogo - Home Page",
  description: "E-commerce with everything you need",
  keywords: "e-commerce, shop, electronics, books, kitchen, cheap",
};

export default Meta;
