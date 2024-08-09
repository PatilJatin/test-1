"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { v4 as uuidv4 } from "uuid";

const GeneratePDF: React.FC = () => {
  const uniqueId = uuidv4();

  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument uniqueId={uniqueId} />}
        fileName="sample.pdf"
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default GeneratePDF;
