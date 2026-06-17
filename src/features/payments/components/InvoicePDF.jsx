import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const formatIDR = (value) =>
  "Rp " + Number(value || 0).toLocaleString("id-ID");

const getQrImage = (value) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    value || ""
  )}`;

const styles = StyleSheet.create({
  // ✅ FULL WHITE PAGE (FIX REQUEST KAMU)
  page: {
    backgroundColor: "#ffffff",
    padding: 32,
    fontSize: 10,
  },

  // 📌 KOP SURAT (SIAP KALAU NANTI MAU DIPAKAI)
  kopSurat: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: "1 solid #e2e8f0",
  },

  kopTitle: {
    color : "#065f46",
    fontSize: 14,
    fontWeight: 700,
  },

  kopSub: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 2,
  },

  // HEADER INVOICE (TIDAK ADA CARD)
  topBar: {
    backgroundColor: "#059669",
    padding: 16,
    color: "#ffffff",
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
  },

  invoiceNo: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.9,
  },

  status: {
    fontSize: 9,
    padding: "4 8",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    borderRadius: 6,
  },

  sectionTitle: {
    fontSize: 9,
    color: "#94a3b8",
    marginBottom: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    border: "1 solid #e2e8f0",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },

  label: {
    fontSize: 8,
    color: "#94a3b8",
    marginBottom: 4,
  },

  value: {
    fontSize: 10,
    fontWeight: 600,
    color: "#0f172a",
  },

  payment: {
    marginTop: 8,
    border: "1 solid #e2e8f0",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#ecfdf5",
    fontSize: 11,
    fontWeight: 700,
    color: "#047857",
  },

  qrWrap: {
    marginTop: 20,
    paddingTop: 14,
    borderTop: "1 dashed #cbd5e1",
    textAlign: "center",
  },

  qrImg: {
    width: 130,
    height: 130,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default function InvoicePDF({ invoice, orderId }) {
  if (!invoice) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* 📌 KOP SURAT (READY FOR FUTURE) */}
        <View style={styles.kopSurat}>
          <Text style={styles.kopTitle}>Media Pondok Jawa Timur</Text>
          <Text style={styles.kopSub}>
            Jl. Raya Candi VI C No.303, Karangbesuki, Kec. Sukun, Kota Malang, Jawa Timur 65146 • support@email.com
          </Text>
        </View>

        {/* HEADER */}
        <View style={styles.topBar}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.title}>INVOICE</Text>
              <Text style={styles.invoiceNo}>
                {invoice.invoice_number}
              </Text>
            </View>

            <Text style={styles.status}>
              {invoice.status_pembayaran || "PAID"}
            </Text>
          </View>
        </View>

        {/* CONTENT */}
        <View>

          {/* EVENT INFO */}
          <Text style={styles.sectionTitle}>Informasi Event</Text>

          <View style={styles.grid}>
            <View style={styles.box}>
              <Text style={styles.label}>Nama Event</Text>
              <Text style={styles.value}>
                {invoice.item?.event_name}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Lokasi</Text>
              <Text style={styles.value}>
                {invoice.item?.location}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.value}>{orderId}</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Invoice</Text>
              <Text style={styles.value}>
                {invoice.invoice_number}
              </Text>
            </View>
          </View>

          {/* PAYMENT */}
          <Text style={styles.sectionTitle}>
            Detail Pembayaran
          </Text>

          <View style={styles.payment}>
            <View style={styles.row}>
              <Text>Tiket Event</Text>
              <Text>{formatIDR(invoice.item?.price)}</Text>
            </View>

            <View style={styles.total}>
              <Text>Total</Text>
              <Text>{formatIDR(invoice.item?.price)}</Text>
            </View>
          </View>

          {/* QR */}
          <View style={styles.qrWrap}>
            <Text style={{ fontWeight: 700 }}>
              QR Ticket Access
            </Text>
            <Text style={{ fontSize: 9, color: "#64748b" }}>
              Tunjukkan QR ini saat check-in
            </Text>

            <Image
              style={styles.qrImg}
              src={getQrImage(invoice.ticket?.qr_code_raw)}
            />
          </View>

        </View>
      </Page>
    </Document>
  );
}