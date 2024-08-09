"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument: React.FC<{ uniqueId: string }> = ({ uniqueId }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello, this is a sample PDF with metadata.</Text>
        <Text>Unique ID: {uniqueId}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
